import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WaitScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />

      <LinearGradient
        colors={['#ff5f6d', '#8434f5', '#000']}
        locations={[0, 0.4, 0.7]}
        style={styles.gradient}
      >
        <View style={styles.content}>
          {/* Imagen y título arriba */}
          <Image source={require('../assets/welcome.png')} style={styles.logo} />
          <Text style={styles.welcome}>Team Sync Pro!</Text>

          {/* Caja blanca con texto y botones */}
          <View style={styles.box}>
            <Text style={styles.sub}>Si ya tienes la clave de acceso, haz clic en “Clave”.</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Key')}
            >
              <Text style={styles.buttonText}>Clave</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: '#8434f5' }]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  gradient: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  content: { alignItems: 'center', width: '100%' },

  logo: { width: 140, height: 140, marginBottom: 20, resizeMode: 'contain' },

  welcome: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 20 },

  box: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },

  sub: { color: '#000', fontSize: 16, textAlign: 'center', marginBottom: 20 },

  button: {
    backgroundColor: '#ff5f6d',
    paddingVertical: 12,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WaitScreen;
