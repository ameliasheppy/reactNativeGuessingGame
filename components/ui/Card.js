import { View, StyleSheet } from "react-native"

function Card({children}){
    return     <View style={styles.inputContainer}>{children}</View>
}
export default Card

const styles = StyleSheet.create({
    //main view styles
    inputContainer:{
        marginHorizontal:24,
        padding: 16,
        marginTop:36,
        backgroundColor:'#72063c',
        borderRadius:8,
        //want a shadow? add elevation for Android!
        elevation:4,
        //IOS box shadow:
        shadowColor:'black', 
        shadowOffset:{width:0, height:2},
        shadowColor:6,
        shadowOpacity:0.4,
        //positions on the cross axis
        //main axis is center by default
        justifyContent:'center',
        alignItems:'center'
    },
})