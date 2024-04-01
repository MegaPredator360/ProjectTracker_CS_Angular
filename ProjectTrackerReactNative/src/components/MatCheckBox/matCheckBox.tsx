import { useState } from 'react';
import { View, TouchableWithoutFeedback, Text, StyleSheet } from 'react-native';
import { } from 'react-native-gesture-handler';

type MatCheckBoxProps = {
    label?: string;

    // Estado Inicial del checkbox
    initialState?: boolean;
};

const MatCheckBox: React.FC<MatCheckBoxProps> = ({ label, initialState = false }) => {
    const [checked, setChecked] = useState(initialState);

    const toggleCheckbox = () => {
        setChecked(!checked);
    };

    return (
        <TouchableWithoutFeedback onPress={toggleCheckbox}>
            <View style={styles.checkboxContainer}>
                <View style={[styles.checkbox, checked && styles.checked]} />
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
    },
    label: {
        fontSize: 16,
    },
});

export default MatCheckBox;
