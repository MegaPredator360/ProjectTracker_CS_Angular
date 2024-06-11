import { useState, useRef, useEffect } from 'react';
import { View, TextInput, Animated, StyleSheet, Platform, TouchableOpacity, TouchableWithoutFeedback, GestureResponderEvent, KeyboardAvoidingView, LayoutChangeEvent } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from '@/hooks/useColorScheme';

type MatInputProps = {
    label?: string;
    inputWidth?: string | number;
    buttonIcon?: string;
    buttonIconOnPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined;
    hideText?: boolean;
    entryType?: string;
    onChangeText: ((text: string) => void) | undefined
    value: string
    multiLine?: boolean
    numberLines?: number;
    inputColor?: string
};

const MatInput: React.FC<MatInputProps> = ({
    label,
    multiLine = false,
    numberLines = 1,
    value,
    inputWidth,
    buttonIcon,
    buttonIconOnPress,
    hideText,
    entryType = 'default',
    onChangeText,
    inputColor = "#8E7CC3",
    ...rest }) => {

    // Para el modo oscuro
    const colorScheme = useColorScheme();
    const bgColor = colorScheme === 'light' ? '#EDEDED' : "#202020";
    const bgColorFocus = colorScheme === 'light' ? '#E0E0E0' : "#282828";
    const borderColor = colorScheme === 'light' ? '#D3D3D3' : "#393939";
    const labelColor = colorScheme === 'light' ? '#808080' : "#707070";
    const textColor = colorScheme === 'light' ? '#000000' : "#FFFFFF";


    const [focused, setFocused] = useState(false);
    const [text, setText] = useState('');
    const [inputSize, setInputSize] = useState(47)
    const inputRef = useRef<TextInput>(null);
    const labelPosition = useRef(new Animated.Value(10)).current;
    const labelFontSize = useRef(new Animated.Value(16)).current;

    // Cuando se activa el input
    const handleFocus = () => {
        setFocused(true);
        activarLabel()
    };

    // Cuando se desactiva el input
    const handleBlur = () => {
        if (!text) {
            setFocused(false);
            desactivarLabel()
        }
        else {
            setFocused(false);
        }
    };

    // Cuando hay algún cambio en el input
    const handleInputChange = (value: string) => {
        onChangeText?.(value)
        setText(value);
    };

    // Cuando se toca el input
    const handleLabelPress = () => {
        inputRef.current?.focus();
    };

    // Realizar animación inicial
    const activarLabel = () => {
        Animated.parallel([
            Animated.timing(labelPosition, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.timing(labelFontSize, {
                toValue: 10,
                duration: 200,
                useNativeDriver: false,
            })
        ]).start();
    }

    // Realiza animación final
    const desactivarLabel = () => {
        Animated.parallel([
            Animated.timing(labelPosition, {
                toValue: 10,
                duration: 200,
                useNativeDriver: false,
            }),
            Animated.timing(labelFontSize, {
                toValue: 16,
                duration: 200,
                useNativeDriver: false,
            })
        ]).start();
    }

    useEffect(() => {

        if (numberLines) {
            setInputSize(47 + (22 * (numberLines - 1)))
        }

        if (value != null && value != '') {

            // Actualiza el estado del texto
            setText(value);
            activarLabel()
        }
    }, [value]);

    return (
        <TouchableWithoutFeedback onPress={handleLabelPress}>
            <View style={[styles.container]}>
                <TextInput
                    ref={inputRef}
                    {...rest}
                    style={[styles.input, {
                        width: inputWidth,
                        height: inputSize,
                        backgroundColor: bgColor,
                        borderColor: borderColor,
                        color: textColor
                    },
                    focused && {
                        backgroundColor: bgColorFocus,
                        borderColor: inputColor
                    }]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={handleInputChange}
                    secureTextEntry={hideText}
                    keyboardType={entryType}
                    value={text}
                    multiline={multiLine}
                    numberOfLines={numberLines}
                />
                <Animated.Text
                    style={[
                        styles.label,
                        {
                            transform: [{ translateY: labelPosition }],
                            fontSize: labelFontSize,
                            color: labelColor
                        },
                        focused && {
                            color: inputColor
                        }
                    ]}
                >
                    {label}
                </Animated.Text>
                {buttonIcon && (
                    <TouchableOpacity
                        style={{ position: 'absolute', right: 10, top: 7 }}
                        onPress={buttonIconOnPress}
                    >
                        <MaterialCommunityIcons name={buttonIcon} size={30} color="gray" />
                    </TouchableOpacity>
                )}
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    input: {
        borderTopRightRadius: 3,
        borderTopLeftRadius: 3,
        borderBottomWidth: 1,
        fontSize: 16,
        padding: 8,
        paddingTop: 17,
        textAlignVertical: 'top'
    },
    label: {
        fontSize: 16,
        position: 'absolute',
        left: 4,
        top: Platform.OS === 'ios' ? 2 : 0,
        paddingHorizontal: 4,
    }
});


export default MatInput