import React, { useState } from 'react'
import { ActivityIndicator, Alert, Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import InputText from '../../../component/input'
import { Image } from 'react-native'
import { themeColor } from '../../../styles/color'
import ApiService from '../../../utils/Api/apiCall'


const Register = () => {
  console.log("rEGISTER PAGE")

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',

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

  const validateField = (value, validations) => {
    for (let validation of validations) {
      const { type, message, ...params } = validation;
  
      if (type === 'required' && !value.trim()) {
        return message || 'This field is required';
      }
  
      if (type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
        return message || 'Invalid email address';
      }
  
      if (type === 'minLength' && value.length < params.minLength) {
        return message || `Must be at least ${params.minLength} characters long`;
      }
  
      if (type === 'numeric' && isNaN(value)) {
        return message || 'Must be a number';
      }
  
      // Add more validation types as needed
    }
    return null; // No errors found
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

      console.log("formData" ,formData)
      ApiService.request({
        method: 'POST',
        endpoint: 'auth/',
        payload: formData,
        onSuccess: (response) => {  
          Alert.alert('Form Submitted', JSON.stringify(response.message, null, 2));
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




  console.log(formData, errors)

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
              //lable="Full Name"
              placeHolder="Enter Full Name"
             
              value={formData.fullName}
              onChangeText={(value) => handleInputChange('fullName', value)}
              errorMsg = {errors.fullName}
            />

            <InputText
              // lable="Full Name"
              placeHolder="Enter Email Id"
              
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              errorMsg = {errors.email}
              keyboardType="email-address"
            />

            <InputText
              // lable="Full Name"
              placeHolder="Enter password"
              secureTextEntry
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              errorMsg = {errors.password}
            />

          </ScrollView>
          <Button style={CardStyles.button} title="Submit" onPress={handleSubmit} />

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
    padding: 10,
    margin: 10,
    backgroundColor: themeColor
  },
  formContaine: {
    backgroundColor: "#c9a07a",
  
    width: "95%",
    padding: 10,
    borderRadius: 10,

  },
  item: {
    color: "red",
    width: "50px",
    height: "50px"
  },
  Heading: {
    fontSize: 50,
    textAlign: "center",
    color: themeColor
  },
  ScrollView:{
    marginTop: 20
  }

})
