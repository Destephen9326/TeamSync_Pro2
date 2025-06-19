import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const KeyScreen = ({ navigation }: any) => {
  const [key, setKey] = useState(['', '', '', '', '', '']);
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newKey = [...key];
    newKey[index] = text.slice(-1);
    setKey(newKey);

    if (text && index < key.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const clave = key.join('');
    if (clave === '123456') {
      navigation.navigate('Home');
    } else {
      Alert.alert('Clave incorrecta', 'Por favor verifica e inténtalo de nuevo');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <LinearGradient
        colors={['#ff5f6d', '#8434f5', '#000']}
        locations={[0, 0.4, 0.7]}
        style={styles.gradient}
      >
        <View style={styles.topSection}>
          <Image source={require('../assets/welcome.png')} style={styles.image} />
          <Text style={styles.brand}>Team Sync Pro</Text>

          <View style={styles.box}>
            <Text style={styles.subTitle}>Ingresa la clave</Text>

            <View style={styles.inputRow}>
              {key.map((k, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    inputs.current[index] = ref!;
                  }}
                  style={styles.input}
                  maxLength={1}
                  onChangeText={(text) => handleChange(text, index)}
                  value={k}
                  keyboardType="number-pad"
                  textAlign="center"
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                />
              ))}
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSubmit} activeOpacity={0.8}>
              <Text style={styles.buttonText}>Enviar</Text>
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

  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 260,
    marginBottom: 30,
  },

  input: {
    borderWidth: 2,
    borderColor: '#ff5f6d',
    width: 40,
    height: 55,
    fontSize: 22,
    fontWeight: 'bold',
    borderRadius: 10,
    color: '#000',
    backgroundColor: 'transparent',
  },

  button: {
    backgroundColor: '#ff5f6d',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',

    shadowColor: '#ff5f6d',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default KeyScreen;
