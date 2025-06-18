import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

// Define los nombres de tus rutas y parámetros
type RootStackParamList = {
  Home: { nuevoGrupo?: { nombre: string; grupo: string } } | undefined;
  CreateGroup: undefined;
  // otras pantallas si hay...
};

// Tipo para el navigation prop de esta pantalla
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

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nombre del Grupo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Programación Web"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Grupo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Grupo 6"
        value={grupo}
        onChangeText={setGrupo}
      />

      <TouchableOpacity style={styles.button} onPress={handleGuardar}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  label: { color: '#fff', fontSize: 16, marginBottom: 8 },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff5f6d',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
});

export default CreateGroupScreen;
