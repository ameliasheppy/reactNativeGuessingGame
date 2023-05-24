import {View,Text, StyleSheet, Alert} from 'react-native'
import Title from '../components/ui/Title'
import { useEffect, useState } from 'react';
import NumberContainer from '../components/game/NumberContainer'
import PrimaryButton from '../components/ui/PrimaryButton';
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
        setCurrentGuess(newRandomNum)
    }

    //now we need to bind the above function to our buttons!
    //probelm with it! Can't just pass a pointer to the func. A user or RN will be calling it, so we need to pre-config it
    //use bind to do this!
    return <View style={styles.screen}>
        <Title>Opponent's Guess</Title>
        <NumberContainer>{currentGuess}</NumberContainer>
        <View>
            <Text>Higher or Lower?</Text>
            <View>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>+</PrimaryButton>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>-</PrimaryButton>
            </View>
        </View>
        <View></View>
    </View>
}

export default GameScreen

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding:12,
    }
})