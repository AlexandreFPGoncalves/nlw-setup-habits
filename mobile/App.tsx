import { StyleSheet, Text, View, StatusBar } from 'react-native';
import {
	useFonts,
	Inter_400Regular,
	Inter_600SemiBold,
	Inter_700Bold,
	Inter_800ExtraBold,
} from '@expo-google-fonts/inter';
import { Loading } from './src/components';

export default function App() {
	const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold });

	if (!fontsLoaded) {
		return <Loading />;
	}

	return (
		<View style={{ flex: 1, backgroundColor: '#09090A', alignItems: 'center', justifyContent: 'center' }}>
			<Text style={{ color: '#FFF', fontFamily: 'Inter_400Regular' }}>Testing App</Text>
			<StatusBar barStyle={'light-content'} backgroundColor={'transparent'} translucent />
		</View>
	);
}
