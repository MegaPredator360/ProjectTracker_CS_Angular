import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MatDropdown = ({ options, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        setSelectedOption(option);
        onSelect(option);
        toggleDropdown();
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownButton}>
                <Text style={styles.dropdownButtonText}>
                    {selectedOption ? selectedOption.label : 'Select an option'}
                </Text>
            </TouchableOpacity>
            {isOpen && (
                <View style={styles.optionsContainer}>
                    {options.map(option => (
                        <TouchableOpacity
                            key={option.value}
                            onPress={() => handleSelect(option)}
                            style={styles.option}
                        >
                            <Text>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        zIndex: 1,
    },
    dropdownButton: {
        borderWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    dropdownButtonText: {
        fontSize: 16,
    },
    optionsContainer: {
        position: 'absolute',
        top: 40,
        left: 0,
        right: 0,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
        zIndex: 2,
    },
    option: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
});

export default MatDropdown;
