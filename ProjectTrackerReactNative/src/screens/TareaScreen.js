import { Text, View, StyleSheet } from "react-native"

const TareaScreen = ({}) => {
    return (
        <View style={styles.container}>
            <Text>
                Tarea Screen
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default TareaScreen