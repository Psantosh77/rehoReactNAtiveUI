import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from './pages/Home';
import Rent from './pages/Rent';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeStackNavigator} />
      <Drawer.Screen name="Rent" component={Rent} />
    </Drawer.Navigator>
  );
}