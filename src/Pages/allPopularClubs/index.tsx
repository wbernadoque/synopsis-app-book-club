import React, { useState, useEffect, useContext } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { RootStackParamList } from "../../routes";
import { StackNavigationProp } from "@react-navigation/stack";
import { Platform, Text, TouchableOpacity } from "react-native";

import { ContainerScroll, ContainerTitle, Title } from "./styles";
import { Container } from "../intro/styles";

import CardClubDoYouLike from "./../../components/CardClubDoYouLike/index";
import ButtonBack from "../../components/ButtonBack";
import Clubs from "../../services/clubs.service";
import { AuthContext } from "../../utils/Auth";
import { ClubList } from "../../models/clubs.model";
import Modal from "../../components/Modal";
import { ContainerButtonsModal } from "../../components/Modal/styles";
import { Colors } from "../../styles/global";
import ButtonPrimary from "../../components/Button";
import { ToastyContext } from "../../utils/ToastyGlobal";
import PageLoading from "../../components/PageLoading";

type AllPopularClubs = StackNavigationProp<RootStackParamList>;
const AllPopularClubs: React.FC = () => {
  const [clubs, setClubs] = useState<ClubList[]>([]);
  const { createToasty } = useContext(ToastyContext);
  const [idBookClubToRemove, setIdBookClubToRemove] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const navigation = useNavigation<AllPopularClubs>();

  const enjoyClub = (data: ClubList) => {
    navigation.navigate("MyClubs", {
      screen: "DataClub",
      params: { id: data?.id, previousScreen: { page: "AllPopularClubs" } },
    });
  };

  const goBack = () => {
    navigation.goBack();
  };

  const getClubs = async () => {
    setLoading(true);
    const result = await Clubs.getPopularsClubs();
    if (result.status === 200 || result.status === 201) {
      setClubs(result.data);
    }
    if (result.request.status !== 201 && result.request.status !== 200) {
      navigation.navigate("Login");
    }
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getClubs();
    }, [])
  );

  const actionInButton = async (bookClub: ClubList) => {
    if (bookClub?.profile === "moderador") {
      navigation.navigate("MyClubs", {
        screen: "DataClub",
        params: { id: bookClub?.id, isModerated: false, participate: false },
      });
      return;
    }

    if (bookClub?.profile === "leitor") {
      setIdBookClubToRemove(bookClub?.id);
      setModalOpen(true);
    }

    if (!bookClub?.profile) {
      setLoading(true);
      try {
        const result = await Clubs.enterClub(bookClub?.id);
        if (result?.status === 200) {
          createToasty(
            true,
            "Ler junto é bem melhor!",
            "Não deixe de conferir as leituras e avisos do clube.",
            false
          );
          navigation.navigate("MyClubs", {
            screen: "DataClub",
            params: { id: bookClub?.id, isModerated: false, participate: true },
          });
        } else {
          createToasty(
            true,
            "Ops! Algo deu errado.",
            "Não foi possível deixar clube, por favor, tente novamente.",
            true
          );
        }
      } catch {
        createToasty(
          true,
          "Ops! Algo deu errado.",
          "Não foi possível deixar clube, por favor, tente novamente.",
          true
        );
      } finally {
        setLoading(false);
      }

      return;
    }
  };

  const sendRemoveClub = async (id: string) => {
    setLoading(true);
    const result = await Clubs.leaveClub(id);
    setLoading(false);
    if (result) {
      createToasty(
        true,
        "Você saiu do clube.",
        "O que acha de procurar novos clubes ou criar o seu? ",
        false
      );
      getClubs();
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
    <>
      {loading && <PageLoading />}
      <Container style={{ justifyContent: "flex-start" }}>
        <ButtonBack navigation={goBack} />
        <ContainerTitle style={{ marginTop: Platform.OS === "ios" ? 43 : 93 }}>
          <Title allowFontScaling={false}>Clubes populares</Title>
        </ContainerTitle>
        <ContainerScroll style={{ marginTop: 0 }}>
          {!!clubs?.length && (
            <>
              {clubs.map((card, index) => (
                <>
                  {card.type === "PUBLIC" && (
                    <CardClubDoYouLike
                      key={"popular-clubs-" + index}
                      category={card?.category}
                      hasCategory
                      title={card?.name}
                      participants={card?.member_count}
                      typeClub={card?.type || ""}
                      imageBook={card?.cover_url}
                      navigation={() => enjoyClub(card)}
                      handleFunctionButton={() => actionInButton(card)}
                      backgroundButtonGrey={
                        card?.profile === "leitor"
                          ? true
                          : card?.profile === "moderador"
                          ? false
                          : false
                      }
                      descriptionButton={
                        card?.profile === "leitor"
                          ? "deixar clube"
                          : card?.profile === "moderador"
                          ? "gerenciar"
                          : "juntar-se"
                      }
                    />
                  )}
                </>
              ))}
            </>
          )}
        </ContainerScroll>
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
                  allowFontScaling={false}
                  style={{
                    color: Colors.whiteText,
                    fontFamily: "Inter_600SemiBold",
                    paddingTop: 8,
                    paddingRight: 24,
                    paddingBottom: 8,
                    paddingLeft: 24,
                  }}
                >
                  cancelar
                </Text>
              </TouchableOpacity>
              <ButtonPrimary
                title={"sim, quero deixar"}
                width={"half"}
                padding="0px"
                navigation={() => sendRemoveClub(idBookClubToRemove)}
              />
            </ContainerButtonsModal>
          </Modal>
        )}
      </Container>
    </>
  );
};
export default AllPopularClubs;
