import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function WelcomeScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />

      <LinearGradient
        colors={['#ff5f6d', '#8434f5', '#000000']}
        locations={[0, 0.4, 0.7]}
        style={styles.gradient}
      >
        <View style={styles.topSection}>
          <Image source={require('../assets/welcome.png')} style={styles.image} resizeMode="contain" />
          <Text style={styles.title}>
            Team<Text style={styles.bold}>Sync Pro</Text>
          </Text>
        </View>

        <View style={styles.bottomSection}>
          <Text style={styles.subTitle}>🌟 Conecta Comparte Crea</Text>
          <Text style={styles.description}>
            TeamSync Pro es tu espacio para trabajar en equipo, intercambiar ideas y alcanzar metas juntos. ¡Haz que cada proyecto sea épico!
          </Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonText}>Comenzar</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000', // fondo base por si el gradiente tarda en cargar
  },
  gradient: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  topSection: {
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    width: 180,
    height: 180,
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginTop: 20,
    fontWeight: '300',
  },
  bold: {
    fontWeight: 'bold',
  },
  bottomSection: {
    padding: 30,
  },
  subTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  description: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: '600',
  },
});
