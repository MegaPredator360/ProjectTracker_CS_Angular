import { View, StyleSheet, ScrollView, Alert } from "react-native"
import MatInput from "@/components/material/matInput/matInput"
import MatCheckBox from "@/components/material/matCheckBox/matCheckBox"
import MatButton from "@/components/material/matButton/matButton";
import { useEffect, useState } from "react";
import MatDropdown from "@/components/material/matDropdown"
import { Permiso } from "@/interfaces/PermisoInterface";
import { Usuario } from "@/interfaces/UsuarioInterface";
import PermisoService from "@/services/PermisoService";
import UtilityService from "@/services/UtilityService";
import UsuarioService from "@/services/UsuarioService";
import { router } from "expo-router";
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from "@/components/ThemedView";
import MatDialog from "@/components/material/matDialog/matDialog";


export default function UsuarioFormularioScreen() {

    const [listaPermiso, setListaPermiso] = useState<Permiso[]>([])

    // Obtenemos el objeto enviado
    const params = useLocalSearchParams();

    // Se declara el objeto
    let datosUsuario: Usuario | null = null

    if (params['datosUsuario'] != null) {
        datosUsuario = JSON.parse(params['datosUsuario'].toString());
    }

    const [isFocus, setIsFocus] = useState(false);

    // Valores del formulario
    const [nombre, setNombre] = useState('')
    const [cedula, setCedula] = useState('')
    const [correo, setCorreo] = useState('')
    const [username, setUsername] = useState('')
    const [telefono, setTelefono] = useState('')
    const [direccion, setDireccion] = useState('')
    const [contra, setContra] = useState('')
    const [confir, setConfir] = useState('')
    const [permiso, setPermiso] = useState(0)
    const [primerInicio, setPrimerInicio] = useState(false)

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

    // Obtenemos la lista de Permisos
    const obtenerPermisos = async () => {

        // Llamamos al metodo de lista del servicio de permisos
        await PermisoService.Lista()
            .then(data => {
                if (data.status) {
                    // Aquí se procesan los datos recibidos
                    setListaPermiso(data.value)
                }
                else {
                    setAlertMsg("¡Error!")
                    setAlertMsg("Ocurrio un error al obtener la lista de permisos")
                    setAlert(true)
                    console.error(data.msg);
                }
            })
            .catch(error => {
                // Manejar errores
                setAlertMsg("¡Error!")
                setAlertMsg("Ocurrio un error de conexion al obtener la lista de permisos")
                setAlert(true)
                console.error(error);
            })
    }

    const cargarDatos = () => {
        //console.log(datosUsuario)

        // Verificaremos si los datos que recibimos es diferente de null
        if (datosUsuario != null) {

            // Se cargan los datos de los usuarios
            setNombre(datosUsuario.usuaNombre)
            setCedula(datosUsuario.usuaCedula)
            setCorreo(datosUsuario.usuaCorreo)
            setUsername(datosUsuario.usuaUsername)
            setTelefono(datosUsuario.usuaTelefono)
            setDireccion(datosUsuario.usuaDireccion)
            setPermiso(datosUsuario.usuaPermId)
            setPrimerInicio(datosUsuario.usuaPrimerInicio === 0 ? false : true)

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
        obtenerPermisos()
        cargarDatos()
    }, [])

    // Validar campos vacios
    const validarCampos = () => {
        // Se verificará que todos los campos estén llenos
        if (
            nombre == "" ||
            cedula == "" ||
            correo == "" ||
            username == "" ||
            telefono == "" ||
            direccion == "" ||
            permiso == 0
        ) {
            setAlertTitle("¡Error!")
            setAlertMsg("Hay uno o más campos vacios")
            setAlert(true)
            return
        }

        if (datosUsuario == null) {

            // Se verificará que los campos de contraseña no estén vacios
            if (contra == "" || confir == "") {
                setAlertTitle("¡Error!")
                setAlertMsg("Hay uno o más campos vacios")
                setAlert(true)
                return
            }
        }

        // Se habilita el dialogo de confirmacion
        setConfirmation(true)
    }

    const guardarActualizarUsuario = async () => {

        // Se cierra el dialogo de confirmacion
        setConfirmation(false)

        if (datosUsuario == null) {

            // Se verifica si la contraseña cumple con los requisitos
            if (!UtilityService.verificarContrasena(contra)) {
                setAlertTitle("¡Error!")
                setAlertMsg("La contraseña no cumple con los requisitos minimos")
                setAlert(true)
                return
            }

            // Se verifica que la contraseña y la confirmacion sean iguales
            if (contra != confir) {
                setAlertTitle("¡Error!")
                setAlertMsg("Las contraseñas no son iguales")
                setAlert(true)
                return
            }
        }

        // Se validará que el correo tenga el formato correcto
        if (!UtilityService.verificarCorreo(correo)) {
            setAlertTitle("¡Error!")
            setAlertMsg("El correo ingresado no es valido")
            setAlert(true)
            return
        }

        // Se crea el objeto que será enviado
        const usuario: Usuario = {
            usuaId: datosUsuario === null ? 0 : datosUsuario.usuaId,
            usuaNombre: nombre,
            usuaCedula: cedula,
            usuaCorreo: correo,
            usuaUsername: username,
            usuaTelefono: telefono,
            usuaDireccion: direccion,
            usuaContrasena: contra,
            usuaPermId: permiso,
            usuaPermNombre: "",
            usuaPrimerInicio: primerInicio ? 1 : 0
        }


        if (datosUsuario == null) {
            // Enviamos la solicitud para agregar un usuario nuevo
            await UsuarioService.Guardar(usuario)
                .then(data => {
                    if (data.status) {

                        // Mensaje de exito
                        setSuccessMsg('El usuario fue agregado exitosamente')
                        setSuccess(true)
                    }
                    else {
                        setAlertTitle("¡Error!")
                        setAlertMsg("Ocurrio un error al agregar el usuario")
                        setAlert(true)
                        console.error(data.msg);
                    }
                })
                .catch(error => {
                    // Manejar errores
                    setAlertTitle("¡Error!")
                    setAlertMsg("Ocurrio un error al agregar el usuario")
                    setAlert(true)
                    console.error(error);
                })
        }
        else {
            // Enviamos la solicitud para actualizar un usuario existente
            await UsuarioService.Editar(usuario)
                .then(data => {
                    if (data.status) {

                        // Mensaje de exito
                        setSuccessMsg('El usuario fue actualizado exitosamente')
                        setSuccess(true)
                    }
                    else {
                        setAlertTitle("¡Error!")
                        setAlertMsg("Ocurrio un error al actualizar el usuario")
                        setAlert(true)
                        console.error(data.msg);
                    }
                })
                .catch(error => {
                    // Manejar errores
                    setAlertTitle("¡Error!")
                    setAlertMsg("Ocurrio un error al actualizar el usuario")
                    setAlert(true)
                    console.error(error);
                })
        }
    }

    return (
        <ThemedView style={styles.container}>
            <ScrollView style={styles.scrollContainer} keyboardShouldPersistTaps="always">
                <MatInput
                    label="Nombre Completo"
                    onChangeText={(text) => setNombre(text)}
                    value={nombre}
                />
                <MatInput
                    label="Número de Cedula"
                    entryType="numeric"
                    onChangeText={(text) => setCedula(text)}
                    value={cedula}
                />
                <MatInput
                    label="Correo Electronico"
                    onChangeText={(text) => setCorreo(text)}
                    value={correo}
                />
                <MatInput
                    label="Username"
                    onChangeText={(text) => setUsername(text)}
                    value={username}
                />
                <MatInput
                    label="Telefono"
                    entryType="numeric"
                    onChangeText={(text) => setTelefono(text)}
                    value={telefono}
                />
                <MatInput
                    label="Dirección"
                    onChangeText={(text) => setDireccion(text)}
                    value={direccion}
                />
                <MatInput
                    label="Contraseña"
                    buttonIcon={contraOcultar ? "eye-outline" : "eye-off-outline"}
                    buttonIconOnPress={() => contraOcultar ? setContraOcultar(false) : setContraOcultar(true)}
                    hideText={contraOcultar ? true : false}
                    onChangeText={(text) => setContra(text)}
                    value={contra}
                />
                <MatInput
                    label="Confirmar Contraseña"
                    buttonIcon={confirOcultar ? "eye-outline" : "eye-off-outline"}
                    buttonIconOnPress={() => confirOcultar ? setConfirOcultar(false) : setConfirOcultar(true)}
                    hideText={confirOcultar ? true : false}
                    onChangeText={(text) => setConfir(text)}
                    value={confir}
                />
                <MatDropdown
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={listaPermiso}
                    maxHeight={300}
                    placeholder="Permiso"
                    labelField="permNombre"
                    valueField="permId"
                    value={permiso.toString()}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setPermiso(item.permId);
                        setIsFocus(false);
                    }}
                />
                <ThemedView style={{ marginBottom: 18 }}>
                    <MatCheckBox
                        label="Cambiar Contraseña al Inicio de Sesion"
                        initialState={primerInicio}
                        onChangeCheck={(check) => setPrimerInicio(check)}
                    />
                </ThemedView>
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
                message={`¿Deseas ${btnTitulo.toLowerCase()} el usuario?`}
                visible={confirmation}
                primaryText="Aceptar"
                primaryAction={guardarActualizarUsuario}
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