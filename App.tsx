import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Header from './src/components/header';
import Footer from './src/components/footer';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Header />

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.text}>Main Content Goes Here</Text>
      </View>

      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});