import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert } from 'react-native';
import { supabase } from '../components/supabase';
import { Category, CATEGORIES, Expense } from '../types/expense';

export function useExpenses(isLoggedIn: boolean) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('Other');

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filterCategory, setFilterCategory] = useState<Category | 'All'>('All');

  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const successTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchExpenses = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('user_id', user.id)
      .order('id', { ascending: false });

    if (error) {
      console.log('Fetch error:', error.message);
      return;
    }

    if (data) {
      const formatted: Expense[] = data.map((item: any) => ({
        id: item.id.toString(),
        description: item.description,
        amount: Number(item.amount),
        date: new Date(item.created_at ?? Date.now()),
        category: (item.category as Category) ?? 'Other',
      }));

      setExpenses(formatted);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchExpenses();
    } else {
      setExpenses([]);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    return () => {
      if (successTimer.current) {
        clearTimeout(successTimer.current);
      }
    };
  }, []);

  const addExpense = async () => {
    if (isAdding) return;

    setAddError('');
    setAddSuccess(false);

    const trimmedDesc = description.trim();
    const parsedAmount = parseFloat(amount);

    if (!trimmedDesc) {
      setAddError('Please enter a description.');
      return;
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setAddError('Please enter a valid amount.');
      return;
    }

    setIsAdding(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setAddError('User not authenticated.');
      setIsAdding(false);
      return;
    }

    const { data, error } = await supabase
      .from('expenses')
      .insert([
        {
          description: trimmedDesc,
          amount: parsedAmount,
          category: selectedCategory,
          user_id: user.id,
        },
      ])
      .select()
      .single();

    setIsAdding(false);

    if (error) {
      setAddError(error.message);
      return;
    }

    const newExpense: Expense = {
      id: data.id.toString(),
      description: data.description,
      amount: Number(data.amount),
      date: new Date(data.created_at ?? Date.now()),
      category: data.category ?? 'Other',
    };

    setExpenses((prev) => [newExpense, ...prev]);
    setDescription('');
    setAmount('');
    setSelectedCategory('Other');
    setAddSuccess(true);

    if (successTimer.current) clearTimeout(successTimer.current);

    successTimer.current = setTimeout(() => {
      setAddSuccess(false);
    }, 2500);
  };

  const deleteExpense = (id: string) => {
    Alert.alert('Delete Expense', 'Remove this transaction permanently?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setDeletingId(id);

          const { error } = await supabase
            .from('expenses')
            .delete()
            .eq('id', Number(id));

          if (error) {
            Alert.alert('Error', error.message);
            setDeletingId(null);
            return;
          }

          setExpenses((prev) => prev.filter((e) => e.id !== id));
          setDeletingId(null);
        },
      },
    ]);
  };

  const filteredExpenses = useMemo(() => {
    if (filterCategory === 'All') return expenses;
    return expenses.filter((e) => e.category === filterCategory);
  }, [expenses, filterCategory]);

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};

    CATEGORIES.forEach((c) => {
      totals[c] = 0;
    });

    expenses.forEach((e) => {
      totals[e.category] += e.amount;
    });

    return totals;
  }, [expenses]);

  const clearExpenseState = () => {
    setExpenses([]);
    setDescription('');
    setAmount('');
    setSelectedCategory('Other');
    setFilterCategory('All');
    setAddError('');
    setAddSuccess(false);
  };

  return {
    description,
    setDescription,
    amount,
    setAmount,
    selectedCategory,
    setSelectedCategory,
    expenses,
    filteredExpenses,
    categoryTotals,
    filterCategory,
    setFilterCategory,
    isAdding,
    addError,
    setAddError,
    addSuccess,
    deletingId,
    addExpense,
    deleteExpense,
    clearExpenseState,
  };
}