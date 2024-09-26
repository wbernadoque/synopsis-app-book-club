import React from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';

interface Props {
  onClick: () => void;
}

const ButtonSearch: React.FC<Props> = ({ onClick }) => {
  return (
    <TouchableOpacity onPress={() => onClick()}>
      <Image source={require('../../../assets/images/search.png')} />
    </TouchableOpacity>
  );
};

export default ButtonSearch;
