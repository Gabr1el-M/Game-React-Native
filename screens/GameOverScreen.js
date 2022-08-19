import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import Colors from '../constants/colors';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';

export default function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
  return (
    <View style={styles.rootContainer}>
      <Title>FIM DE JOGO!</Title>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/success.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.sumaryText}>
      Seu celular precisou de <Text style={styles.heigthLight}>{roundsNumber}</Text> rodadas para 
        adivinhar o numero <Text style={styles.heigthLight}>{userNumber}</Text>.
      </Text>
      <PrimaryButton onPress={onStartNewGame}>Começar Novo Jogo</PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
    rootContainer: {
      flex: 1,
      padding: 24,
      justifyContent: 'center',
      alignItems: 'center',
    },
    imageContainer: {
      width: 300,
      height: 300,
      borderRadius: 150,
      borderWidth: 3,
      borderColor: Colors.primary800,
      overflow: 'hidden',
      margin: 36,
    },
    image: {
      width: '100%',
      heigth: '100%'
    },
    sumaryText: {
      // fontFamily: 'open-sans',
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 24
    },
    heigthLight: {
      // fontFamily: 'open-sans-bold',
      color: Colors.primary500
    }
});