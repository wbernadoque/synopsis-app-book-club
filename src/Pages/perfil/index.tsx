import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useEffect, useState } from "react";
import Profile from "../../services/profile.service";
import { ProfileList } from "../../models/profile.model";
import Modal from "../../components/Modal";

import {
  Button,
  Image,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
} from "react-native";
import ButtonSearch from "../../components/ButtonSearch";
import { RootStackParamList } from "../../routes";
import Auth from "../../services/auth.service";
import { AuthContext } from "../../utils/Auth";
import { Container } from "../intro/styles";
import {
  ContainerPage,
  PhotoCont,
  PhotoNameInfo,
  UserImg,
  EditImg,
  UserName,
  UserInfos,
  ContInfoUsuario,
  WrapNomeUsuario,
  LabelInfoPerfil,
  NomeUsuario,
  BtnEdit,
  TextBtn,
  BtnSair,
  BtnExcluir,
  TextExcluir,
  TrashCan,
  ModalView,
  ModalTitle,
  ModalText,
  ModalContBtn,
  BtnConfirmaExcluir,
  RemoveCircle,
} from "./styles";
// import Modal from 'react-native-modal';
import { ToastyContext } from "../../utils/ToastyGlobal";
import ButtonPrimary from "../../components/Button";
import ButtonSecondary from "../../components/ButtonSecondary";
import { ContainerButtonsModal } from "../../components/Modal/styles";
import { Colors } from "../../styles/global";
import PageLoading from "../../components/PageLoading";

export type ProfileStackParam = {
  Profile: undefined;
  ChangePassswordProfile: undefined;
  Intro: undefined;
  Login: undefined;
};
type ProfileTp = StackNavigationProp<ProfileStackParam, any>;

interface Props {
  route?: any;
}
interface User {
  username: string;
  email: string;
  // outras propriedades...
}

const Perfil: React.FC<Props> = () => {
  const navigation = useNavigation<ProfileTp>();
  const { removeData } = useContext(AuthContext);
  const { getId } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(true);

  const search = () => {
    // navigation.navigate('Search').
    console.warn("search");
  };
  const logout = async () => {
    const result = await Auth.logout();
    removeData();
    navigation.navigate("Login");
  };

  // useEffect(() => {
  //   setUserName('Gabi Dias');
  //   setUserEmail('gabi.dias@gmail.com');
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      getProfile();
    }, [])
  );

  const [profile, setProfile] = useState<User>();
  const { createToasty } = useContext(ToastyContext);

  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  const changeModal = () => {
    setIsModalVisible(true);
  };
  const deviceWidth = Dimensions.get("window").width;

  const getProfile = async () => {
    const result = await Profile.getProfile();
    if (result.status === 200 || result.status === 201) {
      setProfile(result.data);
      setLoading(false);
    } else {
      console.log("erro");
    }
  };

  const deleteAccount = async () => {
    setIsModalVisible(false);
    const response = await Profile.deleteProfile();
    if (response.request.status === 200) {
      navigation.navigate("Intro");
      createToasty(
        true,
        "Usuário excluído!",
        "Usuário removido com sucesso",
        false
      );
    } else {
      createToasty(
        true,
        "Ops! Algo deu errado",
        "Não foi possível exluir este usuário",
        true
      );
    }
  };

  const goToChangePassword = () => {
    navigation.navigate("ChangePassswordProfile");
  };

  return (
    <Container>
      {loading && <PageLoading />}
      <ContainerPage>
        <PhotoCont>
          <PhotoNameInfo>
            {/* <UserImg
              style={{ resizeMode: 'contain' }}
              source={require('../../../assets/images/user_mock.png')}
            />
            <EditImg
              style={{ resizeMode: 'contain' }}
              source={require('../../../assets/images/edit_prof.png')}
            /> */}
            <UserName>{profile?.username}</UserName>
          </PhotoNameInfo>
        </PhotoCont>
        <UserInfos>
          {/* linha de informacao */}
          <ContInfoUsuario>
            <WrapNomeUsuario>
              <LabelInfoPerfil>Usuário</LabelInfoPerfil>
              <NomeUsuario>{profile?.username}</NomeUsuario>
            </WrapNomeUsuario>
            {/* <BtnEdit>
              <TextBtn>editar</TextBtn>
            </BtnEdit> */}
          </ContInfoUsuario>
          {/* linha de informacao */}
          <ContInfoUsuario>
            <WrapNomeUsuario>
              <LabelInfoPerfil>Email</LabelInfoPerfil>
              <NomeUsuario>{profile?.email}</NomeUsuario>
            </WrapNomeUsuario>
            {/* <BtnEdit>
              <TextBtn>editar</TextBtn>
            </BtnEdit> */}
          </ContInfoUsuario>
          {/* linha de informacao */}
          <ContInfoUsuario>
            <WrapNomeUsuario>
              <LabelInfoPerfil>Senha</LabelInfoPerfil>
              <NomeUsuario>•••••••••</NomeUsuario>
            </WrapNomeUsuario>

            <ButtonSecondary
              padding="0px"
              width={114}
              title={"alterar"}
              navigation={goToChangePassword}
            />
          </ContInfoUsuario>
          {/* linha de informacao */}
        </UserInfos>
        <BtnSair>
          <ButtonSecondary title={"sair"} width="full" navigation={logout} />
        </BtnSair>

        {/* excluir conta */}
        <BtnExcluir onPress={() => changeModal()}>
          <TrashCan
            style={{ resizeMode: "contain" }}
            source={require("../../../assets/images/trash-can-del.png")}
          />
          <TextExcluir>excluir conta</TextExcluir>
        </BtnExcluir>
        {isModalVisible && (
          <Modal
            text={
              "Ao excluir sua conta todos os seus dados e históricos serão removidos. Essa ação não poderá ser desfeita."
            }
            title={"Nossa história chegou ao fim?"}
          >
            <ContainerButtonsModal>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
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
                title={"sim, quero excluir"}
                width={"half"}
                padding="0px"
                navigation={deleteAccount}
              />
            </ContainerButtonsModal>
          </Modal>
        )}
        {/* <Modal
          onBackdropPress={() => setIsModalVisible(false)}
          isVisible={isModalVisible}
          hasBackdrop={true}
          style={{
            borderRadius: 30,
            marginTop: 140,
            marginBottom: 100,
            marginHorizontal: 16,
            paddingTop: 0,
            paddingBottom: 0,
            maxHeight: 420,
          }}
        >
          <ModalView>
            <RemoveCircle
              style={{ resizeMode: 'contain' }}
              source={require('../../../assets/images/remove-circle.png')}
            />
            <ModalTitle> Nossa história chegou ao fim? </ModalTitle>
            <ModalText>
              Ao excluir sua conta todos os seus dados e históricos serão
              removidos. Essa ação não poderá ser desfeita.{' '}
            </ModalText>
            <ModalContBtn>
              <TextBtn onPress={() => setIsModalVisible(false)}>cancelar</TextBtn>
              <BtnConfirmaExcluir onPress={() => deleteAccount()}>
                <TextBtn>sim, quero excluir</TextBtn>
              </BtnConfirmaExcluir>
            </ModalContBtn>
          </ModalView>
        </Modal> */}
      </ContainerPage>
    </Container>
  );
};

export default Perfil;
