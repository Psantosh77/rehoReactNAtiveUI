import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { fbBlueColor, white } from '../utils/Api/constant/color';

const Card = ({ title, description, imageUrl ,roomNumber }) => {
  return (
    <View style={styles.card}>
      {/* <Image source={{ uri: imageUrl }} style={styles.image} /> */}
      <View style={styles.content}>
        <Text style={styles.title}>{ "Hi" + ", " + title}</Text>
        <Text style={styles.description}>{"Alloted on: 10/01/2023"}</Text>
      </View>
      <View style={styles.RoomNumber}>
        <Text  style={styles.room}>{roomNumber}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"space-between",
    backgroundColor: "#ceddef",
    borderRadius: 8,
    // marginBottom: 10,
    elevation: 2, // for shadow on Android
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4, // for shadow on iOS
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
    display:"flex",
    flexDirection:"column"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color:"#000"
  },
  description: {
    fontSize: 12,
  },
  RoomNumber:{
    border:"1px solid red",
    backgroundColor:fbBlueColor,
    marginRight:40,
    width:50,
    height:50,
    borderRadius: 25,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
  },
  room:{
    color:white,
    fontSize:25,
  }
});

export default Card;
