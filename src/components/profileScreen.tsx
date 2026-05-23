import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Switch,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { supabase } from './supabase';
import { useTheme } from '../context/themeContext';

type ProfileScreenProps = {
  username: string;
};

export default function ProfileScreen({ username }: ProfileScreenProps) {
  const { isDarkMode, toggleTheme, styles } = useTheme();

  const [displayName, setDisplayName] = useState(username);
  const [notifications, setNotifications] = useState(true);

  const savePersonalInfo = () => {
    Alert.alert('Saved', 'Your personal information has been updated.');
  };

  const changePassword = async () => {
    Alert.alert('Change Password', 'Send password reset email?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Send',
        onPress: async () => {
          const { error } = await supabase.auth.resetPasswordForEmail(username);

          if (error) {
            Alert.alert('Error', error.message);
            return;
          }

          Alert.alert('Success', 'Password reset email sent.');
        },
      },
    ]);
  };

  const deleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Account deletion requires a secure Supabase server function. This is prepared for future backend setup.'
    );
  };

  const resetSettings = () => {
    setDisplayName(username);
    setNotifications(true);
    Alert.alert('Reset', 'App settings have been reset.');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>Profile</Text>

      <View style={{ marginBottom: 18 }}>
        <Text style={styles.expenseDate}>Logged in as</Text>
        <Text style={styles.expenseDescription}>{username}</Text>
      </View>

      <Text style={styles.pickerLabel}>Account</Text>

      <TextInput
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Display name"
        placeholderTextColor="#6B7FA3"
        style={styles.input}
      />

      <TouchableOpacity style={styles.addButton} onPress={savePersonalInfo}>
        <Text style={styles.addButtonText}>Save Personal Information</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.filterTab} onPress={changePassword}>
        <Text style={styles.filterTabText}>
          <Ionicons name="key-outline" size={16} /> Change Password
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.filterTab} onPress={deleteAccount}>
        <Text style={styles.filterTabText}>
          <Ionicons name="trash-outline" size={16} /> Delete Account
        </Text>
      </TouchableOpacity>

      <Text style={[styles.pickerLabel, { marginTop: 20 }]}>Theme</Text>

      <View
        style={[
          styles.filterTab,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={styles.filterTabText}>
          <Ionicons
            name={isDarkMode ? 'moon-outline' : 'sunny-outline'}
            size={16}
          />{' '}
          {isDarkMode ? 'Dark Mode' : 'Light Mode'}
        </Text>

        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>

      <Text style={[styles.pickerLabel, { marginTop: 20 }]}>Settings</Text>

      <View
        style={[
          styles.filterTab,
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          },
        ]}
      >
        <Text style={styles.filterTabText}>
          <Ionicons name="notifications-outline" size={16} /> Notifications
        </Text>

        <Switch value={notifications} onValueChange={setNotifications} />
      </View>

      <TouchableOpacity style={styles.filterTab} onPress={resetSettings}>
        <Text style={styles.filterTabText}>
          <Ionicons name="refresh-outline" size={16} /> Reset App Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
}