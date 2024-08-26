import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react'
import { Button, Text, View } from 'react-native';

const Home = ({navigation}) => {

    const [accessToken, setAccessToken] = useState()
    const onClick = async () => {
        //   let accessToken =  await AsyncStorage.getItem("accessToken")
        const jsonValue = await AsyncStorage.getItem('accessToken');
        console.log(jsonValue != null ? JSON.parse(jsonValue) : null)
        setAccessToken(jsonValue)
    }
    return (
        <View>
            <Text>Wlecome to Reho</Text>
            <Text>Your Access token is </Text>
            <Text>{accessToken}</Text>
            <Button onPress={onClick} title='test'></Button>
            
        </View>
    )
}

export default Home;