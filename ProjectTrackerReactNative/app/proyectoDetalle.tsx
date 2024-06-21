import { StyleSheet } from "react-native"
import MatButton from "@/components/material/matButton/matButton";
import { useLocalSearchParams } from 'expo-router';
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { router } from "expo-router";
import { Proyecto } from "@/interfaces/ProyectoInterface";

export default function ProyectoDetalleScreen() {

    // Obtenemos el objeto enviado
    const params = useLocalSearchParams();

    // Se declara el objeto
    let datosProyecto: Proyecto | null = null

    if (params['datosProyecto'] != null) {
        datosProyecto = JSON.parse(params['datosProyecto'].toString());
    }

    return (
        <ThemedView>
            {/* Nombre */}
            <ThemedText style={styles.title}>
                Nombre de Proyecto:
            </ThemedText>
            <ThemedText style={styles.information}>
                {datosProyecto?.proyNombre}
            </ThemedText>

            {/* Número Descripcion */}
            <ThemedText style={styles.title}>
                Descripcion del Proyecto:
            </ThemedText>
            <ThemedText style={styles.information}>
                {datosProyecto?.proyDescripcion}
            </ThemedText>

            {/* Fecha de Inicio */}
            <ThemedText style={styles.title}>
                Fecha de Inicio:
            </ThemedText>
            <ThemedText style={styles.information}>
                {datosProyecto?.proyFechaInicio}
            </ThemedText>

            {/* Estado */}
            <ThemedText style={styles.title}>
                Estado:
            </ThemedText>
            <ThemedText style={styles.information}>
                {datosProyecto?.proyEstaNombre}
            </ThemedText>

            {/* Tareas Asignadas */}
            <ThemedText style={styles.title}>
                Cantidad de Tareas Asignadas:
            </ThemedText>
            <ThemedText style={styles.information}>
                {datosProyecto?.proyCantidadTarea}
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