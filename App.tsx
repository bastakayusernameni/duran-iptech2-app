import React from 'react';
import { SafeAreaView, ScrollView, Text, View } from 'react-native';

import Login from './src/components/login';
import Header from './src/components/header';
import BudgetCard from './src/components/budgetCard';
import CategorySummary from './src/components/categorySummary';
import AddExpenseCard from './src/components/addExpenseCard';
import SpendingChart from './src/components/spendingChart';
import TransactionList from './src/components/transactionList';

import { styles } from './src/components/appstyle';
import { useAuth } from './src/hooks/useAuth';
import { useExpenses } from './src/hooks/useExpenses';

export default function App() {
  const {
    isLoggedIn,
    username,
    handleLoginSuccess,
    handleLogoutSuccess,
  } = useAuth();

  const expenseState = useExpenses(isLoggedIn);

  const handleLogout = () => {
    expenseState.clearExpenseState();
    handleLogoutSuccess();
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Header username={username} onLogoutSuccess={handleLogout} />

          <BudgetCard expenses={expenseState.expenses} />

          <CategorySummary categoryTotals={expenseState.categoryTotals} />

          <AddExpenseCard
            description={expenseState.description}
            setDescription={expenseState.setDescription}
            amount={expenseState.amount}
            setAmount={expenseState.setAmount}
            selectedCategory={expenseState.selectedCategory}
            setSelectedCategory={expenseState.setSelectedCategory}
            addExpense={expenseState.addExpense}
            isAdding={expenseState.isAdding}
            addError={expenseState.addError}
            setAddError={expenseState.setAddError}
            addSuccess={expenseState.addSuccess}
          />

          <SpendingChart expenses={expenseState.expenses} />

          <TransactionList
            filteredExpenses={expenseState.filteredExpenses}
            filterCategory={expenseState.filterCategory}
            setFilterCategory={expenseState.setFilterCategory}
            deleteExpense={expenseState.deleteExpense}
            deletingId={expenseState.deletingId}
          />

          <View style={styles.footer}>
            <Text style={styles.footerText}>Vault · All Rights Reserved 2026</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}