export type Category =
  | 'Food'
  | 'Transport'
  | 'Shopping'
  | 'Bills'
  | 'Health'
  | 'Other';

export type Expense = {
  id: string;
  description: string;
  amount: number;
  date: Date;
  category: Category;
};

export const CATEGORIES: Category[] = [
  'Food',
  'Transport',
  'Shopping',
  'Bills',
  'Health',
  'Other',
];

export const CATEGORY_ICONS: Record<Category, string> = {
  Food: '🍜',
  Transport: '🚗',
  Shopping: '🛍️',
  Bills: '📄',
  Health: '💊',
  Other: '📌',
};