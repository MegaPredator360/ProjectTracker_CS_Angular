import { Text, View, StyleSheet, Button } from "react-native"
import UsuarioService from "../services/UsuarioService"
import { useState } from "react"

const UsuarioScreen = () => {

    const [listaUsuario, setListaUsuario] = useState([])

    const obtenerUsuarios = async () => {
        await UsuarioService.Lista()
            .then(response => response.json())
            .then(data => {
                // Aquí puedes procesar los datos recibidos
                console.log(data);
            })
            .catch(error => {
                // Manejar errores
                console.error('Error al realizar la solicitud:', error);
            })
        }

    return (
        <View style={styles.container}>
            <Text>
                Usuario Screen
            </Text>
            <Button title="Obtener Usuarios" onPress={obtenerUsuarios}/>
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
