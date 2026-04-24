import React from 'react';
import { View, Text } from 'react-native';

const styles = {
  container: {
    backgroundColor: '#F8D7DA', // same pastel pink as header
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  } as const,

  text: {
    color: '#5C5470', // same text tone as header
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.4,
  } as const,
};

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        © 2026 All Rights Reserved
      </Text>
    </View>
  );
}