import { useState, useRef } from 'react';
import { View, TextInput, Animated, StyleSheet, Platform, TouchableOpacity, GestureResponderEvent, KeyboardAvoidingView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GestureHandlerRootView, TouchableWithoutFeedback } from 'react-native-gesture-handler';

type MatInputProps = {
    label?: string;
    inputWidth?: number;
    buttonIcon?: string;
    buttonIconOnPress?: (((event: GestureResponderEvent) => void) & (() => void)) | undefined;
    hideText?: boolean;
    entryType?: string;
};

const MatInput: React.FC<MatInputProps> = ({ label, inputWidth, buttonIcon, buttonIconOnPress, hideText, entryType = 'default', ...rest }) => {

    const [focused, setFocused] = useState(false);
    const [text, setText] = useState('');
    const inputRef = useRef<TextInput>(null);
    const labelPosition = useRef(new Animated.Value(10)).current;
    const labelFontSize = useRef(new Animated.Value(16)).current;

    const handleFocus = () => {
        setFocused(true);
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
    };

    const handleBlur = () => {
        if (!text) {
            setFocused(false);
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
        else {
            setFocused(false);
        }
    };

    const handleLabelPress = () => {
        inputRef.current?.focus();
    };

    const handleInputChange = (value: string) => {
        setText(value);
    };

    return (
        <GestureHandlerRootView>
            <TouchableWithoutFeedback onPress={handleLabelPress}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                >
                    <View style={[styles.container]}>
                        <TextInput
                            ref={inputRef}
                            {...rest}
                            style={[styles.input, focused && styles.focusedInput, { width: inputWidth }]}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            onChangeText={handleInputChange}
                            secureTextEntry={hideText}
                            keyboardType={entryType}
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

        </GestureHandlerRootView>
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
        height: 47,
        borderColor: '#D3D3D3',
        borderBottomWidth: 1,
        fontSize: 16,
        padding: 8,
        paddingTop: 17
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