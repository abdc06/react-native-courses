import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Title from '../components/ui/Title';
import { useEffect, useState } from 'react';
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomBetween(min, max, exclude) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return randomNumber;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
  const initialValue = generateRandomBetween(1, 100, userNumber);
  const [currentValue, setCurrentValue] = useState(initialValue);
  const [guessRounds, setGuessRounds] = useState([initialValue]);

  useEffect(() => {
    if (currentValue === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentValue, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextValueHandler(direction) {
    //direction => 'lower', 'greater'
    if (
      (direction === 'lower' && currentValue < userNumber) ||
      (direction === 'greater' && currentValue > userNumber)
    ) {
      Alert.alert('사탄', '이건좀...', [{ text: '예', style: 'cancel' }]);
      return;
    }
    if (direction === 'lower') {
      maxBoundary = currentValue;
    } else if (direction === 'greater') {
      minBoundary = currentValue + 1;
    }

    const newRoundNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentValue
    );
    setCurrentValue(newRoundNumber);
    setGuessRounds((prevGuessRounds) => [newRoundNumber, ...prevGuessRounds]);
  }

  return (
    <View style={styles.screen}>
      <Title>추측 결과</Title>
      <NumberContainer>{currentValue}</NumberContainer>
      <Card>
        <InstructionText style={{ marginBottom: 20 }}>
          업? 다운?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextValueHandler.bind(this, 'greater')}>
              <Ionicons name="add" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextValueHandler.bind(this, 'lower')}>
              <Ionicons name="remove" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/*{guessRounds.map((guessRound) => {*/}
        {/*  return <Text key={guessRound}>{guessRound}</Text>;*/}
        {/*})}*/}
        <FlatList
          data={guessRounds}
          renderItem={(guessRound) => {
            return (
              <GuessLogItem
                roundNumber={guessRounds.length - guessRound.index}
                guess={guessRound.item}
              />
            );
          }}
          keyExtractor={(item) => item}
          // alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
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
  },
});
