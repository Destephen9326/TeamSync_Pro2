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
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Facebook from 'expo-facebook';
import * as AppleAuthentication from 'expo-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../types/navigation';

type LoginNav = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigation = useNavigation<LoginNav>();

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('emailRecordado');
      if (saved) {
        setEmail(saved);
        setRemember(true);
      }
    })();
  }, []);

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
        locations={[0, 0.4, 0.8]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          <Image source={require('../assets/welcome.png')} style={styles.logo} />

          <Text style={styles.brand}>Team Sync Pro!</Text>
          <Text style={styles.sub}>Inicia sesion en tu cuenta</Text>

          {/* EMAIL */}
          <View style={styles.inputContainer}>
            <Feather name="mail" size={18} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email "
              placeholderTextColor="#ddd"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>

          {/* PASSWORD */}
          <View style={styles.inputContainer}>
            <Feather name="lock" size={18} color="#fff" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#ddd"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* LOGIN */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} activeOpacity={0.8}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          {/* OR */}
          <Text style={styles.orText}>─ Or ─</Text>

          {/* SOCIAL ICONS ONLY */}
          <View style={styles.socialContainer}>
            <TouchableOpacity onPress={handleAppleLogin} style={styles.socialBtn} activeOpacity={0.8}>
              <FontAwesome name="apple" size={28} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleFacebookLogin} style={styles.socialBtn} activeOpacity={0.8}>
              <FontAwesome name="facebook" size={28} color="#1877F2" />
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
  container: {
    alignItems: 'center',
  },
  logo: {
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
    marginBottom: 20,
    textShadowColor: '#ff5f6d',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  sub: {
    color: '#ddd',
    fontSize: 18,
    marginBottom: 28,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ff5f6d',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    marginBottom: 20,
    width: '100%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    height: 48,
    fontSize: 16,
  },
  rememberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#ff5f6d',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    shadowColor: '#ff5f6d',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 8,
  },
  loginText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 20,
  },
  orText: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 16,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 20,
  },
  socialBtn: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 18,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
});
