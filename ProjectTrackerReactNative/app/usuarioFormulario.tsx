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

export default function UsuarioFormularioScreen() {

    const [listaPermiso, setListaPermiso] = useState<Permiso[]>([])

    // Obtenemos el objeto enviado
    const params = useLocalSearchParams();

    // Se declara el objeto
    let datosUsuario: Usuario = null

    if (params['datosUsuario'] != null) {
        datosUsuario = JSON.parse(params['datosUsuario']);
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
                    mostrarAlerta("¡Error!", "Ocurrio un error al obtener la lista de permisos")
                    console.error(data.msg);
                }
            })
            .catch(error => {
                // Manejar errores
                mostrarAlerta("¡Error!", "Ocurrio un error al obtener la lista de permisos")
                console.error(error);
            })
    }

    const mostrarAlerta = (title: string, message: string) => {

        // Una alerta sencilla para mostrar un error de falta de datos
        Alert.alert(title, message, [
            {
                text: 'Aceptar'
            }
        ]);
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
            setBtnTitulo("Editar Usuario")
        }
        else {
            // Nombre de boton de acción
            setBtnTitulo("Agregar Usuario")
        }
    }

    // Inicializamos metodos de carga de datos
    useEffect(() => {
        obtenerPermisos()
        cargarDatos()
    }, [])

    const guardarActualizarUsuario = async () => {

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
            mostrarAlerta("¡Error!", "Hay uno o más campos vacios")
            return
        }

        if (datosUsuario == null) {

            // Se verificará que los campos de contraseña no estén vacios
            if (contra == "" || confir == "") {
                mostrarAlerta("¡Error!", "Hay uno o más campos vacios")
                return
            }

            // Se verifica si la contraseña cumple con los requisitos
            if (!UtilityService.verificarContrasena(contra)) {
                mostrarAlerta("¡Error!", "La contraseña no cumple con los requisitos minimos")
                return
            }

            // Se verifica que la contraseña y la confirmacion sean iguales
            if (contra != confir) {
                mostrarAlerta("¡Error!", "Las contraseñas no son iguales")
                return
            }
        }

        // Se validará que el correo tenga el formato correcto
        if (!UtilityService.verificarCorreo(correo)) {
            mostrarAlerta("¡Error!", "El correo ingresado es invalido")
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
                        Alert.alert('Información', 'El usuario fue agregado con exito', [
                            {
                                text: 'Aceptar',
                                onPress: () => router.back()
                            }
                        ]);
                    }
                    else {
                        mostrarAlerta("¡Error!", "Ocurrio un error al agregar el usuario")
                        console.error(data.msg);
                    }
                })
                .catch(error => {
                    // Manejar errores
                    mostrarAlerta("¡Error!", "Ocurrio un error al agregar el usuario")
                    console.error(error);
                })
        }
        else {
            // Enviamos la solicitud para actualizar un usuario existente
            await UsuarioService.Editar(usuario)
                .then(data => {
                    if (data.status) {

                        // Mensaje de exito
                        Alert.alert('Información', 'El usuario fue actualizado con exito', [
                            {
                                text: 'Aceptar',
                                onPress: () => router.back()
                            }
                        ]);
                    }
                    else {
                        mostrarAlerta("¡Error!", "Ocurrio un error al actualizar el usuario")
                        console.error(data.msg);
                    }
                })
                .catch(error => {
                    // Manejar errores
                    mostrarAlerta("¡Error!", "Ocurrio un error al actualizar el usuario")
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
                    title={btnTitulo}
                    buttonColor="#5BB79A"
                    hoverColor="#3E9C7E"
                    marginBottom={20}
                    onPress={guardarActualizarUsuario}
                />
            </ScrollView>
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