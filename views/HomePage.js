import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, Image, ScrollView,Button,TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';
import MapBtn from '../component/MapBtn'
//import { Button } from 'react-native-ios-kit';


const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function HomePage() {
    var init = false;
    const [gpsLocation,setGpsLocation] = useState(
        {
            //Default
            latitude: 22.302711,
            longitude: 	114.177216,
            longitudeDelta: LATITUDE_DELTA,
            latitudeDelta: LONGITUDE_DELTA
          }
    );

    useEffect(() => {
        async () => {
            /* 下面是 componentDidMount */ 
            if(!init){
                init = true;
                try {
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        return;
                    }
                    let location = await Location.getCurrentPositionAsync({});
                    setGpsLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        longitudeDelta: LATITUDE_DELTA,
                        latitudeDelta: LONGITUDE_DELTA
                    });
                } catch (error) {
                    console.log(error);
                }
            }
                /* 上面是 componentDidMount */
        }
    }, []); 

    const increaseDelta = () =>{
        setGpsLocation({
            latitude: gpsLocation.latitude,
            longitude: gpsLocation.longitude,
            longitudeDelta: gpsLocation.longitudeDelta*1.5,
            latitudeDelta: gpsLocation.latitudeDelta*1.5
        });
    };


    const decreaseDelta = () =>{
        setGpsLocation({
            latitude: gpsLocation.latitude,
            longitude: gpsLocation.longitude,
            longitudeDelta: gpsLocation.longitudeDelta*0.5,
            latitudeDelta: gpsLocation.latitudeDelta*0.5
        });
    };

    const reset = async () => {
        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setGpsLocation({
                        latitude: 22.302711,
                        longitude: 	114.177216,
                        longitudeDelta: LATITUDE_DELTA,
                        latitudeDelta: LONGITUDE_DELTA
                });
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setGpsLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                longitudeDelta: LATITUDE_DELTA,
                latitudeDelta: LONGITUDE_DELTA
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View style={styles.container}>
          <MapView
            style={styles.map} 
            showsUserLocation={true}

            initialRegion={gpsLocation}
            region={gpsLocation}

            showsTraffic = {true}
            showsMyLocationButton = {true}
            showsCompass={true}
            toolbarEnabled={true}>
                <Marker
                coordinate={{ latitude: 22.302801, longitude: 114.177106 }}>
                    <Image
                    source={require('../assets/rs.png')}
                    style={{width: 26, height: 28}}
                    resizeMode="contain"
                    />
                </Marker>
            </MapView>


            <MapBtn reset={reset} decreaseDelta={decreaseDelta} increaseDelta={increaseDelta}/>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      margin: 1,
      padding: 5

    },
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