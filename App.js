import { StyleSheet, ImageBackground} from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import {LinearGradient} from 'expo-linear-gradient'
//we want to overlay a bg image with a comp built into RN
//we want it above the LinearGradient, but below everything else
//imageBackground is a combo of components, so it has a lot of cool styling props that we can add

export default function App() {
  return (
<LinearGradient colors={['#4e0329', '#ddb52f']} style={styles.rootScreen} > 
<ImageBackground source={require('./assets/images/bg.jpg')} resizeMode="cover" style={styles.rootScreen} imageStyle={styles.backgroundImage}>
<StartGameScreen/>
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
