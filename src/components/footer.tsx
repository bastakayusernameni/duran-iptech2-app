import React from 'react';
import { View, Text } from 'react-native';

const styles = {
  container: {
    backgroundColor: '#6200EE',
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
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  } as const,

  text: {
    color: 'white',
    fontSize: 12,
  },
} as const;

export default function Footer() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        © 2026 All Rights Reserved
      </Text>
    </View>
  );
}