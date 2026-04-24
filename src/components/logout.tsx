import React from 'react';
import {
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';

type LogoutProps = {
  onLogout: () => void;
};

const styles = {
  button: {
    backgroundColor: '#F8D7DA',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
    alignSelf: 'center',
    marginVertical: 10,
  } as const,

  text: {
    color: '#5C5470',
    fontSize: 14,
    fontWeight: '700',
  } as const,
};

export default function Logout({
  onLogout,
}: LogoutProps) {
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => onLogout(),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handleLogout}
    >
      <Text style={styles.text}>
        Logout
      </Text>
    </TouchableOpacity>
  );
}