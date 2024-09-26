import React, { useContext } from "react";
import { ImageHero } from "../intro/styles";
import { Title, TextDescription, ContainerButtons } from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes";
import ButtonPrimary from "../../components/Button";
import ButtonSecondary from "../../components/ButtonSecondary";
import { Container } from "../login/styles";
import { AuthContext } from "../../utils/Auth";
import apiInstance from "../../../api";

type Home = StackNavigationProp<RootStackParamList, "Home">;

const Home: React.FC = () => {
  const { getToken } = useContext(AuthContext);
  const navigation = useNavigation<Home>();

  useFocusEffect(
    React.useCallback(() => {
      navigation.canGoBack();
      getAuth();
    }, [])
  );

  const getAuth = async () => {
    const token = await getToken();

    if (token) {
      apiInstance.defaults.headers.Authorization = `Bearer ${token}`;
      navigation.navigate("HomeLogged", {
        screen: "Home",
      });
    }
  };

  return (
    <Container
      style={{
        alignItems: "center",
      }}
    >
      <ImageHero source={require("../../../assets/images/group-club.png")} />
      <Title allowFontScaling={false}>Eba, você veio!</Title>
      <TextDescription allowFontScaling={false}>
        Entre com suas credenciais ou crie uma conta.
      </TextDescription>
      <ContainerButtons>
        <ButtonPrimary
          navigation={() => navigation.navigate("Login")}
          margin="10px"
          width={"full"}
          title={"entrar"}
        />
        <ButtonSecondary
          navigation={() => navigation.navigate("Signup")}
          margin="10px"
          width={"full"}
          title={"cadastrar"}
        />
      </ContainerButtons>
    </Container>
  );
};

export default Home;
