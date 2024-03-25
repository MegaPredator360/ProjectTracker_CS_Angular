import { useState, useRef } from 'react';
import { View, TextInput, TouchableWithoutFeedback, Animated, StyleSheet, Platform } from "react-native";

const MatInput = ({ label, inputWidth, ...rest }) => {

    const [focused, setFocused] = useState(false);
    const [text, setText] = useState('');
    const inputRef = useRef(null);
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
            }),
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
                }),
            ]).start();
        }
        else {
            setFocused(false);
        }
    };

    const handleLabelPress = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleInputChange = (value) => {
        setText(value);
    };

    return (
        <TouchableWithoutFeedback onPress={handleLabelPress}>
            <View style={styles.container}>
                <TextInput
                    ref={inputRef}
                    {...rest}
                    style={[styles.input, focused && styles.focusedInput, {width: inputWidth}]}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onChangeText={handleInputChange}
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
                <View style={styles.underline} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 16,
        marginBottom: 8,
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