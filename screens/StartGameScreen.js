import { TextInput, View, StyleSheet, Alert} from "react-native"
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import Title from "../components/ui/Title";
import InstructionText from "../components/ui/InstructionText";
import { useState } from "react"
//magical! control the keyboard in the textInput
//we need to put each button in it's own view. What does this do? it will apply new flexbox containes to each button and each container will have a flex direction of column and the button will be stretched for it's column
function StartGameScreen({onPickNumber}){
    //catch user input with state!
    //TextInput will always return a string, even though it's from a number-pad, so tell state to expect a string!
    //bind the state to the text input by passing a pointer to it using value
    const [enteredNumber, setEnteredNumber] = useState('');
//do something with every keystroke!
//react will invoke this func for every stroke since they're bound together
    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText)
    }

    //this will run from our alert if the user enters wants to clear the field and choose a new num
    function resetInputHandler(){
        setEnteredNumber('')
    }
//connect the confirm button!
//we need to check the current state, see if it's a num, and if it is greater than or equal to one and 99 or less
function confirmInputHandler(){
    //take the enteredNumber which is a string and turn it to a num
    const chosenNumber = parseInt(enteredNumber);

    //make sure that it is a num
    if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
        //alert user that they did not enter a number, or not the right number
        //can also use Alert.prompt to start a dialogue
        //creates a native alert dialogue built into IOS or Android
        //takes 3 args!
        console.log("nan")
        Alert.alert("Invalid Number!", "Number must be between 1 and 99", [{text:"Okay", style:'destructive', onPress:resetInputHandler}])
        //cancel the exe if we got into the if and it fails
        return
    }
    console.log('Valid Number!!')
    onPickNumber(chosenNumber)
}

    return (
    <View style={styles.rootContainer}>
    <Title>Guess My Number</Title>
    <Card>
        <InstructionText>Enter a Number</InstructionText>
        <TextInput style={styles.textInput}
         maxLength={2}
          keyboardType="number-pad" 
          onSubmitEditing={confirmInputHandler}
          autoCapitalize="none" 
          autoCorrect={false} 
        onChangeText={numberInputHandler} 
        value={enteredNumber}/>
        <View style={styles.buttonContainer}> 
        <View style={styles.buttonViewToStretch}><PrimaryButton onPress={resetInputHandler
        }>Reset</PrimaryButton></View>
       <View style={styles.buttonViewToStretch}><PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton></View>
        </View>
        </Card>
    </View>
    )
}

export default StartGameScreen

const styles = StyleSheet.create({
    rootContainer:{
        flex:1,
        marginTop:100,
        //change from the default stretch to center
        alignItems:'center'
    },
    textInput:{
        height:50,
        width:50,
        fontSize:32,
        borderBottomColor:'#ddb52f',
        borderBottomWidth:2,
        color: '#ddb52f',
        marginVertical:8,
        fontWeight:'bold',
        textAlign:'center',
    },
    buttonContainer:{
        flexDirection:'row'
    }, 
    buttonViewToStretch:{
        flex:1
    }
    //could add bg color in app.json, but let's do it in App.js since it is our root!
})