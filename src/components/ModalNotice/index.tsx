import { MotiView } from "moti";
import React from "react";
import { Image, View } from "react-native";
import {
  Overflow,
  ContainerModal,
  Container,
  TitleModal,
  TextModal,
  ContainerImage,
} from "./styles";

interface Props {
  title: string;
  text: string;
  children?: JSX.Element;
}

const ModalNotice: React.FC<Props> = ({ title, text, children }) => {
  return (
    <>
      <Overflow></Overflow>
      <Container>
        <MotiView from={{ translateY: 1000 }} animate={{ translateY: 50 }}>
          <ContainerModal>
            <ContainerImage>
              <Image
                source={require("../../../assets/images/notice-modal.png")}
                resizeMode="center"
              />
            </ContainerImage>
            <TitleModal allowFontScaling={false}>{title}</TitleModal>
            <TextModal allowFontScaling={false}>{text}</TextModal>
            {children}
          </ContainerModal>
        </MotiView>
      </Container>
    </>
  );
};

export default ModalNotice;
