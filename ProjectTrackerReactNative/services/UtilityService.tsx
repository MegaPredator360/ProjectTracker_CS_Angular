import { Alert } from "react-native";

class UtilityService {

    // Verificar correo electronico
    verificarCorreo(_correo: string): boolean {

        // Se verificará si el correo tiene el formato correcto, un @ y un . 
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(_correo);
    }

    // Se usará para verificar que la contraseña con las condiciones necesarias
    verificarContrasena(_contrasena: string): boolean {
        const hasUppercase = /[A-Z]/.test(_contrasena);
        const hasLowercase = /[a-z]/.test(_contrasena);
        const hasNumber = /\d/.test(_contrasena);
        const hasSymbol = /[\W_]/.test(_contrasena);

        // Si se cumplen todas las condiciones, retorna un true
        if (hasUppercase && hasLowercase && hasNumber && hasSymbol && _contrasena.length >= 8) {
            return true
        }
        else {
            return false
        }
    }

    // Mostrar alerta
    mostrarAlerta(title: string, message: string) {
        Alert.alert(title, message, [
            { text: 'Aceptar' },
        ]);
    }
}

export default new UtilityService