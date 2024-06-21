import { StyleSheet } from "react-native"
import { Usuario } from "@/interfaces/UsuarioInterface";
import MatButton from "@/components/material/matButton/matButton";
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";

export default function UsuarioDetalleScreen() {

    // Obtenemos el objeto enviado
    const params = useLocalSearchParams();

    // Se declara el objeto
    let datosUsuario: Usuario | null = null

    if (params['datosUsuario'] != null) {
        datosUsuario = JSON.parse(params['datosUsuario'].toString());
    }

    return (
        <ThemedView>
            {/* Nombre Completo */}
            <ThemedText style={styles.title}>
                Nombre Completo:
            </ThemedText>
            <ThemedText style={styles.information}>
                {datosUsuario?.usuaNombre}
            </ThemedText>

            {/* Número de Cedula */}
            <ThemedText style={styles.title}>
                Número de Cedula:
            </ThemedText>
            <ThemedText style={styles.information}>
                {datosUsuario?.usuaCedula}
            </ThemedText>

            {/* Correo Electronico */}
            <ThemedText style={styles.title}>
                Correo Electronico:
            </ThemedText>
            <ThemedText style={styles.information}>
                {datosUsuario?.usuaCorreo}
            </ThemedText>

            {/* Username */}
            <ThemedText style={styles.title}>
                Username:
            </ThemedText>
            <ThemedText style={styles.information}>
                {datosUsuario?.usuaUsername}
            </ThemedText>

            {/* Telefono */}
            <ThemedText style={styles.title}>
                Telefono:
            </ThemedText>
            <ThemedText style={styles.information}>
                {datosUsuario?.usuaTelefono}
            </ThemedText>

            {/* Dirección */}
            <ThemedText style={styles.title}>
                Dirección:
            </ThemedText>
            <ThemedText style={styles.information}>
                {datosUsuario?.usuaDireccion}
            </ThemedText>

            {/* Permiso */}
            <ThemedText style={styles.title}>
                Permiso:
            </ThemedText>
            <ThemedText style={styles.information}>
                {datosUsuario?.usuaPermNombre}
            </ThemedText>

            <MatButton
                title="Volver"
                marginTop={20}
                marginLeft={15}
                marginRight={15}
                onPress={() => router.back()}
            />
        </ThemedView>
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