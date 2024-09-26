import { MotiView } from 'moti';
import React from 'react';
import { Image } from 'react-native';
import {
  Overflow,
  ContainerModal,
  Container,
  TitleModal,
  TextModal,
} from './styles';

interface Props {
  title: string;
  text: string;
  children?: JSX.Element;
}

const Modal: React.FC<Props> = ({ title, text, children }) => {
  return (
    <>
      <Overflow></Overflow>
      <Container>
        <MotiView from={{ translateY: 1000 }} animate={{ translateY: 0 }}>
          <ContainerModal>
            <Image
              source={require('../../../assets/images/remove-circle.png')}
            />
            <TitleModal allowFontScaling={false}>{title}</TitleModal>
            <TextModal allowFontScaling={false}>{text}</TextModal>
            {children}
          </ContainerModal>
        </MotiView>
      </Container>
    </>
  );
};

export default Modal;
