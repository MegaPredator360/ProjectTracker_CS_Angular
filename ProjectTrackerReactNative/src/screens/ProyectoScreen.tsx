import { useState } from "react";
import { Text, View, StyleSheet, Alert, FlatList, TouchableHighlight, TouchableOpacity } from "react-native"
import { Proyecto } from "../interfaces/ProyectoInterface";
import ProyectoService from "../services/ProyectoService";
import UtilityService from "../services/UtilityService";
import { useFocusEffect } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from "react";
import MatButton from "../components/MatButton/matButton";
import MatInput from "../components/MatInput/matInput";
import MatDivider from "../components/MatDivider/matDivider";

const ProyectoScreen = ({ navigation }: { navigation: any }) => {

    const [listaProyecto, setListaProyecto] = useState<Proyecto[]>([])
    const [isPressed, setIsPressed] = useState(false); // Estado para rastrear si se está presionando el botón
    const [filterText, setFilterText] = useState('')

    // Obtenemos la lista de Proyectos
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

    const eliminarProyecto = async (proyecto: Proyecto) => {
        Alert.alert('Eliminar Proyecto', '¿Deseas eliminar el proyecto: ' + proyecto.proyNombre + '? \n\nNota: Se borrarán tambien las tareas asociadas al proyecto', [
            {
                text: 'Volver',
                style: 'cancel',
            },
            {
                text: 'Aceptar',
                onPress: async () => await ProyectoService.Eliminar(proyecto.proyId)
                    .then(data => {
                        if (data.status) {
                            UtilityService.mostrarAlerta("Información", "El proyecto fue eliminado con exito")
                            obtenerProyectos()
                        }
                        else {
                            UtilityService.mostrarAlerta("¡Error!", "Ocurrio un error al eliminar el proyecto")
                            console.error(data.msg);
                        }
                    })
                    .catch(error => {
                        // Manejar errores
                        UtilityService.mostrarAlerta("¡Error!", "Ocurrio un error al eliminar el proyecto")
                        console.error(error);
                    })
            },
        ]);
    }

    // Filtrar lista en base al campo de busqueda
    const listaProyectoFiltrada = listaProyecto.filter(proyecto =>
        proyecto.proyNombre.toLowerCase().includes(filterText.toLowerCase()),
    );

    // Inicializamos la busqueda de proyectos
    useFocusEffect(
        // Este efecto se ejecutará cada vez que la pantalla esté presente
        React.useCallback(() => {
            obtenerProyectos()
        }, [])
    )

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.busquedaContainer}>
                <MatButton
                    title="Agregar Proyecto"
                    marginTop={13}
                    marginBottom={13}
                    onPress={() => navigation.navigate('ProyectoFormulario', { name: 'Agregar Proyecto', datosProyecto: null })}
                />
                <MatInput
                    label="Buscar Proyecto"
                    onChangeText={(text) => setFilterText(text)}
                    value={filterText}
                />
            </View>
            <MatDivider />
            {/* Se genera la lista de proyectos */}
            <FlatList
                style={styles.listaContainer}
                data={listaProyectoFiltrada}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <TouchableHighlight
                                activeOpacity={0.9} // Desactiva la opacidad durante la interacción
                                underlayColor="black" // Establece un color transparente para que no haya un color de resaltado predeterminado
                                onPressIn={() => setIsPressed(true)} // Función para manejar el evento onPressIn (cuando se inicia la presión)
                                onPressOut={() => setIsPressed(false)} // Función para manejar el evento onPressOut (cuando se deja de presionar)
                                onPress={() => navigation.navigate('Detalle de Proyecto', { datosProyecto: item })}
                            >
                                <View style={[styles.itemContainer, { backgroundColor: isPressed ? "#FFFFFF" : "#FFFFFF" }]}>
                                    <Text style={styles.itemTitle}>{item.proyNombre}</Text>
                                    <Text>Fecha de Inicio: {item.proyFechaInicio}</Text>
                                    <Text>Estado: {item.proyEstaNombre}</Text>
                                    <Text>Tareas Asignadas: {item.proyCantidadTarea}</Text>

                                    {/* Botón para borrar un proyecto */}
                                    <TouchableOpacity
                                        style={{ position: 'absolute', right: 10, top: 15 }}
                                        onPress={() => eliminarProyecto(item)}
                                    >
                                        <MaterialCommunityIcons name="delete" size={30} color="red" />
                                    </TouchableOpacity>

                                    {/* Botón para editar un proyecto */}
                                    <TouchableOpacity
                                        style={{ position: 'absolute', right: 10, top: 65 }}
                                        onPress={() => navigation.navigate('ProyectoFormulario', { name: 'Editar Proyecto', datosProyecto: item })}
                                    >
                                        <MaterialCommunityIcons name="pencil" size={30} color="#3E9C7E" />
                                    </TouchableOpacity>
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
        padding: 10
    },
    itemTitle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
})

export default ProyectoScreen