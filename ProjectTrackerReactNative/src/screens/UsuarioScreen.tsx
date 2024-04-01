import { Text, View, StyleSheet, FlatList, Button } from "react-native"
import UsuarioService from "../services/UsuarioService"
import { useEffect, useState } from "react"
import { Usuario } from "../interfaces/UsuarioInterface"
import MatDivider from "../components/MatDivider/matDivider"
import MatInput from "../components/MatInput/matInput"

const UsuarioScreen = () => {

    const [listaUsuario, setListaUsuario] = useState<Usuario[]>([])

    // Obtenemos la lista de Usuarios
    const obtenerUsuarios = async () => {

        // Llamamos al metodo de lista del servicio de usuarios
        await UsuarioService.Lista()
            .then(data => {
                if (data.status) {
                    // Aquí se procesan los datos recibidos
                    setListaUsuario(data.value)
                }
                else {
                    console.error(data.msg);
                }
            })
            .catch(error => {
                // Manejar errores
                console.error(error);
            })
    }

    // Inicializamos la busqueda de usuarios
    useEffect(() => {
        obtenerUsuarios()
    }, [])

    return (
        <View style={{flex: 1}}>
            <View style={styles.busquedaContainer}>
                <Button title="Agregar Usuario"></Button>
                <MatInput label="Buscar Usuario" />
            </View>
            <MatDivider />
            {/* Se genera la lista de usuarios */}
            <FlatList
                style={styles.listaContainer}
                data={listaUsuario}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <View style={styles.itemContainer}>
                                <Text style={styles.itemTitle}>{item.usuaNombre}</Text>
                                <Text>Cedula: {item.usuaCedula}</Text>
                                <Text>Correo: {item.usuaCorreo}</Text>
                                <Text>Permiso: {item.usuaPermNombre}</Text>
                            </View>
                            <MatDivider color="#B3B3B3" />
                        </View>
                    )
                }}
            />
        </View>
    )
    
}

const styles = StyleSheet.create({
    busquedaContainer: {    
        padding: 13
    },
    listaContainer: {
        flexGrow: 1
    },
    itemContainer: {
        padding: 10
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default UsuarioScreen
