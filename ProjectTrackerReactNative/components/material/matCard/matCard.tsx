import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';

const MatCard = (props: any) => {

    // Para el modo oscuro
    const colorScheme = useColorScheme();
    const bgColor = colorScheme === 'light' ? '#FFF' : "#111";

    return (
        <ThemedView style={[styles.card, {backgroundColor: bgColor}]}>
            {props.children}
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    card: {
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