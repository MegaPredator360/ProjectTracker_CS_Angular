import { Text, View, StyleSheet, FlatList, Button, TouchableHighlight } from "react-native"
import UsuarioService from "../services/UsuarioService"
import { useEffect, useState } from "react"
import { Usuario } from "../interfaces/UsuarioInterface"
import MatDivider from "../components/MatDivider/matDivider"
import MatInput from "../components/MatInput/matInput"
import MatButton from "../components/MatButton/matButton"

const UsuarioScreen = ({ navigation }: { navigation: any }) => {

    const [listaUsuario, setListaUsuario] = useState<Usuario[]>([])
    const [isPressed, setIsPressed] = useState(false); // Estado para rastrear si se está presionando el botón

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
        <View style={{ flex: 1 }}>
            <View style={styles.busquedaContainer}>
                <MatButton
                    title="Agregar Usuario"
                    marginTop={13}
                    marginBottom={13}
                    onPress={() => navigation.navigate('UsuarioFormulario', { name: 'Agregar Usuario', datosUsuario: null })}
                />
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
                            <TouchableHighlight
                                activeOpacity={0.9} // Desactiva la opacidad durante la interacción
                                underlayColor="black" // Establece un color transparente para que no haya un color de resaltado predeterminado
                                onPressIn={() => setIsPressed(true)} // Función para manejar el evento onPressIn (cuando se inicia la presión)
                                onPressOut={() => setIsPressed(false)} // Función para manejar el evento onPressOut (cuando se deja de presionar)
                                onPress={() => navigation.navigate('UsuarioFormulario', { name: 'Editar Usuario', datosUsuario: item })}
                            >
                                <View style={[styles.itemContainer, { backgroundColor: isPressed ? "#FFFFFF" : "#FFFFFF" }]}>
                                    <Text style={styles.itemTitle}>{item.usuaNombre}</Text>
                                    <Text>Cedula: {item.usuaCedula}</Text>
                                    <Text>Correo: {item.usuaCorreo}</Text>
                                    <Text>Permiso: {item.usuaPermNombre}</Text>
                                </View>
                            </TouchableHighlight>
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
        paddingHorizontal: 13
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
