import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';

import { supabase } from './supabase';
import { useTheme } from '../context/themeContext';

type LogoutProps = {
  onLogoutSuccess: () => void;
};

export default function Logout({ onLogoutSuccess }: LogoutProps) {
  const { styles } = useTheme();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        Alert.alert('Logout Failed', error.message);
        return;
      }

      onLogoutSuccess();
    } catch (err) {
      console.log(err);
      Alert.alert('Error', 'Something went wrong while signing out.');
    }
  };

  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={handleLogout}
      activeOpacity={0.85}
    >
      <Text style={styles.logoutButtonText}>Sign Out</Text>
    </TouchableOpacity>
  );
}