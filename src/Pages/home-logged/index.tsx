import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import { Dimensions, Image, RefreshControl, View } from "react-native";
import { TouchableOpacity } from "react-native";
import BannerHome from "../../components/BannerHome";
import ButtonSearch from "../../components/ButtonSearch";
import CardClubSpotlight from "../../components/CardClubSpotlight";
import { RootStackParamList } from "../../routes";
import { Container } from "../intro/styles";
import {
  ButtonAll,
  ContainerScroll,
  ContainerScrollHorizontal,
  ContainerTitle,
  Title,
} from "./styles";
import CardClubDoYouLike from "./../../components/CardClubDoYouLike/index";
import { Colors } from "../../styles/global";
import { ClubList } from "../../models/clubs.model";
import Clubs from "../../services/clubs.service";
import { AuthContext } from "../../utils/Auth";
import { Readings } from "../../models/readings.model";
import { MotiView } from "moti";
import * as Linking from "expo-linking";
import ModalNotice from "../../components/ModalNotice";
import { ContainerButtonsModal } from "../../components/ModalNotice/styles";
import ButtonPrimary from "../../components/Button";
import { AdminNoticeBoard } from "../../models/admin-notice-board.model";
import { NoticeBoardContext } from "../../utils/NoticeBoard";

type Home = StackNavigationProp<RootStackParamList, any>;

const HomeLogged: React.FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(true);
  const [clubs, setClubs] = useState<ClubList[]>([]);
  const [readings, setReadings] = useState<Readings[]>([]);
  const { getToken, removeData } = useContext(AuthContext);
  const { getNotice } = useContext(NoticeBoardContext);
  const navigation = useNavigation<Home>();

  useFocusEffect(
    React.useCallback(() => {
      refreshGetClubs();
      getNotice();
    }, [])
  );

  useEffect(() => {}, [clubs]);

  const [deepLinkData, setDeepLinkData] = useState<Linking.ParsedURL | null>(
    null
  );
  useEffect(() => {
    const getInitialURL = async () => {
      const initialURL = await Linking.getInitialURL();
      if (initialURL) {
        setDeepLinkData(Linking.parse(initialURL));
      }
    };

    const event = Linking.addEventListener("url", handleDeepLink);
    if (!deepLinkData) {
      getInitialURL();
    }

    return () => {
      event.remove();
    };
  }, []);

  useEffect(() => {
    if (deepLinkData) {
      useDeepLink(deepLinkData);
    }
  }, [deepLinkData]);

  const useDeepLink = (data?: Linking.ParsedURL) => {
    if (data?.queryParams?.path === "DataClub") {
      navigation.navigate("MyClubs", {
        screen: "DataClub",
        params: {
          id: data?.queryParams?.id,
        },
      });
    }
  };

  const handleDeepLink = (event: any) => {
    if (!deepLinkData) {
      let data = Linking.parse(event.url);

      setDeepLinkData({ ...data, hostname: data.hostname });
    }
  };

  const search = () => {
    navigation.navigate("Search");
  };

  const seeAll = () => {
    navigation.push("AllPopularClubs");
  };

  const getYouLikedReadings = async () => {
    // alterar esse endpoint
    const result = await Clubs.getYouMayLike();
    if (result?.data) {
      setReadings(result?.data);
    }

    setRefreshing(false);
  };
  const enjoyClub = async (dataReading: Readings) => {
    try {
      const result = await Clubs.enterClub(dataReading?.id);
      if (result?.status === 200) {
        navigation.navigate("MyClubs", {
          screen: "DataClub",
          params: {
            id: dataReading?.id,
            previousScreen: { page: "HomeInitial" },
          },
        });
      }
    } catch {}
  };

  const refreshGetClubs = async () => {
    setRefreshing(true);

    getYouLikedReadings();

    const result = await Clubs.getPopularsClubs();
    if (result.status === 200 || result.status === 201) {
      setClubs(result.data);
    }
    if (result.request.status !== 201 && result.request.status !== 200) {
      await removeData();
      navigation.navigate("Login");
    }
    setRefreshing(false);
  };

  const hasPublicClubs = (clubs: ClubList[]) => {
    return clubs.some((item) => item.type === "PUBLIC");
  };

  return (
    <Container style={{ justifyContent: "flex-start" }}>
      <View
        style={{
          alignSelf: "flex-end",
          position: "absolute",
          zIndex: 1,
          top: 58,
          right: 16,
        }}
      >
        <ButtonSearch onClick={search} />
      </View>
      <ContainerScroll
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => refreshGetClubs()}
            tintColor={Colors.primary}
          />
        }
      >
        <>
          {refreshing && (
            <View
              style={{
                width: Dimensions.get("screen").width,
                height: 214,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MotiView
                from={{ translateY: 0 }}
                animate={{ translateY: 50 }}
                transition={{ loop: true, type: "timing", duration: 200 }}
              >
                <Image
                  style={{ width: 31, height: 55, tintColor: Colors.primary }}
                  resizeMode="contain"
                  source={require("../../../assets/images/logo-s-only.png")}
                />
              </MotiView>
            </View>
          )}
          {hasPublicClubs(clubs) && (
            <>
              {clubs?.length > 0 && (
                <>
                  <ContainerTitle>
                    <Title allowFontScaling={false}>Clubes populares</Title>
                    <TouchableOpacity onPress={() => seeAll()}>
                      <ButtonAll allowFontScaling={false}>ver todos</ButtonAll>
                    </TouchableOpacity>
                  </ContainerTitle>
                  <ContainerScrollHorizontal
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                  >
                    {clubs?.map((data, index) => (
                      <React.Fragment key={index}>
                        {data.type === "PUBLIC" && (
                          <CardClubSpotlight
                            key={index}
                            index={index}
                            category={data?.category || ""}
                            title={data.name}
                            participants={data.member_count}
                            typeClub={data?.type}
                            clubData={data}
                            participate={false}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </ContainerScrollHorizontal>
                </>
              )}
            </>
          )}
          <BannerHome />
          {refreshing && (
            <View
              style={{
                width: Dimensions.get("screen").width,
                height: 150,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MotiView
                from={{ translateY: 0 }}
                animate={{ translateY: 50 }}
                transition={{ loop: true, type: "timing", duration: 200 }}
              >
                <Image
                  style={{ width: 31, height: 55, tintColor: Colors.primary }}
                  resizeMode="contain"
                  source={require("../../../assets/images/logo-s-only.png")}
                />
              </MotiView>
            </View>
          )}
          {!!readings.length && (
            <>
              <ContainerTitle>
                <Title allowFontScaling={false}>Você pode gostar</Title>
              </ContainerTitle>

              {readings?.map((card, index) => (
                <CardClubDoYouLike
                  key={card.id}
                  author={card?.book_title}
                  title={card?.name || ""}
                  // participants={card?.book_author}
                  category={card?.category}
                  hasCategory
                  hasAuthorOnParticipants
                  typeClub={card?.calendar_type}
                  imageBook={card?.book_cover}
                  handleFunctionButton={() => enjoyClub(card)}
                  descriptionButton="juntar-se"
                  backgroundButtonGrey={false}
                  navigation={() => {
                    navigation.navigate("MyClubs", {
                      screen: "DataClub",
                      params: {
                        id: card?.id,
                        previousScreen: { page: "HomeInitial" },
                      },
                    });
                  }}
                />
              ))}
            </>
          )}
        </>
      </ContainerScroll>
    </Container>
  );
};

export default HomeLogged;
