import { Link, useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonShare from "../../../components/ButtonShare";
import Container from "../../../components/Container";
import { Colors } from "../../../styles/global";
import { DescriptionClub, NameClub, TextToAdd } from "./styles";
import DetailsDataClub from "../../../components/DetailsDataClub";
import ButtonTertiary from "../../../components/ButtonTertiary";
import ButtonAdd from "../../../components/ButtonAdd";
import ButtonPrimary from "../../../components/Button";
import CardBookInProgress from "../../../components/CardBookInProgress";
import ButtonSecondary from "../../../components/ButtonSecondary";
import { ToastyContext } from "../../../utils/ToastyGlobal";
import Modal from "./../../../components/Modal/index";
import { ContainerButtonsModal } from "../../../components/Modal/styles";
import { MyClubsStackParamList } from "../../../components/StackMyClubs";
import { StackNavigationProp } from "@react-navigation/stack";
import ButtonBack from "../../../components/ButtonBack";
import ButtonHamburguer from "../../../components/ButtonHamburguer";
import { Modalize } from "react-native-modalize";
import {
  ContainerItemMenu,
  ContainerMenu,
  TextItemMenu,
} from "../../../components/ItemMenu/styles";
import { ClubList } from "../../../models/clubs.model";
import { AuthContext } from "../../../utils/Auth";
import Clubs from "../../../services/clubs.service";
import PageLoading from "../../../components/PageLoading";
import * as Linking from "expo-linking";
import { RootStackParamList } from "../../../routes";
import { parse } from "expo-linking";
import moment from "moment";
import { TitleModalCard } from "../../../components/ModalCardStyles/styles";

interface Props {
  route?: any;
}

type Club = StackNavigationProp<MyClubsStackParamList, any>;
type Root = StackNavigationProp<RootStackParamList, any>;

const DataClub: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<Club>();
  const menu = useRef<any>(null);
  const modalizeRef = useRef<any>(null);
  const { createToasty } = useContext(ToastyContext);
  const { getId, getToken } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalOpenDeleteClube, setModalOpenDeleteClube] =
    useState<boolean>(false);
  const [dataClub, setDataClub] = useState<ClubList>();
  const [onErrorImage, setOnErrorImage] = useState<boolean>(false);
  const [isModerated, setIsModerated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [participant, setParticipant] = useState<boolean>(false);
  const [members, setMembers] = useState<any[]>([]);
  const [hasNotice, setHasNotice] = useState<boolean>(false);
  const [countMembers, setCountMembers] = useState<number>(0);
  const [hasNext, setHasNext] = useState<string>("0");
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const colors = ["#E48F88", "#88C3E4", "#C2BB7C", "#E488D0"];

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getClub();
      if (route?.params?.params?.id || route?.params?.id) {
        setHasNext("0");
        getMembers(route?.params?.params?.id || route?.params?.id);
      }
    }, [route.params])
  );

  const resetAndGetMembersAndShow = () => {
    setCountMembers(0);
    setHasNext("0");
    getMembers(route?.params?.params?.id || route?.params?.id, true);
  };

  const handleBackButtonClick = () => {
    handleBack();
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  const getClub = async () => {
    setLoading(true);

    const id = await getId();
    if (route?.params?.params?.id || route?.params?.id) {
      const resultClubs = await Clubs.getClub(
        route?.params?.params?.id || route?.params?.id
      );
      setDataClub(resultClubs.data);
      setIsModerated(id == resultClubs.data.created_by_id);

      // Clubs.getMembersClub(route?.params?.params?.id || route?.params?.id).then(
      //   (result) => {
      //     setMembers(result.data.results);
      //     const member = result?.data?.results.find((member: any) => {
      //       return member.user == id && member.profile === 'leitor';
      //     });
      //     if (member?.user) {
      //       setParticipant(true);
      //     } else {
      //       setParticipant(false);
      //     }
      //   }
      // );

      const resultDataMember = await Clubs.getDataMember(
        route?.params?.params?.id || route?.params?.id,
        id || ""
      );
      if (!!resultDataMember?.data?.results[0]) {
        setParticipant(true);
      } else {
        setParticipant(false);
      }

      const resultHasNotices = await Clubs.getNoticesBookclubs(
        route?.params?.params?.id || route?.params?.id
      );
      setHasNotice(!!resultHasNotices?.data?.results?.length);
    }
    setLoading(false);
  };

  useEffect(() => {}, [route.params.isModerated]);

  const clickOnAdd = () => {
    navigation.navigate("CreateReading", {
      params: { idClub: route?.params?.id || route?.params?.params?.id || "" },
    });
  };

  const joinClub = async () => {
    setLoading(true);
    try {
      const result = await Clubs.enterClub(
        route?.params?.params?.id || route?.params?.id
      );
      // if (result?.data) {
      // }
      getClub();
    } catch {
      getClub();
    }
    setLoading(false);
  };

  const sendRemoveClub = async () => {
    //integrar o deixar clube
    try {
      const result = await Clubs.leaveClub(route?.params?.id);

      if (
        result.request.status === 200 ||
        result.request.status === 201 ||
        result.request.status === 204 ||
        result.request.status === 0
      ) {
        createToasty(
          true,
          "Você saiu do clube.",
          "O que acha de procurar novos clubes ou criar o seu? ",
          false
        );
      } else {
        createToasty(
          true,
          "Ops! Algo deu errado.",
          "Não foi possível deixar clube, por favor, tente novamente.",
          true
        );
      }
    } catch (error) {
      createToasty(
        true,
        "Ops! Algo deu errado.",
        "Não foi possível deixar clube, por favor, tente novamente.",
        true
      );
    } finally {
      getClub();

      setModalOpen(false);
    }
  };
  const onShare = async () => {
    let initialURL = await Linking.createURL("DataClub", {
      queryParams: { path: "DataClub", id: dataClub?.id },
    });
    try {
      const result = await Share.share({
        message: "http://synopsis-ia.com/app?" + initialURL,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {}
  };

  const deleteClub = async () => {
    setModalOpenDeleteClube(false);
    setLoading(true);
    const response = await Clubs.deleteClub(
      route.params.id || route.params.params.id
    );

    if (response.request.status === 204) {
      createToasty(
        true,
        "Clube excluído com sucesso.",
        "O que acha de procurar novos clubes ou criar outro?",
        false
      );
      navigation.navigate("Clubs");
    } else {
      createToasty(
        true,
        "Ops! Algo deu errado.",
        "Não foi possível excluir o clube, por favor, tente novamente.",
        true
      );
    }
  };

  const handleBack = () => {
    if (route.params.previousScreen?.screen) {
      navigation.navigate(route.params.previousScreen.page, {
        screen: route.params.previousScreen.screen,
      });
    } else if (route.params.previousScreen?.page) {
      navigation.navigate(route.params.previousScreen.page);
    } else {
      navigation.navigate("Clubs");
    }
  };

  const getMembers = async (idClub: string, show?: boolean) => {
    setButtonLoading(true);
    const result = await Clubs.getMembersClub(idClub || "", hasNext);
    const tratedMembers = members || [];
    if (result?.data) {
      setCountMembers(result.data.count);
      if (hasNext !== "0") {
        tratedMembers.push(...result?.data?.results);
        setMembers(tratedMembers);
      } else {
        setMembers(result?.data?.results);
      }

      if (result?.data?.next) {
        const urlObj = parse(result?.data?.next);

        const page = urlObj?.queryParams?.page;
        setHasNext(typeof page === "string" ? page : "0");
      } else {
        setHasNext("0");
      }
    }
    setButtonLoading(false);
    if (show) {
      modalizeRef?.current.open();
    }
  };

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

  // const removeMember = async (id: string) => {
  //   const result = await Clubs.removeMember({
  //     idClub: dataReading?.bookclub || "",
  //     idMember: id,
  //   });
  //   if (result?.status === 204) {
  //     getMembers(dataReading || ({} as Readings));
  //     createToasty(
  //       true,
  //       "Participante removido.",
  //       "A lista de participantes do clube foi atualizada.",
  //       false
  //     );
  //   } else if (result.request.status === 418) {
  //     createToasty(
  //       true,
  //       "Participante moderador.",
  //       "Não é possível remover um moderador.",
  //       true
  //     );
  //   } else {
  //     createToasty(
  //       true,
  //       "Ops! Algo deu errado",
  //       "Não foi possível remover participante, por favor, tente novamente.",
  //       true
  //     );
  //   }
  //   setModalOpen(false);
  // };

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
        {/* {user === "moderador" && item.profile !== "moderador" && (
          <TouchableOpacity
            onPress={() => {
              modalizeRef?.current?.close();
              setIdUserRemoved(item?.user);
              setModalOpen(true);
            }}
          >
            <ButtonPrimary title={"remover"} width={126} padding={"0px 16px"} />
          </TouchableOpacity>
        )} */}
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

  return (
    <Container
      style={{
        alignItems: "center",
        paddingTop: Platform.OS === "ios" ? 0 : 48,
      }}
    >
      <>
        {loading && <PageLoading />}

        <ButtonBack navigation={() => handleBack()} />

        <ButtonShare
          position="absolute"
          onPress={onShare}
          right={isModerated ? 49 : undefined}
        />
        {isModerated && (
          <ButtonHamburguer openMenu={() => menu?.current?.open()} />
        )}
        <View style={{ alignItems: "center" }}>
          <Image
            style={{ width: 96, height: 96, borderRadius: 50 }}
            source={
              dataClub?.cover_url && !onErrorImage
                ? { uri: dataClub?.cover_url || "" }
                : require("../../../../assets/images/image_profile.png")
            }
            onError={() => setOnErrorImage(true)}
          />
          <NameClub allowFontScaling={false}>{dataClub?.name}</NameClub>
        </View>

        <DescriptionClub allowFontScaling={false}>
          {dataClub?.description}
        </DescriptionClub>

        <DetailsDataClub
          participants={dataClub?.member_count || 0}
          concludeds={dataClub?.reading_finished || 0}
          inProgress={dataClub?.reading_ongoing || 0}
          onPressParticipants={() => {
            isModerated || participant ? resetAndGetMembersAndShow() : null;
          }}
        />
        {(isModerated || participant) && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              paddingLeft: 16,
              paddingRight: 16,
              width: "100%",
              marginBottom: 24,
            }}
          >
            <ButtonTertiary
              width="100%"
              image={require("../../../../assets/images/notifications.png")}
              name="Avisos"
              onPress={() =>
                navigation.navigate("NoticeClubs", {
                  idClub: dataClub?.id || "",
                  isModerated,
                })
              }
              style={{
                flexDirection: `row`,
                justifyContent: "flex-start",
                padding: 16,
                height: 56,
                alignItems: "center",
              }}
              styleText={{ marginTop: 0, marginLeft: 8 }}
              hasToasty={hasNotice}
            />
            {/* <ButtonTertiary
              image={require("../../../../assets/images/question_answer.png")}
              hasToasty={true}
              name="Chat do clube"
              onPress={() => console.log("Chat do clube")}
            /> */}
          </View>
        )}

        <ScrollView style={{ width: "100%", marginBottom: 60 }} bounces={false}>
          {dataClub?.reading?.map((item, index) => (
            <React.Fragment key={index}>
              {!item?.ending_date && (
                <View
                  style={{
                    paddingLeft: 16,
                    paddingRight: 16,
                    marginBottom: 16,
                    position: "relative",
                    width: "100%",
                  }}
                  key={index}
                >
                  <CardBookInProgress
                    cover={item?.book_edition?.cover || ""}
                    id={item?.id}
                    nameBook={item?.book_edition?.title}
                    authorBook={item?.book_edition?.author}
                    isParticipant={participant}
                    onPress={() => {
                      participant || isModerated
                        ? navigation.navigate("ReadingInProgress", {
                            id: item?.id,
                            moderator: isModerated,
                            member: participant,
                          })
                        : undefined;
                    }}
                  />
                </View>
              )}
            </React.Fragment>
          ))}
        </ScrollView>

        {!!isModerated && (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingLeft: 16,
              paddingRight: 16,
              position: "absolute",
              bottom: 0,
            }}
          >
            <TextToAdd allowFontScaling={false}>
              clique em adicionar (+) para iniciar leitura
            </TextToAdd>
            <ButtonAdd onPress={clickOnAdd} />
          </View>
        )}
        {!isModerated && !participant && (
          <View style={{ position: "absolute", bottom: 24 }}>
            <ButtonPrimary
              width={"full"}
              title={"juntar-se"}
              navigation={() => {
                joinClub();
              }}
            />
          </View>
        )}
        {participant === true && !isModerated && (
          <View style={{ position: "absolute", bottom: 24 }}>
            <ButtonSecondary
              width={"full"}
              title={"deixar clube"}
              navigation={() => {
                setModalOpen(true);
              }}
            />
          </View>
        )}
        {modalOpen && (
          <Modal
            text={
              "Essa ação não poderá ser desfeita e você não terá mais acesso ao clube."
            }
            title={"Você quer deixar o clube?"}
          >
            <ContainerButtonsModal>
              <TouchableOpacity onPress={() => setModalOpen(false)}>
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
                title={"sim, quero deixar"}
                width={"half"}
                padding="0px"
                navigation={sendRemoveClub}
              />
            </ContainerButtonsModal>
          </Modal>
        )}
        {modalOpenDeleteClube && (
          <Modal
            text={
              "Essa ação não poderá ser desfeita e todo o histórico do clube será perdido."
            }
            title={"Você quer excluir clube?"}
          >
            <ContainerButtonsModal>
              <TouchableOpacity onPress={() => setModalOpenDeleteClube(false)}>
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
                title={"sim, quero excluir"}
                width={"half"}
                padding="0px"
                navigation={deleteClub}
              />
            </ContainerButtonsModal>
          </Modal>
        )}
        <Modalize
          ref={menu}
          handlePosition="inside"
          modalHeight={180}
          modalStyle={{ backgroundColor: Colors.backgroundDark }}
          handleStyle={{ backgroundColor: Colors.whiteSecondary }}
        >
          {!isModerated ? (
            <ContainerMenu>
              <ContainerItemMenu>
                <Image
                  style={{ marginRight: 14, marginBottom: 16 }}
                  source={require("../../../../assets/images/History.png")}
                />
                <TextItemMenu allowFontScaling={false}>
                  Histórico de leitura
                </TextItemMenu>
              </ContainerItemMenu>
              <ContainerItemMenu>
                <Image
                  style={{ marginRight: 14, marginBottom: 16 }}
                  source={require("../../../../assets/images/Book.png")}
                />
                <TextItemMenu allowFontScaling={false}>
                  Sugerir livro
                </TextItemMenu>
              </ContainerItemMenu>
              <ContainerItemMenu>
                <Image
                  style={{ marginRight: 14, marginBottom: 16 }}
                  source={require("../../../../assets/images/Insert-comment.png")}
                />
                <TextItemMenu allowFontScaling={false}>
                  Falar com moderador
                </TextItemMenu>
              </ContainerItemMenu>
            </ContainerMenu>
          ) : (
            <ContainerMenu>
              <ContainerItemMenu
                onPress={() => {
                  menu.current.close();
                  navigation.navigate("CreateClubs", {
                    params: { name: "", edit: true, dataClub: dataClub },
                  });
                }}
              >
                <Image
                  style={{ marginRight: 14, marginBottom: 16 }}
                  source={require("../../../../assets/images/Edit.png")}
                />
                <TextItemMenu allowFontScaling={false}>
                  Editar clube
                </TextItemMenu>
              </ContainerItemMenu>
              {/* <ContainerItemMenu>
                <Image
                  style={{ marginRight: 14, marginBottom: 16 }}
                  source={require('../../../../assets/images/History.png')}
                />
                <TextItemMenu allowFontScaling={false}>
                  Histórico de leitura
                </TextItemMenu>
              </ContainerItemMenu> */}
              {/* <ContainerItemMenu>
                <Image
                  style={{ marginRight: 14, marginBottom: 16 }}
                  source={require('../../../../assets/images/Book.png')}
                />
                <TextItemMenu allowFontScaling={false}>Sugestões</TextItemMenu>
              </ContainerItemMenu>
              <ContainerItemMenu>
                <Image
                  style={{ marginRight: 14, marginBottom: 16 }}
                  source={require('../../../../assets/images/Insert-comment.png')}
                />
                <TextItemMenu allowFontScaling={false}>Mensagens</TextItemMenu>
              </ContainerItemMenu> */}
              <ContainerItemMenu
                onPress={() => {
                  menu.current.close();
                  setModalOpenDeleteClube(true);
                }}
              >
                <Image
                  style={{ marginRight: 14, marginBottom: 16 }}
                  source={require("../../../../assets/images/delete-outline.png")}
                />
                <TextItemMenu
                  style={{ color: Colors.error }}
                  allowFontScaling={false}
                >
                  Excluir clube
                </TextItemMenu>
              </ContainerItemMenu>
            </ContainerMenu>
          )}
        </Modalize>
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
                  getMembers(route?.params?.params?.id || route?.params?.id)
                }
                loading={buttonLoading}
              />
            ) : (
              ""
            )
          }
        />
      </>
    </Container>
  );
};

export default DataClub;
