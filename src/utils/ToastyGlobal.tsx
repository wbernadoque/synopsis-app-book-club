import { MotiView } from 'moti';
import React, { createContext, useState } from 'react';
import { View } from 'react-native';
import {
  BorderLeft,
  CloseButton,
  CloseToasty,
  ContainerClose,
  ImageToasty,
  TextToasty,
  TitleToasty,
  Toasty,
} from '../styles/styles';

interface ContextProps {
  createToasty: (
    show: boolean,
    title: string,
    text: string,
    error?: boolean
  ) => void;
}

export const ToastyContext = createContext({} as ContextProps);

interface Props {
  children?: JSX.Element;
}

export const ToastyProvider: React.FC<Props> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');

  const createToasty = (
    show: boolean,
    title: string,
    text: string,
    error?: boolean
  ) => {
    setError(!!error && error);
    setShow(show);
    setTitle(title);
    setText(text);
    setTimeout(() => {
      setShow(false);
    }, 5000);
  };

  const CreateToasty = () => {
    return (
      <MotiView from={{ translateX: -200 }} animate={{ translateX: 0 }}>
        <Toasty>
          <BorderLeft error={error} />
          <ImageToasty
            resizeMode="contain"
            source={
              !!error
                ? require('../../assets/images/error-toasty.png')
                : require('../../assets/images/done-toasty.png')
            }
          />

          <ContainerClose>
            <CloseButton onPress={() => setShow(false)}>
              <CloseToasty source={require('../../assets/images/close.png')} />
            </CloseButton>
          </ContainerClose>
          <View style={{ marginRight: 16 }}>
            <TitleToasty allowFontScaling={false}>{title}</TitleToasty>
            <TextToasty allowFontScaling={false}>{text}</TextToasty>
          </View>
        </Toasty>
      </MotiView>
    );
  };

  return (
    <ToastyContext.Provider value={{ createToasty }}>
      {children}
      {show && <CreateToasty />}
    </ToastyContext.Provider>
  );
};
