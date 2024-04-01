import { Text, View, StyleSheet, ScrollView, Button } from "react-native"
import MatInput from "../components/MatInput/matInput"
import MatCheckBox from "../components/MatCheckBox/matCheckBox"
import { useState } from "react";
import MatDropdown from "../components/MatDropdown/matDropdown";

const UsuarioFormularioScreen = () => {

    const options = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollContainer}>
                <MatInput label="Nombre Completo" />
                <MatInput label="Número de Cedula" />
                <MatInput label="Correo Electronico" />
                <MatInput label="Username" />
                <MatInput label="Telefono" />
                <MatInput label="Dirección" />
                <MatInput label="Contraseña" />
                <MatInput label="Confirmar Contraseña" />
                <MatDropdown options={options} onSelect={handleSelect} />
                {selectedOption && (
                    <View style={styles.selectedOption}>
                        <Text>Selected Option: {selectedOption.label}</Text>
                    </View>
                )}
                <MatCheckBox label="Cambiar Contraseña al Inicio de Sesion" />
                <View style={styles.accionContainer}>
                    <Button title="Volver" />
                    <Button title="Agregar Usuario" />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollContainer: {
        paddingHorizontal: 10
    },
    accionContainer: {
        flexDirection: 'row', // Dirección de fila (horizontal)
        justifyContent: 'space-between', // Espacio uniforme entre los botones
        paddingHorizontal: 16, // Espacio horizontal alrededor de los botones
    },
})

export default UsuarioFormularioScreen