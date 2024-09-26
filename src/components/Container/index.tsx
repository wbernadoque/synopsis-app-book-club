import React from "react";
import {
  Dimensions,
  FlexAlignType,
  Platform,
  SafeAreaView,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";
import { Colors } from "../../styles/global";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";

interface Props {
  style?: StyleProp<ViewStyle>;
  children?: JSX.Element;
}

const Container: React.FC<Props> = ({ children, style }) => {
  return (
    <>
      <SafeAreaView
        style={[{ flex: 1, backgroundColor: Colors.backgroundDark }, style]}
      >
        {children}
        <View style={{ width: Dimensions.get("screen").width, height: 50 }}>
          <BannerAd
            unitId={
              Platform.OS === "ios"
                ? "ca-app-pub-2897224723776887/8386880616"
                : "ca-app-pub-2897224723776887/8127042072"
            }
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

export default Container;
