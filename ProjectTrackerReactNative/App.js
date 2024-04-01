import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import LayoutScreen from './src/screens/LayoutScreen';
import UsuarioFormularioScreen from './src/screens/UsuarioFormularioScreen';

// Definimos una variable para obtener metodos de navegacion
const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Layout'>
        <Stack.Screen
          name='Iniciar Sesion'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Layout'
          component={LayoutScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='UsuarioFormulario'
          component={UsuarioFormularioScreen}
          
          // Me permitirá agregar un nombre personalizado a la pantalla cuando lo necesite
          options={({ route }) => ({ title: route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}