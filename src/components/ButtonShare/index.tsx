import React from 'react';
import { Image, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

interface Props {
  position?: 'absolute' | 'relative';
  onPress: () => void;
  right?: number;
}

const ButtonShare: React.FC<Props> = ({
  position = 'relative',
  onPress,
  right = 16,
}) => {
  return (
    <View
      style={{
        position,
        right: right,
        top: 58,
        alignSelf: 'flex-end',
        zIndex: 1,
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <Image
          style={{ width: 24, height: 24 }}
          source={require('../../../assets/images/share.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ButtonShare;
