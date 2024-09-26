import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, ScrollView, View } from "react-native";
import ButtonBack from "../../../components/ButtonBack";
import { MyClubsStackParamList } from "../../../components/StackMyClubs";
import { Title } from "../../signup/styles";
import { Colors } from "../../../styles/global";
import ButtonPrimary from "../../../components/Button";
import ButtonSecondary from "../../../components/ButtonSecondary";
import Clubs from "../../../services/clubs.service";
import { ToastyContext } from "../../../utils/ToastyGlobal";
import InputText from "../../../components/Inputs/InputText";
import NoticeTextItem from "../../../components/NoticeTextItem";
import { Notice } from "../../../models/notice.model";
import PageLoading from "../../../components/PageLoading";
import { TextCenter } from "../../search/styles";
import ButtonAdd from "../../../components/ButtonAdd";
import SurveyItem from "../../../components/SurveyItem";

interface Props {
  route: any;
}

type ClubsRoute = StackNavigationProp<MyClubsStackParamList>;

const NoticeClubs: React.FC<Props> = ({ route }) => {
  const { createToasty } = useContext(ToastyContext);
  const navigation = useNavigation<ClubsRoute>();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [title, setTitle] = useState<string>();
  const [message, setMessage] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [isModerated, setIsModerated] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params.idClub) getNotice();
      if (route.params.isModerated) setIsModerated(route.params.isModerated);
    }, [route.params.idClub])
  );

  const getNotice = async () => {
    setLoading(true);
    const result = await Clubs.getNoticesBookclubs(route.params.idClub);

    setNotices(result.data);

    setLoading(false);
  };

  const deleteNotice = async (id: string) => {
    const response = await Clubs.removeNoticeClub(id);
    if (response.request.status === 204) {
      getNotice();
    }
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
    const response = await Clubs.editNoticeClub(
      {
        bookclub: noticeData?.bookclub || "",
        content: noticeData?.content || "",
        created_by: noticeData?.created_by || "",
        pin: !noticeData?.pin,
        title: noticeData?.title || "",
      },
      noticeData?.id || ""
    );
    if (response.request.status === 200) {
      getNotice();
    } else {
    }
  };

  const fixSurvey = async (surveyData: Notice) => {
    const response = await Clubs.editSurveyReading(
      {
        title: surveyData?.title,
        start_date: null,
        ending_date: surveyData?.ending_date,
        type: surveyData?.type,
        pin: !surveyData?.pin,
        bookclub: surveyData?.bookclub,
        reading: surveyData?.reading,
        created_by: surveyData.created_by_id,
      },
      surveyData?.id
    );

    if (response.request.status === 200) {
      getNotice();
    } else {
    }
  };

  const removeSurvey = async (id: string) => {
    setLoading(true);
    const response = await Clubs.removeQuestions(id);
    if (
      response?.request?.status === 204 ||
      response?.request?.status === 200
    ) {
      getNotice();
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.backgroundDark,
      }}
    >
      {loading && <PageLoading />}
      <ButtonBack navigation={() => navigation.goBack()} />
      <View style={{ flex: 1 }}>
        <Title style={{ marginTop: 90, marginBottom: 8 }}>Avisos</Title>

        {notices?.length ? (
          <FlatList
            data={notices}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <>
                {item.content ? (
                  <NoticeTextItem
                    type="bookclub"
                    data={item}
                    key={index}
                    moderated={route.params.isModerated}
                    removeNotice={(id: string) => deleteNotice(id)}
                    fixNotice={(e) => fixNotice(e)}
                  />
                ) : (
                  <SurveyItem
                    type="reading"
                    data={item}
                    key={index}
                    moderated={route.params.isModerated}
                    removeSurvey={(id: string) => removeSurvey(id)}
                    fixSurvey={(e) => fixSurvey(e)}
                  />
                )}
              </>
            )}
            showsVerticalScrollIndicator={false}
            style={{ margin: 16 }}
          />
        ) : (
          <>
            <View
              style={{
                flex: 0.6,
                alignItems: "center",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Image source={require("../../../../assets/images/notice.png")} />
              <TextCenter
                allowFontScaling={false}
                style={{ marginTop: 16, fontSize: 18 }}
              >
                Tudo tranquilo por aqui!
              </TextCenter>
              <TextCenter
                allowFontScaling={false}
                style={{ marginTop: 8, fontSize: 18 }}
              >
                Ainda não há avisos.
              </TextCenter>
            </View>
          </>
        )}
        {isModerated && (
          <View style={{ position: "absolute", right: 16, bottom: 16 }}>
            <ButtonAdd
              onPress={() =>
                navigation.navigate("CreateNotice", {
                  id: route?.params?.idClub || "",
                  type: "bookclub",
                })
              }
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default NoticeClubs;
