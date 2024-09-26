import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { Container, GoalTitle, ContainerInfo, OptionItem } from './styles';
import { Checkbox } from 'react-native-paper';
import { Colors } from '../../styles/global';
import { Goals } from '../../models/goals.model';
import dayjs from 'dayjs';
import { StackNavigationProp } from '@react-navigation/stack';
import { MyClubsStackParamList } from '../StackMyClubs';
import { useNavigation } from '@react-navigation/native';

type Club = StackNavigationProp<MyClubsStackParamList, any>;

interface Props {
  data: Goals;
  type: any;
  moderated?: 'naoParticipante' | 'participante' | 'moderador';
  itemsToDelete?: (e: string) => void;
  removeGoal?: (e: string) => void;
  itemsChecked?: (e: any) => void;
  handleEndingGoal?: (e: string, value: boolean) => void;
}
const GoalItem: React.FC<Props> = ({
  data,
  type,
  moderated,
  itemsToDelete,
  removeGoal,
  itemsChecked,
  handleEndingGoal,
}) => {
  const [checked, setChecked] = React.useState(false);
  const [options, setOptions] = React.useState(false);
  const [typeItem, setTypeItem] = useState<'edit' | 'view'>('view');
  const navigation = useNavigation<Club>();

  const optionClick = () => {
    setOptions(!options);
  };

  return (
    <>
      <Container onPress={() => setOptions(false)} activeOpacity={1}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
            marginVertical: 6,
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {type === 'edit' && (
              <View
                style={{
                  borderColor:
                    Platform.OS === 'ios' ? Colors.whiteText : 'transparent',
                  borderWidth: Platform.OS === 'ios' ? 1 : 0,
                  width: 28,
                  height: 28,
                  borderRadius: 4,
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: -6,
                    left: -4,
                    width: 32,
                    height: 32,
                  }}
                >
                  <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    color={Colors.primary}
                    uncheckedColor={Colors.whiteText}
                    onPress={() => {
                      setChecked(!checked);
                      !!itemsToDelete && itemsToDelete(data?.id);
                      !!itemsChecked && itemsChecked(data.id);
                    }}
                  />
                </View>
              </View>
            )}
            {type === 'view' && (
              <View>
                <Image
                  source={
                    !data.is_active
                      ? require('../../../assets/images/done-on.png')
                      : require('../../../assets/images/check-reading.png')
                  }
                />
              </View>
            )}

            <GoalTitle
              numberOfLines={1}
              ellipsizeMode="tail"
              allowFontScaling={false}
            >
              {data?.name}
            </GoalTitle>
          </View>
          {moderated === 'moderador' && (
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                // marginRight: 12,
                // backgroundColor: 'red',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => optionClick()}
            >
              <Image
                source={require('../../../assets/images/options-point.png')}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginLeft: 56, justifyContent: 'flex-start' }}>
          <ContainerInfo>
            <Image
              source={require('../../../assets/images/Bookmark-border.png')}
            />
            <Text
              allowFontScaling={false}
              style={{
                color: Colors.grey,
                fontSize: 16,
                margin: 4,
                width: '90%',
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {data.description}
            </Text>
          </ContainerInfo>
          <ContainerInfo>
            <Image
              style={{ marginHorizontal: 2 }}
              source={require('../../../assets/images/Calendar-today.png')}
            />
            <Text
              style={{
                color: Colors.grey,
                fontSize: 16,
                margin: 4,
              }}
              allowFontScaling={false}
            >
              {dayjs(data.predicted_ending).format('DD/MM/YYYY')}
            </Text>
          </ContainerInfo>
        </View>
      </Container>
      {options && (
        <View
          style={{
            position: 'absolute',
            zIndex: 9999,
            top: -4,
            right: 42,
            width: 155,
            height: 120,
            backgroundColor: Colors.whiteSecondary,
            padding: 8,
            paddingHorizontal: 12,
          }}
        >
          <OptionItem
            onPress={() => {
              handleEndingGoal &&
                handleEndingGoal(data?.id || '', !data?.is_active);
              setOptions(false);
            }}
          >
            {data?.is_active ? (
              <>
                <Image
                  source={require('../../../assets/images/done-all.png')}
                />
                <Text
                  style={{
                    color: Colors.grey,
                    fontSize: 16,
                    marginLeft: 16,
                  }}
                  allowFontScaling={false}
                >
                  concluir
                </Text>
              </>
            ) : (
              <>
                <Image
                  source={require('../../../assets/images/remove-done.png')}
                />
                <Text
                  style={{
                    color: Colors.grey,
                    fontSize: 16,
                    marginLeft: 16,
                  }}
                  allowFontScaling={false}
                >
                  retomar
                </Text>
              </>
            )}
          </OptionItem>
          {/* <OptionItem style={{ opacity: 0.5 }}>
            <Image source={require('../../../assets/images/discussao.png')} />
            <Text
              style={{
                color: Colors.grey,
                fontSize: 16,
                marginLeft: 12,
              }}
              allowFontScaling={false}
            >
              discussão
            </Text>
          </OptionItem> */}
          <OptionItem
            onPress={() => {
              navigation.navigate('CreateReadingGoal', {
                id: data?.reading_id,
                idGoal: data?.id,
              });
              setOptions(false);
            }}
          >
            <Image source={require('../../../assets/images/Edit.png')} />
            <Text
              style={{ color: Colors.grey, fontSize: 16, marginLeft: 14 }}
              allowFontScaling={false}
            >
              editar
            </Text>
          </OptionItem>
          <OptionItem
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              !!removeGoal && removeGoal(data?.id);
              setOptions(false);
            }}
          >
            <Image source={require('../../../assets/images/excluir.png')} />
            <Text
              style={{ color: Colors.grey, fontSize: 16, marginLeft: 14 }}
              allowFontScaling={false}
            >
              excluir
            </Text>
          </OptionItem>
        </View>
      )}
    </>
  );
};
export default GoalItem;
