import React from 'react';
import { Text, View, TextInput } from 'react-native';
import { Button } from 'react-native-web';


let txt = '';
export default function Login({ navigation }) {

  function setText(text) {
    txt = text;
  }


  return (
    <View>
      <View>
        Loja de Brunno Marques
      </View>
      <TextInput
        placeholder='Usuário'
        placeholderTextColor='#747474'
        
        style={{
          fontSize: 15,
          marginLeft: 10,
          marginRight: 10,
          marginTop: 30,
          backgroundColor: '#FFF',
          padding: 9,
          height: 45,
          textAlignVertical: 'top',
          color: '#000',
          borderRadius: 5,
        }}
        onChangeText={(texto) => setText(texto)}
      />

      <Button title="Entrar"
        onPress={() => navigation.navigate('Home', { pessoa: txt })}
      >
      </Button>

    </View>
  );
};
