import {View, Text, Pressable, StyleSheet} from 'react-native'
//instead of passing regular props, we are going to deconstruct what we pass in right away. It's still props, just entered differently
//we want our button to be reusable in each comp, so take props on it! 
//we need to add a prop that will allows comps that use this button to pass a func that will exe on press, so use onPress which will be invoked when button pressed
//pressable comes with onPress, the onPress we are passing is not the built in onPress, it's a custom version that we are writing. we could call it tacoBurrito and it would be fine!
function PrimaryButton({children, onPress}){
    //pass an obj to the android ripple with the color for the ripple
    //pressed is a bool we can use to determine which style objs to apply, we can pass in an arr of styles!
    return (
    <View style={styles.buttonOuterContainer}>
          <Pressable style={({pressed}) => 
          pressed ? [styles.container, styles.pressed]
           :  styles.container
        } 
          onPress={onPress} 
          android_ripple={{color:"grey"}}>
        <Text style={styles.buttonText}>{children}</Text>
        </Pressable>
    </View>
 )
}

export default PrimaryButton

const styles = StyleSheet.create({
    //cont styling:
    buttonOuterContainer:{
        borderRadius:28,
        margin:4,
        // makes sure that any styling from inside, like the ripple, will be trapped in the cont
        overflow:'hidden'
    },
    container:{
        backgroundColor:"white",
        paddingVertical:8,
        paddingHorizontal:16,
        //android shadow!
        elevation:2,
    },
    buttonText:{
        color:'black',
        textAlign:'center'
    },
    pressed:{
        opacity:0.75
    }
})