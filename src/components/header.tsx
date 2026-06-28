import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Logout from './logout';
import { useTheme } from '../context/themeContext';

type HeaderProps = {
  username: string;
  onLogoutSuccess: () => void;
  onProfilePress: () => void;
};

export default function Header({
  username,
  onLogoutSuccess,
  onProfilePress,
}: HeaderProps) {
  const { styles, isDarkMode } = useTheme();

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>VAULT</Text>
        <Text style={styles.headerSubtitle}>Hello, {username}!</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Logout onLogoutSuccess={onLogoutSuccess} />

        <TouchableOpacity
          onPress={onProfilePress}
          activeOpacity={0.7}
          style={{
            width: 44,
            height: 44,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Ionicons
            name="person-outline"
            size={28}
            color={isDarkMode ? '#C8A55A' : '#B78B2E'}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}