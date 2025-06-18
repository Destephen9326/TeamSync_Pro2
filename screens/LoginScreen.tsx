import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Image,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Facebook from 'expo-facebook';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../types/navigation';

/** Tipo de navegación para evitar errores TS */
type LoginNav = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigation = useNavigation<LoginNav>();

  /* Carga inicial del correo recordado */
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('emailRecordado');
      if (saved) {
        setEmail(saved);
        setRemember(true);
      }
    })();
  }, []);

  /* LOGIN manual */
  const handleLogin = async () => {
    if (!email || !password) {
      alert('Por favor ingresa correo y contraseña.');
      return;
    }
    remember
      ? await AsyncStorage.setItem('emailRecordado', email)
      : await AsyncStorage.removeItem('emailRecordado');

    navigation.navigate('Wait');

  };

  /* LOGIN con Facebook */
  const handleFacebookLogin = async () => {
    try {
      await Facebook.initializeAsync({ appId: 'TU_APP_ID_FACEBOOK' });
      const { type } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });
      if (type === 'success') alert('Login con Facebook exitoso!');
    } catch {
      alert('Error con Facebook');
    }
  };

  /* LOGIN con Apple */
  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      alert(`Bienvenido, ${credential.fullName?.givenName}`);
    } catch (e) {
      if (typeof e === 'object' && e !== null && 'code' in e) {
        const err = e as { code: string };
        if (err.code === 'ERR_CANCELED') return;
      }
      alert('Error con Apple');
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
          <Text style={styles.sub}>Sign in to your account</Text>

          {/* EMAIL */}
          <View style={styles.inputContainer}>
            <Feather name="mail" size={16} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email address"
              placeholderTextColor="#ddd"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* PASSWORD */}
          <View style={styles.inputContainer}>
            <Feather name="lock" size={16} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ddd"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* REMEMBER */}
          <View style={styles.rememberContainer}>
            <Switch value={remember} onValueChange={setRemember} />
            <Text style={styles.rememberText}>Remember me</Text>
          </View>

          {/* LOGIN */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          {/* OR */}
          <Text style={styles.orText}>─ Or ─</Text>

          {/* SOCIAL */}
          <View style={styles.socialContainer}>
            <TouchableOpacity onPress={handleAppleLogin} style={styles.socialBtn}>
              <FontAwesome name="apple" size={24} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFacebookLogin} style={styles.socialBtn}>
              <FontAwesome name="facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#000' },
  gradient: { flex: 1, justifyContent: 'center', paddingHorizontal: 24 },
  content: { alignItems: 'center' },

  /* imagen y títulos */
  logo: { width: 140, height: 140, marginBottom: 20 },
  welcome: { color: '#fff', fontSize: 26, fontWeight: 'bold' },
  sub: { color: '#ddd', marginBottom: 20 },

  /* inputs */
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ff5f6d',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 15,
    width: '100%',
  },
  icon: { marginRight: 8 },
  input: { flex: 1, color: '#fff', height: 44 },

  /* remember */
  rememberContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  rememberText: { color: '#fff', marginLeft: 8 },

  /* botones */
  loginButton: {
    backgroundColor: '#ff5f6d',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  loginText: { color: '#000', fontWeight: 'bold', fontSize: 16 },

  orText: { color: '#fff', marginBottom: 10 },

  socialContainer: { flexDirection: 'row', gap: 20 },
  socialBtn: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 14,
    elevation: 2,
  },
});
