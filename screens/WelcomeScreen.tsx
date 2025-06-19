import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />

      <LinearGradient
        colors={['#ff5f6d', '#8434f5', '#000']}
        locations={[0, 0.4, 0.8]}
        style={styles.gradient}
      >
        <View style={styles.topSection}>
          <Image source={require('../assets/welcome.png')} style={styles.image} />
          <Text style={styles.brand}>Team Sync Pro</Text>

          <View style={styles.textContainer}>
            <Text style={styles.subTitle}>🌟 Conecta Comparte Crea</Text>
            <Text style={styles.description}>
              TeamSync Pro es tu espacio para trabajar en equipo, intercambiar ideas y alcanzar metas juntos. ¡Haz que cada proyecto sea épico!
            </Text>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('LoginScreen')}
            >
              <Text style={styles.buttonText}>Comenzar</Text>
            </TouchableOpacity>
          </View>
        </View>

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
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 0,
    paddingHorizontal: 10,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 120,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 16, 
  },
  brand: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    textShadowColor: '#ff5f6d',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
    marginBottom: 28, // más espacio después de Team Sync Pro
  },
  textContainer: {
    width: '90%',
    alignItems: 'center',
  },
  subTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 12,
    textAlign: 'center',
    textShadowColor: '#8434f5',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  description: {
    color: '#ddd',
    fontSize: 14,
    marginBottom: 30,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ff5f6d',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#ff5f6d',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
    width: '60%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
