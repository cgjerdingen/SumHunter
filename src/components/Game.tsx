
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RandomNumber from './RandomNumber';
import Target from './Tartget';

// TouchableOpacity
// TouchableHighlight

interface GameProps {
    randomNumberCount: number;
  }
  
const Game = (props: GameProps) => {
    //target = 10 + Math.floor(Math.random() * 89);
    

    const generateRandomNumbers = () =>
        Array.from({ length: props.randomNumberCount })
            .map(() => 1 + Math.floor(Math.random() * 29));

    const calculateTarget = (numbers: number[]) =>
        numbers
            .slice(0, props.randomNumberCount - 2)
            .reduce((acc, curr) => acc + curr, 0);

    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]); 
    const [randomNumbers, setRandomNumbers] = useState<number[]>(generateRandomNumbers());
    const [target, setTarget] = useState<number>(() =>
        calculateTarget(randomNumbers)
    );



    // const target = randomNumbers
    //     .slice(0, props.randomNumberCount - 2)
    //     .reduce((acc, curr) => acc + curr, 0);
    const isNumberSelected = (numberIndex: number) => {
        return selectedNumbers.indexOf(numberIndex) >= 0;
    };  

    const selectNumber = (numberIndex: number) => {
            setSelectedNumbers([...selectedNumbers, numberIndex]);
    };


    const gameReset = (targetStatus: string) => {
        console.log('Game reset with status:', targetStatus);
        if (targetStatus !== 'playing') {
            // 1. Show the current target and selected numbers in the console 
            console.log('current target:', target);
            console.log('current selectedNumbers:', selectedNumbers);
            console.log('current randomNumbers:', randomNumbers);
            setSelectedNumbers([]);

            // 2. Generate new random numbers and store them in a temporary variable
            const newRandomNumbers = generateRandomNumbers();

            // 3. Calculate the new target based on these new random numbers
            const newTarget = calculateTarget(newRandomNumbers);

            
            setRandomNumbers(newRandomNumbers);
            setTarget(newTarget);


            console.log('Game state scheduled to reset.');
            console.log('New target:', target);
            console.log('New Random numbers:', randomNumbers);
            console.log('New selected numbers:', selectedNumbers);
        }   
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
    // const targetPanelStyle = (status: string) => {
    //     switch (status) {
    //         case 'playing':
    //             return styles.STATUS_PLAYING;
    //         case 'won':
    //             return styles.STATUS_WON;
    //         case 'lost':
    //             return styles.STATUS_LOST;
    //         default:
    //             return {};
    //     }  
    // };
    // Log the game status


    const status = gameStatus();
    console.log('Game status:', status);
  return (

    <View style={styles.container}>
        <Target
            target={target}
            status={status}
            onPress={gameReset}
        />
        {/* <Text style={[styles.target, styles[`STATUS_${status.toUpperCase()}`]]}>{target}</Text> */}
        <View style={styles.randomContainer}>
        {randomNumbers.map((number, index) => 
            <RandomNumber 
                key={index} 
                id={index} 
                number={number}
                isPressed={isNumberSelected(index)} 
                isDisabled={isNumberSelected(index) || status !== 'playing'}
                onPress={selectNumber}
            />
        )} 
        </View>
        <Text>{status}</Text>
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
        marginHorizontal: 20,
        },
    randomContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        // marginTop: 20,
    },
    STATUS_PLAYING: {
        backgroundColor: '#bbb',
    },
    STATUS_WON: {
        backgroundColor: 'green',
    },
    STATUS_LOST: {
        backgroundColor: 'red',
    },
}


);

const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array]; // Create a shallow copy to avoid mutating the original
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]]; // Swap elements
    }
    return newArray;
};