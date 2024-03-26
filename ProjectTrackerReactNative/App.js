import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/Login';
import LayoutScreen from './src/screens/Layout';

// Definimos una variable para obtener metodos de navegacion
const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      {/* Rest of your app code */}
      <Stack.Navigator initialRouteName='Layout'>
        <Stack.Screen name='Iniciar Sesion' component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name='Layout' component={LayoutScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}