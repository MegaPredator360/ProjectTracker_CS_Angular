import { Text, View, StyleSheet } from "react-native"
import { Usuario } from "../interfaces/UsuarioInterface";
import MatButton from "../components/MatButton/matButton";

const UsuarioDetalleScreen = ({ navigation: { goBack }, route }) => {

    const datosUsuario: Usuario = route.params['datosUsuario'];

    return (
        <View>
            {/* Nombre Completo */}
            <Text style={styles.title}>
                Nombre Completo:
            </Text>
            <Text style={styles.information}>
                {datosUsuario.usuaNombre}
            </Text>

            {/* Número de Cedula */}
            <Text style={styles.title}>
                Número de Cedula:
            </Text>
            <Text style={styles.information}>
                {datosUsuario.usuaCedula}
            </Text>

            {/* Correo Electronico */}
            <Text style={styles.title}>
                Correo Electronico:
            </Text>
            <Text style={styles.information}>
                {datosUsuario.usuaCorreo}
            </Text>

            {/* Username */}
            <Text style={styles.title}>
                Username:
            </Text>
            <Text style={styles.information}>
                {datosUsuario.usuaUsername}
            </Text>

            {/* Telefono */}
            <Text style={styles.title}>
                Telefono:
            </Text>
            <Text style={styles.information}>
                {datosUsuario.usuaTelefono}
            </Text>

            {/* Dirección */}
            <Text style={styles.title}>
                Dirección:
            </Text>
            <Text style={styles.information}>
                {datosUsuario.usuaDireccion}
            </Text>

            {/* Permiso */}
            <Text style={styles.title}>
                Permiso:
            </Text>
            <Text style={styles.information}>
                {datosUsuario.usuaPermNombre}
            </Text>

            <MatButton
                title="Volver"
                marginTop={20}
                marginLeft={15}
                marginRight={15}
                onPress={() => goBack()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        marginTop: 10,
        marginLeft: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    information: {
        marginLeft: 10,
        fontSize: 20,
    }
})

export default UsuarioDetalleScreen