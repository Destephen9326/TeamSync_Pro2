import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, StatusBar, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

type RootStackParamList = {
  Home: { nuevoGrupo?: { nombre: string; grupo: string } } | undefined;
  CreateGroup: undefined;
  Dashboard: undefined;
};

type CreateGroupScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateGroup'
>;

const CreateGroupScreen = () => {
  const navigation = useNavigation<CreateGroupScreenNavigationProp>();

  const [nombre, setNombre] = useState('');
  const [grupo, setGrupo] = useState('');

  const handleGuardar = () => {
    if (!nombre || !grupo) {
      Alert.alert('Campos requeridos', 'Por favor llena todos los campos.');
      return;
    }
    const nuevoGrupo = { nombre, grupo };
    navigation.navigate('Home', { nuevoGrupo });
  };

  const handleKanban = () => {
    navigation.navigate('Dashboard');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />

      <LinearGradient
        colors={['#ff5f6d', '#8434f5', '#000']}
        locations={[0, 0.4, 0.8]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Image source={require('../assets/welcome.png')} style={styles.image} />
          <Text style={styles.brand}>Team Sync Pro</Text>

          <View style={styles.formBox}>
            <Text style={styles.label}>Nombre del Grupo:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Programación Web"
              placeholderTextColor="#ddd"
              value={nombre}
              onChangeText={setNombre}
            />

            <Text style={styles.label}>Grupo:</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. Grupo 6"
              placeholderTextColor="#ddd"
              value={grupo}
              onChangeText={setGrupo}
            />

            <View style={styles.buttonsRow}>
              <TouchableOpacity style={styles.button} onPress={handleGuardar} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.kanbanButton} onPress={handleKanban} activeOpacity={0.8}>
                <Text style={styles.kanbanButtonText}>Kanban</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  container: {
    width: '90%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 12,
  },
  brand: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '900',
    marginBottom: 28,
    textShadowColor: '#ff5f6d',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
    textAlign: 'center',
  },
  formBox: {
    backgroundColor: '#1c1c2a', // nuevo color del cuadro
    borderRadius: 30,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  label: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    textShadowColor: '#8434f5',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 20,
    fontSize: 16,
    shadowColor: '#8434f5',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    width: '100%',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 15,
  },
  button: {
    backgroundColor: '#ff5f6d',
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#ff5f6d',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },
  kanbanButton: {
    backgroundColor: '#6a0dad',
    borderWidth: 0,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: 'center',
    flex: 1,
  },
  kanbanButtonText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
  },
});

export default CreateGroupScreen;
