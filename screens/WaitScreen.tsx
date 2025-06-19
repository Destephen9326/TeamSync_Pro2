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
        locations={[0, 0.4, 0.8]}
        style={styles.gradient}
      >
        <View style={styles.topSection}>
          <Image source={require('../assets/welcome.png')} style={styles.image} />
          <Text style={styles.brand}>Team Sync Pro</Text>

          <View style={styles.box}>
            <Text style={styles.subTitle}>
              Si ya tienes la clave de acceso, haz clic en “Clave”.
            </Text>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Key')}
            >
              <Text style={styles.buttonText}>Key</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.backButton]}
              activeOpacity={0.8}
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
    marginBottom: 28,
  },

  box: {
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingVertical: 30,
    paddingHorizontal: 25,
    width: '100%',
    alignItems: 'center',

    // sombra suave moderna
    shadowColor: '#ff5f6d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },

  subTitle: {
    color: '#000',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
  },

  button: {
    backgroundColor: '#ff5f6d',
    paddingVertical: 16,
    borderRadius: 35,
    alignItems: 'center',
    width: '70%',
    marginBottom: 18,

    shadowColor: '#ff5f6d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.65,
    shadowRadius: 15,
    elevation: 12,
  },

  backButton: {
    backgroundColor: '#8434f5',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default WaitScreen;
