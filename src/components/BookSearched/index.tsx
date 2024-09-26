import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Book } from "../../models/book.model";
import { Colors } from "../../styles/global";
import { TextBook } from "./styles";

interface Props {
  selectBook: (item: Book) => void;
  item: Book;
}

const BookSearched: React.FC<Props> = ({ item, selectBook }) => {
  const [onErrorImage, setOnErrorImage] = useState<boolean>(false);
  return (
    <TouchableOpacity
      onPress={() => selectBook(item)}
      key={item.id}
      style={{ position: "relative" }}
    >
      <Image
        source={
          item?.cover && !onErrorImage
            ? { uri: item?.cover }
            : require("../../../assets/images/cover-book.png")
        }
        style={{ width: 99, height: 146, borderRadius: 10, margin: 16 }}
        onError={() => setOnErrorImage(true)}
      />

      {onErrorImage && (
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            width: 99,
            height: 146,
            flex: 1,
            top: 0,
            left: 0,
            margin: 16,
          }}
        >
          <TextBook
            numberOfLines={2}
            ellipsizeMode={"tail"}
            allowFontScaling={false}
          >
            {item?.title}
          </TextBook>
          <TextBook
            numberOfLines={2}
            ellipsizeMode={"tail"}
            allowFontScaling={false}
          >
            {item?.author}
          </TextBook>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default BookSearched;
