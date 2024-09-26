import { useFocusEffect, useNavigation } from "@react-navigation/native";
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useRef, useState } from "react";
import { ScrollView } from "react-native";
import ButtonBack from "../../../components/ButtonBack";
import ProgressBar from "../../../components/ProgressBar";
import { MyClubsStackParamList } from "../../../components/StackMyClubs";
import Container from "./../../../components/Container/index";
import ButtonPrimary from "../../../components/Button";
import ButtonSecondary from "../../../components/ButtonSecondary";
import { Colors } from "../../../styles/global";

import {
  ContainerInfo,
  TextContainer,
  Cover,
  Title,
  SubTitle,
  TextInfo,
  AvatarImage,
  DateInfo,
  ReadersContainer,
  ButtonView,
  Participants,
  ContainerReading,
} from "./styles";
import { Modalize } from "react-native-modalize";
import {
  ContainerModalCard,
  TitleModalCard,
} from "../../../components/ModalCardStyles/styles";
import { TextToAdd } from "../data-club/styles";
import ButtonAdd from "../../../components/ButtonAdd";
import GoalItem from "../../../components/GoalItem";
import Clubs from "../../../services/clubs.service";
import PageLoading from "../../../components/PageLoading";
import { Readings } from "../../../models/readings.model";
import dayjs from "dayjs";
import moment from "moment";
import { ContainerButtonsModal } from "../../../components/Modal/styles";
import { ToastyContext } from "../../../utils/ToastyGlobal";
import Modal from "../../../components/Modal";
import { Goals } from "../../../models/goals.model";
import { Book } from "../../../models/book.model";
import {
  ContainerModalDataPage,
  ContentData,
  TextModalAuthor,
  TextModalTitle,
} from "../create-reading/styles";
import { TextCenter } from "../../search/styles";
import { Notice } from "../../../models/notice.model";
import NoticeTextItem from "../../../components/NoticeTextItem";
import SurveyItem from "../../../components/SurveyItem";
import { parse } from "expo-linking";

interface Props {
  route: any;
}

type Club = StackNavigationProp<MyClubsStackParamList, any>;

const ReadingInProgress: React.FC<Props> = ({ route }) => {
  const { createToasty } = useContext(ToastyContext);
  const navigation = useNavigation<Club>();
  const [user, setUser] = useState<
    "naoParticipante" | "participante" | "moderador"
  >("participante");
  const [goalsOrNotice, setGoalsOrNotice] = useState<boolean>(false); // true = notices, false = goals
  const [loading, setLoading] = useState<boolean>(true);
  const [dataReading, setDataReading] = useState<Readings>();
  const [progress, setProgress] = useState<ProgressReading>();
  const [members, setMembers] = useState<any[]>([]);
  const [countMembers, setCountMembers] = useState<number>(0);
  const [hasNext, setHasNext] = useState<string>("0");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalFinishReadingOpen, setModalFinishReadingOpen] =
    useState<boolean>(false);
  const [idUserRemoved, setIdUserRemoved] = useState<string>("");
  const [goals, setGoals] = useState<Goals[]>();
  const [bookOfReading, setBookOfReading] = useState<Book>();
  const [onErrorImageModalize, setOnErrorImageModalize] =
    useState<boolean>(false);
  const [onErrorImageDataBook, setOnErrorImageDataBook] =
    useState<boolean>(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const colors = ["#E48F88", "#88C3E4", "#C2BB7C", "#E488D0"];

  useFocusEffect(
    React.useCallback(() => {
      setNotices([]);
      if (route?.params?.id) {
        getDataReading();
      }

      setUser(
        route?.params?.moderator
          ? "moderador"
          : route?.params?.member
          ? "participante"
          : "naoParticipante"
      );
    }, [route])
  );
  const getDataBook = async (bookEdition: string) => {
    const result = await Clubs.getBookById(bookEdition);

    if (result?.data) {
      setBookOfReading(result.data);
    }

    setLoading(false);
  };

  const getDataReading = async () => {
    setLoading(true);
    const result = await Clubs.getReading(route?.params?.id);
    if (result?.data) {
      setDataReading(result?.data);
      getDataBook(result?.data?.book_edition);
      getProgress();
      getMembers(result?.data);
      getGoals(result?.data?.id);
      getNotices();
    }
  };
  const getProgress = async () => {
    const result = await Clubs.getProgressReadings(route?.params?.id);
    if (result?.data) {
      setProgress(result.data);
    }
  };
  const getGoals = async (id: string) => {
    const result = await Clubs.getGoals(id);
    if (result?.data) {
      setGoals(result?.data);
    } else {
      createToasty(
        true,
        "Ops! Algo deu de errado",
        "Não foi possível obter a lista de metas!",
        true
      );
    }
  };
  const getMembers = async (data: Readings) => {
    setButtonLoading(true);
    const result = await Clubs.getMembersClub(data.bookclub || "", hasNext);
    if (result?.data) {
      setCountMembers(result.data.count);
      const tratedMembers = members || [];
      tratedMembers.push(...result?.data?.results);
      setMembers(tratedMembers);

      if (result?.data?.next) {
        const urlObj = parse(result?.data?.next);

        const page = urlObj?.queryParams?.page;
        setHasNext(typeof page === "string" ? page : "0");
      } else {
        setHasNext("0");
      }
    }
    setButtonLoading(false);
  };
  const modalizeRef = useRef<any>(null);
  const dataBookRef = useRef<any>(null);

  const timeMember = (date: any) => {
    const now = moment(new Date());
    const past = moment(date);
    const duration = moment.duration(now.diff(past));

    const days = duration.asDays();
    if (days > 30 && days < 365) {
      return (duration.asDays() / 30).toFixed(0) + " meses";
    } else if (days >= 365) {
      return (duration.asDays() / 365).toFixed(0) + " ano(s)";
    } else {
      return duration.asDays().toFixed(0) + " dias";
    }
  };

  const removeMember = async (id: string) => {
    const result = await Clubs.removeMember({
      idClub: dataReading?.bookclub || "",
      idMember: id,
    });
    if (result?.status === 204) {
      getMembers(dataReading || ({} as Readings));
      createToasty(
        true,
        "Participante removido.",
        "A lista de participantes do clube foi atualizada.",
        false
      );
    } else if (result.request.status === 418) {
      createToasty(
        true,
        "Participante moderador.",
        "Não é possível remover um moderador.",
        true
      );
    } else {
      createToasty(
        true,
        "Ops! Algo deu errado",
        "Não foi possível remover participante, por favor, tente novamente.",
        true
      );
    }
    setModalOpen(false);
  };

  const ImageWithAcronym = (value: any, width: number) => {
    const { item, index } = value;
    return (
      <View
        style={{
          width: width,
          height: width,
          backgroundColor: colors[index % colors?.length],
          alignItems: "center",
          justifyContent: "center",
          borderRadius: width,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter_700Bold",
            color: Colors.whiteText,
            fontSize: width === 50 ? 20 : 10,
          }}
        >
          {getAcronym(item?.username)}
        </Text>
      </View>
    );
  };

  const ListOfParticipants = (value: any) => {
    const { item, index } = value;
    return (
      <View
        style={{
          height: 50,
          width: "100%",
          flexDirection: "row",
          marginBottom: 24,
          alignItems: "center",
          justifyContent: "space-between",
        }}
        key={index}
      >
        {!!loading && <PageLoading />}
        <View style={{ flexDirection: "row" }}>
          {ImageWithAcronym(value, 50)}
          <View
            style={{
              marginLeft: 16,
            }}
          >
            <Text
              style={{
                color: Colors.whiteText,
                fontFamily: "Inter_600SemiBold",
                fontSize: 16,
                marginBottom: 8,
              }}
              allowFontScaling={false}
            >
              {item.username || "anônimo"}
            </Text>
            <Text
              style={{ fontSize: 14, color: Colors.grey }}
              allowFontScaling={false}
            >
              {"participa há " + timeMember(item?.membership_date)}
            </Text>
          </View>
        </View>
        {user === "moderador" && item.profile !== "moderador" && (
          <TouchableOpacity
            onPress={() => {
              modalizeRef?.current?.close();
              setIdUserRemoved(item?.user);
              setModalOpen(true);
            }}
          >
            <ButtonPrimary title={"remover"} width={126} padding={"0px 16px"} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const getAcronym = (text: string) => {
    const name = text?.replace(/[^a-zA-Z\s]/g, "")?.split("");

    let firsts = "";

    if (name?.length > 0) {
      firsts += name[0]?.substring(0, 1);
      if (name?.length > 1) {
        firsts += name[1]?.substring(0, 1);
      }
    }
    return firsts?.toUpperCase();
  };

  const listOfReading = ({ item }: any) => {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 16,
          backgroundColor: Colors.backgroundDarkSecondary,
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <View>
          <Image
            source={
              item.state === "complete"
                ? require("../../../../assets/images/done-on.png")
                : require("../../../../assets/images/check-reading.png")
            }
          />
        </View>
        <View style={{ marginLeft: 16 }}>
          <Text
            style={{ fontSize: 16, color: Colors.whiteText }}
            allowFontScaling={false}
          >
            {item.typeReading}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.grey,
              // lineHeight: 12,
              marginTop: 12,
            }}
            allowFontScaling={false}
          >
            <Image
              resizeMode="center"
              style={{ width: 16, height: 16 }}
              source={require("../../../../assets/images/Bookmark-border.png")}
            />{" "}
            {item.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Colors.grey,
              // lineHeight: 12,
              marginTop: 12,
            }}
            allowFontScaling={false}
          >
            <Image
              resizeMode="center"
              style={{ width: 16, height: 16 }}
              source={require("../../../../assets/images/Calendar-today.png")}
            />{" "}
            {item.date}
          </Text>
        </View>
      </View>
    );
  };

  const finishReading = async () => {
    setLoading(true);
    const result = await Clubs.finishReading(
      {
        book_edition: dataReading?.book_edition,
        bookclub: dataReading?.bookclub,
        calendar_type: dataReading?.calendar_type,
        predicted_ending: dataReading?.predicted_ending,
        ending_date: dayjs(),
      },
      dataReading?.id || ""
    );

    if (result?.status === 200 || result?.status === 201) {
      navigation.navigate("DataClub", {
        params: {
          id: dataReading?.bookclub || "",
          isModerated: true,
          participate: true,
        },
      });
      createToasty(
        true,
        "Leitura encerrada.",
        "Escolha um livro e comece uma nova leitura.",
        false
      );
    } else {
      createToasty(
        true,
        "Ops! Algo deu de errado",
        "Não foi possível encerrar leitura, por favor, tente novamente.",
        true
      );
    }
    setLoading(false);
  };

  const endingGoal = async (id: string, value: boolean) => {
    setLoading(true);
    const response = await Clubs.editGoal({ is_active: value }, id);
    if (
      response.request.status === 204 ||
      response.request.status === 200 ||
      response.request.status === 201
    ) {
      createToasty(
        true,
        "Alterações salvas!",
        "Sua meta de leitura já foi atualizada.",
        false
      );
    } else {
      createToasty(
        true,
        "Ops! Algo deu errado",
        "Não foi possível concluir sua meta, por favor, tente novamente.",
        true
      );
    }
    getDataReading();
  };

  const deleteGoal = async (id: string) => {
    setLoading(true);
    const response = await Clubs.deleteGoal(id);

    if (
      response.request.status === 204 ||
      response.request.status === 200 ||
      response.request.status === 201
    ) {
      createToasty(
        true,
        "Alterações salvas!",
        "Sua meta de leitura já foi atualizada.",
        false
      );
    } else {
      createToasty(
        true,
        "Ops! Algo deu errado",
        "Não foi possível excluir a meta, por favor, tente novamente.",
        true
      );
    }
    getDataReading();
  };

  const deleteNotice = async (id: string) => {
    setLoading(true);
    const response = await Clubs.removeNoticeReading(id);
    if (
      response.request.status === 204 ||
      response.request.status === 200 ||
      response.request.status === 201
    ) {
      createToasty(
        true,
        "Aviso excluído!",
        "Para adicionar novos avisos clique em adicionar (+).",
        false
      );
    } else {
      createToasty(
        true,
        "Ops! Algo deu errado.",
        "Não foi possível excluir aviso, por favor, tente novamente.",
        true
      );
    }
    getDataReading();
  };

  const getNotices = async () => {
    const result = await Clubs.getNoticesReading(route.params.id);
    if (result.data) {
      setNotices(result?.data);
    }
    setLoading(false);
  };

  const fixNotice = async (noticeData: {
    bookclub: string;
    content: string;
    created_by_id: number;
    created_by: string;
    creation_date: string;
    id: string;
    pin: boolean;
    title: string;
    update_date: string;
  }) => {
    const response = await Clubs.editNoticeReading(
      {
        // bookclub: noticeData?.bookclub || '',
        content: noticeData?.content || "",
        created_by: noticeData?.created_by || "",
        pin: !noticeData?.pin,
        title: noticeData?.title || "",
      },
      noticeData?.id || ""
    );
    if (response.request.status === 200) {
      getNotices();
    } else {
    }
  };

  const fixSurvey = async (surveyData: Notice) => {
    const response = await Clubs.editSurveyReading(
      {
        title: surveyData?.title,
        start_date: null,
        ending_date: null,
        type: surveyData?.type,
        pin: !surveyData?.pin,
        bookclub: surveyData?.bookclub,
        reading: surveyData?.reading,
        created_by: surveyData.created_by_id,
      },
      surveyData?.id
    );

    if (response.request.status === 200) {
      getNotices();
    } else {
    }
  };

  const removeSurvey = async (id: string) => {
    setLoading(true);
    const response = await Clubs.removeQuestions(id);
    getNotices();
  };

  return (
    <>
      <Container
        style={{ padding: 20, paddingBottom: 0, position: "relative" }}
      >
        <>
          {!!loading && <PageLoading />}
          <ButtonBack navigation={() => navigation.goBack()} />
          <ContainerReading>
            <View
              style={{
                marginTop: Platform.OS === "ios" ? 30 : 56,
                flex: 1,
                padding: Platform.OS === "ios" ? 20 : 0,
                paddingBottom: 0,
              }}
            >
              <ContainerInfo>
                <TouchableOpacity
                  onPress={() =>
                    bookOfReading ? dataBookRef.current.open() : null
                  }
                >
                  <Cover
                    source={
                      dataReading?.book_cover && !onErrorImageDataBook
                        ? { uri: dataReading?.book_cover }
                        : require("../../../../assets/images/banner-clube.png")
                    }
                    onError={() => setOnErrorImageDataBook(true)}
                  />
                </TouchableOpacity>
                <TextContainer>
                  <Title
                    style={{ width: 200 }}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                    allowFontScaling={false}
                  >
                    {dataReading?.book_title}
                  </Title>
                  <SubTitle allowFontScaling={false}>
                    {dataReading?.book_author}
                  </SubTitle>
                  <DateInfo>
                    <Image
                      source={require("../../../../assets/images/clock.png")}
                      resizeMode="contain"
                    />
                    <TextInfo allowFontScaling={false}>
                      {" "}
                      {dataReading?.calendar_type === "MONTHLY"
                        ? "Mensal"
                        : "Semanal"}{" "}
                    </TextInfo>
                  </DateInfo>
                  <DateInfo style={{ marginBottom: 26 }}>
                    <Image
                      source={require("../../../../assets/images/calendar.png")}
                    />
                    <TextInfo allowFontScaling={false}>
                      {" "}
                      {dayjs(dataReading?.predicted_ending).format(
                        "DD/MM/YYYY"
                      )}{" "}
                    </TextInfo>
                  </DateInfo>
                  {/* {user === 'participante' && (
                  <ButtonSecondary
                    navigation={() => console.log('parar de ler')}
                    title="parar de ler"
                    width={126}
                    padding={'0px 16px'}
                  />
                )} */}
                  {user === "moderador" && (
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{
                          paddingLeft: 24,
                          paddingRight: 24,
                          paddingTop: 6,
                          paddingBottom: 6,
                        }}
                        onPress={() => {
                          bookOfReading &&
                            dataReading?.bookclub &&
                            dataReading?.id &&
                            navigation.navigate("ReadingConfiguration", {
                              book: bookOfReading || ({} as Book),
                              idClub: dataReading?.bookclub || "",
                              idReading: dataReading?.id,
                            });
                        }}
                      >
                        <Text
                          style={{
                            color: Colors.grey,
                            fontSize: 16,
                            marginLeft: 4,
                          }}
                          allowFontScaling={false}
                        >
                          editar
                        </Text>
                      </TouchableOpacity>
                      <ButtonPrimary
                        navigation={() => setModalFinishReadingOpen(true)}
                        title="encerrar"
                        width={126}
                        padding={"0px 16px"}
                      />
                    </View>
                  )}
                </TextContainer>
              </ContainerInfo>
              <ProgressBar
                progress={progress?.percentage || 0}
                bgColor={Colors.backgroundDarkSecondary}
              />

              {/* <TouchableOpacity
                // onPress={() => modalizeRef?.current?.open()}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <>
                  {[0, 1, 2, 3].map((item: any, index: number) =>
                    ImageWithAcronym({ item: members[index], index }, 24)
                  )}
                  <Participants allowFontScaling={false}>
                    {" "}
                    + {members?.length > 3 ? countMembers - 4 : 0}{" "}
                  </Participants>
                </>
              </TouchableOpacity> */}

              {user !== "naoParticipante" && (
                <>
                  <View
                    style={{
                      height: 32,
                      backgroundColor: Colors.blackText,
                      borderRadius: 8,
                      flexDirection: "row",
                      marginVertical: 8,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8,
                        backgroundColor: !goalsOrNotice
                          ? Colors.whiteSecondary
                          : undefined,
                      }}
                      onPress={() => setGoalsOrNotice(!goalsOrNotice)}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: !goalsOrNotice
                            ? Colors.whiteText
                            : Colors.greyNotSelected,
                        }}
                        allowFontScaling={false}
                      >
                        Metas
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 8,
                        backgroundColor: goalsOrNotice
                          ? Colors.whiteSecondary
                          : undefined,
                      }}
                      onPress={() => setGoalsOrNotice(!goalsOrNotice)}
                    >
                      <Text
                        style={{
                          fontSize: 14,
                          color: goalsOrNotice
                            ? Colors.whiteText
                            : Colors.greyNotSelected,
                        }}
                        allowFontScaling={false}
                      >
                        Avisos
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      width: "100%",
                      justifyContent: "center",
                      flexDirection: "row",
                      // marginBottom: 24,
                    }}
                  >
                    {!goalsOrNotice ? (
                      <FlatList
                        data={goals}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                          <GoalItem
                            type="view"
                            data={item}
                            key={index}
                            moderated={user}
                            removeGoal={(id: string) => deleteGoal(id)}
                            handleEndingGoal={(id: string, value: boolean) =>
                              endingGoal(id, value)
                            }
                          />
                        )}
                      />
                    ) : (
                      <FlatList
                        data={notices}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                          <>
                            {item.content ? (
                              <NoticeTextItem
                                type="reading"
                                data={item}
                                key={index}
                                moderated={user}
                                removeNotice={(id: string) => deleteNotice(id)}
                                fixNotice={(e) => fixNotice(e)}
                              />
                            ) : (
                              <SurveyItem
                                type="reading"
                                data={item}
                                key={index}
                                moderated={user}
                                removeSurvey={(id: string) => removeSurvey(id)}
                                fixSurvey={(e) => fixSurvey(e)}
                              />
                            )}
                          </>
                        )}
                      />
                    )}
                  </View>
                </>
              )}
            </View>
            {/* <ButtonView>
            {user === 'naoParticipante' && (
              <ButtonPrimary
                width={'full'}
                margin={'2px'}
                title={'ler junto'}
                navigation={() => console.warn('clicou')}
              />
            )}
          </ButtonView> */}
          </ContainerReading>

          {user === "moderador" && (
            <View
              style={{
                width: Dimensions.get("screen").width,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 12,
                // marginBottom: 8,
                // marginTop: 14,
                position: "absolute",
                bottom: 8,
                // right: 20,
                left: 0,
              }}
            >
              {notices?.length === 0 && goalsOrNotice && (
                <TextToAdd allowFontScaling={false}>
                  clique em adicionar (+) para adicionar avisos
                </TextToAdd>
              )}
              {goals?.length === 0 && !goalsOrNotice && (
                <TextToAdd allowFontScaling={false}>
                  clique em adicionar (+) para adicionar meta
                </TextToAdd>
              )}
              <View style={{ position: "absolute", right: 20, bottom: 0 }}>
                <ButtonAdd
                  onPress={() =>
                    !goalsOrNotice
                      ? navigation.navigate("CreateReadingGoal", {
                          id: dataReading?.id || "",
                        })
                      : navigation.navigate("CreateNotice", {
                          id: route?.params?.id || "",
                          type: "reading",
                        })
                  }
                />
              </View>
            </View>
          )}
          <Modalize
            ref={modalizeRef}
            flatListProps={{
              data: members,
              renderItem: ListOfParticipants,
              keyExtractor: (item) => item.id,
            }}
            handlePosition="inside"
            modalHeight={Dimensions.get("screen").height - 200}
            handleStyle={{ backgroundColor: Colors.whiteSecondary }}
            modalStyle={{
              backgroundColor: Colors.backgroundDark,
              paddingLeft: 16,
              paddingRight: 16,
            }}
            HeaderComponent={
              <TitleModalCard allowFontScaling={false}>
                Participantes ({countMembers})
              </TitleModalCard>
            }
            FooterComponent={
              hasNext !== "0" ? (
                <ButtonPrimary
                  title="carregar mais"
                  onPressAction={() =>
                    getMembers(dataReading || ({} as Readings))
                  }
                  loading={buttonLoading}
                />
              ) : (
                ""
              )
            }
          />

          <Modalize
            ref={dataBookRef}
            handlePosition="inside"
            modalHeight={Dimensions.get("screen").height - 200}
            handleStyle={{ backgroundColor: Colors.whiteSecondary }}
            modalStyle={{
              backgroundColor: Colors.backgroundDark,
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <View style={{ flex: 1, marginBottom: 16 }}>
              <View style={{ alignItems: "center" }}>
                <Image
                  source={
                    bookOfReading?.cover && !onErrorImageModalize
                      ? { uri: bookOfReading?.cover }
                      : require("../../../../assets/images/banner-clube.png")
                  }
                  style={{
                    width: 124,
                    height: 184,
                    borderRadius: 10,
                    marginTop: 40,
                  }}
                  onError={() => setOnErrorImageModalize(true)}
                />
                <TextModalTitle allowFontScaling={false}>
                  {bookOfReading?.title}
                </TextModalTitle>
                <TextModalAuthor allowFontScaling={false}>
                  {bookOfReading?.author}
                </TextModalAuthor>
              </View>

              <ContainerModalDataPage>
                <ContentData>
                  <TextModalTitle
                    style={{ marginTop: 0, width: 140, textAlign: "center" }}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    allowFontScaling={false}
                  >
                    {bookOfReading?.publisher_imprint ||
                      bookOfReading?.publisher}
                  </TextModalTitle>
                  <TextModalAuthor allowFontScaling={false}>
                    editora
                  </TextModalAuthor>
                </ContentData>
                <ContentData
                  style={{
                    borderLeftWidth: 0.25,
                    borderLeftColor: Colors.whiteTrue,
                  }}
                >
                  <TextModalTitle
                    style={{ marginTop: 0 }}
                    allowFontScaling={false}
                  >
                    {bookOfReading?.page_qty}
                  </TextModalTitle>
                  <TextModalAuthor allowFontScaling={false}>
                    páginas
                  </TextModalAuthor>
                </ContentData>
              </ContainerModalDataPage>
              <TextCenter
                style={{ marginTop: 24, lineHeight: 32, textAlign: "left" }}
                allowFontScaling={false}
              >
                {bookOfReading?.synopsis}
              </TextCenter>
            </View>
          </Modalize>
        </>
      </Container>
      {modalFinishReadingOpen && (
        <Modal
          text={
            "Essa ação não poderá ser desfeita e você não terá mais acesso a leitura."
          }
          title={"Você quer encerrar a leitura?"}
        >
          <ContainerButtonsModal>
            <TouchableOpacity onPress={() => setModalFinishReadingOpen(false)}>
              <Text
                style={{
                  color: Colors.whiteText,
                  fontFamily: "Inter_600SemiBold",
                  paddingTop: 8,
                  paddingRight: 24,
                  paddingBottom: 8,
                  paddingLeft: 24,
                }}
                allowFontScaling={false}
              >
                cancelar
              </Text>
            </TouchableOpacity>
            <ButtonPrimary
              title={"sim, quero finalizar"}
              width={"half"}
              padding="0px"
              navigation={finishReading}
            />
          </ContainerButtonsModal>
        </Modal>
      )}
      {modalOpen && (
        <Modal
          text={
            "Essa ação não poderá ser desfeita e o participante será removido do clube."
          }
          title={"Você quer remover participante??"}
        >
          <ContainerButtonsModal>
            <TouchableOpacity
              onPress={() => {
                setModalOpen(false);
                setIdUserRemoved("");
              }}
            >
              <Text
                style={{
                  color: Colors.whiteText,
                  fontFamily: "Inter_600SemiBold",
                  paddingTop: 8,
                  paddingRight: 24,
                  paddingBottom: 8,
                  paddingLeft: 24,
                }}
                allowFontScaling={false}
              >
                cancelar
              </Text>
            </TouchableOpacity>
            <ButtonPrimary
              title={"sim, quero remover"}
              width={"half"}
              padding="0px"
              navigation={() => removeMember(idUserRemoved)}
            />
          </ContainerButtonsModal>
        </Modal>
      )}
      <Modalize
        ref={dataBookRef}
        handlePosition="inside"
        modalHeight={Dimensions.get("screen").height - 200}
        handleStyle={{ backgroundColor: Colors.whiteSecondary }}
        modalStyle={{
          backgroundColor: Colors.backgroundDark,
          paddingLeft: 16,
          paddingRight: 16,
        }}
      >
        <View style={{ flex: 1, marginBottom: 16 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={
                bookOfReading?.cover && !onErrorImageModalize
                  ? { uri: bookOfReading?.cover }
                  : require("../../../../assets/images/banner-clube.png")
              }
              style={{
                width: 124,
                height: 184,
                borderRadius: 10,
                marginTop: 40,
              }}
              onError={() => {
                setOnErrorImageModalize(true);
              }}
            />
            <TextModalTitle allowFontScaling={false}>
              {bookOfReading?.title}
            </TextModalTitle>
            <TextModalAuthor allowFontScaling={false}>
              {bookOfReading?.author}
            </TextModalAuthor>
          </View>

          <ContainerModalDataPage>
            <ContentData>
              <TextModalTitle
                style={{ marginTop: 0, width: 140, textAlign: "center" }}
                ellipsizeMode="tail"
                numberOfLines={1}
                allowFontScaling={false}
              >
                {bookOfReading?.publisher_imprint || bookOfReading?.publisher}
              </TextModalTitle>
              <TextModalAuthor allowFontScaling={false}>
                editora
              </TextModalAuthor>
            </ContentData>
            <ContentData
              style={{
                borderLeftWidth: 0.25,
                borderLeftColor: Colors.whiteTrue,
              }}
            >
              <TextModalTitle style={{ marginTop: 0 }} allowFontScaling={false}>
                {bookOfReading?.page_qty}
              </TextModalTitle>
              <TextModalAuthor allowFontScaling={false}>
                páginas
              </TextModalAuthor>
            </ContentData>
          </ContainerModalDataPage>
          <TextCenter
            style={{ marginTop: 24, lineHeight: 32, textAlign: "left" }}
            allowFontScaling={false}
          >
            {bookOfReading?.synopsis}
          </TextCenter>
        </View>
      </Modalize>
    </>
  );
};

export default ReadingInProgress;
