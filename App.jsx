// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './pages/Home';
import Rent from './pages/Rent';
import Register from './pages/Auth/Register';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={Home} />
        <Stack.Screen  options={{ headerShown: false }} name="Rent" component={Rent} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;





// import React from 'react';

// import {
//   SafeAreaView,
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
// import Home from './pages/Home';


// function App() {

//   return (

//     <Home />

//   );
// }



// export default App;
