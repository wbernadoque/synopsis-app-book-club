import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ButtonBack from '../../../components/ButtonBack';
import Container from '../../../components/Container';
import InputText from '../../../components/Inputs/InputText';
import { MyClubsStackParamList } from '../../../components/StackMyClubs';
import { Title } from '../../signup/styles';
import ComponentCalendar from '../../../components/ComponentCalendar';

import { Colors } from '../../../styles/global';
import ButtonPrimary from '../../../components/Button';
import Clubs from '../../../services/clubs.service';
import dayjs from 'dayjs';
import { ToastyContext } from '../../../utils/ToastyGlobal';

type Search = StackNavigationProp<MyClubsStackParamList>;

interface Props {
  route?: any;
}

const CreateReadingGoal: React.FC<Props> = ({ route }) => {
  const navigation = useNavigation<Search>();
  const { createToasty } = useContext(ToastyContext);
  const [date, setDate] = useState<string>('');
  const [dateSubmit, setDateSubmit] = useState<string>('');
  const [goalTitle, setGoalTitle] = useState<string>('');
  const [goalDescription, setGoalDescription] = useState<string>('');
  const [dataGoal, setDataGoal] = useState<{
    creation_date: string;
    description: string;
    id: string;
    name: string;
    predicted_ending: string;
    reading: string;
  }>();

  useFocusEffect(
    React.useCallback(() => {
      setDate('');
      setGoalTitle('');
      setGoalDescription('');
    }, [])
  );

  useEffect(() => {
    if (route?.params?.idGoal) {
      Clubs.getGoal(route?.params?.idGoal).then((response) => {
        setDate(dayjs(response.data.predicted_ending).format('DD/MM/YYYY'));
        setDateSubmit(response.data.predicted_ending);
        setGoalDescription(response.data?.description);
        setGoalTitle(response.data.name);
        setDataGoal(response.data);
      });
    }
  }, [route?.params?.idGoal]);

  const goBack = () => {
    navigation.goBack();
  };

  const createGoal = async () => {
    const result = await Clubs.createGoal({
      name: goalTitle,
      description: goalDescription,
      predicted_ending: dateSubmit,
      reading: route.params.id || '',
    });
    if (result?.status === 200 || result?.status === 201) {
      navigation.navigate('ReadingInProgress', {
        id: route.params.id || '',
        member: true,
        moderator: true,
      });
    } else {
      createToasty(
        true,
        'Ops! Algo deu errado!',
        'Não foi possível adicionar meta, por favor, tente novamente.',
        true
      );
    }
  };

  const editGoal = async () => {
    const response = await Clubs.editGoal(
      {
        predicted_ending: dateSubmit,
        description: goalDescription,
        name: goalTitle,
      },
      route?.params?.idGoal
    );

    if (response.request.status === 200) {
      navigation.navigate('ReadingInProgress', {
        id: route.params.id || '',
        member: true,
        moderator: true,
      });
      createToasty(
        true,
        'Alterações salvas!',
        'Sua meta de leitura já foi atualizada.',
        false
      );
    } else {
      createToasty(
        true,
        'Ops! Algo deu errado!',
        'Não foi possível editar a meta, por favor, tente novamente.',
        true
      );
    }
  };
  return (
    <Container>
      <>
        <ScrollView bounces={false}>
          <ButtonBack navigation={goBack} />
          <Title style={{ marginTop: 86 }} allowFontScaling={false}>
            {route?.params?.idGoal ? 'Editar meta' : 'Adicionar meta'}
          </Title>
          <View style={{ padding: 16 }}>
            <InputText
              label="Nome da meta"
              error={false}
              onChangeText={setGoalTitle}
              value={goalTitle}
              placeholder={'ex. meta 1'}
              maxLength={100}
              nameError={''}
              hasCounter={true}
              numberCounter="100"
            />
            <InputText
              label="Até que parte devem ler"
              error={false}
              onChangeText={setGoalDescription}
              value={goalDescription}
              placeholder={'ex. página 20 ou capítulo 5'}
              maxLength={100}
              nameError={''}
            />

            <Text
              style={{
                color: Colors.grey,
                marginLeft: 16,
                fontSize: 16,
                marginTop: 16,
                marginBottom: 6,
              }}
              allowFontScaling={false}
            >
              Data
            </Text>
            <ComponentCalendar
              setDate={(e) => {
                setDateSubmit(e);
                setDate(dayjs(e).format('DD/MM/YYYY'));
              }}
              dateDefault={date}
            />
          </View>
        </ScrollView>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
          }}
        >
          <ButtonPrimary
            navigation={() =>
              route?.params?.idGoal ? editGoal() : createGoal()
            }
            margin="24px"
            title={route?.params?.idGoal ? 'salvar alterações' : 'criar meta'}
            disabled={
              !(goalTitle?.length > 0 && goalDescription?.length > 0 && !!date)
            }
          />
        </View>
      </>
    </Container>
  );
};

export default CreateReadingGoal;
