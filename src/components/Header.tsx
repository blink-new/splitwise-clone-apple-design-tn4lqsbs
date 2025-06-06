import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Bell, CreditCard, TrendingUp } from 'lucide-react';
import { currentUser } from '../data/mockData';

export function Header() {
  return (
    <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm"></div>
            </div>
            <div>
              <h1 className="financial-heading text-2xl">SplitPay</h1>
              <p className="text-white/70 text-sm font-medium">Smart Expense Splitting</p>
            </div>
          </div>

          {/* Stats Preview */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center space-x-1 text-white/90">
                <TrendingUp className="h-4 w-4" />
                <span className="currency-amount text-lg">$2,847</span>
              </div>
              <p className="text-white/60 text-xs font-medium">Monthly Savings</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div className="text-center">
              <div className="currency-amount text-lg text-emerald-400">+$426</div>
              <p className="text-white/60 text-xs font-medium">Net Balance</p>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10 relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 hover:bg-red-500 text-white text-xs">
                3
              </Badge>
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="font-semibold text-white text-sm">{currentUser.name}</p>
                <p className="text-white/60 text-xs">{currentUser.email}</p>
              </div>
              <Avatar className="h-10 w-10 ring-2 ring-white/20 ring-offset-2 ring-offset-transparent">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {currentUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}