import { useState } from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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

    return (
        <TouchableWithoutFeedback onPress={toggleCheckbox}>
            <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, checked && styles.checked]}>
                    {checked && <AntDesign name="check" size={18} color="#fff" />}
                </View>
                <Text style={styles.label}>{label}</Text>
            </View>
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
