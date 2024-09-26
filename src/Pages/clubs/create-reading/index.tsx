import React, { useState, useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";

import {
  Dimensions,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { Colors } from "../../../../src/styles/global";
import Routes, { RootStackParamList } from "../../../routes";
import { StackNavigationProp } from "@react-navigation/stack";
import { Container, Title, TitleCenter, TextCenter } from "../../search/styles";
import ButtonBack from "../../../components/ButtonBack";
import SearchBar from "../../../components/Inputs/SearchBar";
import { ImageHero } from "../../login/styles";
import CardClubDoYouLike from "./../../../components/CardClubDoYouLike/index";
import {
  ContainerModalDataPage,
  ContainerScroll,
  ContentData,
  TextModalAuthor,
  TextModalTitle,
} from "./styles";
import { ButtonS } from "../../../components/ButtonSecondary/styles";
import ButtonSecondary from "../../../components/ButtonSecondary";
import { Modalize } from "react-native-modalize";
import ButtonPrimary from "../../../components/Button";
import { MyClubsStackParamList } from "../../../components/StackMyClubs";
import { useDebounce } from "use-debounce";
import { Book } from "../../../models/book.model";
import Clubs from "../../../services/clubs.service";
import PageLoading from "../../../components/PageLoading";
import BookSearched from "../../../components/BookSearched";
interface Props {
  route?: any;
}
type Search = StackNavigationProp<MyClubsStackParamList>;
const CreateReading: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<Search>();

  const [searchInput, setSearchInput] = useState<string>("");
  const [booksSearch, setBooksSearch] = useState<Book[]>();
  const [selectedBook, setSelectedBook] = useState<Book>();
  const modalizeRef = useRef<any>(null);
  const [searchDebounce] = useDebounce(searchInput, 800);
  const [loading, setLoading] = useState<boolean>(false);
  const [onErrorImage, setOnErrorImage] = useState<boolean>(false);
  const [onErrorImageModalize, setOnErrorImageModalize] =
    useState<boolean>(false);

  useEffect(() => {
    if (searchDebounce) {
      searchBook(searchDebounce);
    } else {
      setBooksSearch([]);
    }
  }, [searchDebounce]);

  const searchBook = async (value: string) => {
    setLoading(true);

    const result = await Clubs.searchBook(value);
    if (result?.data?.results.length) {
      setBooksSearch(result?.data?.results);
    } else {
      setBooksSearch([]);
    }
    setLoading(false);
  };

  const goBack = () => {
    navigation.goBack();
  };
  const selectBook = (data: any) => {
    setSelectedBook(data);
    modalizeRef?.current?.open();
  };

  return (
    <Container
      style={{
        justifyContent: "flex-start",
      }}
    >
      {loading && <PageLoading />}
      <ButtonBack navigation={goBack} />

      <Title
        style={{
          marginTop: Platform.OS === "ios" ? 42 : 92,
          marginRight: 16,
          marginBottom: Platform.OS === "ios" ? -26 : -76,
          marginLeft: 16,
          color: Colors.whiteText,
        }}
        allowFontScaling={false}
      >
        Selecione o livro
      </Title>

      <SearchBar
        onChange={setSearchInput}
        value={searchInput}
        padding="Busque por livro ou autor"
      />

      {!!booksSearch && null}
      {searchDebounce && booksSearch?.length === 0 && !loading && (
        <View
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ImageHero
            source={require("../../../../assets/images/search-club.png")}
            resizeMode="contain"
          />
          <TitleCenter allowFontScaling={false}>
            Ops! Não encontramos nenhum resultado{" "}
          </TitleCenter>
          <TextCenter
            lineBreakMode="tail"
            textBreakStrategy="highQuality"
            allowFontScaling={false}
          >
            Tente buscar novamente ou adicione manualmente esse livro
          </TextCenter>
        </View>
      )}
      <FlatList
        // onStartShouldSetResponder={() => true}
        data={booksSearch}
        horizontal={false}
        numColumns={3}
        style={{ maxHeight: "70%" }}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={{ justifyContent: "flex-start" }}
        renderItem={({ item, index, separators }) => (
          <BookSearched item={item} selectBook={selectBook} key={item.id} />
        )}
      />
      <View
        style={{
          width: "100%",
          alignItems: "center",
          paddingBottom: 24,
          paddingTop: 24,
          alignSelf: "flex-end",
        }}
      >
        {/* <TextCenter style={{ marginBottom: 24 }}>
          ou adicione manualmente
        </TextCenter> */}
        <ButtonSecondary
          width={"full"}
          title={"adicionar manualmente"}
          navigation={() =>
            navigation.navigate("CreateReadingManual", {
              idClub: route.params.params.idClub,
            })
          }
        />
      </View>
      <Modalize
        ref={modalizeRef}
        onClose={() => setOnErrorImageModalize(false)}
        handlePosition="inside"
        modalHeight={Dimensions.get("screen").height - 200}
        handleStyle={{ backgroundColor: Colors.whiteSecondary }}
        modalStyle={{
          backgroundColor: Colors.backgroundDark,
          paddingLeft: 16,
          paddingRight: 16,
        }}
        FloatingComponent={
          <View
            style={{
              marginLeft: 16,
              marginRight: 16,
              backgroundColor: Colors.backgroundDark,
            }}
          >
            <ButtonPrimary
              title={"selecionar livro"}
              navigation={() => {
                navigation.navigate("ReadingConfiguration", {
                  book: selectedBook || ({} as Book),
                  idClub: route.params.params.idClub,
                });
              }}
            />
          </View>
        }
        // HeaderComponent={() => {
        //   return <TitleModalCard>Participantes ({data.more})</TitleModalCard>;
        // }}
      >
        <View style={{ flex: 1, marginBottom: 16 }}>
          <View style={{ alignItems: "center" }}>
            <Image
              source={
                selectedBook?.cover && !onErrorImageModalize
                  ? { uri: selectedBook?.cover }
                  : require("../../../../assets/images/banner-clube.png")
              }
              style={{
                width: 124,
                height: 184,
                borderRadius: 10,
                marginTop: 40,
              }}
              onError={() => setOnErrorImageModalize(true)}
            />
            <TextModalTitle allowFontScaling={false}>
              {selectedBook?.title}
            </TextModalTitle>
            <TextModalAuthor allowFontScaling={false}>
              {selectedBook?.author}
            </TextModalAuthor>
          </View>

          <ContainerModalDataPage>
            <ContentData>
              <TextModalTitle
                style={{ marginTop: 0, width: 140, textAlign: "center" }}
                ellipsizeMode="tail"
                numberOfLines={1}
                allowFontScaling={false}
              >
                {selectedBook?.publisher_imprint || selectedBook?.publisher}
              </TextModalTitle>
              <TextModalAuthor allowFontScaling={false}>
                editora
              </TextModalAuthor>
            </ContentData>
            <ContentData
              style={{
                borderLeftWidth: 0.25,
                borderLeftColor: Colors.whiteTrue,
              }}
            >
              <TextModalTitle style={{ marginTop: 0 }} allowFontScaling={false}>
                {selectedBook?.page_qty}
              </TextModalTitle>
              <TextModalAuthor allowFontScaling={false}>
                páginas
              </TextModalAuthor>
            </ContentData>
          </ContainerModalDataPage>
          <TextCenter
            style={{
              marginTop: 24,
              lineHeight: 32,
              textAlign: "left",
              maxWidth: Dimensions.get("window").width - 32,
            }}
            allowFontScaling={false}
          >
            {selectedBook?.synopsis}
          </TextCenter>
        </View>
      </Modalize>
    </Container>
    // </ContainerScroll>
    // </TouchableWithoutFeedback>
  );
};
export default CreateReading;
