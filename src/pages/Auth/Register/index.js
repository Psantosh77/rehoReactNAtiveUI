import React, { useState } from 'react'
import { ActivityIndicator, Alert, Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import InputText from '../../../../component/input'
import { Image } from 'react-native'
import { themeColor } from '../../../styles/color'
import ApiService from '../../../../utils/Api/apiCall'
import { validateField } from '../../../../utils/Helper/validation'
import { Toast } from 'toastify-react-native'


const Separator = () => <View style={CardStyles.separator} />;

const Register = ({navigation}) => {


  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: "",

  });

  const [errors, setErrors] = useState({});

  const validationRules = {
    fullName: [
      { type: 'required', message: 'Full name cannot be empty' },
    ],
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'email', message: 'Please enter a valid email' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', minLength: 8, message: 'Password must be at least 8 characters' },
    ],
  };



  const validateForm = () => {
    const newErrors = {};

    for (let field in validationRules) {
      const error = validateField(formData[field], validationRules[field]);
      if (error) {
        newErrors[field] = error;
      }
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== null);
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = () => {
    if (validateForm()) {

   
      ApiService.request({
        method: 'POST',
        endpoint: 'auth/',
        payload: formData,
        onSuccess: (response) => {
          navigation.navigate('Login')
          Toast.info(response.message)
          console.log(response.message)
        },
        onError: (error) => {
          // Handle error
          console.log('error', error)
        }
      }
      )


    } else {
      Alert.alert('Validation Error', 'Please fix the errors in the form');
    }
  };

  return (
    <SafeAreaView>

      <View style={CardStyles.mainContainer}>

        <Image
          source={require('./image/reho-high-resolution-logo-transparent.png')}
          style={{ width: 100, height: 100, margin: 30 }}
          PlaceholderContent={<ActivityIndicator />}
          resizeMode="contain"
        />
        <View style={CardStyles.formContaine}>
          <Text style={CardStyles.Heading}>Register</Text>
          <ScrollView style={CardStyles.ScrollView}>
            <InputText
              lable="Full Name"
              placeHolder="Enter Full Name"

              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              errorMsg={errors.fullName}
            />

            <InputText
              lable="Email"
              placeHolder="Enter Email Id"

              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              errorMsg={errors.email}
              keyboardType="email-address"
            />

            <InputText
              lable="Password"
              placeHolder="Enter password"
              secureTextEntry
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              errorMsg={errors.password}
            />

            <InputText
              lable="Confirm Password"
              placeHolder="Enter password"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              errorMsg={errors.password}
            />
          </ScrollView>
          <Button style={CardStyles.button} title="Submit" onPress={handleSubmit}
            color={themeColor} />


          <View style={CardStyles.Alcontainer}>
          <Separator />
            <Text onPress={() => navigation.navigate('Login')}>Alreay Register? sign in</Text>
          </View>

        </View>
      </View>
    </SafeAreaView>

  )
}

export default Register

const CardStyles = StyleSheet.create({
  mainContainer: {
    backgroundColor: themeColor,
    padding: "2px",
    height: "100%",
    display: "flex",
    // justifyContent: "center",
    alignItems: "center"
  },
  button: {
    padding: 20,
    margin: 10,
    backgroundColor: themeColor,
    color: themeColor
  },
  formContaine: {
    backgroundColor: "#c9a07a",

    width: "95%",
    padding: 10,
    borderRadius: 10,

  },
  item: {
    color: "red",
    width: 50,
    height: 50
  },
  Heading: {
    fontSize: 30,
    textAlign: "center",
    color: themeColor
  },
  ScrollView: {
    marginTop: 20
  },
  Alcontainer: {
    display: "flex",
    justifyContent: "center",
    margin: "auto",
    alignItems: "center",
    padding: 20,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

})
