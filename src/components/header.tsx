import React from 'react';
import { View, Text } from 'react-native';
import Logout from './logout';
import { styles } from './appstyle';

type HeaderProps = {
  username: string;
  onLogoutSuccess: () => void;
};

export default function Header({ username, onLogoutSuccess }: HeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerTitle}>Vault</Text>
        <Text style={styles.headerSubtitle}>Hey, {username} 👋</Text>
      </View>

      <Logout onLogoutSuccess={onLogoutSuccess} />
    </View>
  );
}