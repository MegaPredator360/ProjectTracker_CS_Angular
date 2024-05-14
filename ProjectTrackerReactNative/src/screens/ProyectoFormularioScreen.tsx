import { View, StyleSheet, ScrollView } from "react-native"
import MatInput from "../components/MatInput/matInput"
import MatButton from "../components/MatButton/matButton";
import { useEffect, useState } from "react";
import MatDropdown from "../components/MatDropdown"
import UtilityService from "../services/UtilityService";
import ProyectoService from "../services/ProyectoService";
import EstadoService from "../services/EstadoService";
import { Proyecto } from "../interfaces/ProyectoInterface";
import { Estado } from "../interfaces/EstadoInterface";

const ProyectoFormularioScreen = ({ navigation: { goBack }, route }) => {

    const [listaEstado, setListaEstado] = useState<Estado[]>([])

    // Asignamos los datos del proyecto que recibimos
    const datosProyecto: Proyecto = route.params['datosProyecto'];

    const [isFocus, setIsFocus] = useState(false);

    // Valores del formulario
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [estado, setEstado] = useState(0)

    // Interfaz
    const [btnTitulo, setBtnTitulo] = useState('');

    // Obtenemos la lista de estados
    const obtenerEstados = async () => {

        // Llamamos al metodo de lista del servicio de estados
        await EstadoService.Lista()
            .then(data => {
                if (data.status) {
                    // Aquí se procesan los datos recibidos
                    setListaEstado(data.value)
                }
                else {
                    UtilityService.mostrarAlerta("¡Error!", "Ocurrio un error al obtener la lista de permisos")
                    console.error(data.msg);
                }
            })
            .catch(error => {
                // Manejar errores
                UtilityService.mostrarAlerta("¡Error!", "Ocurrio un error al obtener la lista de permisos")
                console.error(error);
            })
    }

    const cargarDatos = () => {
        console.log(datosProyecto)

        // Verificaremos si los datos que recibimos es diferente de null
        if (datosProyecto != null) {

            // Se cargan los datos de los proyectos
            setNombre(datosProyecto.proyNombre)
            setDescripcion(datosProyecto.proyDescripcion)
            setFechaInicio(datosProyecto.proyFechaInicio)
            setEstado(datosProyecto.proyEstaId)

            // Nombre de boton de acción
            setBtnTitulo("Editar Proyecto")
        }
        else {
            // Nombre de boton de acción
            setBtnTitulo("Agregar Proyecto")
        }
    }

    // Inicializamos metodos de carga de datos
    useEffect(() => {
        obtenerEstados()
        cargarDatos()
    }, [])

    const guardarActualizarProyecto = async () => {

        // Se verificará que todos los campos estén llenos
        if (
            nombre == "" ||
            descripcion == "" ||
            fechaInicio == "" ||
            estado == 0
        ) {
            UtilityService.mostrarAlerta("¡Error!", "Hay uno o más campos vacios")
            return
        }

        // Se crea el objeto que será enviado
        const proyecto: Proyecto = {
            proyId: datosProyecto === null ? 0 : datosProyecto.proyId,
            proyNombre: nombre,
            proyDescripcion: descripcion,
            proyFechaInicio: fechaInicio,
            proyEstaId: estado,
            proyEstaNombre: "",
            proyCantidadTarea: 0
        }


        if (datosProyecto == null) {
            // Enviamos la solicitud para agregar un proyecto nuevo
            await ProyectoService.Guardar(proyecto)
                .then(data => {
                    if (data.status) {
                        // Mensaje de exito
                        UtilityService.mostrarAlerta("Información", "El proyecto fue agregado con exito")
                        goBack()
                    }
                    else {
                        UtilityService.mostrarAlerta("¡Error!", "Ocurrio un error al agregar el proyecto")
                        console.error(data.msg);
                    }
                })
                .catch(error => {
                    // Manejar errores
                    UtilityService.mostrarAlerta("¡Error!", "Ocurrio un error al agregar el proyecto")
                    console.error(error);
                })
        }
        else {
            // Enviamos la solicitud para actualizar un proyecto existente
            await ProyectoService.Editar(proyecto)
                .then(data => {
                    if (data.status) {
                        // Mensaje de exito
                        UtilityService.mostrarAlerta("Información", "El proyecto fue actualizado con exito")
                        goBack()
                    }
                    else {
                        UtilityService.mostrarAlerta("¡Error!", "Ocurrio un error al actualizar el proyecto")
                        console.error(data.msg);
                    }
                })
                .catch(error => {
                    // Manejar errores
                    UtilityService.mostrarAlerta("¡Error!", "Ocurrio un error al actualizar el proyecto")
                    console.error(error);
                })
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="always">
                <MatInput
                    label="Nombre de Proyecto"
                    onChangeText={(text) => setNombre(text)}
                    value={nombre}
                />
                <MatInput
                    label="Descripcion del Proyecto"
                    onChangeText={(text) => setDescripcion(text)}
                    value={descripcion}
                    multiLine
                    numberLines={4}
                />
                <MatInput
                    label="Fecha de Inicio"
                    onChangeText={(text) => setFechaInicio(text)}
                    value={fechaInicio}
                />
                <MatDropdown
                    style={[styles.dropdown, isFocus && { borderColor: '#8E7CC3', backgroundColor: '#E0E0E0' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={listaEstado}
                    maxHeight={300}
                    placeholder="Estado"
                    labelField="estaNombre"
                    valueField="estaId"
                    value={estado.toString()}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setEstado(item.estaId);
                        setIsFocus(false);
                    }}
                />
                <MatButton
                    title="Volver"
                    marginBottom={10}
                    onPress={() => goBack()}
                />
                <MatButton
                    title={btnTitulo}
                    buttonColor="#5BB79A"
                    hoverColor="#3E9C7E"
                    marginBottom={20}
                    onPress={guardarActualizarProyecto}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        padding: 10
    },
    dropdown: {
        backgroundColor: '#EDEDED',
        height: 47,
        borderColor: '#D3D3D3',
        borderBottomWidth: 1,
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        paddingHorizontal: 8,
        marginBottom: 20
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
})

export default ProyectoFormularioScreen