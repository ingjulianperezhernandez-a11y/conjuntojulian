import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './(tabs)/index';
import GenerarInvitadoScreen from './generar-invitado';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="GenerarInvitado" component={GenerarInvitadoScreen} />
    </Stack.Navigator>
  );
}