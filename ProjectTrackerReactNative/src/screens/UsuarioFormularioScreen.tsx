import { Text, View, StyleSheet, ScrollView, Button, KeyboardAvoidingView } from "react-native"
import MatInput from "../components/MatInput/matInput"
import MatCheckBox from "../components/MatCheckBox/matCheckBox"
import MatButton from "../components/MatButton/matButton";
import { useEffect, useState } from "react";
import MatDropdown from "../components/MatDropdown"
import { Permiso } from "../interfaces/PermisoInterface";
import { Usuario } from "../interfaces/UsuarioInterface";
import PermisoService from "../services/PermisoService";

const UsuarioFormularioScreen = ({ navigation: { goBack }, route }) => {

    const [listaPermiso, setListaPermiso] = useState<Permiso[]>([])

    // Asignamos los datos del usuario que recibimos
    const datosUsuario: Usuario = route.params['datosUsuario'];

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
                    console.error(data.msg);
                }
            })
            .catch(error => {
                // Manejar errores
                console.error(error);
            })
    }

    const cargarDatos = () => {
        console.log(datosUsuario)

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
        else
        {
            // Nombre de boton de acción
            setBtnTitulo("Agregar Usuario")
        }
    }

    // Inicializamos metodos de carga de datos
    useEffect(() => {
        obtenerPermisos()
        cargarDatos()
    }, [])

    const guardarActualizarUsuario = () => {
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

        console.log(usuario)
    }

    return (
        <View style={styles.container}>
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
                    style={[styles.dropdown, isFocus && { borderColor: '#8E7CC3', backgroundColor: '#E0E0E0' }]}
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
                <View style={{ marginBottom: 18 }}>
                    <MatCheckBox
                        label="Cambiar Contraseña al Inicio de Sesion"
                        initialState={primerInicio}
                        onChangeCheck={(check) => setPrimerInicio(check)}
                    />
                </View>
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
                    onPress={guardarActualizarUsuario}
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

export default UsuarioFormularioScreen