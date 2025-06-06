# Splitwise Clone - Design Document

## Overview
A modern expense-splitting app with clean, Apple-inspired design built with React, TypeScript, and Tailwind CSS.

## Design Vision
**Apple-inspired Interface**: Clean, minimal design with plenty of white space, subtle shadows, smooth animations, and sophisticated color palette.

## Core Features

### 1. Dashboard
- Summary cards showing total owed, total owing, and net balance
- Recent activity feed with expense details
- Outstanding balances overview
- Real-time calculations and updates

### 2. Add Expense
- Intuitive expense entry form
- Group or individual expense splitting
- Category selection (Food, Transportation, etc.)
- Equal split calculation with live preview
- Form validation and error handling

### 3. Groups Management
- Create and manage expense groups
- Group statistics (total spent, expense count)
- Member management with avatars
- Group-specific expense tracking

### 4. Balances
- Clear overview of who owes what
- Net balance calculation
- Settlement tracking
- Color-coded positive/negative balances

### 5. Navigation
- Bottom tab navigation for mobile-first design
- Smooth transitions between views
- Active state indicators

## Visual Design

### Typography
- **Font Family**: Inter (Google Fonts)
- **Hierarchy**: Clear distinction between headings, body text, and captions
- **Weight**: Light to bold range for emphasis

### Color Palette
- **Primary**: Blue (#60A5FA) - Modern, trustworthy
- **Success**: Green (#10B981) - Positive balances, money owed to you
- **Danger**: Red (#EF4444) - Negative balances, money you owe
- **Background**: Light gray (#F9FAFB) - Clean, minimal
- **Cards**: White with subtle borders

### Layout
- **Grid System**: Responsive 12-column layout
- **Spacing**: Consistent 16px/24px spacing units
- **Cards**: Rounded corners (12px), subtle shadows
- **Max Width**: 1152px (6xl) for optimal reading

### Components
- **Cards**: Elevated appearance with hover effects
- **Buttons**: Rounded, with smooth hover/active states
- **Avatars**: Circular with fallback initials
- **Icons**: Lucide React for consistency
- **Forms**: Clean inputs with proper validation states

## User Experience

### Information Architecture
1. **Dashboard** - Central hub with overview
2. **Add Expense** - Quick expense entry
3. **Groups** - Manage expense groups
4. **Balances** - Settlement interface

### Interactions
- **Hover Effects**: Subtle elevation and color changes
- **Loading States**: Smooth transitions
- **Error Handling**: Inline validation messages
- **Mobile Responsive**: Touch-friendly interface

## Technical Architecture

### Frontend
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: ShadCN UI library
- **Icons**: Lucide React
- **State**: React hooks for local state
- **Data**: Mock data structure for MVP

### Data Structure
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Expense {
  id: string;
  description: string;
  amount: number;
  paidBy: User;
  splitBetween: User[];
  group?: Group;
  category: string;
  date: Date;
  splitType: 'equal' | 'exact' | 'percentage';
}
```

## Future Enhancements
- Real-time synchronization
- Push notifications
- Receipt photo uploads
- Advanced splitting options
- Payment integration
- Expense analytics
- Dark mode support

## Success Metrics
- Clean, intuitive interface
- Fast expense entry workflow
- Clear balance visibility
- Mobile-responsive design
- Smooth user interactions