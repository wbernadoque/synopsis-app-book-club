import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Checkbox, RadioButton } from "react-native-paper";
import { Colors } from "../../styles/global";
import dayjs from "dayjs";
import { StackNavigationProp } from "@react-navigation/stack";
import { MyClubsStackParamList } from "../StackMyClubs";
import { useNavigation } from "@react-navigation/native";
import { Notice } from "../../models/notice.model";
import { Container, OptionItem } from "../GoalItem/styles";
import Clubs from "../../services/clubs.service";
import { AuthContext } from "../../utils/Auth";
import { Choices } from "../../models/choices.model";
import ButtonPrimary from "../Button";
import { ToastyContext } from "../../utils/ToastyGlobal";
import ProgressBar from "../ProgressBar";

type Club = StackNavigationProp<MyClubsStackParamList, any>;

interface Props {
  data: Notice;
  type: "bookclub" | "reading";
  moderated?: "naoParticipante" | "participante" | "moderador" | boolean;
  removeSurvey?: (e: string) => void;
  fixSurvey?: (e: Notice) => void;
}
const SurveyItem: React.FC<Props> = ({
  data,
  type,
  moderated,
  removeSurvey,
  fixSurvey,
}) => {
  const { createToasty } = useContext(ToastyContext);
  const [checked, setChecked] = React.useState(false);
  const [options, setOptions] = React.useState(false);
  const [typeItem, setTypeItem] = useState<"edit" | "view">("view");
  const navigation = useNavigation<Club>();
  const [readMore, setReadMore] = useState<boolean>(false);
  const [noticeData, setNoticeData] = useState<Notice>();
  const [voteList, setVoteList] = useState<
    | ((Choices & { checked: boolean; wrong?: boolean }) | undefined)[]
    | undefined
  >([]);
  const [showData, setShowData] = useState<boolean>(false);
  const [qttVotes, setQttVotes] = useState<number>(0);

  useEffect(() => {
    if (data.id && type === "bookclub") {
      // getNewData();
    } else {
      // getNewDataReading();
    }
    const list = data?.choices ? [...data?.choices] : [];
    let qttVotes = 0;
    const newList: (Choices & { checked: boolean })[] = list.map((item) => {
      qttVotes += item.votes;
      return {
        checked: data.has_voted ? item.personal_vote : false,
        id: item.id,
        is_correct: item.is_correct,
        question_id: item.question_id,
        text: item.text,
        votes: item.votes,
        personal_vote: item.personal_vote,
        wrong: item.personal_vote === true ? !item.is_correct : undefined,
      };
    });
    setQttVotes(qttVotes);
    setVoteList(newList);
    if (dayjs(data?.ending_date).diff(dayjs(), "day") < 0) {
      setShowData(true);
    } else {
      setShowData(
        moderated === true || moderated === "moderador"
          ? true
          : data?.has_voted || false
      );
    }
  }, [data]);

  // const getNewData = async () => {
  //   Clubs.getNoticeClubById(data.id).then((response) => {
  //     setNoticeData(response.data);
  //   });
  // };

  const getNewDataReading = async () => {
    Clubs.getNoticeReadingById(data.id).then((response) => {
      setNoticeData(response.data);
    });
  };

  const optionClick = () => {
    setOptions(!options);
  };

  const voteSubmit = async () => {
    const checked = voteList?.find((item) => item?.checked);
    const res = await Clubs.voteSurvey(checked?.id || "");
    if (
      res.data === "Cannot vote in more than one option." ||
      res.data === "Cannot vote twice." ||
      res.data === "Right" ||
      res.data === "Thanks for the vote." ||
      res.data === "Wrong"
    ) {
      if (
        data?.type === "QUIZ" &&
        (res.data === "Right" || res.data === "Wrong")
      ) {
        const voteSomeList:
          | ((Choices & { checked: boolean }) | undefined)[]
          | undefined = voteList?.map((item) => {
          if (item?.id === checked?.id && item?.votes !== undefined) {
            item.votes = item?.votes + 1;
            setQttVotes(qttVotes + 1);
            if (item?.is_correct === true || item?.is_correct === false)
              item.wrong = item?.is_correct === true ? false : true;
            return item;
          } else {
            return item;
          }
        });
        setVoteList(voteSomeList);
      } else if (
        data?.type === "QUIZ" &&
        res.data !== "Right" &&
        res.data !== "Wrong"
      ) {
        const voteSomeList:
          | ((Choices & { checked: boolean }) | undefined)[]
          | undefined = voteList?.map((item) => {
          if (item?.id === checked?.id) {
            if (item?.is_correct === true || item?.is_correct === false)
              item.wrong = item?.is_correct === true ? false : true;
            return item;
          } else {
            return item;
          }
        });
        setVoteList(voteSomeList);
      } else if (data?.type === "POLL" && res.data === "Thanks for the vote.") {
        const voteSomeList:
          | ((Choices & { checked: boolean }) | undefined)[]
          | undefined = voteList?.map((item) => {
          if (item?.id === checked?.id && item?.votes !== undefined) {
            item.votes = item?.votes + 1;
            setQttVotes(qttVotes + 1);
            return item;
          } else {
            return item;
          }
        });
        setVoteList(voteSomeList);
      }

      setShowData(true);
    }

    if (res.status !== 200 && res.status !== 201) {
      createToasty(
        true,
        "Ops! Algo deu errado.",
        "Não foi possível votar, por favor, tente novamente.",
        true
      );
      setShowData(false);
    }
  };

  const getPercent = (value: number): number => {
    return parseFloat(((value * 100) / qttVotes || 0).toFixed(0));
  };

  const isMostVoted = (id: string): boolean => {
    let biggestObj:
      | (Choices & {
          checked: boolean;
          wrong?: boolean | undefined;
        })
      | undefined;
    if (!!voteList) {
      for (let i = 0; i < voteList?.length; i++) {
        if ((voteList[i]?.votes || 0) > (biggestObj?.votes || 0)) {
          biggestObj = voteList[i];
        }
      }
    }

    return biggestObj?.id === id;
  };

  return (
    <>
      <Container
        onPress={() => setOptions(false)}
        activeOpacity={1}
        style={{ height: "auto", padding: 16 }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <View>
            <View style={{ flexDirection: "row" }}>
              <>
                {!!data?.pin && (
                  <Text
                    style={{
                      fontFamily: "Inter_400Regular",
                      color: Colors.grey,
                      fontSize: 12,
                    }}
                    allowFontScaling={false}
                  >
                    mensagem fixada -{" "}
                  </Text>
                )}
                <Text
                  style={{
                    fontFamily: "Inter_400Regular",
                    color: Colors.grey,
                    fontSize: 12,
                  }}
                  allowFontScaling={false}
                >
                  {dayjs(data?.creation_date).format("DD/MM/YYYY")}
                </Text>
              </>
            </View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Inter_500Medium",
                color: Colors.whiteText,
                lineHeight: 22,
                marginBottom: 16,
                marginTop: data.pin ? 8 : 0,
              }}
              allowFontScaling={false}
            >
              {data?.title}
            </Text>
          </View>

          {(moderated === "moderador" || moderated === true) && (
            <TouchableOpacity
              style={{
                width: 15,
                height: 15,
                marginRight: 12,
                justifyContent: "center",
              }}
              onPress={() => optionClick()}
            >
              <Image
                resizeMode="contain"
                source={require("../../../assets/images/options-point.png")}
              />
            </TouchableOpacity>
          )}
        </View>

        {data?.type === "POLL" ? (
          <>
            {voteList?.map((item, index) => (
              <React.Fragment key={item?.id}>
                {!showData ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                    onPress={() => {
                      let clone = [...voteList];
                      clone = clone.map((item, indexI) => {
                        if (item?.checked !== undefined) {
                          item.checked = index === indexI ? true : false;
                          return item;
                        }
                        return item;
                      });
                      setVoteList(clone);
                    }}
                  >
                    <RadioButton.Android
                      status={item?.checked ? "checked" : "unchecked"}
                      value={"quiz"}
                      color={Colors.primary}
                      uncheckedColor={Colors.grey}
                      onPress={() => {
                        let clone = [...voteList];
                        clone = clone.map((item, indexI) => {
                          if (item?.checked !== undefined) {
                            item.checked = index === indexI ? true : false;
                            return item;
                          }
                          return item;
                        });
                        setVoteList(clone);
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        color: item?.checked ? Colors.whiteText : Colors.grey,
                        fontSize: 14,
                      }}
                      allowFontScaling={false}
                    >
                      {item?.text}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        color: item?.checked ? Colors.whiteText : Colors.grey,
                        fontSize: 14,
                        marginTop: 16,
                      }}
                      allowFontScaling={false}
                    >
                      {item?.text}
                    </Text>

                    <ProgressBar
                      progress={getPercent(item?.votes || 0)}
                      bgColor={Colors.whiteSecondary}
                      progressColor={
                        isMostVoted(item?.id || "")
                          ? Colors.primary
                          : Colors.grey
                      }
                    />
                  </>
                )}
              </React.Fragment>
            ))}
            {!showData && (
              <ButtonPrimary
                title="votar"
                width={Dimensions.get("screen").width - 64}
                padding="0px"
                margin="24px 0 0 0"
                disabled={voteList?.findIndex((item) => item?.checked) === -1}
                onPressAction={() => voteSubmit()}
              />
            )}
          </>
        ) : (
          <View style={{ flex: 1 }}>
            {voteList?.map((item, index) => (
              <React.Fragment key={item?.id}>
                {!showData ? (
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                    }}
                    onPress={() => {
                      let clone = [...voteList];
                      clone = clone.map((item, indexI) => {
                        if (item?.checked !== undefined) {
                          item.checked = index === indexI ? true : false;
                          return item;
                        }
                        return item;
                      });
                      setVoteList(clone);
                    }}
                  >
                    <RadioButton.Android
                      status={item?.checked ? "checked" : "unchecked"}
                      value={"quiz"}
                      color={Colors.primary}
                      uncheckedColor={Colors.grey}
                      onPress={() => {
                        let clone = [...voteList];
                        clone = clone.map((item, indexI) => {
                          if (item?.checked !== undefined) {
                            item.checked = index === indexI ? true : false;
                            return item;
                          }
                          return item;
                        });
                        setVoteList(clone);
                      }}
                    />
                    <Text
                      style={{
                        fontFamily: "Inter_400Regular",
                        color: item?.checked ? Colors.whiteText : Colors.grey,
                        fontSize: 14,
                      }}
                      allowFontScaling={false}
                    >
                      {item?.text}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 16,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "Inter_400Regular",
                          color: Colors.grey,
                          fontSize: 14,
                        }}
                        allowFontScaling={false}
                      >
                        {item?.text}
                      </Text>
                      {item?.wrong !== undefined && (
                        <Image
                          source={
                            item?.wrong
                              ? require("../../../assets/images/wrong.png")
                              : require("../../../assets/images/check.png")
                          }
                        />
                      )}
                    </View>

                    <ProgressBar
                      progress={getPercent(item?.votes || 0)}
                      bgColor={Colors.whiteSecondary}
                      progressColor={
                        item?.is_correct ? Colors.green : Colors.textError
                      }
                    />
                  </>
                )}
              </React.Fragment>
            ))}
            {!showData && (
              <ButtonPrimary
                title="votar"
                width={Dimensions.get("screen").width - 64}
                padding="0px"
                margin="24px 0 0 0"
                disabled={voteList?.findIndex((item) => item?.checked) === -1}
                onPressAction={() => voteSubmit()}
              />
            )}
          </View>
        )}
        {dayjs(data?.ending_date).diff(dayjs(), "day") <= 30 &&
          dayjs(data?.ending_date).diff(dayjs(), "day") >= 0 && (
            <Text
              style={{
                fontFamily: "Inter_400Regular",
                color: Colors.grey,
                fontSize: 12,
                marginTop: 16,
              }}
              allowFontScaling={false}
            >
              {dayjs(data?.ending_date).diff(dayjs(), "day") > 0 ? (
                <>
                  encerra em {dayjs(data?.ending_date).diff(dayjs(), "day")} dia
                  {dayjs(data?.ending_date).diff(dayjs(), "day") > 1 && "s"}
                </>
              ) : (
                <>encerra hoje</>
              )}
            </Text>
          )}
      </Container>
      {options && (
        <View
          style={{
            position: "absolute",
            zIndex: 9999,
            top: -4,
            right: 42,
            width: 135,
            height: 85,
            backgroundColor: Colors.whiteSecondary,
            padding: 8,
            paddingHorizontal: 12,
          }}
        >
          <OptionItem
            onPress={() => {
              fixSurvey && fixSurvey(data);
              setOptions(false);
            }}
          >
            <Image source={require("../../../assets/images/pin.png")} />
            <Text
              style={{
                color: Colors.grey,
                fontSize: 16,
                marginLeft: 12,
              }}
              allowFontScaling={false}
            >
              {!data?.pin ? "fixar" : "desafixar"}
            </Text>
          </OptionItem>

          <OptionItem
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              removeSurvey && removeSurvey(data?.id || "");

              setOptions(false);
            }}
          >
            <Image source={require("../../../assets/images/excluir.png")} />
            <Text
              style={{ color: Colors.grey, fontSize: 16, marginLeft: 4 }}
              allowFontScaling={false}
            >
              excluir
            </Text>
          </OptionItem>
        </View>
      )}
    </>
  );
};
export default SurveyItem;
