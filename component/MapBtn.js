import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, Image, ScrollView,Button,TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
//import { Button } from 'react-native-ios-kit';



export default function MapBtn(props) {

    useEffect(() => {
        () => {
            /* 下面是 componentDidMount */ 
            /* 上面是 componentDidMount */
        }
    }, []); 
    return (
            <View style={styles.btnGroup}>
                <TouchableOpacity title="reset" style={styles.btn} onPress={props.reset} rounded>
                    <Text style={styles.btnText}>reset</Text>    
                </TouchableOpacity>                
                <TouchableOpacity title="+" style={styles.btn} onPress={props.decreaseDelta} rounded>
                    <Text style={styles.btnText}>+</Text>    
                </TouchableOpacity>                
                <TouchableOpacity title="-" style={styles.btn} onPress={props.increaseDelta} rounded>
                    <Text style={styles.btnText}>-</Text>    
                </TouchableOpacity>  

            </View>
    );
}


const styles = StyleSheet.create({

    btnGroup: {
        flexDirection: "column",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: '#6B7280',



        position: 'absolute',//use absolute position to show button on top of the map
        top: '5%', //for center align
        left: '7%',
        alignSelf: 'flex-end' //for align to right
    },
    btn: {
        flex: 1,
        borderRightWidth: 0.25,
        borderLeftWidth: 0.25,
        borderColor: '#6B7280', 
        backgroundColor: "#FFFFFF"
    },
    btnText: {
        textAlign: 'center',
        paddingVertical: 16,
        fontSize: 14, 
        backgroundColor: "#FFFFFF"
    }
});