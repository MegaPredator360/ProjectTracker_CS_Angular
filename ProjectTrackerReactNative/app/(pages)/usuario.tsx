import { StyleSheet, FlatList, TouchableHighlight, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { Usuario } from "@/interfaces/UsuarioInterface"
import UsuarioService from "@/services/UsuarioService"
import MatDivider from "@/components/material/matDivider/matDivider"
import MatInput from "@/components/material/matInput/matInput"
import MatButton from "@/components/material/matButton/matButton"
import MatDialog from "@/components/material/matDialog/matDialog"
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

    // Manejo de alertas
    const [confirmation, setConfirmation] = useState(false);
    const [usuarioSelect, setUsuarioSelect] = useState<Usuario>()
    const [alert, setAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMsg, setAlertMsg] = useState('')

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

    // Eliminar Usuario
    const eliminarUsuario = async (usuarioId: number) => {

        // Se cierra cuadro de confirmacion
        setConfirmation(false)

        // Se realiza la solicitud
        await UsuarioService.Eliminar(usuarioId)
            .then(data => {
                if (data.status) {

                    // Se muestra una alerta avisando que se borró el usuario
                    setAlertTitle('Información')
                    setAlertMsg('El usuario fue borrado con exito')
                    setAlert(true)
                    obtenerUsuarios()
                }
                else {

                    // Se muestra una alerta avisando que ocurrio un error al borrar el usuario
                    setAlertTitle('Error')
                    setAlertMsg('Ocurrio un error al borrar el usuario')
                    setAlert(true)
                    console.error(data.msg);
                }
            })
            .catch(error => {
                // Se muestra una alerta avisando que ocurrio un error al borrar el usuario
                setAlertTitle('Error')
                setAlertMsg('Ocurrio un error al borrar el usuario')
                setAlert(true)

                // Manejar errores
                console.error(error);
            })
    }

    // Mostrar la advertencia de eliminar
    const mostrarAdvertencia = (item: Usuario) => {
        setUsuarioSelect(item)
        setConfirmation(true)
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
                                            onPress={() => mostrarAdvertencia(item)}
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
            {/* Dialogo de Confirmacion */}
            <MatDialog
                title="Advertencia"
                message={`¿Deseas eliminar el usuario: ${usuarioSelect?.usuaNombre}?`}
                visible={confirmation}
                primaryText="Aceptar"
                primaryAction={() => eliminarUsuario(usuarioSelect ? usuarioSelect.usuaId : 0)}
                secondaryText="Cancelar"
                secondaryAction={() => setConfirmation(false)}
            />

            {/* Dialogo de Alerta */}
            <MatDialog
                title={alertTitle}
                message={alertMsg}
                visible={alert}
                primaryAction={() => setAlert(false)}
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