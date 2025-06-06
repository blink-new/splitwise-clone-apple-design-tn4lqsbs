import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from './components/Dashboard';
import { AddExpense } from './components/AddExpense';
import { Groups } from './components/Groups';
import { Balances } from './components/Balances';
import { Navigation } from './components/Navigation';
import { Header } from './components/Header';

export type View = 'dashboard' | 'add-expense' | 'groups' | 'balances';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'add-expense':
        return <AddExpense onBack={() => setCurrentView('dashboard')} />;
      case 'groups':
        return <Groups />;
      case 'balances':
        return <Balances />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-6xl mx-auto px-4 pb-24">
        {renderView()}
      </main>

      <Navigation currentView={currentView} onViewChange={setCurrentView} />
      
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(12px)',
            color: '#1f2937',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            fontSize: '14px',
            fontWeight: '500',
          },
        }}
      />
    </div>
  );
}

export default App;