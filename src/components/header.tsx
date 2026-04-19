import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';

const styles = {
  container: {
    backgroundColor: '#6200EE',
    paddingTop: StatusBar.currentHeight ?? 0,
    paddingBottom: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  } as const,

  content: {
    flex: 1,
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },

  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
    flexShrink: 1,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
  },

  searchIcon: {
    color: 'white',
    fontSize: 18,
    marginRight: 8,
  },

  searchInput: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    paddingVertical: 0,
  },
} as const;

export default function Header() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={{ height: StatusBar.currentHeight ?? 0 }} />
      <View style={styles.content}>
        <View style={styles.headerContent}>
          <Text style={styles.title} numberOfLines={1}>
            Hello Duran
          </Text>
          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="rgba(255,255,255,0.7)"
              value={searchValue}
              onChangeText={setSearchValue}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
