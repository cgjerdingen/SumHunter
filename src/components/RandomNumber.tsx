import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface RandomNumberProps {
    number: number;
    isPressed: boolean;
    isDisabled: boolean;
    onPress: (numberIndex: number) => void;
    id: number;
}

const RandomNumber = (props: RandomNumberProps) => {
    //const [randomNumber, setRandomNumber] = useState<number>([]);

    // useEffect(() => {
    //     setRandomNumber(number);
    // }, [number]);
    const handlePress = () => {
        if (props.isDisabled) { return; } // If the number is disabled, do}   
        props.onPress(props.id); // Call the onPress function with the id 
        console.log('Number pressed:', props.number);
    };  
    return (     
        <TouchableOpacity onPress={handlePress}>   
                <Text style={[styles.random, props.isDisabled && styles.randomDisabled, props.isPressed && styles.randomPressed,]}>
                    {props.number}
                </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    random: {
        width: 100,
        marginHorizontal: 15,
        marginVertical: 25,
        fontSize: 35,
        backgroundColor: '#999',
        textAlign: 'center',
        //opacity: 0.3,
    },
    randomDisabled: {
        backgroundColor: '#ccc',
        opacity: 0.3,
    },
    randomPressed: {
        backgroundColor: 'cornflowerblue',
        opacity: 0.3,
    },
});

export default RandomNumber;
