import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import ButtonPrimary from '../../../components/Button';
import ButtonAdd from '../../../components/ButtonAdd';
import ButtonBack from '../../../components/ButtonBack';
import Container from '../../../components/Container';
import GoalItem from '../../../components/GoalItem';
import PageLoading from '../../../components/PageLoading';
import { MyClubsStackParamList } from '../../../components/StackMyClubs';
import { Goals } from '../../../models/goals.model';
import Clubs from '../../../services/clubs.service';
import { Colors } from '../../../styles/global';
import { ToastyContext } from '../../../utils/ToastyGlobal';
import Loading from '../../loading';
import { Title } from '../../signup/styles';

type Search = StackNavigationProp<MyClubsStackParamList>;

interface Props {
  route?: any;
}
const GoalList: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<Search>();
  const [goals, setGoals] = useState<Goals[]>();
  const [listToDelete, setListToDelete] = useState<string[]>([]);
  const [listToActive, setListToActive] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { createToasty } = useContext(ToastyContext);

  const goBack = () => {
    navigation.goBack();
  };

  useFocusEffect(
    React.useCallback(() => {
      getGoals(route.params.id);
    }, [])
  );

  const getGoals = async (id: string) => {
    setLoading(true);
    const result = await Clubs.getGoals(id);
    if (result?.data) {
      setGoals(result?.data);
    } else {
      createToasty(
        true,
        'Ops! Algo deu de errado',
        'Não foi possível obter a lista de metas!',
        true
      );
    }
    setLoading(false);
  };

  const deleteGoals = () => {
    setLoading(true);
    listToDelete.forEach((item) => {
      Clubs.deleteGoal(item).then((response) => {});
    });
    getGoals(route.params.id);
    // setListToDelete([]);
  };

  const handleSubmit = async () => {
    // if(route)
    const newGoalData = goals?.map((item) => {
      return {
        ...item,
        is_active: listToActive.indexOf(item.id) === -1 ? true : false,
      };
    });

    await newGoalData?.forEach(async (item) => {
      const response = await Clubs.editGoal(
        {
          predicted_ending: item?.predicted_ending,
          description: item?.description,
          name: item?.name,
          is_active: item?.is_active,
        },
        item.id
      );
    });

    navigation.navigate('ReadingInProgress', {
      id: route.params.id || '',
      member: true,
      moderator: true,
    });
  };

  return (
    <Container>
      <>
        {loading && <PageLoading />}
        <View style={{ width: '100%', flex: 1 }}>
          <ButtonBack navigation={goBack} />
          <Title
            style={{ marginTop: 86, marginBottom: 24 }}
            allowFontScaling={false}
          >
            Resumo de metas
          </Title>
          <View style={{ flex: 1, padding: 12 }}>
            <FlatList
              data={goals}
              style={{ marginHorizontal: 8 }}
              ListFooterComponent={
                <View
                  style={{
                    alignItems: 'flex-end',
                    margin: 8,
                  }}
                >
                  <ButtonAdd
                    onPress={() =>
                      navigation.navigate('CreateReadingGoal', {
                        id: route?.params?.id || '',
                      })
                    }
                  />
                </View>
              }
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <GoalItem
                  type="edit"
                  data={item}
                  itemsToDelete={(id: string) => {
                    listToDelete.indexOf(id) === -1
                      ? listToDelete.push(id)
                      : listToDelete.splice(listToDelete.indexOf(id), 1);
                    setListToDelete(listToDelete);
                  }}
                  itemsChecked={(id: string) => {
                    listToActive.indexOf(id) === -1
                      ? listToActive.push(id)
                      : listToActive.splice(listToActive.indexOf(id), 1);
                    setListToActive(listToActive);
                  }}
                />
              )}
            />
          </View>
          <View
            style={{
              position: 'relative',
              width: '100%',
              alignItems: 'center',
              paddingHorizontal: 12,
            }}
          >
            <TouchableOpacity
              style={{
                width: Dimensions.get('screen').width - 32,
                height: 48,
                backgroundColor: Colors.whiteSecondary,
                borderRadius: 48,
                marginBottom: 16,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => listToDelete.length > 0 && deleteGoals()}
            >
              <Image
                source={require('../../../../assets/images/trash-can.png')}
              />
              <Text
                style={{ color: Colors.whiteText, marginHorizontal: 7 }}
                allowFontScaling={false}
              >
                {' '}
                excluir
              </Text>
            </TouchableOpacity>
            <ButtonPrimary
              title={'concluir'}
              width={'full'}
              navigation={() => {
                handleSubmit();
              }}
            />
          </View>
        </View>
      </>
    </Container>
  );
};

export default GoalList;
