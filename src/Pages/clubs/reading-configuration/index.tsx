import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useContext, useState } from "react";
import {
  BackHandler,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import ButtonBack from "../../../components/ButtonBack";
import Container from "../../../components/Container";
import { MyClubsStackParamList } from "../../../components/StackMyClubs";
import { Title } from "../../signup/styles";
import {
  ContainerInfo,
  SubTitle,
  TextContainer,
  Title as TitleAuthor,
} from "../reading-in-progress/styles";
import { Label, LabelRadioButton } from "./styles";
import { RadioButton } from "react-native-paper";
import { Colors } from "../../../styles/global";
import ButtonPrimary from "../../../components/Button";
import ButtonSecondary from "../../../components/ButtonSecondary";
import ComponentCalendar from "../../../components/ComponentCalendar";
import { Book } from "../../../models/book.model";
import dayjs from "dayjs";
import Clubs from "../../../services/clubs.service";
import { ToastyContext } from "../../../utils/ToastyGlobal";
import { AuthContext } from "../../../utils/Auth";

interface Props {
  route: any;
}

type ClubsRoute = StackNavigationProp<MyClubsStackParamList>;
const ReadingConfiguration: React.FC<Props> = ({ route }) => {
  const { createToasty } = useContext(ToastyContext);
  const { getToken } = useContext(AuthContext);
  const navigation = useNavigation<ClubsRoute>();
  const [typeGoal, setTypeGoal] = useState<"MONTHLY" | "WEEKLY">("MONTHLY");
  const [date, setDate] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<Book>();
  const [onErrorImage, setOnErrorImage] = useState<boolean>(false);

  useFocusEffect(
    React.useCallback(() => {
      setSelectedBook(route.params.book);
      if (route.params.idReading) getIdDataReading();
    }, [])
  );

  const getIdDataReading = async () => {
    const result = await Clubs.getReading(route?.params?.idReading);

    if (result?.data?.calendar_type) setTypeGoal(result?.data?.calendar_type);
  };

  const handleBackButtonClick = () => {
    navigation.goBack();
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  }, []);

  const submitConfig = async () => {
    // const formData = new FormData();
    // formData.append('book_edition', route.params.book.id);
    // formData.append('bookclub', route.params.idClub);
    // formData.append('calendar_type', typeGoal);
    // formData.append('predicted_ending', date);
    // formData.append('ending_date', '');

    // Clubs.createReading((await getToken()) || '', formData).then(
    //   (result: any) => {
    //     console.log(result?.json);
    //     if (result?.status === 200 || result?.status === 201) {
    //     } else {
    //       createToasty(
    //         true,
    //         'Ops! Algo deu de errado',
    //         'Não foi possível criar a leitura, por favor, tente novamente.',
    //         true
    //       );
    //     }
    //   }
    // );

    Clubs.createReading({
      book_edition: route.params.book.id,
      bookclub: route.params.idClub,
      calendar_type: typeGoal,
      predicted_ending: date,
      ending_date: null,
    }).then((result: any) => {
      if (result?.status === 200 || result?.status === 201) {
        createToasty(
          true,
          "Tudo pronto para a sua leitura!",
          "Convide amigos e comece sua leitura coletiva.",
          false
        );
        navigation.navigate("DataClub", {
          params: {
            id: route.params.idClub,
            isModerated: true,
            participate: true,
          },
        });
      } else {
        createToasty(
          true,
          "Ops! Algo deu de errado",
          "Não foi possível adicionar leitura, por favor, tente novamente.",
          true
        );
      }
    });
  };

  const editConfig = async () => {
    // implementar edição
    const form = new FormData();

    form.append("calendar_type", typeGoal);
    form.append("predicted_ending", date);
    form.append("bookclub", route.params.idClub);
    form.append("book_edition", route.params.book.id);
    const result = await Clubs.editReading(
      {
        calendar_type: typeGoal,
        predicted_ending: date,
        bookclub: route.params.idClub,
        book_edition: route.params.book.id,
      },
      route.params.idReading
    );
    if (result.status === 200) {
      navigation.navigate("DataClub", {
        params: {
          id: route.params.idClub,
          isModerated: true,
          participate: true,
        },
      });
    } else {
      createToasty(
        true,
        "Ops! Algo deu de errado",
        "Não foi possível editar a leitura, por favor, tente novamente.",
        true
      );
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.backgroundDark }}>
      <ButtonBack navigation={() => navigation.goBack()} />
      <ScrollView bounces={false}>
        <Title
          style={{ marginTop: 90, marginBottom: 8 }}
          allowFontScaling={false}
        >
          {route.params.idReading ? "Editar" : "Configurações de"} leitura
        </Title>

        <ContainerInfo style={{ margin: 16 }}>
          <Image
            source={
              selectedBook?.cover && !onErrorImage
                ? { uri: selectedBook?.cover }
                : require("../../../../assets/images/banner-clube.png")
            }
            style={{ width: 125, height: 183, borderRadius: 12 }}
            onError={() => setOnErrorImage(true)}
          />
          <TextContainer>
            <TitleAuthor
              style={{ width: 200 }}
              ellipsizeMode="tail"
              numberOfLines={2}
              allowFontScaling={false}
            >
              {selectedBook?.title}
            </TitleAuthor>
            <SubTitle style={{ marginBottom: 14 }} allowFontScaling={false}>
              {selectedBook?.author}
            </SubTitle>
            <SubTitle allowFontScaling={false}>
              {selectedBook?.page_qty} paginas
            </SubTitle>
          </TextContainer>
        </ContainerInfo>
        <View style={{ margin: 16 }}>
          <Label allowFontScaling={false}>Tipo de meta</Label>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 8,
              }}
              onPress={() => setTypeGoal("MONTHLY")}
            >
              <RadioButton.Android
                status={typeGoal === "MONTHLY" ? "checked" : "unchecked"}
                value={"MONTHLY"}
                color={Colors.primary}
                uncheckedColor={Colors.grey}
                onPress={() => setTypeGoal("MONTHLY")}
              />
              <LabelRadioButton
                color={typeGoal === "MONTHLY" ? Colors.whiteText : Colors.grey}
                allowFontScaling={false}
              >
                mensal
              </LabelRadioButton>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginRight: 8,
              }}
              onPress={() => setTypeGoal("WEEKLY")}
            >
              <RadioButton.Android
                status={typeGoal !== "MONTHLY" ? "checked" : "unchecked"}
                value={"WEEKLY"}
                color={Colors.primary}
                uncheckedColor={Colors.grey}
                onPress={() => setTypeGoal("WEEKLY")}
              />
              <LabelRadioButton
                color={typeGoal !== "MONTHLY" ? Colors.whiteText : Colors.grey}
                allowFontScaling={false}
              >
                semanal
              </LabelRadioButton>
            </TouchableOpacity>
          </View>
          <Label
            style={{ marginTop: 27, marginBottom: 8 }}
            allowFontScaling={false}
          >
            Previsão de término
          </Label>
          {/* componente de seleção de data */}
          <View style={{ marginBottom: 40 }}>
            <ComponentCalendar setDate={(e: string) => setDate(e)} />
          </View>

          <ButtonPrimary
            title={
              route.params.idReading ? "salvar alterações" : "adicionar leitura"
            }
            disabled={!date}
            navigation={() => {
              route.params.idReading ? editConfig() : submitConfig();
            }}
            margin={"0 0 16px 0 "}
            width="full"
          />
          {!route.params.idReading && (
            <ButtonSecondary
              navigation={() =>
                navigation.navigate("DataClub", {
                  params: {
                    id: route.params.idClub,
                    isModerated: true,
                    participate: true,
                  },
                })
              }
              title="cancelar"
              width="full"
            />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ReadingConfiguration;
