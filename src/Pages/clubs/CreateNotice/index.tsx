import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonBack from "../../../components/ButtonBack";
import { MyClubsStackParamList } from "../../../components/StackMyClubs";
import { Title } from "../../signup/styles";
import { Colors } from "../../../styles/global";
import ButtonPrimary from "../../../components/Button";
import ButtonSecondary from "../../../components/ButtonSecondary";
import Clubs from "../../../services/clubs.service";
import { ToastyContext } from "../../../utils/ToastyGlobal";
import InputText from "../../../components/Inputs/InputText";
import ButtonSelectorType from "../../../components/ButtonSelectorType";
import { RadioButton } from "react-native-paper";
import { Label, LabelRadioButton } from "../reading-configuration/styles";
import ComponentCalendar from "../../../components/ComponentCalendar";
import { MotiView } from "moti";
import { AuthContext } from "../../../utils/Auth";

interface Props {
  route: any;
}

type ClubsRoute = StackNavigationProp<MyClubsStackParamList>;

const CreateNotice: React.FC<Props> = ({ route }) => {
  const { createToasty } = useContext(ToastyContext);
  const { getId } = useContext(AuthContext);
  const navigation = useNavigation<ClubsRoute>();

  const [title, setTitle] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [typeNoticeSelected, setTypeNoticeSelected] = useState<
    "text" | "survey"
  >("text");
  const [typeSurvey, setTypeSurvey] = useState<"vote" | "quiz">("vote");
  const [date, setDate] = useState<string>("");
  const [titleVote, setTitleVote] = useState<string>();
  const [titleQuiz, setTitleQuiz] = useState<string>();
  const [temp, setTemp] = useState<
    { index: number; description: string } | undefined
  >();
  const [focus, setFocus] = useState<number | undefined>();
  const [noticeData, setNoticeData] = useState<{
    bookclub: string;
    content: string;
    created_by_id: number;
    created_by: string;
    creation_date: string;
    id: string;
    pin: boolean;
    title: string;
    update_date: string;
  }>();
  const [voteList, setVoteList] = useState<
    { value: "check" | "uncheck"; description: string; placeholder: string }[]
  >([
    { value: "uncheck", description: "", placeholder: "opção 1" },
    { value: "uncheck", description: "", placeholder: "opção 2" },
  ]);
  const [quizList, setQuizList] = useState<
    { value: "check" | "uncheck"; description: string; placeholder: string }[]
  >([
    { value: "check", description: "", placeholder: "opção 1" },
    { value: "uncheck", description: "", placeholder: "opção 2" },
  ]);

  useFocusEffect(
    React.useCallback(() => {
      if (route?.params?.edit) {
        if (route.params.type === "bookclub") {
          getNewData();
        } else {
          getNewDataReading();
        }
      }
    }, [route.params?.edit])
  );

  const getNewData = async () => {
    Clubs.getNoticeClubById(route.params.idNotice).then((response) => {
      setNoticeData(response.data);
      setTitle(response.data.title);
      setMessage(response.data.content);
    });
  };

  const getNewDataReading = async () => {
    Clubs.getNoticeReadingById(route.params.idNotice).then((response) => {
      setNoticeData(response.data);
      setTitle(response.data.title);
      setMessage(response.data.content);
    });
  };

  const submitConfig = async () => {
    if (route.params.type === "reading") {
      const result = await Clubs.createNotice(
        { title: title || "", content: message || "", pin: false },
        route.params.id
      );

      if (result?.status === 200) {
        createToasty(
          true,
          "Pronto! Aviso adicionado.",
          "Nada melhor do que manter seu clube informado.",
          false
        );
        navigation.goBack();
      } else {
        createToasty(
          true,
          "Ops! Algo deu errado.",
          "Não foi possível adicionar um aviso, por favor, tente novamente.",
          true
        );
      }
    } else {
      const result = await Clubs.createNoticeBookclub(
        { title: title || "", content: message || "", pin: false },
        route.params.id
      );

      if (result?.status === 200) {
        // createToasty()
        navigation.goBack();
      } else {
      }
    }
  };

  const editConfig = async () => {
    if (route.params.type === "reading") {
      const response = await Clubs.editNoticeReading(
        {
          content: message || "",
          created_by: noticeData?.created_by || "",
          pin: noticeData?.pin || false,
          title: title || "",
        },
        noticeData?.id || ""
      );

      if (response?.status === 200) {
        createToasty(
          true,
          "Alterações salvas!",
          "Seu aviso já foi atualizado.",
          false
        );
        navigation.goBack();
      } else {
        createToasty(
          true,
          "Ops! Algo deu errado.",
          "Não foi possível editar aviso, por favor, tente novamente.",
          true
        );
      }
    } else {
      const response = await Clubs.editNoticeClub(
        {
          bookclub: noticeData?.bookclub || "",
          content: message || "",
          created_by: noticeData?.created_by || "",
          pin: !noticeData?.pin,
          title: title || "",
        },
        noticeData?.id || ""
      );
      if (response?.status === 200) {
        createToasty(
          true,
          "Alterações salvas!",
          "Seu aviso já foi atualizado.",
          false
        );
        // createToasty()
        navigation.goBack();
      } else {
        createToasty(
          true,
          "Ops! Algo deu errado.",
          "Não foi possível editar aviso, por favor, tente novamente.",
          true
        );
      }
    }
  };

  const addOptions = (item: "quiz" | "vote") => {
    if (item === "vote") {
      setVoteList([
        ...voteList,
        {
          value: "uncheck",
          description: "",
          placeholder: `opção ${voteList.length + 1}`,
        },
      ]);
    } else {
      setQuizList([
        ...quizList,
        {
          value: "uncheck",
          description: "",
          placeholder: `opção ${quizList.length + 1}`,
        },
      ]);
    }
  };

  const removeItemOnOptions = (
    item: {
      value: "check" | "uncheck";
      description: string;
      placeholder: string;
    },
    type: "quiz" | "vote"
  ) => {
    const clone = type === "vote" ? [...voteList] : [...quizList];
    const index = clone.indexOf(item);
    clone.splice(index, 1);
    const reorganize = clone.map((item, index) => {
      if (
        item.placeholder.length === 7 &&
        item.placeholder.includes("opção ")
      ) {
        item.placeholder = `opção ${index + 1}`;
        return item;
      } else {
        return item;
      }
    });
    if (type === "vote") {
      setVoteList(reorganize);
    } else {
      setQuizList(reorganize);
    }
  };

  const changeText = (
    value: string,
    item: {
      value: "check" | "uncheck";
      description: string;
      placeholder: string;
    },
    type: "quiz" | "vote"
  ) => {
    const clone = type === "vote" ? [...voteList] : [...quizList];
    const listChanged = clone.map((itemOfMap) => {
      if (itemOfMap === item) {
        return {
          value: itemOfMap.value,
          description: value,
          placeholder: itemOfMap.placeholder,
        };
      } else {
        return itemOfMap;
      }
    });
    if (type === "vote") {
      setVoteList(listChanged);
    } else {
      setQuizList(listChanged);
    }
  };

  const removeSurvey = async (id: string) => {
    return await Clubs.removeQuestions(id);
  };

  const submitSurvey = async () => {
    if (typeSurvey === "vote") {
      const book = {
        ending_date: date,
        bookclub: route.params.id,
        reading: null,
        title: titleVote || "",
        type: "POLL",
        pin: false,
        created_by: (await getId()) || "",
      };
      const reading = {
        ending_date: date,
        reading: route.params.id,
        title: titleVote || "",
        type: "POLL",
        pin: false,
        created_by: (await getId()) || "",
      };

      const response =
        route?.params?.type === "reading"
          ? await Clubs.createSurveyReading(reading)
          : await Clubs.createSurveyReading(book);

      if (response?.data?.id) {
        let error = 0;
        for (let i = 0; i < voteList?.length; i++) {
          const res = await Clubs.createChoices({
            // is_correct: voteList[i].value === "check" ? true : false,
            question: response?.data?.id,
            text: voteList[i]?.description,
          });
          if (res.status !== 201 && res?.status !== 200) {
            error += i + 1;
          }
        }

        if (error === 0) {
          createToasty(
            true,
            "Pronto! Enquete adicionada",
            "Nada melhor do que manter seu clube informado.",
            false
          );
          navigation.goBack();
        } else {
          createToasty(
            true,
            "Ops! Algo deu errado.",
            "Não foi possível adicionar a enquete, por favor, tente novamente.",
            true
          );
          removeSurvey(response?.data?.id);
        }
      } else {
        createToasty(
          true,
          "Ops! Algo deu errado.",
          "Não foi possível adicionar a enquete, por favor, tente novamente.",
          true
        );
      }
    } else {
      const book = {
        bookclub: route.params.id,
        reading: null,
        title: titleQuiz || "",
        type: "QUIZ",
        pin: false,
        created_by: (await getId()) || "",
      };
      const reading = {
        reading: route.params.id,
        title: titleQuiz || "",
        type: "QUIZ",
        pin: false,
        created_by: (await getId()) || "",
      };

      const response =
        route?.params?.type === "reading"
          ? await Clubs.createSurveyReading(reading)
          : await Clubs.createSurveyReading(book);

      if (response?.data?.id) {
        let error = 0;
        for (let i = 0; i < quizList?.length; i++) {
          const res = await Clubs.createChoices({
            is_correct: quizList[i].value === "check" ? true : false,
            question: response?.data?.id,
            text: quizList[i].description,
          });
          if (res.status !== 201 && res?.status !== 200) {
            error += i + 1;
          }
        }

        if (error === 0) {
          createToasty(
            true,
            "Pronto! Enquete adicionada",
            "Nada melhor do que manter seu clube informado.",
            false
          );
          navigation.goBack();
        } else {
          createToasty(
            true,
            "Ops! Algo deu errado.",
            "Não foi possível adicionar a enquete, por favor, tente novamente.",
            true
          );
          removeSurvey(response?.data?.id);
        }
      } else {
        createToasty(
          true,
          "Ops! Algo deu errado.",
          "Não foi possível adicionar a enquete, por favor, tente novamente.",
          true
        );
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundDark }}>
      <ButtonBack navigation={() => navigation.goBack()} />
      <Title style={{ marginTop: 100, marginBottom: 28, marginLeft: 16 }}>
        {route.params.edit ? "Editar avisos" : "Criar avisos"}{" "}
      </Title>
      <ScrollView
        bounces={false}
        style={{ paddingHorizontal: 16 }}
        // nestedScrollEnabled={true}
        automaticallyAdjustKeyboardInsets
      >
        <View
          style={{
            flexDirection: "row",
            marginBottom: 24,
          }}
        >
          <ButtonSelectorType
            image={require("../../../../assets/images/post-add.png")}
            onPress={() => setTypeNoticeSelected("text")}
            selected={typeNoticeSelected === "text"}
            title="Texto"
            marginRight={16}
          />
          <ButtonSelectorType
            image={require("../../../../assets/images/vote.png")}
            onPress={() => setTypeNoticeSelected("survey")}
            selected={typeNoticeSelected === "survey"}
            title="Enquete"
          />
        </View>

        <View
          style={{
            // paddingHorizontal: 16,
            paddingVertical: 12,
            borderColor: Colors.backgroundDarkSecondary,
            borderWidth: 1,
            borderRadius: 24,
          }}
        >
          {typeNoticeSelected === "text" ? (
            <>
              <InputText
                error={false}
                label="Título"
                maxLength={30}
                nameError=""
                onChangeText={setTitle}
                value={title}
                placeholder="mensagem sem título"
                hasCounter={false}
                customWidth={Dimensions.get("screen").width - 64}
                customPaddingPlaceholder={32}
              />
              <InputText
                label="Mensagem"
                multiline
                error={false}
                maxLength={undefined}
                nameError=""
                onChangeText={setMessage}
                value={message}
                placeholder="o que você gostaria de dizer?"
                hasCounter={false}
                customWidth={Dimensions.get("screen").width - 64}
                customPaddingPlaceholder={32}
              />
            </>
          ) : (
            <>
              <Label
                allowFontScaling={false}
                style={{ marginLeft: 16, lineHeight: 32 }}
              >
                Tipo de enquete
              </Label>

              <View style={{ flexDirection: "row", marginLeft: 16 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 8,
                  }}
                  onPress={() => setTypeSurvey("vote")}
                >
                  <RadioButton.Android
                    status={typeSurvey === "vote" ? "checked" : "unchecked"}
                    value={"vote"}
                    color={Colors.primary}
                    uncheckedColor={Colors.grey}
                    onPress={() => setTypeSurvey("vote")}
                  />
                  <LabelRadioButton
                    color={
                      typeSurvey === "vote" ? Colors.whiteText : Colors.grey
                    }
                    allowFontScaling={false}
                  >
                    votação
                  </LabelRadioButton>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: 8,
                  }}
                  onPress={() => setTypeSurvey("quiz")}
                >
                  <RadioButton.Android
                    status={typeSurvey === "quiz" ? "checked" : "unchecked"}
                    value={"quiz"}
                    color={Colors.primary}
                    uncheckedColor={Colors.grey}
                    onPress={() => setTypeSurvey("quiz")}
                  />
                  <LabelRadioButton
                    color={
                      typeSurvey === "quiz" ? Colors.whiteText : Colors.grey
                    }
                    allowFontScaling={false}
                  >
                    quiz
                  </LabelRadioButton>
                </TouchableOpacity>
              </View>
              {typeSurvey === "vote" ? (
                <>
                  <Label
                    style={{ marginTop: 27, marginBottom: 8, marginLeft: 16 }}
                    allowFontScaling={false}
                  >
                    Duração
                  </Label>
                  <View style={{ paddingHorizontal: 16 }}>
                    <ComponentCalendar
                      dateDefault={date}
                      setDate={(e: string) => setDate(e)}
                    />
                  </View>
                  <InputText
                    error={false}
                    label="Título"
                    maxLength={50}
                    nameError=""
                    onChangeText={setTitleVote}
                    value={titleVote}
                    placeholder="enquete sem título"
                    hasCounter={false}
                    customWidth={Dimensions.get("screen").width - 64}
                    customPaddingPlaceholder={32}
                  />
                  <View style={{ alignItems: "center" }}>
                    {voteList.map((item, index) => (
                      <Fragment key={item.description + index}>
                        <View
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            alignItems: "center",
                            paddingHorizontal: 12,
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginRight: 8,
                              flex: 1,
                            }}
                          >
                            <RadioButton.Android
                              status={"unchecked"}
                              value={"quiz"}
                              color={Colors.primary}
                              uncheckedColor={Colors.grey}
                              onPress={() => {
                                if (!temp) {
                                  let clone = [...voteList];
                                  clone = clone.map((item, indexI) => {
                                    item.value =
                                      indexI === index ? "check" : "uncheck";
                                    return item;
                                  });

                                  setVoteList(clone);
                                }
                              }}
                            />
                            <TextInput
                              style={{
                                color: Colors.whiteText,

                                height: 20,
                                flex: 1,
                                fontSize: 14,
                              }}
                              value={
                                temp?.index === index
                                  ? temp.description
                                  : item.description
                              }
                              placeholderTextColor={
                                item.value === "check"
                                  ? Colors.whiteText
                                  : Colors.grey
                              }
                              allowFontScaling={false}
                              placeholder={item.placeholder}
                              onFocus={() => {
                                setTemp({ index: index, description: "" });
                                setFocus(index);
                              }}
                              onBlur={() => {
                                changeText(
                                  temp?.description || "",
                                  item,
                                  "vote"
                                );
                                setTemp(undefined);
                                setFocus(undefined);
                              }}
                              onChangeText={(e) =>
                                setTemp({ description: e, index: index })
                              }
                            />
                          </TouchableOpacity>
                          {voteList.length > 2 && (
                            <TouchableOpacity
                              onPress={() => {
                                temp === undefined
                                  ? removeItemOnOptions(item, "vote")
                                  : null;
                              }}
                            >
                              <Image
                                source={require("../../../../assets/images/Add.png")}
                                style={{
                                  transform: [{ rotate: "45deg" }],
                                  tintColor: Colors.grey,
                                }}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                        {focus === index && (
                          <MotiView
                            style={{
                              height: 1,
                              backgroundColor: Colors.whiteSecondary,
                            }}
                            from={{ width: 0 }}
                            animate={{
                              width: Dimensions.get("screen").width - 64,
                            }}
                            transition={{
                              loop: false,
                              type: "timing",
                              duration: 150,
                              delay: 100,
                            }}
                          />
                        )}
                      </Fragment>
                    ))}

                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        flexDirection: "row",
                        marginTop: 24,
                        opacity: voteList.length >= 5 ? 0.5 : 1,
                      }}
                      onPress={() => {
                        temp === undefined
                          ? voteList.length < 5
                            ? addOptions("vote")
                            : null
                          : null;
                      }}
                    >
                      <Image
                        source={require("../../../../assets/images/Add.png")}
                        style={{ tintColor: Colors.primary }}
                      />
                      <Text
                        style={{
                          color: Colors.primary,
                          fontSize: 16,
                        }}
                        allowFontScaling={false}
                      >
                        adicionar opção (até 5)
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <>
                  <InputText
                    error={false}
                    label="Título"
                    maxLength={50}
                    nameError=""
                    onChangeText={setTitleQuiz}
                    value={titleQuiz}
                    placeholder="enquete sem título"
                    hasCounter={false}
                    customWidth={Dimensions.get("screen").width - 64}
                    customPaddingPlaceholder={32}
                  />
                  <View style={{ alignItems: "center" }}>
                    {quizList.map((item, index) => (
                      <Fragment key={item.description + index}>
                        <View
                          style={{
                            flexDirection: "row",
                            flex: 1,
                            alignItems: "center",
                            paddingHorizontal: 12,
                          }}
                        >
                          <TouchableOpacity
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              marginRight: 8,
                              flex: 1,
                            }}
                          >
                            {item.value === "check" ? (
                              <RadioButton.IOS
                                status={"checked"}
                                value={"quiz"}
                                color={Colors.green}
                                onPress={() => {
                                  let clone = [...quizList];
                                  clone = clone.map((item, indexI) => {
                                    item.value =
                                      indexI === index ? "check" : "uncheck";
                                    return item;
                                  });

                                  setQuizList(clone);
                                }}
                              />
                            ) : (
                              <View
                                style={{
                                  width: 36,
                                  height: 36,
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <TouchableOpacity
                                  style={{
                                    width: 18,
                                    height: 18,
                                    borderRadius: 50,
                                    borderWidth: 2,
                                    borderColor: Colors.grey,
                                  }}
                                  onPress={() => {
                                    if (!temp) {
                                      let clone = [...quizList];
                                      clone = clone.map((item, indexI) => {
                                        item.value =
                                          indexI === index
                                            ? "check"
                                            : "uncheck";
                                        return item;
                                      });

                                      setQuizList(clone);
                                    }
                                  }}
                                />
                              </View>
                            )}

                            <TextInput
                              style={{
                                color:
                                  item.value === "check"
                                    ? Colors.green
                                    : Colors.whiteText,

                                height: 20,
                                flex: 1,
                                fontSize: 14,
                              }}
                              value={
                                temp?.index === index
                                  ? temp.description
                                  : item.description
                              }
                              placeholderTextColor={
                                item.value === "check"
                                  ? Colors.green
                                  : Colors.grey
                              }
                              allowFontScaling={false}
                              placeholder={item.placeholder}
                              onFocus={() => {
                                setTemp({ index: 1, description: "" });
                                setFocus(index);
                              }}
                              onBlur={() => {
                                changeText(
                                  temp?.description || "",
                                  item,
                                  "quiz"
                                );
                                setTemp(undefined);
                                setFocus(undefined);
                              }}
                              onChangeText={(e) =>
                                setTemp({ description: e, index: index })
                              }
                            />
                          </TouchableOpacity>
                          {quizList.length > 2 && (
                            <TouchableOpacity
                              onPress={() => {
                                temp === undefined
                                  ? removeItemOnOptions(item, "quiz")
                                  : null;
                              }}
                            >
                              <Image
                                source={require("../../../../assets/images/Add.png")}
                                style={{
                                  transform: [{ rotate: "45deg" }],
                                  tintColor: Colors.grey,
                                }}
                              />
                            </TouchableOpacity>
                          )}
                        </View>
                        {focus === index && (
                          <MotiView
                            style={{
                              height: 1,
                              backgroundColor: Colors.whiteSecondary,
                            }}
                            from={{ width: 0 }}
                            animate={{
                              width: Dimensions.get("screen").width - 64,
                            }}
                            transition={{
                              loop: false,
                              type: "timing",
                              duration: 150,
                              delay: 100,
                            }}
                          />
                        )}
                      </Fragment>
                    ))}
                  </View>
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      flexDirection: "row",
                      marginTop: 24,
                      opacity: quizList.length >= 5 ? 0.5 : 1,
                    }}
                    onPress={() => {
                      temp === undefined
                        ? quizList.length < 5
                          ? addOptions("quiz")
                          : null
                        : null;
                    }}
                  >
                    <Image
                      source={require("../../../../assets/images/Add.png")}
                      style={{ tintColor: Colors.primary }}
                    />
                    <Text
                      style={{
                        color: Colors.primary,
                        fontSize: 16,
                      }}
                      allowFontScaling={false}
                    >
                      adicionar opção (até 5)
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </View>
        <View
          style={{
            marginLeft: 16,
            marginRight: 16,
            marginTop: 32,
            marginBottom: 24,
          }}
        >
          <ButtonPrimary
            title={route.params?.edit ? "salvar alterações" : "criar aviso"}
            disabled={
              typeNoticeSelected === "text"
                ? !title || !message
                : typeSurvey === "vote"
                ? !date ||
                  !titleVote ||
                  voteList.findIndex((item) => item.description === "") >= 0
                : !titleQuiz ||
                  quizList.findIndex((item) => item.description === "") >= 0 ||
                  quizList.findIndex((item) => item.value === "check") === -1
            }
            onPressAction={() =>
              typeNoticeSelected === "survey"
                ? submitSurvey()
                : route.params?.edit
                ? editConfig()
                : submitConfig()
            }
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateNotice;
