import { Modal, View, Text, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

type MatDialogProps = {
    title: string;
    message: string;
    visible: boolean;
    primaryText?: string
    primaryColor?: string
    primaryAction: () => void
    secondaryText?: string
    secondaryColor?: string
    secondaryAction?: () => void
};

const MatDialog: React.FC<MatDialogProps> = ({
    title,
    message,
    visible,
    primaryText = 'OK',
    primaryColor = '#5499c7',
    primaryAction,
    secondaryText,
    secondaryColor = '#5499c7',
    secondaryAction,

}) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
        //onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
            //onPressOut={onClose}
            >
                <ThemedView style={styles.modalView}>
                    <ThemedView style={styles.alert}>
                        <ThemedText style={styles.alertTitle}>{title}</ThemedText>
                        <ThemedText style={styles.alertMessage}>{message}</ThemedText>
                        <View style={styles.alertButtonGroup}>
                            {
                                secondaryText && (
                                    <TouchableOpacity onPress={secondaryAction} style={{marginRight: 15}}>
                                        <Text style={{ color: secondaryColor, fontSize: 17 }}>
                                            {secondaryText}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }
                            <TouchableOpacity onPress={primaryAction}>
                                <Text style={{ color: primaryColor, fontSize: 17 }}>
                                    {primaryText}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ThemedView>
                </ThemedView>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        //backgroundColor: '#fff',
        borderRadius: 5,
        padding: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    alert: {
        width: 300,
        borderRadius: 10,
    },
    alertTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    alertMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    alertButtonGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
});

export default MatDialog;
