import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

type HeaderProps = {
  username: string;
  onLogout: () => void;
};

const styles = {
  container: {
    backgroundColor: '#F8D7DA',
    paddingTop: (StatusBar.currentHeight ?? 0) + 10,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  } as const,

  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  } as const,

  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#5C5470',
    flex: 1,
  } as const,

  logoutButton: {
    backgroundColor: '#FCEEF5',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    marginLeft: 12,
  } as const,

  logoutText: {
    color: '#5C5470',
    fontSize: 13,
    fontWeight: '700',
  } as const,

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCEEF5',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  } as const,

  searchIcon: {
    fontSize: 16,
    marginRight: 8,
    color: '#8E7C93',
  } as const,

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#5C5470',
    paddingVertical: 0,
  } as const,
};

export default function Header({
  username,
  onLogout,
}: HeaderProps) {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <Text style={styles.title}>
          Hello {username}!
        </Text>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={onLogout}
        >
          <Text style={styles.logoutText}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Text style={styles.searchIcon}>🔍</Text>

        <TextInput
          placeholder="Search..."
          placeholderTextColor="#9B8CA1"
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>
    </View>
  );
}