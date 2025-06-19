import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HistorialEvidencias({ route }) {
  const { historial } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent barStyle="light-content" backgroundColor="transparent" />
      <LinearGradient
        colors={['#ff5f6d', '#8434f5', '#000']}
        locations={[0, 0.4, 0.8]}
        style={styles.gradient}
      >
        <View style={styles.topSection}>
          <Text style={styles.brand}>Historial de Evidencias</Text>
          
          <FlatList
            data={historial}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.listContainer}
            ListEmptyComponent={<Text style={styles.emptyText}>No hay evidencias aún</Text>}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.uri }} style={styles.image} />
                <Text style={styles.date}>{item.fecha}</Text>
              </View>
            )}
          />
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
    marginTop: 40,
    paddingHorizontal: 10,
  },
  brand: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '900',
    textShadowColor: '#ff5f6d',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
    marginBottom: 28,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 40,
  },
  item: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#fff',
  },
  date: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    textShadowColor: '#8434f5',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 8,
  },
  emptyText: {
    color: '#ddd',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 40,
  },
});
