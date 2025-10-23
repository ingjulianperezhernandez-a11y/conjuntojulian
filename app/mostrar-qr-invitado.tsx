import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export default function MostrarQRInvitadoScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  // Datos del invitado (vienen de la pantalla anterior)
  const invitado = {
    nombre: params.nombre,
    cedula: params.cedula,
    fecha: params.fecha,
    hora: params.hora,
    placa: params.placa || 'N/A',
    personas: params.personas,
    apartamento: params.apartamento,
    autorizadoPor: params.autorizadoPor,
  };

  // Generar datos para QR
  const datosQR = JSON.stringify({
    tipo: 'INVITADO',
    id: `INV-${Date.now()}`,
    nombre: invitado.nombre,
    cedula: invitado.cedula,
    fecha: invitado.fecha,
    hora: invitado.hora,
    placa: invitado.placa,
    personas: invitado.personas,
    apartamento: invitado.apartamento,
    autorizadoPor: invitado.autorizadoPor,
    validoHasta: '8 horas',
    maxUsos: 2,
    timestamp: Date.now(),
  });

  const compartirQR = async () => {
    try {
      await Share.share({
        message: `🏢 Invitación a Mi Conjunto\n\n` +
                 `Invitado: ${invitado.nombre}\n` +
                 `Fecha: ${invitado.fecha}\n` +
                 `Hora: ${invitado.hora}\n` +
                 `Apartamento: ${invitado.apartamento}\n\n` +
                 `Muestra este QR en portería`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>✅ QR Generado</Text>
        <Text style={styles.headerSubtitle}>Listo para compartir</Text>
      </View>

      {/* QR Code */}
      <View style={styles.qrContainer}>
        <View style={styles.qrWrapper}>
          <QRCode
            value={datosQR}
            size={280}
            color="#000"
            backgroundColor="#fff"
          />
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>INVITADO</Text>
        </View>
      </View>

      {/* Datos del invitado */}
      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>📋 Datos del Invitado</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Nombre:</Text>
          <Text style={styles.detailValue}>{invitado.nombre}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Cédula:</Text>
          <Text style={styles.detailValue}>{invitado.cedula}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Fecha:</Text>
          <Text style={styles.detailValue}>{invitado.fecha}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Hora:</Text>
          <Text style={styles.detailValue}>{invitado.hora}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Placa:</Text>
          <Text style={styles.detailValue}>{invitado.placa}</Text>
        </View>

        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Personas:</Text>
          <Text style={styles.detailValue}>{invitado.personas}</Text>
        </View>
      </View>

      {/* Info validez */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>ℹ️ Validez del QR:</Text>
        <Text style={styles.infoText}>• Válido para: {invitado.fecha}</Text>
        <Text style={styles.infoText}>• Desde: {invitado.hora}</Text>
        <Text style={styles.infoText}>• Hasta: 8 horas después</Text>
        <Text style={styles.infoText}>• Máximo 2 usos (entrada + salida)</Text>
      </View>

      {/* Botones */}
      <TouchableOpacity style={styles.shareButton} onPress={compartirQR}>
        <Text style={styles.shareButtonText}>📤 Compartir</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.homeButton}
        onPress={() => router.push('/(tabs)')}
      >
        <Text style={styles.homeButtonText}>🏠 Ir a Inicio</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#28a745',
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
  },
  qrContainer: {
    backgroundColor: 'white',
    margin: 20,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  qrWrapper: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#28a745',
  },
  badge: {
    backgroundColor: '#28a745',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: 15,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  detailsContainer: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 0,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#fff3cd',
    padding: 15,
    margin: 20,
    marginTop: 0,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#856404',
    marginBottom: 4,
  },
  shareButton: {
    backgroundColor: '#25D366',
    margin: 20,
    marginTop: 0,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#6c757d',
    margin: 20,
    marginTop: 10,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#4A90E2',
    margin: 20,
    marginTop: 10,
    marginBottom: 40,
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});