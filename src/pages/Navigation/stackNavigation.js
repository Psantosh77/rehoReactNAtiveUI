import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Auth/SignIn';
import Register from '../Auth/Register';
import Home from '../Home';
import Rent from '../Rent';


const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
        <Stack.Screen options={{ title: 'Home'}} name="Home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="Rent" component={Rent} />
      </Stack.Navigator>
    </Stack.Navigator>
  );
}

export default StackNavigator