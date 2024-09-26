import { MotiView } from 'moti';
import React from 'react';
import { Dimensions, Image, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Colors } from '../../styles/global';

const PageLoading: React.FC = () => {
  return (
    <View
      style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        zIndex: 9999,
        backgroundColor: 'white',
        opacity: 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
      }}
    >
      <MotiView
        from={{ translateY: 0 }}
        animate={{ translateY: 50 }}
        transition={{ loop: true, type: 'timing', duration: 200, delay: 100 }}
      >
        <Image
          style={{ width: 31, height: 55, tintColor: Colors.primary }}
          resizeMode="contain"
          source={require('../../../assets/images/logo-s-only.png')}
        />
      </MotiView>
    </View>
  );
};

export default PageLoading;
