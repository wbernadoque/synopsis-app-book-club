import React, { useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Category } from '../../models/category.enum';
import ButtonPrimary from '../Button';
import ButtonSecondary from '../ButtonSecondary';
import {
  ContainerCard,
  ContainerData,
  ContainerImage,
  DataClub,
  DescriptionAuthor,
  TitleCardClub,
} from './styles';

interface Props {
  author?: string;
  title: string;
  participants?: number;
  typeClub?: string;
  imageBook: string;
  handleFunctionButton: () => void;
  navigation?: () => void;
  descriptionButton: string;
  backgroundButtonGrey?: boolean;
  category?: keyof typeof Category;
  hasCategory?: boolean;
  hasAuthorOnParticipants?: boolean;
}

const CardClubDoYouLike: React.FC<Props> = ({
  author,
  title,
  participants = 1,
  typeClub,
  imageBook,
  handleFunctionButton,
  descriptionButton,
  backgroundButtonGrey,
  navigation,
  category,
  hasCategory,
  hasAuthorOnParticipants,
}) => {
  const [imageError, setImageError] = useState<boolean>(false);
  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity onPress={navigation}>
        <ContainerCard>
          <ContainerImage>
            <Image
              onError={() => setImageError(true)}
              source={
                imageError
                  ? require('../../../assets/images/banner-clube.png')
                  : { uri: imageBook }
              }
              resizeMode="cover"
              defaultSource={require('../../../assets/images/banner-clube.png')}
              style={{ width: 106, height: 106, resizeMode: 'cover' }}
            />
          </ContainerImage>
          <ContainerData>
            <TitleCardClub
              numberOfLines={1}
              ellipsizeMode="tail"
              allowFontScaling={false}
              style={{ lineHeight: 22 }}
            >
              {title}
            </TitleCardClub>
            {hasCategory && category ? (
              <>
                <DescriptionAuthor
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  allowFontScaling={false}
                  style={{ lineHeight: 14 }}
                >
                  {Category[category]}
                </DescriptionAuthor>
              </>
            ) : (
              <DescriptionAuthor
                numberOfLines={1}
                ellipsizeMode="tail"
                allowFontScaling={false}
                style={{ lineHeight: 14 }}
              >
                {author}
              </DescriptionAuthor>
            )}
            <DataClub
              allowFontScaling={false}
              style={{
                lineHeight: 14,
                width: hasAuthorOnParticipants ? 200 : 'auto',
              }}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {!hasAuthorOnParticipants
                ? `${
                    participants > 1
                      ? `${participants} participantes`
                      : `${participants} participante`
                  } `
                : author}
              {typeClub
                ? typeClub === 'MONTHLY'
                  ? ' • Mensal'
                  : '• Semanal'
                : ''}
            </DataClub>
            {/* <View style={{ alignSelf: 'flex-end', marginTop: 8 }}>
            {!backgroundButtonGrey ? (
              <ButtonPrimary
                padding="0px"
                width={114}
                title={descriptionButton}
                navigation={handleFunctionButton}
              />
            ) : (
              <ButtonSecondary
                width={114}
                padding="0px"
                title={descriptionButton}
                navigation={handleFunctionButton}
              />
            )}
          </View> */}
          </ContainerData>
        </ContainerCard>
      </TouchableOpacity>
      <View
        style={{
          alignSelf: 'flex-end',
          marginTop: 8,
          position: 'absolute',
          bottom: 30,
          right: 30,
        }}
      >
        {!backgroundButtonGrey ? (
          <ButtonPrimary
            padding="0px"
            width={114}
            title={descriptionButton}
            navigation={handleFunctionButton}
          />
        ) : (
          <ButtonSecondary
            width={114}
            padding="0px"
            title={descriptionButton}
            navigation={handleFunctionButton}
          />
        )}
      </View>
    </View>
  );
};

export default CardClubDoYouLike;
