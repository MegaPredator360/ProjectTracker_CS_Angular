import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';

const MatCardContent = (props: any) => {

    // Para el modo oscuro
    const colorScheme = useColorScheme();
    const bgColor = colorScheme === 'light' ? '#FFF' : "#111";

    return (
        <ThemedView style={[styles.cardContent, { backgroundColor: bgColor }]}>
            {props.children}
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    cardContent: {
        marginHorizontal: 16
    }
})

export default MatCardContent