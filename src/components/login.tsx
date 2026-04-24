import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import Confirmation from './confirmation';

type LoginProps = {
  onLoginSuccess: (username: string) => void;
};

const MOCK_USER = {
  username: 'duran',
  password: '123456',
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#FFF8F5',
  } as const,

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
  } as const,

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#5C5470',
    textAlign: 'center',
    marginBottom: 20,
  } as const,

  input: {
    backgroundColor: '#FCEEF5',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    marginBottom: 14,
    color: '#5C5470',
  } as const,

  errorText: {
    color: '#D9534F',
    fontSize: 13,
    fontWeight: '600',
    marginTop: -6,
    marginBottom: 12,
    marginLeft: 4,
  } as const,

  button: {
    backgroundColor: '#F8D7DA',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 6,
  } as const,

  buttonText: {
    color: '#5C5470',
    fontSize: 16,
    fontWeight: '700',
  } as const,

  hint: {
    marginTop: 14,
    textAlign: 'center',
    fontSize: 12,
    color: '#8E7C93',
  } as const,
};

export default function Login({
  onLoginSuccess,
}: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] =
    useState(false);

  const handleLogin = () => {
    const enteredUsername =
      username.trim().toLowerCase();
    const enteredPassword =
      password.trim();

    if (
      enteredUsername === MOCK_USER.username &&
      enteredPassword === MOCK_USER.password
    ) {
      console.log('Login Success:', username);

      setError('');
      setShowConfirm(true);
    } else {
      console.log(
        'Incorrect username or password'
      );

      setError(
        'Incorrect username or password'
      );
    }
  };

  const finishLogin = () => {
    setShowConfirm(false);
    onLoginSuccess(username);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          Login Portal
        </Text>

        <TextInput
          placeholder="Username"
          placeholderTextColor="#9B8CA1"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setError('');
          }}
          autoCapitalize="none"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#9B8CA1"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setError('');
          }}
          secureTextEntry
          onSubmitEditing={handleLogin}
          style={styles.input}
        />

        {error ? (
          <Text style={styles.errorText}>
            {error}
          </Text>
        ) : null}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
        >
          <Text style={styles.buttonText}>
            Login
          </Text>
        </TouchableOpacity>

        <Text style={styles.hint}>
          Mock Login: duran / 123456
        </Text>
      </View>

      <Confirmation
        visible={showConfirm}
        username={username}
        onFinish={finishLogin}
      />
    </View>
  );
}