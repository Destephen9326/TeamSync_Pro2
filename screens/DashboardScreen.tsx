import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';

// Rutas de navegación
type RootStackParamList = {
  Welcome: undefined;
  LoginScreen: undefined;
  Home: { nuevoGrupo?: { nombre: string; grupo: string } } | undefined;
  Wait: undefined;
  Key: undefined;
  CreateGroup: undefined;
  Dashboard: { grupoId?: string } | undefined;
  Camara: undefined;
};

type DashboardNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen = () => {
  const navigation = useNavigation<DashboardNavigationProp>();

  const handleHomework = () => {
    Alert.alert('Homework', 'Esta funcionalidad estará disponible próximamente.', [{ text: 'OK' }]);
  };

  const handleContent = () => {
    Alert.alert('Content', 'Esta funcionalidad estará disponible próximamente.', [{ text: 'OK' }]);
  };

  const handleGroupChat = () => {
    Alert.alert('Group Chat', 'Esta funcionalidad estará disponible próximamente.', [{ text: 'OK' }]);
  };

  const handleMyGroups = () => {
    navigation.navigate('Home');
  };

  const handleNotifications = () => {
    Alert.alert('Notificaciones', 'No tienes notificaciones nuevas.', [{ text: 'OK' }]);
  };

  const handleBackToHome = () => {
    navigation.navigate('Home');
  };

  const handleOpenCamara = () => {
    navigation.navigate('Camara');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <LinearGradient
        colors={['#ff5f6d', '#8434f5', '#000']}
        locations={[0, 0.4, 0.8]}
        style={styles.gradient}
      >
        <View style={styles.container}>
          {/* Encabezado */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity onPress={handleBackToHome} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Regresar</Text>
              </TouchableOpacity>
              <Text style={styles.greeting}>Hi, Yisel!</Text>
              <Text style={styles.subtitle}>Kanban Dashboard</Text>
            </View>
            <TouchableOpacity onPress={handleNotifications} style={styles.bellContainer}>
              <Text style={styles.bellIcon}>🔔</Text>
            </TouchableOpacity>
          </View>

          {/* Tarjetas */}
          <View style={styles.cardsContainer}>
            {/* Fila 1 */}
            <View style={styles.topRow}>
              <TouchableOpacity style={styles.smallCard} onPress={handleHomework}>
                <View style={[styles.cardBackground, { backgroundColor: '#ff5f6d' }]}>
                  <View style={styles.cardOverlay}>
                    <Text style={styles.cardIcon}>📚</Text>
                    <Text style={styles.cardText}>Homework</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.smallCard} onPress={handleContent}>
                <View style={[styles.cardBackground, { backgroundColor: '#8434f5' }]}>
                  <View style={styles.cardOverlay}>
                    <Text style={styles.cardIcon}>📄</Text>
                    <Text style={styles.cardText}>Content</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Fila 2 */}
            <View style={styles.middleRow}>
              <TouchableOpacity style={styles.smallCard} onPress={handleGroupChat}>
                <View style={[styles.cardBackground, { backgroundColor: '#9b59b6' }]}>
                  <View style={styles.cardOverlay}>
                    <Text style={styles.cardIcon}>💬</Text>
                    <Text style={styles.cardText}>Group Chat</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.smallCard} onPress={handleOpenCamara}>
                <View style={[styles.cardBackground, { backgroundColor: '#ff7f50' }]}>
                  <View style={styles.cardOverlay}>
                    <Text style={styles.cardIcon}>📷</Text>
                    <Text style={styles.cardText}>Cámara</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Fila 3 */}
            <TouchableOpacity style={styles.largeCard} onPress={handleMyGroups}>
              <View style={[styles.cardBackground, { backgroundColor: '#6a0dad' }]}>
                <View style={styles.cardOverlay}>
                  <Text style={styles.cardIcon}>👥</Text>
                  <Text style={styles.cardText}>My Groups</Text>
                  <Text style={styles.cardSubtext}>Ver todos los grupos</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.floatingButton} onPress={handleBackToHome}>
            <Text style={styles.floatingButtonText}>🏠</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  headerLeft: {
    flex: 1,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
  },
  greeting: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 4,
    textShadowColor: '#ff5f6d',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  subtitle: {
    color: '#ddd',
    fontSize: 16,
    opacity: 0.9,
  },
  bellContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bellIcon: {
    fontSize: 20,
  },
  cardsContainer: {
    flex: 1,
    gap: 16,
  },
  topRow: {
    flexDirection: 'row',
    gap: 16,
    height: 120,
  },
  middleRow: {
    flexDirection: 'row',
    gap: 16,
    height: 120,
  },
  smallCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#ff5f6d',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  largeCard: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    minHeight: 200,
    elevation: 8,
    shadowColor: '#9b59b6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    padding: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardSubtext: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 4,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ff5f6d',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#ff5f6d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.7,
    shadowRadius: 14,
  },
  floatingButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default DashboardScreen;
