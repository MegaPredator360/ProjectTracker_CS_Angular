import { StyleSheet, FlatList, TouchableHighlight, TouchableOpacity } from "react-native"
import React, { useState } from "react"
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
import { Proyecto } from "@/interfaces/ProyectoInterface"
import ProyectoService from "@/services/ProyectoService"

export default function ProyectoScreen() {

    const [listaProyecto, setListaProyecto] = useState<Proyecto[]>([])
    const [isPressed, setIsPressed] = useState(false); // Estado para rastrear si se está presionando el botón
    const [filterText, setFilterText] = useState('')

    // Manejo de alertas
    const [confirmation, setConfirmation] = useState(false);
    const [proyectoSelect, setProyectoSelect] = useState<Proyecto>()
    const [alert, setAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMsg, setAlertMsg] = useState('')

    // Obtenemos la lista de proyectos
    const obtenerProyectos = async () => {

        // Llamamos al metodo de lista del servicio de proyectos
        await ProyectoService.Lista()
            .then(data => {
                if (data.status) {

                    // Aquí se procesan los datos recibidos
                    setListaProyecto(data.value)
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

    // Eliminar proyecto
    const eliminarProyecto = async (proyectoId: number) => {

        // Se cierra cuadro de confirmacion
        setConfirmation(false)

        // Se realiza la solicitud
        await ProyectoService.Eliminar(proyectoId)
            .then(data => {
                if (data.status) {

                    // Se muestra una alerta avisando que se borró el proyecto
                    setAlertTitle('Información')
                    setAlertMsg('El proyecto fue borrado con exito')
                    setAlert(true)
                    obtenerProyectos()
                }
                else {

                    // Se muestra una alerta avisando que ocurrio un error al borrar el proyecto
                    setAlertTitle('Error')
                    setAlertMsg('Ocurrio un error al borrar el proyecto')
                    setAlert(true)
                    console.error(data.msg);
                }
            })
            .catch(error => {
                // Se muestra una alerta avisando que ocurrio un error al borrar el proyecto
                setAlertTitle('Error')
                setAlertMsg('Ocurrio un error al borrar el proyecto')
                setAlert(true)

                // Manejar errores
                console.error(error);
            })
    }

    // Mostrar la advertencia de eliminar
    const mostrarAdvertencia = (item: Proyecto) => {
        setProyectoSelect(item)
        setConfirmation(true)
    }

    // Filtrar lista en base al campo de busqueda
    const listaProyectoFiltrada = listaProyecto.filter(proyecto =>
        proyecto.proyNombre.toLowerCase().includes(filterText.toLowerCase()),
    );

    // Modo Oscuro
    const colorScheme = useColorScheme();
    const itemTheme = colorScheme === 'light' ? '#FFFFFF' : "#151718";
    const dividerTheme = colorScheme === 'light' ? '#151718' : "#7A7A7A";
    const itemSelectedTheme = colorScheme === 'light' ? '#151718' : '#FFFFFF'

    // Inicializamos la busqueda de proyectos
    useFocusEffect(
        // Este efecto se ejecutará cada vez que la pantalla esté presente
        React.useCallback(() => {
            obtenerProyectos()
        }, [])
    )

    return (
        <ThemedView style={{ flex: 1 }}>
            <ThemedView style={styles.busquedaContainer}>
                <MatButton
                    title="Agregar Proyecto"
                    marginTop={13}
                    marginBottom={13}
                    onPress={() => { router.navigate({ pathname: 'proyectoFormulario', params: { 'name': 'Agregar Proyecto', 'datosProyecto': null } }) }}

                />
                <MatInput
                    label="Buscar Proyecto"
                    onChangeText={(text) => setFilterText(text)}
                    value={filterText}
                />
            </ThemedView>
            <MatDivider color={dividerTheme} />

            {/* Se genera la lista de proyecto */}
            <FlatList
                style={styles.listaContainer}
                data={listaProyectoFiltrada}
                renderItem={({ item }) => {
                    return (
                        <ThemedView>
                            <TouchableHighlight
                                activeOpacity={0.8} // Desactiva la opacidad durante la interacción
                                underlayColor={itemSelectedTheme} // Establece un color transparente para que no haya un color de resaltado predeterminado
                                onPressIn={() => setIsPressed(true)} // Función para manejar el evento onPressIn (cuando se inicia la presión)
                                onPressOut={() => setIsPressed(false)} // Función para manejar el evento onPressOut (cuando se deja de presionar)
                                onPress={() => { router.navigate({ pathname: 'proyectoDetalle', params: { 'datosProyecto': JSON.stringify(item) } }) }}
                            >
                                <ThemedView style={[styles.itemContainer, { backgroundColor: isPressed ? itemTheme : itemTheme }]}>
                                    <ThemedView style={[styles.infoContainer]}>
                                        <ThemedText style={styles.itemTitle}>{item.proyNombre}</ThemedText>
                                        <ThemedText>Fecha de Inicio: {item.proyFechaInicio}</ThemedText>
                                        <ThemedText>Estado: {item.proyEstaNombre}</ThemedText>
                                        <ThemedText>Cantidad de Tareas Asignadas: {item.proyCantidadTarea}</ThemedText>
                                    </ThemedView>

                                    <ThemedView style={styles.actionBtn}>
                                        {/* Botón para borrar un proyecto */}
                                        <TouchableOpacity
                                            onPress={() => mostrarAdvertencia(item)}
                                        >
                                            <MaterialCommunityIcons name="delete" size={30} color="red" />
                                        </TouchableOpacity>

                                        {/* Botón para editar un proyecto */}
                                        <TouchableOpacity
                                            style={{ marginTop: 15 }}
                                            onPress={() => { router.navigate({ pathname: 'proyectoFormulario', params: { 'name': 'Editar Proyecto', 'datosProyecto': JSON.stringify(item) } }) }}
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
                message={`¿Deseas eliminar el proyecto: ${proyectoSelect?.proyNombre}?`}
                visible={confirmation}
                primaryText="Aceptar"
                primaryAction={() => eliminarProyecto(proyectoSelect ? proyectoSelect.proyId : 0)}
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