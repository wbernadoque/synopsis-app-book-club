import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native';
import { Colors } from '../../styles/global';

interface Props {
  label: string;
  selectData: string[][];
  onChange: (e: string) => void;
  defaultValue: string;
  initialDescription?: string;
}

const Select: React.FC<Props> = ({
  label,
  selectData,
  onChange,
  defaultValue,
  initialDescription = 'Selecione a categoria',
}) => {
  const [valueSelected, setValueSelected] = useState<string>('');
  const [showList, setShowList] = useState<boolean>(false);

  useEffect(() => {
    if (defaultValue) {
      const result = selectData.filter((item) => {
        return defaultValue === item[0];
      });

      setValueSelected(result[0][1]);
    }
  }, [defaultValue]);

  const renderItemSelect = (item: string[]) => {
    return (
      <TouchableOpacity
        style={{
          display: 'flex',
          width: '100%',
          backgroundColor: '#252836',
          alignSelf: 'center',
          paddingTop: 8,
          paddingBottom: 8,
        }}
        key={item[0]}
        onPress={() => {
          setValueSelected(item[1]);
          onChange(item[0]);
          setShowList(false);
        }}
      >
        <Text
          style={{ color: '#808191', fontSize: 16 }}
          allowFontScaling={false}
        >
          {item[1]}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View
        style={{
          position: 'relative',
          width: Dimensions.get('screen').width - 32,
          // marginLeft: 16,
          // marginRight: 16,
          zIndex: 999,
        }}
      >
        <Text
          style={{
            width: '100%',
            color: Colors.grey,
            marginBottom: 8,
            fontSize: 16,
            marginTop: 16,
            textAlign: 'left',
          }}
          allowFontScaling={false}
        >
          {label}
        </Text>
        <TouchableOpacity
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: '#252836',
            borderRadius: 64,
            borderColor: showList ? '#9b3a89' : '',
            borderWidth: showList ? 1 : 0,
            marginBottom: 4,
            padding: 16,
            height: 48,
          }}
          onPress={() => setShowList(!showList)}
        >
          <Text
            style={[
              {
                color: Colors.whiteTrue,
                fontSize: 16,
                height: 20,
              },
            ]}
            allowFontScaling={false}
          >
            {valueSelected || initialDescription}
          </Text>
          <MotiView
            from={{ rotate: showList ? '180deg' : '0deg' }}
            animate={{ rotate: !showList ? '180deg' : '0deg' }}
          >
            <Image
              source={require('../../../assets/images/arrow-drop-up.png')}
            />
          </MotiView>
        </TouchableOpacity>
      </View>
      {showList && (
        <MotiView
          style={[
            styles.shadowBox,
            {
              width: Dimensions.get('screen').width - 32,
              // marginLeft: 16,
              // marginRight: 16,
              zIndex: 9999,
              height: 193,
            },
          ]}
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <View
            style={{
              display: 'flex',
              width: Dimensions.get('screen').width - 32,
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'row',
              backgroundColor: '#252836',
              borderRadius: 16,
              zIndex: 99999,
              height: 193,
              overflow: 'hidden',
              paddingLeft: 16,
              paddingRight: 8,
            }}
          >
            <ScrollView horizontal>
              <FlatList
                data={selectData}
                renderItem={({ item }) => renderItemSelect(item)}
                nestedScrollEnabled
                contentContainerStyle={{
                  width: Dimensions.get('screen').width - 55,
                }}
              />
            </ScrollView>
          </View>
        </MotiView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  shadowBox: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
});

export default Select;
