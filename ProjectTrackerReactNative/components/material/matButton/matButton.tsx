import React, { useState } from 'react';
import { TouchableHighlight, Text, StyleSheet, GestureResponderEvent, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

type MatButtonProps = {
    title: string;
    onPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined;
    color?: 'primary' | 'accept' | 'warn' | 'danger'
    marginBottom?: number;
    marginTop?: number;
    marginLeft?: number;
    marginRight?: number;
};

const MatButton: React.FC<MatButtonProps> = ({ title, onPress, color = 'primary', marginBottom, marginTop, marginLeft, marginRight }) => {
    const [isPressed, setIsPressed] = useState(false); // Estado para rastrear si se está presionando el botón

    // Para el modo oscuro
    const colorScheme = useColorScheme();

    const marginB = marginBottom ? marginBottom : 0;
    const marginT = marginTop ? marginTop : 0;
    const marginL = marginLeft ? marginLeft : 0;
    const marginR = marginRight ? marginRight : 0;

    // Color de boton
    const getColor = (color: 'primary' | 'accept' | 'warn' | 'danger'): string => {
        switch (color) {

            // Color primario
            case 'primary':

                // Modo claro
                if (colorScheme == 'light') {
                    return '#5dade2';
                }

                // Modo oscuro
                else {
                    return '#2874a6'
                }

            // Color de aceptar
            case 'accept':
                if (colorScheme == 'light') {
                    return '#52be80';
                }
                else {
                    return '#1e8449'
                }

            // Color de Advertencia
            case 'warn':
                if (colorScheme == 'light') {
                    return '#f4d03f';
                }
                else {
                    return '#b7950b'
                }

            // Color de Peligro
            case 'danger':
                if (colorScheme == 'light') {
                    return '#ec7063';
                }
                else {
                    return '#b03a2e'
                }
        }
    };

    // Color del hover
    const getColorHover = (color: 'primary' | 'accept' | 'warn' | 'danger'): string => {
        switch (color) {
            case 'primary':

                // Modo claro
                if (colorScheme == 'light') {
                    return '#3498db';
                }

                // Modo oscuro
                else {
                    return '#21618c'
                }

            // Color de aceptar
            case 'accept':
                if (colorScheme == 'light') {
                    return '#27ae60';
                }
                else {
                    return '#196f3d'
                }

            // Color de Advertencia
            case 'warn':
                if (colorScheme == 'light') {
                    return '#f1c40f';
                }
                else {
                    return '#9a7d0a'
                }

            // Color de peligro
            case 'danger':
                if (colorScheme == 'light') {
                    return '#e74c3c';
                }
                else {
                    return '#943126'
                }
        }
    };

    return (
        <TouchableHighlight
            activeOpacity={1} // Desactiva la opacidad durante la interacción
            underlayColor="transparent" // Establece un color transparente para que no haya un color de resaltado predeterminado
            onPressIn={() => setIsPressed(true)} // Función para manejar el evento onPressIn (cuando se inicia la presión)
            onPressOut={() => setIsPressed(false)} // Función para manejar el evento onPressOut (cuando se deja de presionar)
            onPress={onPress}
        >
            <View style={[styles.button, {
                backgroundColor: isPressed ? getColorHover(color) : getColor(color),
                marginBottom: marginB,
                marginTop: marginT,
                marginLeft: marginL,
                marginRight: marginR,
            }]}>
                <Text style={[styles.text]}>{title}</Text>
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
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default MatButton;
