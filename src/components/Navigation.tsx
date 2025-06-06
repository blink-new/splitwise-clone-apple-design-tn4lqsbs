import { View } from '../App';
import { cn } from '../lib/utils';
import { Home, Plus, Users, DollarSign } from 'lucide-react';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export function Navigation({ currentView, onViewChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard' as View, label: 'Home', icon: Home },
    { id: 'add-expense' as View, label: 'Add', icon: Plus },
    { id: 'groups' as View, label: 'Groups', icon: Users },
    { id: 'balances' as View, label: 'Balances', icon: DollarSign },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass-effect border-t border-white/20 backdrop-blur-xl">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-around space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={cn(
                    "relative flex flex-col items-center space-y-1 px-4 py-2 rounded-2xl transition-all duration-300 group",
                    isActive 
                      ? "bg-white/20 shadow-lg transform scale-105" 
                      : "hover:bg-white/10 hover:scale-105"
                  )}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full shadow-lg" />
                  )}
                  
                  <div className={cn(
                    "p-2 rounded-xl transition-all duration-300",
                    isActive 
                      ? "bg-gradient-to-br from-blue-500 to-purple-600 shadow-xl shadow-blue-500/30"
                      : "bg-white/10 group-hover:bg-white/20"
                  )}>
                    <Icon className={cn(
                      "h-5 w-5 transition-colors duration-300",
                      isActive ? "text-white" : "text-white/80 group-hover:text-white"
                    )} />
                  </div>
                  
                  <span className={cn(
                    "text-xs font-medium transition-all duration-300",
                    isActive 
                      ? "text-white font-semibold" 
                      : "text-white/70 group-hover:text-white/90"
                  )}>
                    {item.label}
                  </span>

                  {/* Ripple effect on tap */}
                  <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 group-active:opacity-100 transition-opacity duration-150" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}