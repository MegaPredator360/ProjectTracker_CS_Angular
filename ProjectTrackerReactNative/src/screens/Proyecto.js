import { Text, View, StyleSheet } from "react-native"

const ProyectoScreen = ({}) => {
    return (
        <View style={styles.container}>
            <Text>
                Proyecto Screen
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

export default ProyectoScreen