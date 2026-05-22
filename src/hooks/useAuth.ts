import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../components/supabase';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleLoginSuccess = (name: string) => {
    setUsername(name);
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess = () => {
    setUsername('');
    setIsLoggedIn(false);
  };

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session?.user) {
      setUsername(session.user.email || 'User');
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUsername(session.user.email || 'User');
        setIsLoggedIn(true);
      } else {
        setUsername('');
        setIsLoggedIn(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    isLoggedIn,
    username,
    handleLoginSuccess,
    handleLogoutSuccess,
  };
}