import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Picker, DatePickerIOS, Button, TouchableOpacity, Modal, TextInput, ScrollView, Alert } from 'react-native'
import Card from '../../component/card'
import ApiService from '../../utils/Api/apiCall'
import moment from 'moment'
import { fbBlueColor, white } from '../../utils/Api/constant/color'
import { TextInputMask } from 'react-native-masked-text'
import CardSigleView from './card'
import Dropdown from '../../component/dropdown'

const Rent = ({ route, navigation }) => {
    const { allotedTo, roomNumber } = route.params
    const [rentData, setRentData] = useState([])
    const [rmNUmber, setRoomNo] = useState(roomNumber)
    const [modalVisible, setModalVisible] = useState(false);
    const [previd, setprevid] = useState()
    const prevMonth = rentData[rentData.length - 1]?.billMonth;
    const prevData = rentData[rentData?.length - 1]
    const prevMonthEnd = rentData[rentData.length - 1]?.end
    const nextDate = moment(prevMonth, 'MMMM').add(1, 'month').format('MMMM');
    const [inputValue, setInputValue] = useState({
        "roomNumber": rmNUmber,
        "billMonth": nextDate ? nextDate : "",
        "end": "",
        "roomRent": "",
    });
    const handleClose = () => {
        setModalVisible(false);
        setInputValue({
            "roomNumber": rmNUmber,
            "billMonth": nextDate ? nextDate : "",
            "end": "",
            "roomRent": "",

        })
    };
    const handleOpen = (id) => {
        setModalVisible(true);
        setprevid(id)
    };
    const getData = () => {
        handleClose()
        ApiService.request({
            method: 'POST',
            endpoint: 'rent',
            payload: { roomNumber: rmNUmber },
            onSuccess: (response) => {
                setRentData(response.data)
            },
            onError: (error) => {
                // Handle error
            }
        }
        )
    }
    useEffect(() => {
        getData()
    }, [rmNUmber])

    const handleTextChange = (text, fields) => {
        setInputValue({ ...inputValue, [fields]: fields == "paidOn" || fields == "billMonth" ? text : +text })
    };

    const handleSelectRoom = (option) => {
        console.log("option" , option)
        setInputValue({ ...inputValue, billMonth:option.value })
    };

    const handleSubmit = () => {

        const payload = {
            ...inputValue
        }

        ApiService.request({
            method: !previd ? 'POST' : "PUT",
            endpoint: !previd ? 'rent/create' : "rent/update",
            payload: !previd ? payload :
                { ...prevData, id: previd ? previd : null, paid: inputValue.paid, paidOn: inputValue.paidOn },
            onSuccess: (response) => {
                getData()
                Alert.alert(
                    "Message",
                    response.msg,
                    [
                        { text: 'OK', onPress: () => handleClose() }
                    ],
                    { cancelable: false }
                );
            },
            onError: (error) => {
                // Handle error
            }
        }
        )
    }

    console.log(inputValue)

    return (
        <View style={styles.container}>
            <View style={styles.topHeader}>
                <Card
                    title={allotedTo}
                    description={`Room No ${roomNumber}`}
                    imageUrl="https://example.com/image.jpg"
                    roomNumber={roomNumber}
                />
            </View>


            {

              
                <CardSigleView title={prevData?.status ? prevData?.status : `Grand Total : ${prevData?.grandtotal}`}>


                    <View style={CardStyles.detailsContainer}>
                        <View>
                            <Text style={CardStyles.label} >Date</Text>
                            <Text>{moment(prevData?.generateDate).format("DD/MM/YYYY")}</Text>
                        </View>
                        <View>
                            <Text style={CardStyles.label} >Bill Month</Text>
                            <Text>{prevData?.billMonth}</Text>
                        </View>
                        <View>
                            <Text style={CardStyles.label} >Room Rent</Text>
                            <Text>{prevData?.roomRent}</Text>
                        </View>
                        <View>
                            <Text style={CardStyles?.label} >Unit Price</Text>
                            <Text>8 per unit</Text>
                        </View>
                    </View>

                    <View style={CardStyles.detailsContainer}>
                        <View>
                            <Text style={CardStyles.label} >Start</Text>
                            <Text>{prevData?.start}</Text>
                        </View>
                        <View>
                            <Text style={CardStyles.label} >End</Text>
                            <Text>{prevData?.end}</Text>
                        </View>
                        <View>
                            <Text style={CardStyles.label} >Unit</Text>
                            <Text>{prevData?.unit}</Text>
                        </View>
                        <View>
                            <Text style={CardStyles.label} >Total Bill</Text>
                            <Text>{prevData?.totalBill}</Text>
                        </View>
                    </View>

                    <View style={CardStyles.detailsContainer}>
                        <View>
                            <Text style={CardStyles.label} >Total Rent</Text>
                            <Text>{prevData?.total}</Text>
                        </View>

                        <View>
                            <Text style={CardStyles.label} >PrevAd</Text>
                            <Text>{prevData?.prevAdvance}</Text>
                        </View>
                        <View>
                            <Text style={CardStyles.label} >PrevBal</Text>
                            <Text>{prevData?.prevBalance}</Text>
                        </View>
                        <View>
                            <Text style={CardStyles.label} >Grand Total</Text>
                            <Text>{prevData?.grandtotal}</Text>
                        </View>

                    </View>

                    <View style={CardStyles.detailsContainer}>
                        <View>
                            <Text style={CardStyles.label} >Paid</Text>
                            <Text>{prevData?.paid}</Text>
                        </View>

                        <View>
                            <Text style={CardStyles.label} >Paid On</Text>
                            <Text>{prevData?.paidOn}</Text>
                        </View>
                        <View>
                            <Text style={CardStyles.label} >Next Ad</Text>
                            <Text>{prevData?.nextAdvance}</Text>
                        </View>
                        <View>
                            <Text style={CardStyles.label} >Next Bal</Text>
                            <Text>{prevData?.nextBalance}</Text>
                        </View>

                    </View>

                    <TouchableOpacity onPress={(e) => handleOpen(prevData?._id)} style={styles.Editbutton}>

                        <View style={styles.circle}>
                            <Text style={styles.plusIcon}>U</Text>
                        </View>

                    </TouchableOpacity>

                </CardSigleView>

            }

            <ScrollView style={{ height: 200 }}>
                <View style={styles.cardConatiner}>
                    {
                        rentData && rentData.map((item, index) => {
                            return (
                                < View style={styles.card} key={index}>
                                    {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}
                                    <View style={styles.content}>
                                        <View style={styles.contentHeader}>
                                            <Text>{moment(item.generateDate).format("DD/MM/YYYY")}</Text>
                                            <Text>{item.billMonth}</Text>
                                        </View>

                                        <View style={styles.contentHeader}>
                                            <Text> {item.start}</Text>
                                            <Text> {item.end}</Text>
                                            <Text> {item.unit}x8</Text>
                                            <Text> {item.totalBill}</Text>
                                        </View>
                                        <View style={styles.contentHeader}>
                                            <Text> {item.roomRent}</Text>
                                            <Text> {item.total}</Text>
                                            <Text> {item.prevAdvance}</Text>
                                            <Text> {item.prevBalance}</Text>
                                            <Text> {item.grandtotal}</Text>
                                        </View>

                                        <View style={styles.contentHeader}>
                                            <Text> {item.paid}</Text>
                                            <Text> {item.paidOn}</Text>
                                            <Text> {item.nextAdvance}</Text>
                                            <Text> {item.nextBalance}</Text>

                                        </View>

                                        <View style={styles.contentHeader}>
                                            <Text> {item.status}</Text>

                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
            {
                !modalVisible &&
                <TouchableOpacity onPress={(e) => handleOpen()} style={styles.addButton}>

                    <View style={styles.circle}>
                        <Text style={styles.plusIcon}>+</Text>
                    </View>

                </TouchableOpacity>
            }
            {
                modalVisible &&
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleClose}
                >
                    <View style={Modelstyles.modalContainer}>
                        <View style={Modelstyles.modalContent}>
                            <TouchableOpacity onPress={handleClose} style={Modelstyles.closeButton}>
                                {/* <Ionicons name="close" size={24} color="black" /> */}
                                <Text>Close</Text>
                            </TouchableOpacity>

                            <Text style={Modelstyles.modalTitle}>Add Rent</Text>

                            {
                                !previd ?
                                    <React.Fragment>
                                        {/* <TextInput placeholder="Month" style={Modelstyles.input} value={inputValue.billMonth} onChangeText={(text) => handleTextChange(text, 'billMonth')} /> */}

                                        <Dropdown
                                            options={[{label:"January" , value:"January"} , {label:"February" , value:"Fabruary"}]}
                                            onSelect={handleSelectRoom}
                                            defaultText={inputValue.billMonth}
                                            // style={{ width: 320}}
                                            labelKey="label"
                                            valueKey="value"
                                        />

                                        <TextInput onChangeText={(text) => handleTextChange(text, 'end')} value={inputValue.end} keyboardType="numeric" placeholder={`Electricity end > ${prevMonthEnd}`} style={Modelstyles.input} />
                                        <TextInput onChangeText={(text) => handleTextChange(text, 'roomRent')} value={inputValue.roomRent} keyboardType="numeric" placeholder="Room Rent" style={Modelstyles.input} />
                                    </React.Fragment>
                                    :
                                    <React.Fragment>

                                        <TextInput onChangeText={(text) => handleTextChange(text, 'paid')} value={inputValue.paid} keyboardType="numeric" placeholder="Paid" style={Modelstyles.input} />
                                        <TextInput onChangeText={(text) => handleTextChange(text, 'paidOn')} value={inputValue.paidOn} keyboardType="numeric" placeholder="Paid On" style={Modelstyles.input} />
                                    </React.Fragment>

                            }

                            <Button title={previd ? "Update rent " : "Add Rent"} onPress={handleSubmit} />
                            {/* Add more form fields as needed */}
                        </View>
                    </View>
                </Modal>
            }
        </View >
    )
}

const CardStyles = StyleSheet.create({
    detailsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },

    label: {
        fontWeight: "700",

    }
})

const Modelstyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    closeButton: {
        alignSelf: 'flex-end',
    },
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#4267b2",
        paddingTop: 1,
    },
    topHeader: {

    },
    cardConatiner: {
        paddingTop: 5
    }
    ,


    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        // marginBottom: 10,
        elevation: 2, // for shadow on Android
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4, // for shadow on iOS
        marginBottom: 5,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        resizeMode: 'cover',
    },
    content: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    description: {
        fontSize: 16,
    },

    contentHeader: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    addButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 40,
        right: 40,
        border: 1,
        backgroundColor: white,
        width: 60,
        height: 60,
        borderRadius: 50
    },


    Editbutton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        right: 10,
        border: 1,
        backgroundColor: white,
        width: 20,
        height: 20,
        borderRadius: 50
    },

    circle: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        borderWidth: 7,
        borderColor: fbBlueColor,
        borderRadius: 50,
        width: 50,
        height: 50,
    },
    plusIcon: {
        fontSize: 20,
        color: fbBlueColor
    }


});





export default Rent