//this will hold the num that is guesses

import {View, Text, StyleSheet} from 'react-native';
//will get num as a prop that is children
function NumberContainer({children}){
    return(
        <View style={styles.container}>
            <Text style={styles.numberText}>
                {children}
            </Text>
        </View>
    )
}

export default NumberContainer

const styles = StyleSheet.create({
    container:{
        borderWidth: 4,
        borderColor:'yellow',
        padding:24,
        //border-radius is not supported on text in IOS
        borderRadius:8,
        margin:24,
        alignItems:'center',
        justifyContent:'center'
    },
    numberText:{
        color:'yellow',
        fontSize:36,
    }
})