import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet } from 'react-native';

import Login from './src/components/login';
import Header from './src/components/header';
import HomePage from './src/components/homepage';
import Footer from './src/components/footer';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (name: string) => {
    console.log('User logged in:', name);

    setUsername(name);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('User logged out');

    setUsername('');
    setIsLoggedIn(false);
  };

  // Show Login First
  if (!isLoggedIn) {
    return (
      <Login onLoginSuccess={handleLoginSuccess} />
    );
  }

  // Show Homepage After Login
  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Logout */}
      <Header
        username={username}
        onLogout={handleLogout}
      />

      {/* Main Content */}
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
    backgroundColor: '#FFF8F5',
  },

  content: {
    flex: 1,
  },
});