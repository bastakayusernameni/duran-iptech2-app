import React, { useState } from 'react';
import { View, Text, TextInput, StatusBar } from 'react-native';

const styles = {
  container: {
    backgroundColor: '#F8D7DA', // pastel pink
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
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  } as const,

  content: {
    flex: 1,
  } as const,

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  } as const,

  title: {
    color: '#5C5470',
    fontSize: 20,
    fontWeight: '700',
    flexShrink: 1,
  } as const,

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FCEEF5',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flex: 1,
  } as const,

  searchIcon: {
    color: '#8E7C93',
    fontSize: 18,
    marginRight: 8,
  } as const,

  searchInput: {
    flex: 1,
    color: '#5C5470',
    fontSize: 16,
    paddingVertical: 0,
  } as const,
};

export default function Header() {
  const [searchValue, setSearchValue] = useState('');

  return (
    <View style={styles.container}>
      <View style={{ height: StatusBar.currentHeight ?? 0 }} />

      <View style={styles.content}>
        <View style={styles.headerContent}>
          <Text style={styles.title} numberOfLines={1}>
            Hello Angelica!
          </Text>

          <View style={styles.searchContainer}>
            <Text style={styles.searchIcon}>🔍</Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#9B8CA1"
              value={searchValue}
              onChangeText={setSearchValue}
            />
          </View>
        </View>
      </View>
    </View>
  );
}