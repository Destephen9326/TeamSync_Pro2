import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome } from '@expo/vector-icons';

export default function Camara() {
  const [selectImage, setSelectImage] = useState<string | null>(null);
  const [localImages, setLocalImages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || mediaStatus.status !== 'granted') {
        Alert.alert('Permisos requeridos', 'Activa los permisos de cámara y galería para continuar.');
      }
    })();
  }, []);

  async function guardarImagen(uri: string) {
    const filename = uri.split('/').pop() || `evidencia_${Date.now()}.jpg`;
    const destinationUri = FileSystem.documentDirectory + filename;

    try {
      await FileSystem.copyAsync({
        from: uri,
        to: destinationUri,
      });
      setSelectImage(destinationUri);
      Alert.alert('Guardado', 'Imagen guardada localmente ✅');
    } catch (error) {
      console.error('Error al guardar imagen:', error);
      Alert.alert('Error', 'No se pudo guardar la imagen');
    }
  }

  async function seleccionarDesdeGaleria() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      await guardarImagen(result.assets[0].uri);
    }
  }

  async function tomarFotoEvidencia() {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      await guardarImagen(result.assets[0].uri);
    }
  }

  async function cargarImagenesLocales() {
    try {
      const files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory || '');
      console.log('Archivos encontrados:', files); // Para verificar
      const imageUris = files.map(file => FileSystem.documentDirectory + file);
      setLocalImages(imageUris);
    } catch (error) {
      console.error('Error al cargar imágenes locales:', error);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <LinearGradient
        colors={['#ff5f6d', '#8434f5', '#000']}
        locations={[0, 0.4, 0.8]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <Image source={require('../assets/welcome.png')} style={styles.logo} />
          <Text style={styles.brand}>Team Sync Pro</Text>
          <Text style={styles.title}>Subir Evidencia de Tarea</Text>

          <View style={styles.buttonsBox}>
            <TouchableOpacity style={styles.button} onPress={seleccionarDesdeGaleria}>
              <FontAwesome name="folder" size={24} color="#fff" style={{ marginRight: 12 }} />
              <Text style={styles.buttonText}>Galería</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={tomarFotoEvidencia}>
              <FontAwesome name="camera" size={24} color="#fff" style={{ marginRight: 12 }} />
              <Text style={styles.buttonText}>Tomar foto</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={cargarImagenesLocales}>
              <FontAwesome name="image" size={24} color="#fff" style={{ marginRight: 12 }} />
              <Text style={styles.buttonText}>Ver fotos guardadas</Text>
            </TouchableOpacity>
          </View>

          {selectImage && (
            <View style={styles.imageContainer}>
              <Text style={styles.previewText}>Vista previa:</Text>
              <Image source={{ uri: selectImage }} style={styles.image} />
            </View>
          )}

          {localImages.length > 0 && (
            <View style={{ marginTop: 40, alignItems: 'center' }}>
              <Text style={styles.previewText}>Imágenes guardadas:</Text>
              {localImages.map((uri, idx) => (
                <Image
                  key={idx}
                  source={{ uri }}
                  style={[styles.image, { marginBottom: 10 }]}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 80,
  },
  logo: {
    width: 220,
    height: 220,
    marginBottom: 12,
    borderRadius: 120,
    borderWidth: 3,
    borderColor: '#fff',
  },
  brand: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 20,
    textShadowColor: '#ff5f6d',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 30,
    textAlign: 'center',
    textShadowColor: '#8434f5',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  buttonsBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 24,
    paddingHorizontal: 20,
    borderRadius: 18,
    width: '100%',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#ff5f6d',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#ff5f6d',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
    letterSpacing: 0.5,
  },
  imageContainer: {
    marginTop: 30,
    alignItems: 'center',
    borderRadius: 20,
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    shadowColor: '#8434f5',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  previewText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 14,
    fontWeight: '600',
    textShadowColor: '#8434f5',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  image: {
    width: 280,
    height: 280,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#ff5f6d',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
  },
});
