import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { StyleSheet } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';

type MatCardHeaderProps = {
    title?: string;
    subtitle?: string;
    // Los tipos de parametros que se pueden recibir
    titlePosition?: 'left' | 'center' | 'right';
};

const MatCardHeader: React.FC<MatCardHeaderProps> = ({ title, subtitle, titlePosition }) => {

    // Para el modo oscuro
    const colorScheme = useColorScheme();
    const bgColor = colorScheme === 'light' ? '#FFF' : "#111";

    return (
        <ThemedView style={styles.content}>
            {title && (
                <ThemedText style={[styles.title, { textAlign: titlePosition, backgroundColor: bgColor }]}>{title}</ThemedText>
            )}
            {subtitle && (
                <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
            )}
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    content: {
        margin: 16
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