
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RandomNumber from './RandomNumber';
// TouchableOpacity
// TouchableHighlight

interface GameProps {
    randomNumberCount: number;
  }
  
const Game = (props: GameProps) => {
    //target = 10 + Math.floor(Math.random() * 89);

    const [selectedNumbers, setSelectedNumbers] = useState([0, 4]); 
    
    const randomNumbers = Array.from({ length: props.randomNumberCount })
                    .map(() => 1 + Math.floor(Math.random() * 29)); 
    const target = randomNumbers
        .slice(0, props.randomNumberCount - 2)
        .reduce((acc, curr) => acc + curr, 0);
    const isNumberSelected = (numberIndex: number) => {
        return selectedNumbers.indexOf(numberIndex) >= 0;
    };  

    const selectNumber = (numberIndex: number) => {
            setSelectedNumbers([...selectedNumbers, numberIndex]);
    };

    // Game status logic - calculate the sum of selected numbers and compare it to the target
    const gameStatus = () => {
        const sum = selectedNumbers.reduce((acc, curr) => acc + randomNumbers[curr], 0);
        console.log('Sum:', sum);
       if (sum === target) {
            return 'won';
        } else if (sum > target) {
            return 'lost';
        } else {
            return 'playing';
        }
    };
    const status = gameStatus();
    console.log('Game status:', status);
  return (

    <View style={styles.container}>
        <Text style={styles.target}>{target}</Text>
        <View style={styles.randomContainer}>
        {randomNumbers.map((number, index) => 
            <RandomNumber 
                key={index} 
                id={index} 
                number={number} 
                isDisabled={isNumberSelected(index)}
                onPress={selectNumber}
            />
        )} 
        </View>
    </View>
  );
}

export default Game;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ddd',
        flex: 1,
        //justifyContent: 'center',
        // alignItems: 'center',
    },
    target: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#333',
        backgroundColor: '#fff',
        textAlign: 'center',
        //marginHorizontal: 20,
        },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        // marginTop: 20,
    },
    
}

);