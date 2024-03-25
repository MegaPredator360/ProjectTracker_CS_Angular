import { StyleSheet, Image, View, Button } from 'react-native';

// Componentes Personalizados
import MatCard from '../components/MatCard/matCard'
import MatCardHeader from '../components/MatCard/matCardHeader';
import MatCardContent from '../components/MatCard/matCardContent';
import MatInput from '../components/MatInput/matInput';

// Se declara una variable conteniendo la ruta de la imagen
WFicon = require('../assets/logoWF.png')

const LoginScreen = ({ }) => {
    return (
        <View style={styles.container}>
            <MatCard>
                <Image source={WFicon} style={styles.WFiconImage}></Image>
                <MatCardHeader title='Iniciar Sesión' titlePosition='center' />
                <MatCardContent style={{ marginBottom: 16, }}>
                    <MatInput style={styles.TextInput} label='Correo' inputWidth={300} />
                    <MatInput style={styles.TextInput} label='Contraseña' inputWidth={300} />
                    <View style={styles.ButtonPadding}>
                        <Button title='Iniciar Sesión' />
                    </View>
                </MatCardContent>
            </MatCard>
        </View>
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
        paddingVertical: 16
    }
});

export default LoginScreen