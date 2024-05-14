import { useState, useRef, useEffect } from 'react';
import { View, TextInput, Animated, StyleSheet, Platform, TouchableOpacity, TouchableWithoutFeedback, GestureResponderEvent, KeyboardAvoidingView, LayoutChangeEvent } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

type MatInputProps = {
    label?: string;
    inputWidth?: number;
    buttonIcon?: string;
    buttonIconOnPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined;
    hideText?: boolean;
    entryType?: string;
    onChangeText: ((text: string) => void) | undefined
    value: string
    multiLine?: boolean
    numberLines?: number;
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
    ...rest }) => {

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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null}
            >
                <View style={[styles.container]}>
                    <TextInput
                        ref={inputRef}
                        {...rest}
                        style={[styles.input, focused && styles.focusedInput, { width: inputWidth, height: inputSize }]}
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
                            focused && styles.focusedLabel,
                            {
                                transform: [{ translateY: labelPosition }],
                                fontSize: labelFontSize,
                            },
                        ]}
                    >
                        {label}
                    </Animated.Text>
                    {buttonIcon && (
                        <TouchableOpacity style={{ position: 'absolute', right: 10, top: 7 }} onPress={buttonIconOnPress}>
                            <MaterialCommunityIcons name={buttonIcon} size={30} color="gray" />
                        </TouchableOpacity>
                    )}
                </View>
            </KeyboardAvoidingView>
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
        backgroundColor: '#EDEDED',
        borderColor: '#D3D3D3',
        borderBottomWidth: 1,
        fontSize: 16,
        padding: 8,
        paddingTop: 17,
        textAlignVertical: 'top'
    },
    focusedInput: {
        backgroundColor: '#E0E0E0',
        borderColor: '#8E7CC3', // Color when focused
    },
    label: {
        fontSize: 16,
        color: '#808080',
        position: 'absolute',
        left: 4,
        top: Platform.OS === 'ios' ? 2 : 0,
        paddingHorizontal: 4,
    },
    focusedLabel: {
        color: '#8E7CC3', // Label color when focused
    },
});


export default MatInput