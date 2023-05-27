import { StyleSheet, ImageBackground, SafeAreaView} from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen'
import {LinearGradient} from 'expo-linear-gradient'
import { useState } from 'react';

//the fonts must be imported in the App comp so that it can be used everywhere.
//it is a React hook
//we want to overlay a bg image with a comp built into RN
//we want it above the LinearGradient, but below everything else
//imageBackground is a combo of components, so it has a lot of cool styling props that we can add

//show a splash screen form the app loading package
//we want to swap out the startGameScreen for the GameScreen when we get the number entered, so we will need ot manage state to see if we have a number
export default function App() {
  //here we will keep track of it we have a num
  const [userNumber, setUserNumber] = useState()
  //game over state for the game! true at first bc hasn't started
  const [gameIsOver, setGameIsOver] = useState(true)
  const [guessRounds, setGuessRounds] = useState(0)
//put the fonts hook here
//useFOnts returns an arr that we can extract with arr destr. Returns a bool first that lets us know if the fonts are loaded.
// const [fontsLoaded]= useFonts({
//   //set up prop names to id fonts and then vals to know them
//   'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
//   'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
// })

// if(!fontsLoaded){
//   return <SplashScreen/>
// }
  //we will use the number the user chooses here. Once a num is picked, the game will start
  function pickedNumberHandler(pickedNumber){
    setUserNumber(pickedNumber)
    //set the game over to false bc a user hasn't had the correct num guessed yet
    setGameIsOver(false)
  }

//change the game over state with the below func
//pass it to the gamescreen comp
function gameOverHandler(){
  setGameIsOver(true)
}

//need a func to start a new game
function startNewGameHandler(){
  //we want to reset data in the app
  //setting to null stops the if check, makes us leave the game over screen and start over
  setUserNumber(null);
  setGuessRounds(0);
}

  //put a helper func here to set the initial screen
  //we want to execute when a num is picked, so let's use props to send this on!
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;
  //this if will run whenever state changes
  //check if it's truthy
  //now that we are sending onGameOver, grab it as props in the GameScreen
  if(userNumber){
    screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>
  }
//now we can dynamically render screen below instead of the StartGameScreen

//the game is only over,if the gameIsOver and the userNumber are both truthy
if(gameIsOver && userNumber){
  screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler}/>
}

  return (
<LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.rootScreen} > 
<ImageBackground source={require('./assets/images/bg.jpg')} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backgroundImage}>
<SafeAreaView style={styles.rootScreen}>
{screen}
</SafeAreaView>
</ImageBackground>
</LinearGradient>

  );
}

const styles = StyleSheet.create({
  rootScreen:{
    // let's fill the whole bg with flex:1
    flex:1,
  },
  //lets add a bg linear gradient with expo!
  //could add it with npm install
  //but we are using
  //            expo install expo-linear-gradient 
  //that way expo can see which version we are using and match to it

  //lg colors prop takes an array of colors to use in our app up in the JS
  backgroundImage:{
    opacity:0.15
  }
});
