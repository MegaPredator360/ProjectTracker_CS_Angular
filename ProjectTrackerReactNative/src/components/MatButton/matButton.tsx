import React, { useState } from 'react';
import { TouchableHighlight, Text, StyleSheet, GestureResponderEvent, View } from 'react-native';

type MatButtonProps = {
    title: string;
    onPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined;
    textColor?: string;
    buttonColor?: string;
    hoverColor?: string;
    marginBottom?: number;
    marginTop?: number;
};

const MatButton: React.FC<MatButtonProps> = ({ title, onPress, textColor, buttonColor, hoverColor, marginBottom, marginTop }) => {
    const [isPressed, setIsPressed] = useState(false); // Estado para rastrear si se está presionando el botón

    const btnColor = buttonColor ? buttonColor : '#2196F3';
    const btnHover = hoverColor ? hoverColor : '#0B6CBA'
    const txtColor = textColor ? textColor : '#FFFFFF';
    const marginB = marginBottom ? marginBottom : 0;
    const marginT = marginTop ? marginTop : 0;

    return (
        <TouchableHighlight
            activeOpacity={1} // Desactiva la opacidad durante la interacción
            underlayColor="transparent" // Establece un color transparente para que no haya un color de resaltado predeterminado
            onPressIn={() => setIsPressed(true)} // Función para manejar el evento onPressIn (cuando se inicia la presión)
            onPressOut={() => setIsPressed(false)} // Función para manejar el evento onPressOut (cuando se deja de presionar)
            onPress={onPress}
        >
            <View style={[styles.button, { backgroundColor: isPressed ? btnHover : btnColor, marginBottom: marginB, marginTop: marginT }]}>
                <Text style={[styles.text, { color: txtColor }]}>{title}</Text>
            </View>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 4,
        elevation: 3, // Sombra en Android
        shadowColor: '#000', // Sombra en iOS
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default MatButton;
