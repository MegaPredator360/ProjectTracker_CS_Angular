import { Text, View, StyleSheet, Button } from "react-native"
import UsuarioService from "../services/UsuarioService"
import { useState } from "react"

const UsuarioScreen = () => {

    const [listaUsuario, setListaUsuario] = useState([])

    // Obtenemos la lista de Usuarios
    const obtenerUsuarios = async () => {

        // Llamamos al metodo de lista del servicio de usuarios
        await UsuarioService.Lista()
            .then(data => {
                if (data.status) {
                    // Aquí puedes procesar los datos recibidos
                    console.log(data.value);
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

    return (
        <View style={styles.container}>
            <Text>
                Usuario Screen
            </Text>
            <Button title="Obtener Usuarios" onPress={obtenerUsuarios} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default UsuarioScreen
