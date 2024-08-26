import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Picker, Button } from 'react-native'

import Dropdown from '../../../component/dropdown'
import ApiService from '../../../utils/Api/apiCall'
import { fbBlueColor } from '../../../utils/Api/constant/color'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionRoom, setSelectedOptionRoom] = useState('');
    const [HouseData, setHouseData] = useState([])
    const [roomData, setRoomData] = useState([])



  

    const handleSelect = async (option) => {
        setSelectedOption(option);
        const jsonValue = await AsyncStorage.getItem('accessToken');
        console.log("jsonValue" , JSON.parse(jsonValue))
    };

    const handleSelectRoom = (option) => {
        setSelectedOptionRoom(option);
    };

    

    useEffect(() => {
        ApiService.request({
            method: 'GET',
            endpoint: 'house',
            payload: null,
            onSuccess: (response) => {
                setHouseData(response.data)
                // console.log(response)
            },
            onError: (error) => {
                console.error('Error:', error);
                // Handle error
            }
        }
        )
    }, [])

    useEffect(() => {
        ApiService.request({
            method: 'POST',
            endpoint: 'house/housewithroom',
            payload: JSON.stringify({
                "houseId": selectedOption._id
            }),
            onSuccess: (response) => {
                setRoomData(response.room)

            },
            onError: (error) => {
                console.error('Error:', error);
                // Handle error
            }
        }
        )
    }, [selectedOption])




    return (
        <View style={styles.container}>
            <View>
                <Dropdown
                    options={HouseData}
                    onSelect={handleSelect}
                    defaultText={selectedOption.houseName ? selectedOption.houseName : "Select house"}
                    style={{ width: 200 }}
                    labelKey="houseName"
                    valueKey="_id"
                />
            </View>
            <View>
                {
                    selectedOption.houseName &&
                    <Dropdown
                        options={roomData}
                        onSelect={handleSelectRoom}
                        defaultText={selectedOptionRoom.roomNumber ? `Room Number ` + selectedOptionRoom.roomNumber : "Select Room"}
                        style={{ width: 200 }}
                        labelKey="roomNumber"
                        valueKey="_id"
                    />
                }
            </View>
            <View>
                {
                    selectedOptionRoom &&
                    <Button title='next' onPress={() => navigation.navigate('Rent', { ...selectedOptionRoom })} />
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
        backgroundColor: fbBlueColor,
        border: "1px solid red"
    }

});





export default Home