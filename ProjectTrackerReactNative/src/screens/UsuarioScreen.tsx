import { Text, View, StyleSheet } from "react-native"

const UsuarioScreen = ({}) => {
    return (
        <View style={styles.container}>
            <Text>
                Usuario Screen
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

export default UsuarioScreen