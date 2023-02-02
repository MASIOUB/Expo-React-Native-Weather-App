import axios from 'axios';

import { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet, SafeAreaView, ActivityIndicator, Alert, ScrollView, RefreshControl } from 'react-native';

import * as Location from 'expo-location';

const API_key = 'cd81d39635a73317df6ead93c6d1fc62';

function Weather() {
  const [weatherData, SetWeatherData] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getWeather = async (lat, lon) => {
    const API = `https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API_key}`;
    try {
      const response = await axios.get(API, {
        params: {
          lat: lat,
          lon: lon,
        }
      });
      if (response.status == 200) {
        const data = await response;
        // console.log(response.data.city.name);
        // console.log(lat);
        // console.log(lon);
        SetWeatherData(data);
      } else {
        setWeatherData(null);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    // console.log(location.coords.latitude);
    // console.log(location.coords.longitude);
    const lat = JSON.stringify(location.coords.latitude);
    const lon = JSON.stringify(location.coords.longitude);
    getWeather(lat, lon);
  };

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location.coords);
    (weatherData === null) ? (
      text = null
    ) : (
      text = JSON.stringify(weatherData.data.city.name)
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>{text}</Text>
    </View>
    // <SafeAreaView style={styles.container}>
    //   {/* <ScrollView refreshControl={<RefreshControl refreshing={''} onRefresh={''} />}></ScrollView> */}
    //   <Text style={styles.title}>
    //     {forecast.city.name}
    //   </Text>
    //   <Text style={{ alignItems: 'center', textAlign: 'center', color: 'white' }}>
    //     {forecast.list[0].weather[0].description}
    //   </Text>
    //   <Text>
    //     {/* {{ date }} */}
    //   </Text>
    //   <View style={styles.weather}>
    //     <Image style={styles.largeIcon}
    //       source={{ uri: `https://openweathermap.org/img/w/${forecast.list[0].weather[0].icon}.png` }} />
    //     {/* source={require(`../assets/img/${forecast.list[0].weather[0].icon}.svg`)} /> */}
    //     {/* source={require(`../assets/img/09n.svg`)} /> */}
    //     <View>
    //       <Text style={styles.currentTemp}>
    //         {Math.round(forecast.list[0].main.temp)}°
    //       </Text>
    //       <Text style={{ 'color': 'white' }}>
    //         Feels like {forecast.list[0].main.feels_like}
    //       </Text>
    //     </View>
    //   </View>
    //   <Text style={styles.currentDescription}>
    //     {forecast.list[0].weather[0].description}
    //   </Text>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#788EEC',
    // alignItems: 'center',
    // justifyContent: 'center',
},
title: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFF'
},
weather: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
},
largeIcon: {
    width: 250,
    height: 200,
},
currentTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFF',
},
currentDescription: {
    width: '100%',
    textAlign: 'center',
    fontWeight: '200',
    fontSize: 24,
    marginBottom: 5,
    color: '#FFF',
}
});

export default Weather