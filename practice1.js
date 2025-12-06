import React from "react";
import { View, Text,StyleSheet, TouchableHighlight } from "react-native";

const Practice = () => {
  return (
    <View style={style.main}>
        <TouchableHighlight>
            <Text style={style.button}>Button</Text>
        </TouchableHighlight>
        
    </View>
  );
}  

style = StyleSheet.create({
    main:{
        flex: 1,
    },
    button:{
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        textAlign: 'center',
        margin: 20,
        shadowColor: '#000',
        elevation: 5,
    }
})

export default Practice;