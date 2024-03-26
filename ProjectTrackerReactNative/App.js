import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import LayoutScreen from './src/screens/LayoutScreen';

// Definimos una variable para obtener metodos de navegacion
const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Layout'>
        <Stack.Screen name='Iniciar Sesion' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Layout' component={LayoutScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}