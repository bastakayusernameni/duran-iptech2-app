import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

import Header from './src/components/header';
import Footer from './src/components/footer';
import HomePage from './src/components/homepage';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FDE2E4"
      />

      {/* Header */}
      <Header />

      {/* Body */}
      <View style={styles.content}>
        <HomePage />
      </View>

      {/* Footer */}
      <Footer />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F5', // soft pastel cream
  },

  content: {
    flex: 1,
    backgroundColor: '#F9F7FF', // pastel lavender
  },
});