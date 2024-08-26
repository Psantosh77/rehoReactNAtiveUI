import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Button, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import InputText from '../../../../component/input'
import { Image } from 'react-native'
import { themeColor } from '../../../styles/color'
import ApiService from '../../../../utils/Api/apiCall'
import { validateField } from '../../../../utils/Helper/validation'
import { Toast } from 'toastify-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useAuth } from '../../../Context/AuthContext'


const Separator = () => <View style={CardStyles.separator} />;

GoogleSignin.configure({
  webClientId: '767423228188-tm9j93emr59kjds15n0e0lsoplblog6n.apps.googleusercontent.com',
});

const Login = ({ navigation }) => {
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: 'Raju1997@gmail.com',
    password: 'Raju@100',
  });

  const [errors, setErrors] = useState({});

  const validationRules = {

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
        endpoint: 'auth/SignIn',
        payload: formData,
        onSuccess: async (response) => {
          // Alert.alert('Form Submitted', JSON.stringify(response.message, null, 2));
          Toast.success(response.message)
          const jsonValue = JSON.stringify(response.accessToken);
          
          await login(response.accessToken);
          navigation.navigate('HomeStack', {
            screen: 'Home',  // This is the screen inside the HomeStack you want to navigate to
          });
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

  useEffect(() => {
    // Check if the user is already signed in
    isSignedIn();

  }, []);

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.hasPreviousSignIn();
    console.log("is", isSignedIn)
    if (isSignedIn) {
      getCurrentUserInfo();
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log(userInfo);
    } catch (error) {
      console.error(error);
    }
  };


  const signInWithGoogle = async () => {

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("userInfo", userInfo);
      Alert.alert('Form Submitted', JSON.stringify(userInfo, null, 2));

      // Send the idToken to your server for further processing
      const idToken = userInfo.idToken;
      // Call the backend API to verify the token and handle login
      // fetch('YOUR_BACKEND_URL', { method: 'POST', body: JSON.stringify({ token: idToken }) })
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign in is in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services not available');
      } else {
        console.error(error);
      }
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
          <Text style={CardStyles.Heading}>Login</Text>
          <ScrollView style={CardStyles.ScrollView}>


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


          </ScrollView>
          <Button style={CardStyles.button} title="Sign in" onPress={handleSubmit}
            color={themeColor} />

          <GoogleSigninButton onPress={signInWithGoogle} style={{width:"100%" , marginVertical:10} }/>
          <View style={CardStyles.Alcontainer}>
            <Separator />
            <Text onPress={() => navigation.navigate('Register')} >Alreay Register? sign in</Text>
          </View>

        </View>
      </View>
    </SafeAreaView>

  )
}

export default Login

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
