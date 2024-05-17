import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import DrawerUserInfo from '@/components/material/matDrawer/DrawerUserInfo';


export default function DrawerLayoutScreen() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer drawerContent={(props) => <DrawerUserInfo {...props} />}>
                <Drawer.Screen
                    name="index" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Inicio',
                        title: 'Inicio',
                    }}
                />
                <Drawer.Screen
                    name="usuario" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Usuarios',
                        title: 'Usuarios',
                    }}
                />
                <Drawer.Screen
                    name="proyecto" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Proyectos',
                        title: 'Proyectos',
                    }}
                />
                <Drawer.Screen
                    name="tarea" // This is the name of the page and must match the url from root
                    options={{
                        drawerLabel: 'Tareas',
                        title: 'Tareas',
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    );
}