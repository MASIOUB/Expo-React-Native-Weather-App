import { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, SafeAreaView, ActivityIndicator, ScrollView, RefreshControl, Image, FlatList } from 'react-native';
// import { Svg } from 'react-native-svg';
import * as Location from 'expo-location';

const API_key = 'cd81d39635a73317df6ead93c6d1fc62';
const API = `https://api.openweathermap.org/data/2.5/forecast?id=524901&units=metric&appid=${API_key}`;

function Weather() {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadForecast = async () => {
        setRefreshing(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
            console.log('Permission to access location was denied');
        };

        let location = await Location.getCurrentPositionAsync({});

        const lat = location.coords.latitude;
        const lon = location.coords.longitude;

        const response = await fetch(`${API}&lat=${lat}&lon=${lon}`);
        const data = await response.json();

        (!response.ok) ? (
            Alert.alert('Error', 'Something went wrong')
        ) : (
            setForecast(data)
        );
        setRefreshing(false);
    };

    useEffect(() => {
        loadForecast();
    }, []);

    if (!forecast) {
        return (
            <SafeAreaView style={StyleSheet.loading}>
                <ActivityIndicator size='large' />
            </SafeAreaView>
        );
    }

    const x = new Date(forecast.list[0].dt * 1000);
    const options = { weekday: 'short', day: 'numeric', month: 'long' };
    const formattedDate = x.toLocaleDateString('en-US', options);

    // console.log(new Date(forecast.list[0].dt_txt).toLocaleDateString('en-us'))
    console.log(formattedDate);

    // const currentWeather = forecast.current.weather[0];
    // console.log(forecast.list[0].weather[0].icon);
    // assets/svg/${forecast.list[0].weather[0].icon}.svg
    const array = forecast.list

    // array.forEach(element => {
    //     console.log(element)
    // });

    // console.log(forecast);

    // const date = new Date().toLocaleDateString();

    // console.log(date);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={loadForecast} />
            } style={{ marginTop: 50 }}>
                <Text style={styles.title}>
                    {forecast.city.name}
                </Text>
                <Text style={{ alignItems: 'center', textAlign: 'center', color: 'white' }}>
                    {new Date(forecast.list[0].dt * 1000).toLocaleDateString('en-US', options)}
                </Text>
                <View style={styles.weather}>
                    <Image style={styles.largeIcon}
                        source={{ uri: `https://openweathermap.org/img/wn/${forecast.list[0].weather[0].icon}@4x.png` }} />
                    {/* source={require(`../assets/img/${forecast.list[0].weather[0].icon}.svg`)} /> */}
                    {/* source={require(`../assets/img/09n.svg`)} /> */}
                    <View>
                        <Text style={styles.currentTemp}>
                            {Math.round(forecast.list[0].main.temp)}°
                        </Text>
                    </View>
                </View>
                <Text style={styles.currentFeels}>
                    Feels like {forecast.list[0].main.feels_like}
                </Text>
                <Text style={styles.currentDescription}>
                    {forecast.list[0].weather[0].description}
                </Text>
                {/* <View>
                    <Text style={styles.subtitle}>
                        Hourly weather
                    </Text>
                </View> */}
                <ScrollView style={styles.flex}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        data={forecast.list.slice(0, 8)}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(data) => {
                            const weather = data.item.weather[0]
                            const dt = new Date(data.item.dt * 1000).toLocaleTimeString('en-us');
                            const temp = data.item.main.temp
                            return (
                                <View style={styles.test}>
                                    <View style={styles.weatherToday}>
                                        <Text style={{ color: '#FFF' }}>
                                            {dt}
                                        </Text>
                                        <Image
                                            style={styles.smallIcon}
                                            source={{
                                                uri: `https://openweathermap.org/img/wn/${weather.icon}@4x.png`
                                            }}
                                        />
                                        <Text style={{ color: '#FFF' }}>
                                            {weather.description}
                                        </Text>
                                        <Text style={{ color: '#FFF' }}>
                                            {Math.round(temp)}°
                                        </Text>
                                    </View>
                                </View>
                            )
                        }}
                    />
                </ScrollView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Weather

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5397E2',
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
    currentFeels: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 24,
        marginBottom: 5,
        color: '#FFF',
    },
    currentDescription: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 24,
        marginBottom: 5,
        color: '#FFF',
    },
    subtitle: {
        fontSize: 24,
        marginVertical: 12,
        marginLeft: 7,
        color: '#FFF',
        fontWeight: 'bold',
    },
    weatherToday: {
        margin: 5,
        padding: 6,
        alignItems: 'center',
    },
    smallIcon: {
        width: 100,
        height: 100,
    },
    test: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
    },
    flex: {
        backgroundColor: 'rgba(255, 255, 255, .2)',
        margin: 10,
        borderRadius: 10,
    },
});