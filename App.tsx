import Routes from "./src/routes";
import { LogBox, View } from "react-native";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppLoading from "expo-app-loading";
import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import Loading from "./src/Pages/loading";
import { Colors } from "./src/styles/global";
import { BackHandler } from "react-native";
import { ToastyProvider } from "./src/utils/ToastyGlobal";
import { AuthProvider } from "./src/utils/Auth";
import { StatusBar } from "expo-status-bar";
import * as Font from "expo-font";
import { NoticeBoardProvider } from "./src/utils/NoticeBoard";

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    const loadFont = async () => {
      await Font.loadAsync({
        Inter_600SemiBold: Inter_600SemiBold,
        Inter_400Regular: Inter_400Regular,
        Inter_500Medium: Inter_500Medium,

        Inter_700Bold: Inter_700Bold,
      });

      setFontLoaded(true);
    };

    loadFont();
  }, []);

  useEffect(() => {
    if (fontsLoaded && fontLoaded) {
      hideLoading();
    }
  }, [fontsLoaded, fontLoaded]);

  const hideLoading = async () => {
    await SplashScreen.hideAsync();
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View
      style={{
        backgroundColor: Colors.backgroundDark,
        position: "relative",
        flex: 1,
      }}
    >
      <StatusBar style="light" animated />

      <AuthProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NoticeBoardProvider>
            <ToastyProvider>
              <Routes />
            </ToastyProvider>
          </NoticeBoardProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </View>
  );
}
