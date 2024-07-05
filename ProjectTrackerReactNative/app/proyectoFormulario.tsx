import { View, StyleSheet, ScrollView, Alert } from "react-native"
import MatInput from "@/components/material/matInput/matInput"
import MatCheckBox from "@/components/material/matCheckBox/matCheckBox"
import MatButton from "@/components/material/matButton/matButton";
import { useEffect, useState } from "react";
import MatDropdown from "@/components/material/matDropdown"
import UtilityService from "@/services/UtilityService";
import { router } from "expo-router";
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from "@/components/ThemedView";
import MatDialog from "@/components/material/matDialog/matDialog";
import { Estado } from "@/interfaces/EstadoInterface";
import { Proyecto } from "@/interfaces/ProyectoInterface";
import EstadoService from "@/services/EstadoService";
import ProyectoService from "@/services/ProyectoService";

export default function ProyectoFormularioScreen() {

    const [listaEstado, setListaEstado] = useState<Estado[]>([])

    // Obtenemos el objeto enviado
    const params = useLocalSearchParams();

    // Se declara el objeto
    let datosProyecto: Proyecto | null = null

    if (params['datosProyecto'] != null) {
        datosProyecto = JSON.parse(params['datosProyecto'].toString());
    }

    const [isFocus, setIsFocus] = useState(false);

    // Valores del formulario
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaInicio, setFechaInicio] = useState('')
    const [estado, setEstado] = useState(0)

    // Ocultar Contraseña
    const [contraOcultar, setContraOcultar] = useState(true);
    const [confirOcultar, setConfirOcultar] = useState(true);

    // Interfaz
    const [btnTitulo, setBtnTitulo] = useState('');

    // Manejo de alertas
    const [confirmation, setConfirmation] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertTitle, setAlertTitle] = useState('')
    const [alertMsg, setAlertMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [success, setSuccess] = useState(false)

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
                    setAlertMsg("¡Error!")
                    setAlertMsg("Ocurrio un error al obtener la lista de estados")
                    setAlert(true)
                    console.error(data.msg);
                }
            })
            .catch(error => {
                // Manejar errores
                setAlertMsg("¡Error!")
                setAlertMsg("Ocurrio un error de conexion al obtener la lista de estados")
                setAlert(true)
                console.error(error);
            })
    }

    const cargarDatos = () => {

        // Verificaremos si los datos que recibimos es diferente de null
        if (datosProyecto != null) {

            // Se cargan los datos de los proyecto
            setNombre(datosProyecto.proyNombre)
            setDescripcion(datosProyecto.proyDescripcion)
            setFechaInicio(datosProyecto.proyFechaInicio)
            setEstado(datosProyecto.proyEstaId)

            // Nombre de boton de acción
            setBtnTitulo("Actualizar")
        }
        else {
            // Nombre de boton de acción
            setBtnTitulo("Agregar")
        }
    }

    // Inicializamos metodos de carga de datos
    useEffect(() => {
        obtenerEstados()
        cargarDatos()
    }, [])

    // Validar campos vacios
    const validarCampos = () => {
        // Se verificará que todos los campos estén llenos
        if (
            nombre == "" ||
            descripcion == "" ||
            fechaInicio == "" ||
            estado == 0
        ) {
            setAlertTitle("¡Error!")
            setAlertMsg("Hay uno o más campos vacios")
            setAlert(true)
            return
        }

        // Se habilita el dialogo de confirmacion
        setConfirmation(true)
    }

    const guardarActualizarProyecto = async () => {

        // Se cierra el dialogo de confirmacion
        setConfirmation(false)

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
                        setSuccessMsg('El proyecto fue agregado exitosamente')
                        setSuccess(true)
                    }
                    else {
                        setAlertTitle("¡Error!")
                        setAlertMsg("Ocurrio un error al agregar el proyecto")
                        setAlert(true)
                        console.error(data.msg);
                    }
                })
                .catch(error => {
                    // Manejar errores
                    setAlertTitle("¡Error!")
                    setAlertMsg("Ocurrio un error al agregar el proyecto")
                    setAlert(true)
                    console.error(error);
                })
        }
        else {
            // Enviamos la solicitud para actualizar un proyecto existente
            await ProyectoService.Editar(proyecto)
                .then(data => {
                    if (data.status) {

                        // Mensaje de exito
                        setSuccessMsg('El proyecto fue actualizado exitosamente')
                        setSuccess(true)
                    }
                    else {
                        setAlertTitle("¡Error!")
                        setAlertMsg("Ocurrio un error al actualizar el proyecto")
                        setAlert(true)
                        console.error(data.msg);
                    }
                })
                .catch(error => {
                    // Manejar errores
                    setAlertTitle("¡Error!")
                    setAlertMsg("Ocurrio un error al actualizar el proyecto")
                    setAlert(true)
                    console.error(error);
                })
        }
    }

    return (
        <ThemedView style={styles.container}>
            <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="always">
                <MatInput
                    label="Nombre de Proyecto"
                    onChangeText={(text) => setNombre(text)}
                    value={nombre}
                />
                <MatInput
                    label="Descripcion del Proyecto"
                    numberLines={4}
                    maxlength={255}
                    onChangeText={(text) => setDescripcion(text)}
                    value={descripcion}
                />
                <MatInput
                    label="Fecha de Inicio"
                    onChangeText={(text) => setFechaInicio(text)}
                    value={fechaInicio}
                />
                <MatDropdown
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
                    onPress={() => router.back()}
                />
                <MatButton
                    title={`${btnTitulo} Usuario`}
                    color='accept'
                    marginBottom={20}
                    onPress={validarCampos}
                />
            </ScrollView>

            {/* Dialogo de Confirmacion */}
            <MatDialog
                title="Informacion"
                message={`¿Deseas ${btnTitulo.toLowerCase()} el proyecto?`}
                visible={confirmation}
                primaryText="Aceptar"
                primaryAction={guardarActualizarProyecto}
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

            {/* Dialogo de Exito */}
            <MatDialog
                title="Información"
                message={successMsg}
                visible={success}
                primaryAction={() => router.back()}
            />
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        padding: 10
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