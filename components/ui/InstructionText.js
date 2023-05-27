import { Text, StyleSheet } from "react-native"


//instead of props, we want to pass in the children
//with RN,we can also pass down styling props/children
function InstructionText({children, style}){
    return       <Text style={[styles.instructionText,style]}>{children}</Text>
}

export default InstructionText

//wrap styles in an arr to pass on an arr of styles objs. styles will be eval'd from 
//left to right, so the styles def'd on the right override the left
//we can mimic CSS by passing the styles prop into a comp and then merging the incoming styles with the existing styles and overwriting the default styles. 
const styles = StyleSheet.create({
    instructionText:{
        color:'yellow',
        fontSize:24,
    },
})