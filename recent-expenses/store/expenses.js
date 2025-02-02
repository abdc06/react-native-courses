import { createSlice } from '@reduxjs/toolkit';

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2024-12-29'),
  },
  {
    id: 'e2',
    description: 'A pair of trousers',
    amount: 89.29,
    date: new Date('2025-01-30'),
  },
  {
    id: 'e3',
    description: 'Some bananas',
    amount: 5.99,
    date: new Date('2024-11-30'),
  },
  {
    id: 'e4',
    description: 'A book',
    amount: 14.99,
    date: new Date('2024-10-15'),
  },
  {
    id: 'e5',
    description: 'Another book',
    amount: 18.59,
    date: new Date('2024-10-18'),
  },
];

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: DUMMY_EXPENSES,
  reducers: {
    addExpense: (state, action) => {
      const id = Math.random().toString();
      const addItem = {
        ...action.payload,
        id: id,
      };
      state.push(addItem);
    },
    updateExpense: (state, action) => {
      const id = action.payload.id;
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === id,
      );
      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      state[updatableExpenseIndex] = updatedItem;
    },
    deleteExpense: (state, action) => {
      const id = action.payload.id;
      console.log(`DELETED_ID: ,  ${id}`);
      const deletableExpenseIndex = state.findIndex(
        (expense) => expense.id === id,
      );
      console.log(`DELETED_INDEX: ,  ${deletableExpenseIndex}`);
      state.splice(deletableExpenseIndex, 1);
      //   state.filter((expense) => expense.id !== action.payload)
    },
  },
});

export const addExpense = expensesSlice.actions.addExpense;
export const updateExpense = expensesSlice.actions.updateExpense;
export const deleteExpense = expensesSlice.actions.deleteExpense;
export default expensesSlice.reducer;
