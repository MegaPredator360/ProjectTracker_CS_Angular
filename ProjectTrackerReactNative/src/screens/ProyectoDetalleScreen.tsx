import { Text, View, StyleSheet } from "react-native"
import { Proyecto } from "../interfaces/ProyectoInterface";
import MatButton from "../components/MatButton/matButton";

const ProyectoDetalleScreen = ({ navigation: { goBack }, route }) => {

    const datosProyecto: Proyecto = route.params['datosProyecto'];

    return (
        <View>
            {/* Nombre del Proyecto */}
            <Text style={styles.title}>
                Nombre de Proyecto:
            </Text>
            <Text style={styles.information}>
                {datosProyecto.proyNombre}
            </Text>

            {/* Descripcion del Proyecto */}
            <Text style={styles.title}>
                Descripción del Proyecto:
            </Text>
            <Text style={styles.information}>
                {datosProyecto.proyDescripcion}
            </Text>

            {/* Fecha de Inicio */}
            <Text style={styles.title}>
                Fecha de Inicio:
            </Text>
            <Text style={styles.information}>
                {datosProyecto.proyFechaInicio}
            </Text>

            {/* Estado del Proyecto */}
            <Text style={styles.title}>
                Estado del Proyecto:
            </Text>
            <Text style={styles.information}>
                {datosProyecto.proyEstaNombre}
            </Text>

            {/* Cantidad de Tareas Asignadas */}
            <Text style={styles.title}>
                Cantidad de Tareas Asignadas:
            </Text>
            <Text style={styles.information}>
                {datosProyecto.proyCantidadTarea === 1 ? '1 Tarea' : datosProyecto.proyCantidadTarea + ' Tareas'}
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

export default ProyectoDetalleScreen