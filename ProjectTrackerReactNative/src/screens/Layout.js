import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerUserInfo from '../components/ReactDrawer/DrawerUserInfo';
import HomeScreen from './Home';
import UsuarioScreen from './Usuario';
import ProyectoScreen from './Proyecto';
import TareaScreen from './Tarea';

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