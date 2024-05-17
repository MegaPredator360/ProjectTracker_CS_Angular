import { View } from 'react-native';

type MatDividerProps = {
    color?: string;
};

const MatDivider: React.FC<MatDividerProps> = ({ color }) => {

    // Verificar si el color está vacío o no
    const dividerColor = color ? color : 'black'; // Si el color está vacío, se establece negro como predeterminado

    return (
        <View style={{ height: 1, backgroundColor: dividerColor }} />
    );
};

export default MatDivider;