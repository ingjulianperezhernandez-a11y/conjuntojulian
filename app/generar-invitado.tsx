import DateTimePicker from '@react-native-community/datetimepicker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function GenerarInvitadoScreen() {
  const router = useRouter();
  
  const [nombre, setNombre] = useState('');
  const [cedula, setCedula] = useState('');
  const [fecha, setFecha] = useState(new Date());
  const [hora, setHora] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [mostrarTimePicker, setMostrarTimePicker] = useState(false);
  const [tieneVehiculo, setTieneVehiculo] = useState(false);
  const [placa, setPlaca] = useState('');
  const [cantidadPersonas, setCantidadPersonas] = useState('1');

  const formatearFecha = (date) => {
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const año = date.getFullYear();
    return `${dia}/${mes}/${año}`;
  };

  const formatearHora = (date) => {
    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    return `${horas}:${minutos}`;
  };

  const onCambiarFecha = (event, selectedDate) => {
    setMostrarDatePicker(false);
    if (selectedDate) {
      setFecha(selectedDate);
    }
  };

  const onCambiarHora = (event, selectedTime) => {
    setMostrarTimePicker(false);
    if (selectedTime) {
      setHora(selectedTime);
    }
  };

  const handleGenerar = () => {
    // Validar campos
   if (!nombre || !cedula) {
    Alert.alert('Error', 'Por favor completa los campos obligatorios');
    return;
  }

  if (tieneVehiculo && !placa) {
    Alert.alert('Error', 'Por favor ingresa la placa del vehículo');
    return;
  }

  // Navegar a pantalla de QR con datos
  router.push({
    pathname: '/mostrar-qr-invitado',
    params: {
      nombre: nombre,
      cedula: cedula,
      fecha: formatearFecha(fecha),
      hora: formatearHora(hora),
      placa: tieneVehiculo ? placa : 'N/A',
      personas: cantidadPersonas,
      apartamento: 'Torre 3 - Apto 501', // Después vendrá del usuario logueado
      autorizadoPor: 'Juan Pérez', // Después vendrá del usuario logueado
    }
  });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backButton}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Generar QR Invitado</Text>
      </View>

      {/* Formulario */}
      <ScrollView style={styles.scrollView}>
        <View style={styles.form}>
          
          {/* Nombre */}
          <Text style={styles.label}>Nombre completo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Pedro García"
            value={nombre}
            onChangeText={setNombre}
          />

          {/* Cédula */}
          <Text style={styles.label}>Cédula *</Text>
          <TextInput
            style={styles.input}
            placeholder="123456789"
            value={cedula}
            onChangeText={setCedula}
            keyboardType="numeric"
          />

          {/* Fecha - CON CALENDARIO */}
          <Text style={styles.label}>Fecha de visita *</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setMostrarDatePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              📅 {formatearFecha(fecha)}
            </Text>
          </TouchableOpacity>

          {mostrarDatePicker && (
            <DateTimePicker
              value={fecha}
              mode="date"
              display="default"
              onChange={onCambiarFecha}
              minimumDate={new Date()}
            />
          )}

          {/* Hora - CON RELOJ */}
          <Text style={styles.label}>Hora aproximada *</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setMostrarTimePicker(true)}
          >
            <Text style={styles.dateButtonText}>
              🕐 {formatearHora(hora)}
            </Text>
          </TouchableOpacity>

          {mostrarTimePicker && (
            <DateTimePicker
              value={hora}
              mode="time"
              display="default"
              onChange={onCambiarHora}
              is24Hour={true}
            />
          )}

          {/* Vehículo */}
          <View style={styles.switchContainer}>
            <Text style={styles.label}>¿Viene en vehículo?</Text>
            <Switch
              value={tieneVehiculo}
              onValueChange={setTieneVehiculo}
              trackColor={{ false: '#ddd', true: '#28a745' }}
              thumbColor={tieneVehiculo ? '#fff' : '#f4f3f4'}
            />
          </View>

          {/* Placa (condicional) */}
          {tieneVehiculo && (
            <>
              <Text style={styles.label}>Placa del vehículo *</Text>
              <TextInput
                style={styles.input}
                placeholder="ABC123"
                value={placa}
                onChangeText={setPlaca}
                autoCapitalize="characters"
                maxLength={6}
              />
            </>
          )}

          {/* Cantidad personas */}
          <Text style={styles.label}>¿Cuántas personas? *</Text>
          <TextInput
            style={styles.input}
            placeholder="1"
            value={cantidadPersonas}
            onChangeText={setCantidadPersonas}
            keyboardType="numeric"
            maxLength={2}
          />

          {/* Info de validez */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>ℹ️ Información del QR:</Text>
            <Text style={styles.infoText}>
              • Válido para: {formatearFecha(fecha)}
            </Text>
            <Text style={styles.infoText}>
              • Desde: {formatearHora(hora)}
            </Text>
            <Text style={styles.infoText}>
              • Hasta: 8 horas después
            </Text>
            <Text style={styles.infoText}>
              • Máximo 2 usos (entrada + salida)
            </Text>
          </View>

          {/* Botón generar */}
          <TouchableOpacity style={styles.button} onPress={handleGenerar}>
            <Text style={styles.buttonText}>Generar QR Invitado</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </View>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
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
    backgroundColor: 'white',
  },
  dateButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'white',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#333',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  infoBox: {
    backgroundColor: '#e7f3ff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#4A90E2',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#28a745',
    borderRadius: 10,
    padding: 18,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});