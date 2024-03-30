import { View, StyleSheet } from 'react-native';

const MatDivider = () => {
    return <View style={styles.divider} />;
};

const styles = StyleSheet.create({
    divider: {
        height: 1,
        backgroundColor: 'black',
    },
});

export default MatDivider;