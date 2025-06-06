import { User, Group, Expense, Balance } from '../types';

export const currentUser: User = {
  id: '1',
  name: 'You',
  email: 'you@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
};

export const users: User[] = [
  currentUser,
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: '4',
    name: 'Emma',
    email: 'emma@example.com',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
  }
];

export const groups: Group[] = [
  {
    id: '1',
    name: 'Roommates',
    members: [users[0], users[1], users[2]],
    createdAt: new Date('2024-01-15')
  },
  {
    id: '2',
    name: 'Weekend Trip',
    members: [users[0], users[1], users[3]],
    createdAt: new Date('2024-01-20')
  }
];

export const expenses: Expense[] = [
  {
    id: '1',
    description: 'Groceries',
    amount: 84.50,
    paidBy: users[0],
    splitBetween: [users[0], users[1], users[2]],
    group: groups[0],
    category: 'Food',
    date: new Date('2024-01-25'),
    splitType: 'equal'
  },
  {
    id: '2',
    description: 'Dinner at Restaurant',
    amount: 120.00,
    paidBy: users[1],
    splitBetween: [users[0], users[1], users[3]],
    group: groups[1],
    category: 'Food',
    date: new Date('2024-01-24'),
    splitType: 'equal'
  },
  {
    id: '3',
    description: 'Gas for Road Trip',
    amount: 75.00,
    paidBy: users[0],
    splitBetween: [users[0], users[1], users[3]],
    group: groups[1],
    category: 'Transportation',
    date: new Date('2024-01-23'),
    splitType: 'equal'
  },
  {
    id: '4',
    description: 'Internet Bill',
    amount: 60.00,
    paidBy: users[2],
    splitBetween: [users[0], users[1], users[2]],
    group: groups[0],
    category: 'Utilities',
    date: new Date('2024-01-22'),
    splitType: 'equal'
  }
];

export const balances: Balance[] = [
  {
    from: users[1],
    to: users[0],
    amount: 28.17
  },
  {
    from: users[0],
    to: users[1],
    amount: 40.00
  },
  {
    from: users[3],
    to: users[0],
    amount: 25.00
  },
  {
    from: users[0],
    to: users[2],
    amount: 20.00
  }
];