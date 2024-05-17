import { useEffect, useState } from 'react';
import { TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

type MatCheckBoxProps = {
    label?: string;

    // Estado Inicial del checkbox
    initialState?: boolean;

    onChangeCheck?: ((checked: boolean) => void) | undefined
};

const MatCheckBox: React.FC<MatCheckBoxProps> = ({ label, initialState = false, onChangeCheck }) => {
    const [checked, setChecked] = useState(initialState);

    const toggleCheckbox = () => {
        const newCheckedState = !checked;
        setChecked(newCheckedState);
        if (onChangeCheck) {
            onChangeCheck(newCheckedState); // Llama a onChangeCheck solo si está definido
        }
    };

    // Se verifica si el estado inicial del checkbox es true o false
    useEffect(() => {

        // Si el estado inicial es verdadero, se marcará el checkbox
        if (initialState) {
            setChecked(true)
        }
    }, [initialState])

    return (
        <TouchableWithoutFeedback onPress={toggleCheckbox}>
            <ThemedView style={styles.checkboxContainer}>
                <ThemedView style={[styles.checkbox, checked && styles.checked]}>
                    {checked && <AntDesign name="check" size={18} color="#fff" />}
                </ThemedView>
                <ThemedText style={styles.label}>{label}</ThemedText>
            </ThemedView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderWidth: 1,
        borderColor: '#999',
        borderRadius: 3,
        marginRight: 10,
    },
    checked: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    label: {
        fontSize: 16,
    },
});

export default MatCheckBox;