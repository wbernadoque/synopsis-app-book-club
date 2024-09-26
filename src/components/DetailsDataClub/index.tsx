import React from "react";
import { View } from "react-native";
import { ContainerDetail, DataDetail, NameDetail } from "./styles";

interface Props {
  participants: number;
  concludeds: number;
  inProgress: number;
  onPressParticipants: () => void;
}

const DefailsDataClub: React.FC<Props> = ({
  participants,
  concludeds,
  inProgress,
  onPressParticipants,
}) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 26,
        paddingRight: 26,
        marginTop: 25,
        marginBottom: 32,
      }}
    >
      <ContainerDetail onPress={() => onPressParticipants()}>
        <DataDetail allowFontScaling={false}>{participants}</DataDetail>
        <NameDetail allowFontScaling={false}>participantes</NameDetail>
      </ContainerDetail>
      <ContainerDetail>
        <DataDetail allowFontScaling={false}>{concludeds}</DataDetail>
        <NameDetail allowFontScaling={false}>concluídos</NameDetail>
      </ContainerDetail>
      <ContainerDetail>
        <DataDetail allowFontScaling={false}>{inProgress}</DataDetail>
        <NameDetail allowFontScaling={false}>lendo</NameDetail>
      </ContainerDetail>
    </View>
  );
};

export default DefailsDataClub;
