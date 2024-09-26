import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Platform,
} from "react-native";
import { CalendarButton, CalendarText } from "./styles";
import Modal from "react-native-modal";
import { Colors } from "../../styles/global";
// import { TouchableOpacity } from 'react-native-gesture-handler';
import ButtonPrimary from "../Button";
import CalendarPicker from "react-native-calendar-picker";
import dayjs from "dayjs";

interface Props {
  setDate: (e: string) => void;
  dateDefault?: string;
}

const ComponentCalendar: React.FC<Props> = ({ setDate, dateDefault = "" }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [datePicket, setDatePicket] = useState<string>("");

  const minDate = new Date();
  const deviceWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (dateDefault) {
      onDateChange(dateDefault);
    }
  }, [dateDefault]);

  const backCalendarPicker = () => {
    setModalVisible(false);
    setDate("");
  };

  const onDateChange = (e: any) => {
    const fullDate = dayjs(e).format("DD/MM/YYYY");
    setDate(e);
    setDatePicket(fullDate);
  };

  return (
    <>
      <View>
        <CalendarButton
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 30,
          }}
          onPress={() => setModalVisible(true)}
        >
          {datePicket === "" ? (
            <CalendarText allowFontScaling={false}>
              selecionar data
            </CalendarText>
          ) : (
            <>
              <Text
                allowFontScaling={false}
                style={{
                  color: "#FFFFFF",
                  fontSize: 16,
                }}
              >
                {datePicket}
              </Text>
            </>
          )}
          <Image
            source={require("../../../assets/images/calendar-select.png")}
          />
        </CalendarButton>
      </View>

      <Modal
        onBackdropPress={() => setModalVisible(false)}
        isVisible={isModalVisible}
        hasBackdrop={true}
        deviceWidth={deviceWidth}
        style={{
          backgroundColor: Colors.backgroundDark,
          borderRadius: 30,
          marginTop: 140,
          marginBottom: 100,
          marginHorizontal: 16,
          paddingTop: 0,
          paddingBottom: 0,
          maxHeight: 420,
        }}
      >
        <View>
          <CalendarPicker
            previousComponent={
              <Image
                style={{ marginLeft: 16 }}
                source={require("../../../assets/images/calendar-left-arrow.png")}
              />
            }
            nextComponent={
              <Image
                style={{ marginRight: 16 }}
                source={require("../../../assets/images/calendar-right-arrow.png")}
              />
            }
            allowBackwardRangeSelect={false}
            minDate={minDate}
            selectedDayTextColor={Colors.whiteTrue}
            todayBackgroundColor={Colors.whiteSecondary}
            todayTextStyle={{ color: Colors.grey }}
            disabledDatesTextStyle={{ color: Colors.whiteSecondary }}
            textStyle={{ color: Colors.grey }}
            selectedDayColor={Colors.primary}
            headerWrapperStyle={{
              // borderBottomWidth: 1,
              // borderBottomColor: Colors.whiteSecondary,
              paddingBottom: 24,
            }}
            width={deviceWidth - 32}
            weekdays={["D", "S", "T", "Q", "Q", "S", "S"]}
            months={[
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro",
            ]}
            selectYearTitle="Selecione o ano"
            selectMonthTitle="Selecione o mês em "
            scrollable={Platform.OS === "ios" ? true : false}
            restrictMonthNavigation={true}
            onDateChange={(e: any) => {
              onDateChange(e);
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            padding: 5,
            marginLeft: 70,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              padding: 5,
              marginLeft: 70,
            }}
            onPress={() => backCalendarPicker()}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: Colors.whiteText,
                marginHorizontal: 5,
                marginBottom: 8,
                fontFamily: "Inter_600SemiBold",
                fontSize: 14,
              }}
            >
              voltar
            </Text>
          </TouchableOpacity>

          <ButtonPrimary
            margin="5px"
            padding="2px"
            title={"selecionar"}
            width={120}
            onPressAction={() => {
              setModalVisible(false);
            }}
          />
        </View>
      </Modal>
    </>
  );
};
export default ComponentCalendar;
