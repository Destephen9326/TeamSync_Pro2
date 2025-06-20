import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
  Button,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Grupo } from '../models/Grupo';

type RootStackParamList = {
  Home: { nuevoGrupo?: { nombre: string; grupo: string } } | undefined;
  CreateGroup: undefined;
  Dashboard: { grupoId: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<Props> = ({ navigation, route }) => {
  const usuarioActual = 'Yisel'; // Simulación de usuario actual

  const [seguidores] = useState([
    'Yisel',
    'Stephen',
    'Luis',
    'Alex',
    'Juana',
    'Bernardo',
  ]);
  const [grupos, setGrupos] = useState<Grupo[]>([
    { nombre: 'Desarrollo II', grupo: 'Grupo 1', miembros: [], creador: 'Yisel' },
    { nombre: 'Base de Datos I', grupo: 'Grupo 2', miembros: [], creador: 'Luis' },
    { nombre: 'Desarrollo Web II', grupo: 'Grupo 3', miembros: [], creador: 'Alex' },
    { nombre: 'DevOps', grupo: 'Grupo 4', miembros: [], creador: 'Yisel' },
    { nombre: 'DevOps II', grupo: 'Grupo 5', miembros: [], creador: 'Stephen' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [grupoUnirse, setGrupoUnirse] = useState('');

  useEffect(() => {
    if (route.params && route.params.nuevoGrupo) {
      setGrupos((prev) => [
        ...prev,
        {
          nombre: route.params?.nuevoGrupo?.nombre ?? '',
          grupo: route.params?.nuevoGrupo?.grupo ?? '',
          miembros: [],
          creador: usuarioActual, // asigna el creador actual
        },
      ]);
    }
  }, [route.params?.nuevoGrupo]);

  const handleJoinGeneral = () => {
    setModalVisible(true);
  };

  const handleJoinGroup = (grupoNombre: string) => {
    setGrupos((prev) =>
      prev.map((g) => {
        if (g.nombre === grupoNombre) {
          if (!g.miembros.includes(usuarioActual)) {
            return { ...g, miembros: [...g.miembros, usuarioActual] };
          }
        }
        return g;
      })
    );
    alert(`¡${usuarioActual} se ha unido al grupo ${grupoNombre}!`);
  };

  const handleSubmitJoin = () => {
    if (grupoUnirse.trim() === '') {
      alert('Por favor ingresa el nombre del grupo');
      return;
    }

    // Buscamos el grupo por nombre y añadimos el usuario
    let grupoEncontrado = false;
    setGrupos((prev) =>
      prev.map((g) => {
        if (g.nombre.toLowerCase() === grupoUnirse.trim().toLowerCase()) {
          grupoEncontrado = true;
          if (!g.miembros.includes(usuarioActual)) {
            alert(`¡${usuarioActual} se ha unido al grupo ${g.nombre}!`);
            return { ...g, miembros: [...g.miembros, usuarioActual] };
          } else {
            alert(`Ya estás en el grupo ${g.nombre}`);
          }
        }
        return g;
      })
    );

    if (!grupoEncontrado) {
      alert(`No se encontró el grupo: ${grupoUnirse}`);
    }

    setGrupoUnirse('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <LinearGradient
        colors={['#ff5f6d', '#8434f5', '#000']}
        locations={[0, 0.4, 0.8]}
        style={styles.gradient}
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}>
          <Text style={styles.title}>Seguidos</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.followScroll}
          >
            {seguidores.map((nombre, idx) => {
              const esUsuarioActual = nombre === usuarioActual;
              return (
                <View key={idx} style={styles.avatarContainer}>
                  <View
                    style={[
                      styles.avatarCircle,
                      esUsuarioActual && styles.avatarCircleActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.avatarInitial,
                        esUsuarioActual && styles.avatarInitialActive,
                      ]}
                    >
                      {nombre.charAt(0)}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.avatarName,
                      esUsuarioActual && styles.avatarNameActive,
                    ]}
                  >
                    {nombre}
                  </Text>
                </View>
              );
            })}
          </ScrollView>

          <View style={styles.inviteBox}>
            <View style={{ flex: 1 }}>
              <Text style={styles.inviteText}>
                Puedes unirte a un equipo de tu clase o crear uno propio.
              </Text>
              <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.navigate('CreateGroup')}
              >
                <Text style={styles.createText}>Crear</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.joinInvite} onPress={handleJoinGeneral}>
              <Text style={styles.joinInviteText}>Unirme</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Nuevos grupos</Text>
          {grupos.map((grupo, idx) => (
            <View key={idx} style={styles.groupItem}>
              <View style={styles.groupInfo}>
                <Text style={styles.groupTitle}>{grupo.nombre}</Text>
                <Text style={styles.groupSub}>{grupo.grupo}</Text>
                <Text style={styles.miembrosText}>
                  Miembros: {grupo.miembros.length ? grupo.miembros.join(', ') : 'Ninguno'}
                </Text>
              </View>
              <View style={styles.groupButtons}>
                <TouchableOpacity
                  style={styles.joinButton}
                  onPress={() => handleJoinGroup(grupo.nombre)}
                >
                  <Text style={styles.joinText}>Me uno</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={styles.kanbanButton}
                  onPress={() => navigation.navigate('Dashboard', { grupoId: grupo.nombre })}
                >
                  <Text style={styles.kanbanText}>Kanban</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>

        <Modal
          animationType="slide"
          transparent
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Unirse a un grupo</Text>
              <TextInput
                style={styles.modalInput}
                placeholder="Nombre del grupo"
                value={grupoUnirse}
                onChangeText={setGrupoUnirse}
              />
              <View style={styles.modalButtons}>
                <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                <Button title="Unirme" onPress={handleSubmitJoin} />
              </View>
            </View>
          </View>
        </Modal>
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
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  followScroll: {
    marginBottom: 30,
  },
  avatarContainer: {
    alignItems: 'center',
    marginRight: 16,
  },
  avatarCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#ff5f6d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarCircleActive: {
    backgroundColor: '#9b59b6',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatarInitial: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  avatarInitialActive: {
    color: '#000',
  },
  avatarName: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  avatarNameActive: {
    color: '#00FF00',
    fontWeight: 'bold',
  },
  inviteBox: {
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 20,
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#ff5f6d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  inviteText: {
    color: '#000',
    fontSize: 14,
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: '#ff5f6d',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  createText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  joinInvite: {
    backgroundColor: '#000',
    borderRadius: 30,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginLeft: 12,
  },
  joinInviteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  groupItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
     backgroundColor: '#2a1a47',
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ff5f6d',
    shadowColor: '#ff5f6d',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  groupInfo: {
    flex: 1,
  },
  groupTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  groupSub: {
    color: '#aaa',
    fontSize: 12,
  },
  miembrosText: {
    color: '#ccc',
    fontSize: 12,
    marginTop: 6,
    fontStyle: 'italic',
  },
  groupButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: '#ff5f6d',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginRight: 8,
  },
  joinText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  kanbanButton: {
    backgroundColor: '#9b59b6',
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 8,
  },
  kanbanText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    width: '80%',
    shadowColor: '#ff5f6d',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 2,
    borderColor: '#ff5f6d',
    borderRadius: 15,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
