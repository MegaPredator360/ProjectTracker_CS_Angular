import { Text, View, StyleSheet, FlatList, Button, TouchableHighlight, TouchableOpacity, Alert } from "react-native"
import UsuarioService from "@/services/UsuarioService"
import React, { useState } from "react"
import { Usuario } from "@/interfaces/UsuarioInterface"
import MatDivider from "@/components/material/matDivider/matDivider"
import MatInput from "@/components/material/matInput/matInput"
import MatButton from "@/components/material/matButton/matButton"
import { useFocusEffect } from "@react-navigation/native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedView } from "@/components/ThemedView"
import { ThemedText } from "@/components/ThemedText"
import { router } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function UsuarioScreen() {

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

        // Se muestra una alerta preguntando si quiere borrar el usuario
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

                            // Se muestra una alerta avisando que se borró el usuario
                            Alert.alert('Información', 'El usuario fue eliinado con exito', [
                                {
                                    text: 'Aceptar'
                                }
                            ]);
                            obtenerUsuarios()
                        }
                        else {

                            // Se muestra una alerta avisando que ocurrio un error al borrar el usuario
                            Alert.alert('¡Error!', 'Ocurrio un error al eliminar el usuario', [
                                {
                                    text: 'Aceptar'
                                }
                            ]);
                            console.error(data.msg);
                        }
                    })
                    .catch(error => {
                        // Se muestra una alerta avisando que ocurrio un error al borrar el usuario
                        Alert.alert('¡Error!', 'Ocurrio un error al eliminar el usuario', [
                            {
                                text: 'Aceptar'
                            }
                        ]);

                        // Manejar errores
                        console.error(error);
                    })
            },
        ]);
    }

    // Filtrar lista en base al campo de busqueda
    const listaUsuarioFiltrada = listaUsuario.filter(usuario =>
        usuario.usuaNombre.toLowerCase().includes(filterText.toLowerCase()),
    );

    // Modo Oscuro
    const colorScheme = useColorScheme();
    const itemTheme = colorScheme === 'light' ? '#FFFFFF' : "#151718";
    const dividerTheme = colorScheme === 'light' ? '#151718' : "#7A7A7A";
    const itemSelectedTheme = colorScheme === 'light' ? '#151718' : '#FFFFFF'

    // Inicializamos la busqueda de usuarios
    useFocusEffect(
        // Este efecto se ejecutará cada vez que la pantalla esté presente
        React.useCallback(() => {
            obtenerUsuarios()
        }, [])
    )

    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedView style={styles.busquedaContainer}>
                <MatButton
                    title="Agregar Usuario"
                    marginTop={13}
                    marginBottom={13}
                    onPress={() => { router.navigate({ pathname: 'usuarioFormulario', params: { 'name': 'Agregar Usuario', 'datosUsuario': null } }) }}

                />
                <MatInput
                    label="Buscar Usuario"
                    onChangeText={(text) => setFilterText(text)}
                    value={filterText}
                />
            </ThemedView>
            <MatDivider color={dividerTheme} />
            {/* Se genera la lista de usuarios */}
            <FlatList
                style={styles.listaContainer}
                data={listaUsuarioFiltrada}
                renderItem={({ item }) => {
                    return (
                        <ThemedView>
                            <TouchableHighlight
                                activeOpacity={0.8} // Desactiva la opacidad durante la interacción
                                underlayColor={itemSelectedTheme} // Establece un color transparente para que no haya un color de resaltado predeterminado
                                onPressIn={() => setIsPressed(true)} // Función para manejar el evento onPressIn (cuando se inicia la presión)
                                onPressOut={() => setIsPressed(false)} // Función para manejar el evento onPressOut (cuando se deja de presionar)
                                onPress={() => { router.navigate({ pathname: 'usuarioDetalle', params: { 'datosUsuario': JSON.stringify(item) } }) }}
                            >
                                <ThemedView style={[styles.itemContainer, { backgroundColor: isPressed ? itemTheme : itemTheme }]}>
                                    <ThemedView style={[styles.infoContainer]}>
                                        <ThemedText style={styles.itemTitle}>{item.usuaNombre}</ThemedText>
                                        <ThemedText>Cedula: {item.usuaCedula}</ThemedText>
                                        <ThemedText>Correo: {item.usuaCorreo}</ThemedText>
                                        <ThemedText>Permiso: {item.usuaPermNombre}</ThemedText>
                                    </ThemedView>

                                    <ThemedView style={styles.actionBtn}>
                                        {/* Botón para borrar un usuario */}
                                        <TouchableOpacity
                                            onPress={() => eliminarUsuario(item)}
                                        >
                                            <MaterialCommunityIcons name="delete" size={30} color="red" />
                                        </TouchableOpacity>

                                        {/* Botón para editar un usuario */}
                                        <TouchableOpacity
                                            style={{ marginTop: 15 }}
                                            onPress={() => { router.navigate({ pathname: 'usuarioFormulario', params: { 'name': 'Editar Usuario', 'datosUsuario': JSON.stringify(item) } }) }}
                                        >
                                            <MaterialCommunityIcons name="pencil" size={30} color="#3E9C7E" />
                                        </TouchableOpacity>
                                    </ThemedView>
                                </ThemedView>

                            </TouchableHighlight>
                            <MatDivider color={dividerTheme} />
                        </ThemedView>
                    )
                }}
            />
        </ThemedView>
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
        flexDirection: 'row', // Establece la dirección horizontal
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    infoContainer: {
        padding: 10,
        width: '88%'
    },
    actionBtn: {
        width: '12%',
        paddingLeft: '2%',
        paddingTop: 10
    }
})