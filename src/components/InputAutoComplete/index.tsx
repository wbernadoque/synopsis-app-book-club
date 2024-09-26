import { MotiView } from "moti";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDebounce } from "use-debounce";
import { ClubsIndex } from "../../models/clubs-service-index.model";
import Clubs from "../../services/clubs.service";
import InputText from "../Inputs/InputText";

interface Props {
  label: string;
  error: boolean;
  onChangeText: (e: any) => void;
  value: string;
  placeholder: string;
  getInClubsService: ClubsIndex;
  maxLength?: number;
  nameError?: string;
}

const InputAutoComplete: React.FC<Props> = ({
  error,
  label,
  maxLength = 0,
  nameError = "",
  onChangeText,
  placeholder,
  getInClubsService,
  value,
}) => {
  const [valueSearch, setValueSearch] = useState<string>("");
  const [search] = useDebounce(valueSearch, 800);
  const [listAuthors, setListAuthors] =
    useState<{ name: string; id: string }[]>();

  useEffect(() => {
    if (!!search && search !== value) {
      Clubs[getInClubsService]({ name: search }).then((result) => {
        if (result?.data?.results) {
          setListAuthors(result?.data?.results);
        }
      });
      onChangeText(search);
    }
  }, [search]);

  const renderItemSelect = (item: { id: string; name: string }) => {
    return (
      <TouchableOpacity
        style={{
          display: "flex",
          width: "100%",
          backgroundColor: "#252836",
          alignSelf: "center",
          paddingTop: 8,
          paddingBottom: 8,
        }}
        key={item.id}
        onPress={() => {
          onChangeText(item);
          setValueSearch(item.name);
          setListAuthors([]);
        }}
      >
        <Text style={{ color: "#808191" }} allowFontScaling={false}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ position: "relative" }}>
      <InputText
        label={label}
        error={error}
        onChangeText={setValueSearch}
        value={valueSearch}
        placeholder={placeholder}
        maxLength={maxLength}
        nameError={nameError}
      />
      {!!listAuthors?.length && (
        <MotiView
          style={{
            width: Dimensions.get("screen").width - 32,
            marginLeft: 16,
            marginTop: -10,
            // marginRight: 16,
            zIndex: 9999,
            height: "auto",
            maxHeight: 196,
          }}
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <View
            style={{
              display: "flex",
              width: Dimensions.get("screen").width - 32,
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
              backgroundColor: "#252836",
              borderRadius: 16,
              zIndex: 99999,
              height: "auto",
              maxHeight: 196,
              overflow: "hidden",
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            <ScrollView horizontal>
              <FlatList
                data={listAuthors}
                renderItem={({ item }) => renderItemSelect(item)}
                nestedScrollEnabled
                contentContainerStyle={{
                  width: Dimensions.get("screen").width - 65,
                }}
              />
            </ScrollView>
          </View>
        </MotiView>
      )}
    </View>
  );
};

export default InputAutoComplete;
