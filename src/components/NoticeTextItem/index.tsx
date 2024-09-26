import React, { useContext, useEffect, useState } from "react";
import * as WebBrowser from "expo-web-browser";
import { View, Text, Image, TouchableOpacity, Dimensions } from "react-native";
import { Checkbox } from "react-native-paper";
import { Colors } from "../../styles/global";
import dayjs from "dayjs";
import { StackNavigationProp } from "@react-navigation/stack";
import { MyClubsStackParamList } from "../StackMyClubs";
import { useNavigation } from "@react-navigation/native";
import { Notice } from "../../models/notice.model";
import { Container, OptionItem } from "../GoalItem/styles";
import Clubs from "../../services/clubs.service";
import { AuthContext } from "../../utils/Auth";

type Club = StackNavigationProp<MyClubsStackParamList, any>;

interface Props {
  data: Notice;
  type: "bookclub" | "reading";
  moderated?: "naoParticipante" | "participante" | "moderador" | boolean;
  removeNotice?: (e: string) => void;
  fixNotice?: (
    e: {
      bookclub: string;
      content: string;
      created_by_id: number;
      created_by: string;
      creation_date: string;
      id: string;
      pin: boolean;
      title: string;
      update_date: string;
    } & Notice
  ) => void;
}
const NoticeTextItem: React.FC<Props> = ({
  data,
  type,
  moderated,
  removeNotice,
  fixNotice,
}) => {
  const [checked, setChecked] = React.useState(false);
  const [options, setOptions] = React.useState(false);
  const [typeItem, setTypeItem] = useState<"edit" | "view">("view");
  const navigation = useNavigation<Club>();
  const [readMore, setReadMore] = useState<boolean>(false);
  const [noticeData, setNoticeData] = useState<Notice>();

  useEffect(() => {
    if (data.id && type === "bookclub") {
      getNewData();
    } else {
      getNewDataReading();
    }
  }, [data]);

  const getNewData = async () => {
    Clubs.getNoticeClubById(data.id).then((response) => {
      setNoticeData(response.data);
    });
  };

  const getNewDataReading = async () => {
    Clubs.getNoticeReadingById(data.id).then((response) => {
      setNoticeData(response.data);
    });
  };

  const optionClick = () => {
    setOptions(!options);
  };

  const tratmentText = (text: string) => {
    let regexURL = /(https?:\/\/[^\s]+)|(\b(www\.[^\s]+))/gi;

    const links = text.match(regexURL);
    if (!links) {
      return (
        <Text
          numberOfLines={readMore ? undefined : 3}
          ellipsizeMode="tail"
          style={{
            fontFamily: "Inter_400Regular",
            color: Colors.grey,
            fontSize: 14,
          }}
          allowFontScaling={false}
        >
          {text}
        </Text>
      );
    }

    const replaceBrokeLine = text.replace(/[\n]+/g, " </br> ");

    let parts = replaceBrokeLine.split(/[\s]+/);
    parts = parts.map((item) => item + " ");
    return (
      <Text
        numberOfLines={readMore ? undefined : 3}
        ellipsizeMode="tail"
        style={{
          fontFamily: "Inter_400Regular",
          color: Colors.grey,
          fontSize: 14,
        }}
        allowFontScaling={false}
      >
        {parts?.map((item, index) => {
          if (links.includes(item.trim())) {
            return (
              <Text
                key={index}
                style={{
                  fontFamily: "Inter_400Regular",
                  color: Colors.hyperlink,
                  fontSize: 14,
                }}
                allowFontScaling={false}
                onPress={() =>
                  WebBrowser.openBrowserAsync(
                    item.includes("http")
                      ? item.trim()
                      : "http://" + item.trim()
                  )
                }
              >
                {item}
              </Text>
            );
          }
          return item.replace(/<\/br>\s/g, "\n\n");
        })}
      </Text>
    );
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
                {!!noticeData?.pin && (
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
                  {dayjs(noticeData?.creation_date).format("DD/MM/YYYY")}
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
              {noticeData?.title}
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

        {tratmentText(noticeData?.content || "")}
        {noticeData &&
          !!noticeData?.content &&
          (noticeData?.content?.length > 135 ||
            noticeData?.content?.split(/[\n]+/g)?.length > 2) && (
            <View style={{ width: "100%", alignItems: "flex-end" }}>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  flexDirection: "row",
                }}
                onPress={() => setReadMore(!readMore)}
              >
                <Text
                  style={{ color: Colors.grey, fontSize: 14, lineHeight: 20 }}
                  allowFontScaling={false}
                >
                  {!readMore ? "Ler mais" : "Ler menos"}{" "}
                </Text>
                <Image
                  source={require("../../../assets/images/arrow_up.png")}
                  resizeMode="contain"
                  style={{
                    marginTop: 1,
                    transform: [
                      readMore ? { rotate: "0deg" } : { rotate: "180deg" },
                    ],
                  }}
                />
              </TouchableOpacity>
            </View>
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
            height: 120,
            backgroundColor: Colors.whiteSecondary,
            padding: 8,
            paddingHorizontal: 12,
          }}
        >
          <OptionItem
            onPress={() => {
              fixNotice && fixNotice(noticeData || ({} as any));
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
              {!noticeData?.pin ? "fixar" : "desafixar"}
            </Text>
          </OptionItem>
          <OptionItem
            onPress={() => {
              navigation.navigate("CreateNotice", {
                id: "",
                edit: true,
                idNotice: noticeData?.id,
                type: type,
              });
              setOptions(false);
            }}
          >
            <Image source={require("../../../assets/images/Edit.png")} />
            <Text
              style={{ color: Colors.grey, fontSize: 16, marginLeft: 4 }}
              allowFontScaling={false}
            >
              editar
            </Text>
          </OptionItem>
          <OptionItem
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={() => {
              removeNotice && removeNotice(noticeData?.id || "");
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
export default NoticeTextItem;
