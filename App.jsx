import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useAuth, AuthProvider } from './src/Context/AuthContext';
import Home from './src/pages/Home';
import Rent from './src/pages/Rent';
import Register from './src/pages/Auth/Register';
import Login from './src/pages/Auth/SignIn';
import ToastManager from 'toastify-react-native';
import { Text } from 'react-native';


import { MD3LightTheme as DefaultTheme, Icon, MD3Colors, PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const AuthStack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AuthStackNavigator = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    <AuthStack.Screen name="Register" component={Register} options={{ headerShown: false }} />
  </AuthStack.Navigator>
);

const HomeStackNavigator = () => {
  const { logout } = useAuth();
  return (
    <AuthStack.Navigator initialRouteName="Home"
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Text
            onPress={() => navigation.openDrawer()}
            style={{ marginRight: 15 }}
          >

            <Icon
              source="menu"
              color={MD3Colors.error50}
              size={20}
            />
          </Text>

          // <Text style={{ marginLeft: 15, marginRight: 15 }} onPress={() => navigation.openDrawer()}>M</Text>
        ),
        headerRight: () => (
          // <Ionicons
          //   name="menu"
          //   size={24}
          //   color="black"
          //   style={{ marginLeft: 15 }}
          //   onPress={() => navigation.openDrawer()}
          // />
          <Text style={{ marginLeft: 15, marginRight: 15 }} onPress={logout}>Logout</Text>
        ),
      })}>
      <AuthStack.Screen name="Home" component={Home} />
      <AuthStack.Screen name="Rent" component={Rent} />
    </AuthStack.Navigator>
  )
};

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="HomeStack">
    <Drawer.Screen name="HomeStack" component={HomeStackNavigator} options={{ headerShown: false, title: "Home" }} />
    <Drawer.Screen name="Rent" component={Rent} />
  </Drawer.Navigator>
);

const AppNavigator = () => {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      <ToastManager width={"100%"} positionValue={0} />
      {isLoggedIn ? <DrawerNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};



const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};


const queryClient = new QueryClient();

const App = () => (
  <PaperProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </QueryClientProvider>
  </PaperProvider>
);

export default App;





// import 'react-native-gesture-handler';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import * as React from 'react';
// import { View, Text, Button } from 'react-native';
// // Only import react-native-gesture-handler on native platforms

// // import { Ionicons } from '@expo/vector-icons'; // or any other icon library

// import Rent from './pages/Rent';
// import Register from './pages/Auth/Register';
// import Login from './pages/Auth/SignIn';
// import ToastManager from 'toastify-react-native';
// import Home from './pages/Home';

// const Drawer = createDrawerNavigator();
// const Stack = createNativeStackNavigator();




// function HomeStackNavigator({ navigation }) {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen
//         name="Home"
//         component={Home}
//         options={{
//           title: 'Home',
//           headerLeft: () => (
//             // <Ionicons
//             //   name="menu"
//             //   size={24}
//             //   color="black"
//             //   onPress={() => navigation.openDrawer()}
//             // />
//             <Text onPress={() => navigation.openDrawer()}>Menu</Text>
//           ),
//         }}
//       />
//       <Stack.Screen name="Rent" component={Rent} />
//     </Stack.Navigator>
//   );
// }

// function App() {
//   return (
//     <NavigationContainer>
//       <ToastManager width={"100%"} positionValue={0} />
//       <Stack.Navigator>
//         <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
//         <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
//       </Stack.Navigator>
//       <Drawer.Navigator>
//         <Drawer.Screen
//           name="HomeStack"
//           component={HomeStackNavigator}
//           options={{ headerShown: false }}
//         />
//         <Drawer.Screen name="Login" component={Login} />
//         <Drawer.Screen name="Register" component={Register} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;















// // In App.js in a new project

// import * as React from 'react';
// import { View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Home from './pages/Home';
// import Rent from './pages/Rent';
// import Register from './pages/Auth/Register';
// import Login from './pages/Auth/SignIn';
// import ToastManager, { Toast } from 'toastify-react-native'
// import Loader from './utils/Helper/loader';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Icon } from 'react-native-vector-icons/Icon';

// const Stack = createNativeStackNavigator();

// function App() {


//   return (
//     <NavigationContainer>
//       <ToastManager
//         width={"100%"}
//         positionValue={0}
//       />

//       <Stack.Navigator>
//         <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
//         <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
//         <Stack.Screen options={{
//           title: 'Home',
//           headerLeft: () => (
//             // <Icon
//             //   name="menu"
//             //   size={24}
//             //   color="black"
//             //   onPress={() => navigation.openDrawer()}
//             // />

//             <Text onPress={() => navigation.openDrawer()}>Menu</Text>
//           ),
//         }} name="Home" component={Home} />
//         <Stack.Screen options={{ headerShown: false }} name="Rent" component={Rent} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// export default App;






