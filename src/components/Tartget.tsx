import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TargetProps {
  target: number;
  onPress: (status: string) => void;
    // If you want to pass the target value back on press
  status: string; // 'playing', 'won', or 'lost'
}

const Target: React.FC<TargetProps> = ({ target, status, onPress }) => {
  return (
    
    <TouchableOpacity style={styles.container} onPress={() => {
      // Add your onPress logic here if needed
    onPress(status); // This is just a placeholder, you can modify it as needed
    }}>
        <View >
            <Text style={[styles.target, styles[`STATUS_${status.toUpperCase()}`]]}>{target}</Text>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
        backgroundColor: '#ddd',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
  target: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#000',
        //textAlign: 'center',
        paddingLeft: 40,
        paddingRight: 40,

   },
  STATUS_PLAYING: {
    backgroundColor: 'black',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
});

export default Target;
