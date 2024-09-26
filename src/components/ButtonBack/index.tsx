import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { ButtonP, TextInsideButton } from './styles';

interface Props {
  navigation: () => void;
}

const ButtonBack: React.FC<Props> = ({ navigation }) => {
  return (
    <View
      style={{
        alignSelf: 'flex-end',
        position: 'absolute',
        zIndex: 1,
        top: 58,
        left: 16,
      }}
    >
      <TouchableOpacity
        onPress={() => navigation()}
        style={{
          paddingLeft: 4,
          paddingTop: 8,
          paddingBottom: 8,
          paddingRight: 12,
        }}
      >
        <Image source={require('../../../assets/images/back.png')} />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonBack;
