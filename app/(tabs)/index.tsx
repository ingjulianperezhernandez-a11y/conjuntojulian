import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

// BASE DE DATOS SIMULADA
const USUARIOS_DB = [
  { 
    usuario: 't3-501', 
    contraseña: '1234', 
    nombre: 'Juan Pérez',
    apartamento: 'Torre 3 - Apto 501',
    cedula: '1234567890'
  },
  { 
    usuario: 't1-203', 
    contraseña: '5678', 
    nombre: 'María García',
    apartamento: 'Torre 1 - Apto 203',
    cedula: '9876543210'
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = () => {
    if (!usuario || !contraseña) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    const usuarioEncontrado = USUARIOS_DB.find(
      u => u.usuario === usuario && u.contraseña === contraseña
    );

    if (usuarioEncontrado) {
      setUserData(usuarioEncontrado);
      setIsLoggedIn(true);
      Alert.alert('¡Bienvenido!', `Hola ${usuarioEncontrado.nombre}`);
    } else {
      Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }
  };

  const generarDatosQR = (user) => {
    const timestamp = Date.now();
    return JSON.stringify({
      tipo: 'RESIDENTE',
      usuario: user.usuario,
      nombre: user.nombre,
      apartamento: user.apartamento,
      cedula: user.cedula,
      timestamp: timestamp,
      hash: `${user.usuario}-${timestamp}`
    });
  };

  // Pantalla HOME
  if (isLoggedIn && userData) {
    const datosQR = generarDatosQR(userData);

    return (
      <ScrollView style={styles.homeContainer}>
        <View style={styles.homeHeader}>
          <Text style={styles.homeTitle}>👤 {userData.nombre}</Text>
          <Text style={styles.homeSubtitle}>{userData.apartamento}</Text>
        </View>

        <View style={styles.qrContainer}>
          <Text style={styles.qrTitle}>Tu Código de Acceso</Text>
          
          <View style={styles.qrWrapper}>
            <QRCode
              value={datosQR}
              size={250}
              color="#000"
              backgroundColor="#fff"
            />
          </View>

          <Text style={styles.qrInfo}>
            🔐 Código permanente{'\n'}
            No lo compartas con nadie
          </Text>

          <View style={styles.qrDetails}>
            <Text style={styles.detailLabel}>Usuario:</Text>
            <Text style={styles.detailValue}>{userData.usuario}</Text>
            <Text style={styles.detailLabel}>Cédula:</Text>
            <Text style={styles.detailValue}>{userData.cedula}</Text>
          </View>
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => router.push('/generar-invitado')}
          >
            <Text style={styles.actionButtonText}>➕ Generar QR Invitado</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButtonSecondary}>
            <Text style={styles.actionButtonTextSecondary}>📋 Ver Historial</Text>
          </TouchableOpacity>
          <TouchableOpacity 
  style={styles.actionButtonSecondary}
  onPress={() => router.push('/scanner-celador')}
>
  <Text style={styles.actionButtonTextSecondary}>📷 Escanear QR (Portero)</Text>
</TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => {
            setIsLoggedIn(false);
            setUserData(null);
            setUsuario('');
            setContraseña('');
          }}
        >
          <Text style={styles.logoutButtonText}>🚪 Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Pantalla LOGIN
  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.logo}>🏢</Text>
          <Text style={styles.title}>Mi Conjunto</Text>
          <Text style={styles.subtitle}>Acceso Inteligente</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            placeholder="t3-501"
            value={usuario}
            onChangeText={setUsuario}
            autoCapitalize="none"
            returnKeyType="next"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={contraseña}
            onChangeText={setContraseña}
            secureTextEntry
            returnKeyType="done"
            onSubmitEditing={handleLogin}
          />

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>

          <Text style={styles.hint}>
            💡 Prueba: t3-501 / 1234
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A90E2',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  logo: {
    fontSize: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#4A90E2',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  hint: {
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
    marginTop: 15,
  },
  homeContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  homeHeader: {
    backgroundColor: '#4A90E2',
    padding: 25,
    paddingTop: 60,
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  homeSubtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
  },
  qrContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  qrTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  qrWrapper: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  qrInfo: {
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
  },
  qrDetails: {
    marginTop: 20,
    width: '100%',
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  actionsContainer: {
    padding: 20,
    paddingTop: 0,
  },
  actionButton: {
    backgroundColor: '#28a745',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginBottom: 15,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtonSecondary: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4A90E2',
  },
  actionButtonTextSecondary: {
    color: '#4A90E2',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    margin: 20,
    marginTop: 10,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});