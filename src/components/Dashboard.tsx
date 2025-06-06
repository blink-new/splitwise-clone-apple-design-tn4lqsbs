import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowUpRight, ArrowDownLeft, Calendar, DollarSign, TrendingUp, TrendingDown, Clock, ChevronRight } from 'lucide-react';
import { expenses, balances, currentUser } from '../data/mockData';
import { cn } from '../lib/utils';

export function Dashboard() {
  // Calculate summary stats
  const totalOwed = balances
    .filter(b => b.to.id === currentUser.id)
    .reduce((sum, b) => sum + b.amount, 0);
    
  const totalOwing = balances
    .filter(b => b.from.id === currentUser.id)
    .reduce((sum, b) => sum + b.amount, 0);

  const netBalance = totalOwed - totalOwing;
  
  const recentExpenses = expenses
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5);

  const monthlyTotal = expenses
    .filter(e => e.date.getMonth() === new Date().getMonth())
    .reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="space-y-8 pt-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h2 className="financial-heading text-4xl lg:text-5xl">
          Your Financial Overview
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium">
          Track, split, and settle expenses with precision. Take control of your shared finances.
        </p>
      </div>

      {/* Enhanced Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="stat-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">You are owed</CardTitle>
            <div className="p-2 bg-emerald-100 rounded-lg">
              <ArrowDownLeft className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="currency-amount text-3xl balance-positive mb-1">
              ${totalOwed.toFixed(2)}
            </div>
            <div className="flex items-center space-x-1 text-emerald-600">
              <TrendingUp className="h-3 w-3" />
              <span className="text-sm font-medium">+12% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">You owe</CardTitle>
            <div className="p-2 bg-red-100 rounded-lg">
              <ArrowUpRight className="h-4 w-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="currency-amount text-3xl balance-negative mb-1">
              ${totalOwing.toFixed(2)}
            </div>
            <div className="flex items-center space-x-1 text-red-500">
              <TrendingDown className="h-3 w-3" />
              <span className="text-sm font-medium">-8% from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Net Balance</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={cn(
              "currency-amount text-3xl mb-1",
              netBalance >= 0 ? "balance-positive" : "balance-negative"
            )}>
              ${Math.abs(netBalance).toFixed(2)}
            </div>
            <p className="text-sm font-medium text-gray-600">
              {netBalance >= 0 ? 'You\'re ahead overall' : 'You\'re behind overall'}
            </p>
          </CardContent>
        </Card>

        <Card className="stat-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Monthly Total</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="currency-amount text-3xl text-purple-600 mb-1">
              ${monthlyTotal.toFixed(2)}
            </div>
            <p className="text-sm font-medium text-gray-600">
              Across {expenses.filter(e => e.date.getMonth() === new Date().getMonth()).length} expenses
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="expense-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="financial-heading text-2xl">Recent Activity</CardTitle>
              <p className="text-gray-600 mt-1">Latest expense transactions</p>
            </div>
            <Button variant="ghost" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              View all
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentExpenses.map((expense) => (
            <div
              key={expense.id}
              className="flex items-center space-x-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <span className="text-white font-bold text-sm">
                  {expense.category[0]}
                </span>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-900 truncate text-lg">
                  {expense.description}
                </p>
                <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{expense.date.toLocaleDateString()}</span>
                  </div>
                  <span>•</span>
                  <span>Paid by {expense.paidBy.name}</span>
                  <Badge variant="secondary" className="ml-2">
                    {expense.category}
                  </Badge>
                </div>
              </div>
              
              <div className="text-right">
                <p className="currency-amount text-xl font-bold text-gray-900">
                  ${expense.amount.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 font-medium">
                  ${(expense.amount / expense.splitBetween.length).toFixed(2)} per person
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Outstanding Balances */}
      <Card className="expense-card">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="financial-heading text-2xl">Outstanding Balances</CardTitle>
              <p className="text-gray-600 mt-1">Pending settlements</p>
            </div>
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
              <Clock className="h-4 w-4 mr-2" />
              Settle All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {balances.slice(0, 4).map((balance, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10 ring-2 ring-gray-200 group-hover:ring-blue-300 transition-colors">
                  <AvatarImage src={balance.from.avatar} alt={balance.from.name} />
                  <AvatarFallback className="bg-gradient-to-br from-gray-500 to-gray-600 text-white font-semibold">
                    {balance.from.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">
                    {balance.from.name} owes {balance.to.name}
                  </p>
                  <p className="text-sm text-gray-500">From recent expenses</p>
                </div>
              </div>
              <div className="text-right">
                <p className="currency-amount text-lg font-bold balance-negative">
                  ${balance.amount.toFixed(2)}
                </p>
                <Button size="sm" variant="outline" className="mt-1 text-xs">
                  Remind
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}