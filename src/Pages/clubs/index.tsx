import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
  View,
  ScrollView,
  Text,
  BackHandler,
} from "react-native";
import { TouchableOpacity } from "react-native";
import ButtonPrimary from "../../components/Button";
import ButtonAdd from "../../components/ButtonAdd";
import ButtonSearch from "../../components/ButtonSearch";
import CardClubDoYouLike from "../../components/CardClubDoYouLike";
import Modal from "../../components/Modal";
import { ContainerButtonsModal } from "../../components/Modal/styles";
import { MyClubsStackParamList } from "../../components/StackMyClubs";
import { ClubList } from "../../models/clubs.model";
import { RootStackParamList } from "../../routes";
import Clubs from "../../services/clubs.service";
import { Colors } from "../../styles/global";
import { AuthContext } from "../../utils/Auth";
import { Title } from "../home-logged/styles";
import { ToastyContext } from "./../../utils/ToastyGlobal";
import {
  Container,
  ContainerMyClubsEmpty,
  DescriptionTypeClub,
  TextEmpty,
  TitleEmpty,
} from "./styles";

type Home = NativeStackNavigationProp<RootStackParamList>;

const MyClubs: React.FC = () => {
  const { createToasty } = useContext(ToastyContext);
  const [hasClubs, setHasClubs] = useState<boolean>(true);
  const navigation = useNavigation<Home>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const { getToken } = useContext(AuthContext);
  const [clubsModerate, setClubsModerate] = useState<ClubList[]>([]);
  const [clubsParticipant, setClubsParticipant] = useState<ClubList[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [clubForDeleted, setClubForDeleted] = useState<string>("");

  useFocusEffect(
    React.useCallback(() => {
      // integrar busca de clubes
      refreshGetClubs();
    }, [])
  );

  const refreshGetClubs = () => {
    setRefreshing(true);

    Clubs.getClubsModeradorAndParticipant().then((result) => {
      if (result.status === 200 || result.status === 201) {
        const modero = result?.data?.filter((item: ClubList) => {
          return item.profile === "moderador";
        });
        const participant = result?.data?.filter((item: ClubList) => {
          return item.profile !== "moderador";
        });

        setClubsModerate(modero);
        setClubsParticipant(participant);
      } else {
        createToasty(
          true,
          "Ops! Algo deu de errado",
          "Não foi possível obter a lista de clubes!",
          true
        );
      }
      setHasClubs(!!result?.data?.length);
    });
    setRefreshing(false);
  };

  const addClub = () => {
    navigation.navigate("MyClubs", {
      screen: "CreateClubs",
    });
  };

  const handleGoToClub = (id: string) => {
    navigation.navigate("MyClubs", {
      screen: "DataClub",
      params: { id },
    });
  };

  const handleOutClub = (club: any) => {
    setClubForDeleted(club);
    setModalOpen(true);
  };

  const sendRemoveClub = async () => {
    const response = await Clubs.leaveClub(clubForDeleted);
    if (
      response.request.status === 200 ||
      response.request.status === 201 ||
      response.request.status === 204 ||
      response.request.status === 0
    ) {
      refreshGetClubs();
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

    setModalOpen(false);
  };

  return (
    <Container>
      <Title
        style={{ marginTop: 70, marginLeft: 16, marginBottom: 30 }}
        allowFontScaling={false}
      >
        Meus clubes
      </Title>
      <View style={{ position: "absolute", top: 66, right: 16 }}>
        <ButtonAdd onPress={addClub} />
      </View>
      {hasClubs ? (
        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => refreshGetClubs()}
              tintColor={Colors.primary}
            />
          }
        >
          {!!clubsModerate?.length && (
            <DescriptionTypeClub allowFontScaling={false}>
              Modero
            </DescriptionTypeClub>
          )}
          {clubsModerate?.map((club) => (
            <CardClubDoYouLike
              key={club.id}
              author={club.description}
              title={club.name}
              participants={club.member_count}
              typeClub={club.type}
              imageBook={club.cover_url}
              hasCategory={true}
              category={club.category}
              navigation={() => handleGoToClub(club.id)}
              handleFunctionButton={() => handleGoToClub(club.id)}
              descriptionButton={"gerenciar"}
            />
          ))}
          {!!clubsParticipant?.length && (
            <DescriptionTypeClub allowFontScaling={false}>
              Participo
            </DescriptionTypeClub>
          )}
          {clubsParticipant?.map((club) => (
            <CardClubDoYouLike
              key={club.id}
              author={club.description}
              title={club.name}
              participants={club.member_count}
              typeClub={club.type}
              imageBook={club.cover_url}
              hasCategory={true}
              category={club.category}
              navigation={() => handleGoToClub(club.id)}
              handleFunctionButton={() => handleOutClub(club.id)}
              descriptionButton={"deixar clube"}
              backgroundButtonGrey
            />
          ))}
        </ScrollView>
      ) : (
        <ContainerMyClubsEmpty>
          <ScrollView>
            <Image
              source={require("../../../assets/images/group-reeding.png")}
            />
            <TitleEmpty allowFontScaling={false}>
              Algum clube está te esperando
            </TitleEmpty>
            <TextEmpty allowFontScaling={false}>
              Clique em criar clube ou busque por um clube que é a sua cara.
            </TextEmpty>
          </ScrollView>
          <View
            style={{
              alignSelf: "flex-end",
              position: "absolute",
              zIndex: 1,
              bottom: 27,
              right: 16,
            }}
          >
            <ButtonSearch onClick={() => navigation.navigate("Search")} />
          </View>
        </ContainerMyClubsEmpty>
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
                  fontSize: 14,
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
    </Container>
  );
};

export default MyClubs;
