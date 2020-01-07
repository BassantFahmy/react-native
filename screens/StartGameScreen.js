import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Alert, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';

import Card from '../components/Card'
import Colors from '../constants/colors';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';



const StartGameScreen = props => {
    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]g/, ''));
    };
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number', 'number should be bigger than 0 and smaller than 99',
                [{
                    text: 'OK',
                    style: 'destructive', onPress: resetInputHandler
                }])
            return
        }
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(parseInt(enteredValue))
        Keyboard.dismiss();
    }
    let confirmedOutput;
    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summaryContainer}>
                <Text>You selected</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <Button title="Start Game"/>
            </Card>
    }
    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
        }}>
            <View style={styles.screen}>
                <Text style={styles.title}>Start a new game!</Text>
                <Card style={styles.inputContainer}>
                    <Text>Select a Number!</Text>
                    <Input style={styles.input}
                        blurOnSumbit
                        autoCapitalize='none'
                        autoCorrect={false}
                        keyboardType="number-pad"
                        maxLength={2}
                        onChangeText={numberInputHandler}
                        value={enteredValue} />
                    <View style={styles.buttonContainer}>
                        <View><Button style={styles.Button} color={Colors.accent} title="Reset" onPress={resetInputHandler} /></View>
                        <View><Button style={styles.Button} color={Colors.primary} title="Confirm" onPress={confirmInputHandler} /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    title: {
        fontSize: 20,
        marginVertical: 10
    },
    inputContainer: {
        width: 300,
        maxWidth: '80%',
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15

    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    Button:{
        width:100
    }
})
export default StartGameScreen;