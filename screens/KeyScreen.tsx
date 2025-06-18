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
  SafeAreaView
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
        <View style={styles.content}>
          <Image source={require('../assets/welcome.png')} style={styles.logo} />
          <Text style={styles.welcome}>Team Sync Pro!</Text>

          <View style={styles.box}>
            <Text style={styles.sub}>Ingresa la clave</Text>

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

            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Enviar</Text>
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
  content: { alignItems: 'center' },

  logo: { width: 140, height: 140, marginBottom: 20 },
  welcome: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 30 },
  sub: { color: '#000', fontSize: 18, marginBottom: 20 },

  box: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
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
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
  },

  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default KeyScreen;
