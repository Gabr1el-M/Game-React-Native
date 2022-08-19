import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/game/NumberContainer';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import PrimaryButton from '../components/ui/PrimaryButton';
import Title from '../components/ui/Title';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandowBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandowBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandowBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess])

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, userNumber, onGameOver])

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, [])

    function nextGuessHandler(direction) { // direction => 'lower', 'greater'

        if (direction === 'lower' && currentGuess < userNumber || (direction === 'greater' && currentGuess > userNumber)) {
            Alert.alert('Não minta!', 'você sabe que isso é errado...', [{ text: 'Desculpe', style: 'cancel' }
            ]);
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandowBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds(prevGuessRounds => [newRndNumber, ...prevGuessRounds] );
    }

    const guessRoundsListLenght = guessRounds.length;

    return (
        <View style={styles.screen}>
            <Title>Chutes do seu celular</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Text style={styles.textStyle}>De dicas ao seu celular!</Text>
            <Card>
                <InstructionText style={styles.InstructionText}>Mais ou menos ?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="md-remove" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="md-add" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                {/* {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)} */}
                <FlatList 
                data={guessRounds} 
                renderItem={(itemData) => <GuessLogItem 
                roundNumber={guessRoundsListLenght - itemData.index} 
                guess={itemData.item} 
                /> } 
                keyExtractor={(item) => item} 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    textStyle: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center'
    },
    InstructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    }
});
