import { ThemedView } from "@/components/ThemedView";
import MatButton from "@/components/material/matButton/matButton";
import MatCard from "@/components/material/matCard/matCard";
import MatCardContent from "@/components/material/matCard/matCardContent";
import MatCardHeader from "@/components/material/matCard/matCardHeader";
import MatInput from "@/components/material/matInput/matInput";
import { useState } from "react";
import { Image, StyleSheet } from "react-native";
import { useColorScheme } from '@/hooks/useColorScheme';

export default function LoginScreen({ navigation }: { navigation: any }) {

    // Para el modo oscuro
    const colorScheme = useColorScheme();
    const logoRoute: any = colorScheme === 'light' ? require('@/assets/images/logoWFDark.png') : require('@/assets/images/logoWFLight.png');

    const [correo, setCorreo] = useState('')
    const [contrasena, setContrasena] = useState('')

    return (
        <ThemedView style={styles.container}>
            <MatCard>
                <Image source={logoRoute} style={styles.WFiconImage}></Image>
                <MatCardHeader title='Iniciar Sesión' titlePosition='center' />
                <MatCardContent style={{ marginBottom: 16, }}>
                    <MatInput 
                    label='Correo' inputWidth={300}
                    onChangeText={(text) => setCorreo(text)}
                    value={correo}
                    />
                    <MatInput
                    label='Contraseña' inputWidth={300}
                    onChangeText={(text) => setContrasena(text)}
                    value={contrasena}
                    />
                    <ThemedView style={styles.ButtonPadding}>
                        <MatButton
                            title='Iniciar Sesión'
                            //onPress={() => navigation.navigate('Layout')}
                        />
                    </ThemedView>
                </MatCardContent>
            </MatCard>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    WFiconImage: {
        marginTop: 16,
        alignSelf: 'center',
        width: 100,
        height: 70
    },
    ButtonPadding: {
        marginVertical: 16
    }
});