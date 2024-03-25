import { View, Text, StyleSheet } from "react-native";

const MatCardHeader = ({ title, subtitle, titlePosition }) => {
    return (
        <View style={styles.content}>
            {title && (
                <Text style={[styles.title, {textAlign: titlePosition}]}>{title}</Text>
            )}
            {subtitle && (
                <Text style={styles.subtitle}>{subtitle}</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        padding: 16
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
})

export default MatCardHeader;