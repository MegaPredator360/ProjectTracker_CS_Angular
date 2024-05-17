import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { Image, TouchableOpacity } from 'react-native';

const DrawerUserInfo = (props: any) => {

    const navigation = useNavigation();

    return (
        <ThemedView style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <ThemedView
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: 20,
                        marginBottom: 20,
                    }}
                >
                    <ThemedView>
                        <ThemedText>John Doe</ThemedText>
                        <ThemedText>example@email.com</ThemedText>
                    </ThemedView>
                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
                        }}
                        style={{ width: 60, height: 60, borderRadius: 30 }}
                    />
                </ThemedView>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <TouchableOpacity
                style={{
                    position: 'absolute',
                    right: 0,
                    left: 0,
                    bottom: 50,
                    padding: 20,
                }}
                onPress={() => navigation.navigate('login' as never)}
            >
                <ThemedText>Log Out</ThemedText>
            </TouchableOpacity>
        </ThemedView>
    );
}

export default DrawerUserInfo