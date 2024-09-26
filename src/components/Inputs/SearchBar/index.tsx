import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { Colors } from '../../../styles/global';
import { ContainerSearch, ImageSearch, InputSearch } from './styles';

interface Props {
  onChange: (e: string) => void;
  value: string;
  padding?: string;
}

const SearchBar: React.FC<Props> = ({ onChange, value, padding }) => {
  const handleInput = (text: string) => {
    onChange(text);
  };

  return (
    <>
      <ContainerSearch>
        <ImageSearch
          style={{ resizeMode: 'contain' }}
          source={require('../../../../assets/images/search.png')}
        />
        <InputSearch
          value={value}
          onChangeText={(search) => handleInput(search)}
          placeholderTextColor={Colors.grey}
          placeholder={padding ?? 'Busque por clube'}
        />
      </ContainerSearch>
    </>
  );
};

export default SearchBar;
