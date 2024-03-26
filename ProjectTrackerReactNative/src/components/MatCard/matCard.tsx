import { View, StyleSheet } from "react-native";

const MatCard = (props: any) => {
    return (
        <View style={styles.card}>
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginHorizontal: 16,
        marginVertical: 8,
        elevation: 4, // Android
        shadowColor: '#000', // iOS
        shadowOffset: { width: 0, height: 2 }, // iOS
        shadowOpacity: 0.25, // iOS
        shadowRadius: 4, // iOS
    }
});

export default MatCard;