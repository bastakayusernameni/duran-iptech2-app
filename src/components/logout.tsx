import React from 'react';
import {
  TouchableOpacity,
  Text,
  Alert,
  Platform,
} from 'react-native';

import { supabase } from './supabase';
import { useTheme } from '../context/themeContext';

type LogoutProps = {
  onLogoutSuccess: () => void;
};

export default function Logout({
  onLogoutSuccess,
}: LogoutProps) {
  const { styles } = useTheme();

  const performLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        if (Platform.OS === 'web') {
          window.alert(error.message);
        } else {
          Alert.alert('Logout Failed', error.message);
        }
        return;
      }

      onLogoutSuccess();
    } catch (err) {
      console.log(err);

      if (Platform.OS === 'web') {
        window.alert(
          'Something went wrong while signing out.'
        );
      } else {
        Alert.alert(
          'Error',
          'Something went wrong while signing out.'
        );
      }
    }
  };

  const handleLogout = () => {
    if (Platform.OS === 'web') {
      const confirmed = window.confirm(
        'Are you sure you want to sign out?'
      );

      if (confirmed) {
        performLogout();
      }

      return;
    }

    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: performLogout,
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableOpacity
      style={styles.logoutButton}
      onPress={handleLogout}
      activeOpacity={0.85}
    >
      <Text style={styles.logoutButtonText}>
        Sign Out
      </Text>
    </TouchableOpacity>
  );
}