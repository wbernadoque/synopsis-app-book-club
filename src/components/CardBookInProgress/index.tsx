import React, { useContext, useEffect, useState } from "react";
import {
  AuthorBook,
  ContainerCardBookinProgress,
  ContainerDetailsCardBook,
  TextInsideBookInProgress,
  TitleBook,
} from "./styles";
import { Image, ImageProps, View } from "react-native";
import ProgressBar from "../ProgressBar";
import dayjs from "dayjs";
import Clubs from "../../services/clubs.service";
import { AuthContext } from "../../utils/Auth";
import { useFocusEffect } from "@react-navigation/native";

interface Props {
  cover: string;
  id: string;
  nameBook: string;
  authorBook: string;
  isParticipant?: boolean;
  onPress: () => void;
}

const CardBookInProgress: React.FC<Props> = ({
  cover,
  nameBook,
  id,
  authorBook,
  onPress,
  isParticipant,
}) => {
  const [progress, setProgress] = useState<ProgressReading>();
  const [onErrorImage, setOnErrorImage] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      if (id) {
        getProgress();
        // setProgress(percent < 0 ? 100 : percent - 100);
      }
    }, [id])
  );

  const getProgress = async () => {
    const result = await Clubs.getProgressReadings(id);
    if (result?.data) {
      setProgress(result.data);
    }
  };

  return (
    <ContainerCardBookinProgress
      onPress={onPress}
      activeOpacity={!isParticipant ? 1 : undefined}
    >
      <Image
        source={
          !!cover && !onErrorImage
            ? { uri: cover }
            : require("../../../assets/images/banner-clube.png")
        }
        style={{
          borderRadius: 12,
          overflow: "hidden",
          resizeMode: "cover",
          width: 106,
          height: 106,
        }}
        onError={() => setOnErrorImage(true)}
      />
      <ContainerDetailsCardBook
        style={{ position: "relative", flexShrink: 1, width: "100%" }}
      >
        <TextInsideBookInProgress allowFontScaling={false}>
          estamos lendo
        </TextInsideBookInProgress>
        <TitleBook
          numberOfLines={2}
          ellipsizeMode="tail"
          allowFontScaling={false}
        >
          {nameBook}
        </TitleBook>
        <AuthorBook allowFontScaling={false}>{authorBook}</AuthorBook>

        <ProgressBar progress={progress?.percentage || 0} />
      </ContainerDetailsCardBook>
    </ContainerCardBookinProgress>
  );
};

export default CardBookInProgress;
