import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {

  const colorScheme = useColorScheme();

  // Si la ruta principal es una carpeta, el app buscará un archivo index
  // de lo contrario, no cargará
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(pages)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />

        {/* Se utiliza un nombre dinamico para esta pantalla */}
        <Stack.Screen name="usuarioFormulario" options={({ route }) => ({ title: route.params.name, headerBackTitle: 'Atrás' })} />
        <Stack.Screen
          name="usuarioDetalle"
          options={{
            title: 'Detalle de Usuario',
            headerBackTitle: 'Atrás'
          }} />

        <Stack.Screen name="proyectoFormulario" options={({ route }) => ({ title: route.params.name, headerBackTitle: 'Atrás' })} />
        <Stack.Screen
          name="proyectoDetalle"
          options={{
            title: 'Detalle de Proyecto',
            headerBackTitle: 'Atrás'
          }} />
      </Stack>
    </ThemeProvider>
  );
}
