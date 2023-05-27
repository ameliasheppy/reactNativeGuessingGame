import {View,StyleSheet, Alert, Text} from 'react-native'
import Title from '../components/ui/Title'
import { useEffect, useState } from 'react';
import Card from '../components/ui/Card';
import NumberContainer from '../components/game/NumberContainer'
import PrimaryButton from '../components/ui/PrimaryButton';
import InstructionText from '../components/ui/InstructionText';
import { Ionicons} from '@expo/vector-icons'
//RN has icons built in that we can use, import them from expo-icons
//they are a bunch of icons that we can bring in and use whatever icon sets that we want to use
//Ionocons is a fave!
//for the exclude, we will pass in the userNumber so the phone can't guess the user's num right away
function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
  
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

let minBoundary = 1;
let maxBoundary = 100;
//deconstruct out the props that were sent from App.js
function GameScreen({userNumber, onGameOver}){

    //the first guess made by the device should be gen'd each time. need to monitor it with state
    //the upper bound is excluded bc of Math.rand
    //every time a guess a entered, this will run = inf loop = crashy crashy!
    //to avoid the inf loops, we need to hard code in the vals below
    //or we could use the useMemo hook instead of the hard coding
    const initialGuess = generateRandomBetween(1,100, userNumber)
    //set the initial guess as our state val
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    //we want to output the guess below in a pretty element
//count the rounds
//we want to hold an arr of what we are gueesing, start with the initial guess
const [guessRounds, setGuessRounds] = useState([initialGuess]);
    //we want to use useEffect hook here to register that a big change is happening to the app
    useEffect(() =>{
        if(currentGuess === userNumber){
            //want to tell RN a diff screen should show!
            //this will use the useState from App.js to register the change
            //if the guess is equal, the game is over!
            //this will trigger the gameOver func in the App comp
            onGameOver();
        }
        //add some dependencies to the useEffect
        //the vals in the func should be added as deps
    }, [currentGuess, userNumber, onGameOver])

    //when a new game screen is loaded, we want the below to happen
    //put the empty dep arr so that it will only run on initial load
    useEffect(() =>{
        minBoundary = 1;
        maxBoundary = 100;
    }, [])
    function nextGuessHandler(direction){
        //we want to avoid an inf loop here, so set up a check!
        if((direction === 'lower' && currentGuess < userNumber)|| direction === 'greater' && currentGuess > userNumber){
            Alert.alert("Don't lie!", "You know that guess is wrong...", [{text:'sorry', style:'cancel'}]);
            return;
        }
        //want to increment or decrement
        if(direction === 'lower'){
            //if the lower is ok, the lower bound is fine, don't edit it. same for higher
            //how do we know the prev min?
            //min and max are dynamic! manage their vars above func
            //dont need to go over the currentGuess, it's the boundary. do the current!
            maxBoundary = currentGuess;
        }else{
            //gen a rand num with an adj min boundary
            minBoundary = currentGuess+1;
        }
        const newRandomNum = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        //we could put our const newRandNum line here, since it's the same, but for my own brain's clarity, I am leaving it up there!
        setCurrentGuess(newRandomNum);
        //put the newNum at the beginning, so that it will always be on top!
        setGuessRounds(previousGuessRounds =>[newRandomNum,...previousGuessRounds])
    }

    //now we need to bind the above function to our buttons!
    //probelm with it! Can't just pass a pointer to the func. A user or RN will be calling it, so we need to pre-config it
    //use bind to do this!
    //use the guessRound as the key bc we can only guess each num once, so it will always be a unique key
    return <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <Card>
            <InstructionText style={styles.InstructionText}>Higher or Lower?</InstructionText>
            <View>
                <View style={styles.buttonsContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                <Ionicons name='md-remove' size={24} color='#72063c'/>
            </PrimaryButton>
            </View>
            <View style={styles.buttonsContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                <Ionicons name='md-add' size={24} color='#72063c'/>
            </PrimaryButton>
            </View>
            </View>
        </Card>
        <View>
            {guessRounds.map(guessRound => <Text key={guessRound}>{guessRound}</Text>)}
        </View>
    </View>
}

export default GameScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:12,
    },
    InstructionText:{
        marginBottom:12
    },
    buttonsContainer:{
        flexDirection:'row'
    }
})