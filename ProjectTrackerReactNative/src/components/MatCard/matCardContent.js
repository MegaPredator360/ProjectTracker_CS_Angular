import { View, StyleSheet } from "react-native";

const MatCardContent = (props) => {
    return (
        <View style={styles.cardContent}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    cardContent: {
        paddingHorizontal: 16
    }
})

export default MatCardContent