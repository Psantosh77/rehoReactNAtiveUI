
import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { themeColor } from '../styles/color'

const InputText = (props) => {
  const { lable, placeHolder, onChangeText, errorMsg, ...rest } = props

  const [input, setInput] = useState()

  console.log(input)

  return (
    <View style={CardStyles.inputContainer}>

      {
        lable &&
        <Text style={CardStyles.label}>{lable}</Text>
      }
      {/* <Text>
        <Icon name="user" size={30} color="#900" />
      </Text> */}
      <TextInput
        style={CardStyles.input}
        placeholder={placeHolder && placeHolder}
        // leftIcon={{ type: 'font-awesome', name: 'comment' }}
        onChangeText={(value) => onChangeText && onChangeText(value)}
        {...rest}
      />
      {errorMsg && <Text style={CardStyles.errorText}>{errorMsg}</Text>}
    </View>
  )
}

export default InputText


const CardStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,

  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "white"
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    color: themeColor
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  icon: {
    marginHorizontal: 10,

  },
})
