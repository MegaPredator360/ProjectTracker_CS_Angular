import { Text, View, StyleSheet, FlatList, Button, TouchableHighlight, TouchableOpacity, Alert } from "react-native"
import UsuarioService from "../services/UsuarioService"
import React, { useState } from "react"
import { Usuario } from "../interfaces/UsuarioInterface"
import MatDivider from "../components/MatDivider/matDivider"
import MatInput from "../components/MatInput/matInput"
import MatButton from "../components/MatButton/matButton"
import { useFocusEffect } from "@react-navigation/native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UtilityService from "../services/UtilityService"

const UsuarioScreen = ({ navigation }: { navigation: any }) => {

    const [listaUsuario, setListaUsuario] = useState<Usuario[]>([])
    const [isPressed, setIsPressed] = useState(false); // Estado para rastrear si se está presionando el botón
    const [filterText, setFilterText] = useState('')

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

    const eliminarUsuario = async (usuario: Usuario) => {
        Alert.alert('Eliminar Usuario', '¿Deseas eliminar el usuario: ' + usuario.usuaNombre + '?', [
            {
                text: 'Volver',
                style: 'cancel',
            },
            {
                text: 'Aceptar',
                onPress: async () => await UsuarioService.Eliminar(usuario.usuaId)
                    .then(data => {
                        if (data.status) {
                            UtilityService.mostrarAlerta("Información", "El usuario fue eliminado con exito")
                            obtenerUsuarios()
                        }
                        else {
                            UtilityService.mostrarAlerta("¡Error!", "Ocurrio un error al eliminar el usuario")
                            console.error(data.msg);
                        }
                    })
                    .catch(error => {
                        // Manejar errores
                        UtilityService.mostrarAlerta("¡Error!", "Ocurrio un error al eliminar el usuario")
                        console.error(error);
                    })
            },
        ]);
    }

    // Filtrar lista en base al campo de busqueda
    const listaUsuarioFiltrada = listaUsuario.filter(usuario =>
        usuario.usuaNombre.toLowerCase().includes(filterText.toLowerCase()),
    );

    // Inicializamos la busqueda de usuarios
    useFocusEffect(
        // Este efecto se ejecutará cada vez que la pantalla esté presente
        React.useCallback(() => {
            obtenerUsuarios()
        }, [])
    )

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.busquedaContainer}>
                <MatButton
                    title="Agregar Usuario"
                    marginTop={13}
                    marginBottom={13}
                    onPress={() => navigation.navigate('UsuarioFormulario', { name: 'Agregar Usuario', datosUsuario: null })}
                />
                <MatInput
                    label="Buscar Usuario"
                    onChangeText={(text) => setFilterText(text)}
                    value={filterText}
                />
            </View>
            <MatDivider />
            {/* Se genera la lista de usuarios */}
            <FlatList
                style={styles.listaContainer}
                data={listaUsuarioFiltrada}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableHighlight
                                activeOpacity={0.9} // Desactiva la opacidad durante la interacción
                                underlayColor="black" // Establece un color transparente para que no haya un color de resaltado predeterminado
                                onPressIn={() => setIsPressed(true)} // Función para manejar el evento onPressIn (cuando se inicia la presión)
                                onPressOut={() => setIsPressed(false)} // Función para manejar el evento onPressOut (cuando se deja de presionar)
                                onPress={() => navigation.navigate('Detalle de Usuario', { datosUsuario: item })}
                            >
                                <View style={[styles.itemContainer, { backgroundColor: isPressed ? "#FFFFFF" : "#FFFFFF" }]}>
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.itemTitle}>{item.usuaNombre}</Text>
                                        <Text>Cedula: {item.usuaCedula}</Text>
                                        <Text>Correo: {item.usuaCorreo}</Text>
                                        <Text>Permiso: {item.usuaPermNombre}</Text>
                                    </View>

                                    <View style={styles.actionBtn}>
                                        {/* Botón para borrar un usuario */}
                                        <TouchableOpacity
                                            onPress={() => eliminarUsuario(item)}
                                        >
                                            <MaterialCommunityIcons name="delete" size={30} color="red" />
                                        </TouchableOpacity>

                                        {/* Botón para editar un usuario */}
                                        <TouchableOpacity
                                            style={{ marginTop: 15 }}
                                            onPress={() => navigation.navigate('UsuarioFormulario', { name: 'Editar Usuario', datosUsuario: item })}
                                        >
                                            <MaterialCommunityIcons name="pencil" size={30} color="#3E9C7E" />
                                        </TouchableOpacity>
                                    </View>
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
        flexGrow: 1,
        width: '100%'
    },
    itemContainer: {
        padding: 10,
        flexDirection: 'row', // Establece la dirección horizontal
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    infoContainer: {
        width: '90%'
    },
    actionBtn: {
        width: '10%',
        paddingLeft: '2%'
    }
})

export default UsuarioScreen
