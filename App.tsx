import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';

import Login from './src/components/login';
import Header from './src/components/header';
import BudgetCard from './src/components/budgetCard';
import CategorySummary from './src/components/categorySummary';
import AddExpenseCard from './src/components/addExpenseCard';
import SpendingChart from './src/components/spendingChart';
import TransactionList from './src/components/transactionList';
import BottomNav from './src/components/bottomNav';
import ProfileScreen from './src/components/profileScreen';

import { useAuth } from './src/hooks/useAuth';
import { useExpenses } from './src/hooks/useExpenses';
import { ThemeProvider, useTheme } from './src/context/themeContext';

type Tab = 'home' | 'add' | 'transactions' | 'profile';

function MainApp() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  const { styles } = useTheme();

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
    setActiveTab('home');
  };

  if (!isLoggedIn) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 110 }}
        >
          <Header
            username={username}
            onLogoutSuccess={handleLogout}
            onProfilePress={() => setActiveTab('profile')}
          />

          {activeTab === 'home' && (
            <>
              <BudgetCard expenses={expenseState.expenses} />

              <CategorySummary
                categoryTotals={expenseState.categoryTotals}
              />

              <SpendingChart expenses={expenseState.expenses} />
            </>
          )}

          {activeTab === 'add' && (
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
          )}

          {activeTab === 'transactions' && (
            <TransactionList
              filteredExpenses={expenseState.filteredExpenses}
              filterCategory={expenseState.filterCategory}
              setFilterCategory={expenseState.setFilterCategory}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileScreen
              username={username}
              onAccountDeleted={handleLogout}
            />
          )}
        </ScrollView>
      </SafeAreaView>

      <BottomNav
        activeTab={activeTab === 'profile' ? 'home' : activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}