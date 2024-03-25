import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import HomeScreen from './Home';
import UsuarioScreen from './Usuario';
import ProyectoScreen from './Proyecto';
import TareaScreen from './Tarea';

import React, {useEffect} from 'react';
import { Alert, BackHandler } from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerUserInfo = (props) => {

    const navigation = useNavigation();

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Hold on!', 'Are you sure you want to go back?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'YES', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 20,
                        backgroundColor: '#f6f6f6',
                        marginBottom: 20,
                    }}
                >
                    <View>
                        <Text>John Doe</Text>
                        <Text>example@email.com</Text>
                    </View>
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                        }}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                    />
                </View>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: 50,
                    backgroundColor: '#f6f6f6',
                    padding: 20,
                }}
                onPress={() => navigation.navigate('Iniciar Sesion')}
            >
                <Text>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const LayoutScreen = () => {
    return (
        <Drawer.Navigator initialRouteName='Inicio' drawerContent={(props) => <DrawerUserInfo {...props} />}>
            <Drawer.Screen name="Inicio" component={HomeScreen} />
            <Drawer.Screen name="Usuarios" component={UsuarioScreen} />
            <Drawer.Screen name="Proyectos" component={ProyectoScreen} />
            <Drawer.Screen name="Tareas" component={TareaScreen} />
        </Drawer.Navigator>
    );
}

export default LayoutScreen