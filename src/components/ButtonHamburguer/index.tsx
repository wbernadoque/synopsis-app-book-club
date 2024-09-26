import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { ButtonP, TextInsideButton } from './styles';

interface Props {
  openMenu: () => void;
}

const ButtonHamburguer: React.FC<Props> = ({ openMenu }) => {
  return (
    <View
      style={{
        alignSelf: 'flex-end',
        position: 'absolute',
        zIndex: 1,
        top: 58,
        right: 17,
      }}
    >
      <TouchableOpacity onPress={() => openMenu()}>
        <Image source={require('../../../assets/images/hamburger.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonHamburguer;
