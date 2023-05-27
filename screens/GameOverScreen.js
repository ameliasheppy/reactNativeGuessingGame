import {Image, View, StyleSheet, Text} from 'react-native';
import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
//we want the props that we need for our message
function GameOverScreen({roundsNumber, userNumber, onStartNewGame}){
    //a text comp can hold another text comp, but not a view!
    return <View style={styles.gameTop}>
        <Title>Game Over!</Title>
        <View style={styles.gameOverBR}>
        <Image source={require('../assets/images/done.jpg')} style={styles.image}/>
        </View>
        <Text style={styles.textSize}>Your phone need 
            <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>
            </Text>
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
}
export default GameOverScreen
//best way to give rounded corners to a pic is to put a view around the pic and then five that view a borderRadius
//set br to half of the width and height so that we can make a circle
//nested text elements have a cascade with their text sizes
//
const styles = StyleSheet.create({
    gameTop:{
        flex:1,
        padding:24,
        justifyContent:'center',
        alignItems:'center'
    },
    gameOverBR:{
        overflow:'hidden',
        borderRadius:150,
        width:300,
        height:300,
        borderWidth:3,
        borderColor:'teal',
        margin:36,
    },
    image:{
        width:'100%',
        height:'100%'
    },
    textSize:{
        fontSize:28,
        textAlign:'center',
        marginBottom:24
    },
    highlight:{
        color:'blue'
    }

})