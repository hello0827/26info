import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Text, View, Button, Image, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { Marker } from 'react-native-maps';


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
            console.log(init); 
            if(!init){
                init = true;
                console.log(init); 
                try {
                    
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    if (status !== 'granted') {
                        return;
                    }
                    let location = await Location.getCurrentPositionAsync({});
                    console.log(location);
                    setGpsLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                        longitudeDelta: LATITUDE_DELTA,
                        latitudeDelta: LONGITUDE_DELTA
                    });
                    console.log(gpsLocation);
                } catch (error) {
                    console.log(error);
                }
            }
                /* 上面是 componentDidMount */
        }
    }, []); 

    const increaseDelta = () =>{
        console.log(gpsLocation);
        setGpsLocation({
            latitude: gpsLocation.latitude,
            longitude: gpsLocation.longitude,
            longitudeDelta: gpsLocation.longitudeDelta*1.5,
            latitudeDelta: gpsLocation.latitudeDelta*1.5
        });
    };


    const decreaseDelta = () =>{
        console.log(gpsLocation);
        setGpsLocation({
            latitude: gpsLocation.latitude,
            longitude: gpsLocation.longitude,
            longitudeDelta: gpsLocation.longitudeDelta*0.5,
            latitudeDelta: gpsLocation.latitudeDelta*0.5
        });
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
            toolbarEnabled={true}
            >
                <Marker
                coordinate={{ latitude: 22.302801, longitude: 114.177106 }}
                pinColor="green"
                    />


            </MapView>


            <View
                style={{
                    position: 'absolute',//use absolute position to show button on top of the map
                    top: '5%', //for center align
                    left: '7%',
                    alignSelf: 'flex-end' //for align to right
                }}
            >
                <Button title="test" />
                <Button title="+" onPress={decreaseDelta} />
                <Button title="-" onPress={increaseDelta}/>
            </View>
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
  });