import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerUserInfo from '../components/ReactDrawer/DrawerUserInfo';
import HomeScreen from './HomeScreen';
import UsuarioScreen from './UsuarioScreen';
import ProyectoScreen from './ProyectoScreen';
import TareaScreen from './TareaScreen';

const Drawer = createDrawerNavigator();

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