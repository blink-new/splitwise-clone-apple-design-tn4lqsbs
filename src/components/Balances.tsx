import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  Send, 
  TrendingUp,
  AlertCircle,
  Users,
  CreditCard
} from 'lucide-react';
import { balances, currentUser } from '../data/mockData';
import { cn } from '../lib/utils';
import toast from 'react-hot-toast';

export function Balances() {
  const [selectedBalance, setSelectedBalance] = useState<typeof balances[0] | null>(null);
  const [isSettling, setIsSettling] = useState(false);
  const [settleAmount, setSettleAmount] = useState('');
  const [settleNote, setSettleNote] = useState('');
  const [filter, setFilter] = useState<'all' | 'owe' | 'owed'>('all');

  // Calculate summary stats
  const totalOwed = balances
    .filter(b => b.to.id === currentUser.id)
    .reduce((sum, b) => sum + b.amount, 0);
    
  const totalOwing = balances
    .filter(b => b.from.id === currentUser.id)
    .reduce((sum, b) => sum + b.amount, 0);

  const netBalance = totalOwed - totalOwing;

  // Filter balances based on selection
  const filteredBalances = balances.filter(balance => {
    if (filter === 'owe') return balance.from.id === currentUser.id;
    if (filter === 'owed') return balance.to.id === currentUser.id;
    return true;
  });

  const handleSettle = () => {
    if (!settleAmount || parseFloat(settleAmount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    const amount = parseFloat(settleAmount);
    if (amount > selectedBalance.amount) {
      toast.error('Amount cannot exceed the balance');
      return;
    }

    // Here you would handle the settlement logic
    toast.success(`Settlement of $${amount} recorded successfully!`);
    setIsSettling(false);
    setSettleAmount('');
    setSettleNote('');
    setSelectedBalance(null);
  };

  const handleRemind = (balance: typeof balances[0]) => {
    toast.success(`Reminder sent to ${balance.from.name}`);
  };

  return (
    <div className="space-y-8 pt-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="financial-heading text-4xl lg:text-5xl">
          Your Balances
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium">
          Track who owes what and settle up with ease
        </p>
      </div>

      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              <span className="text-sm font-medium">
                {balances.filter(b => b.to.id === currentUser.id).length} people
              </span>
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
              <AlertCircle className="h-3 w-3" />
              <span className="text-sm font-medium">
                {balances.filter(b => b.from.id === currentUser.id).length} people
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Net Balance</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className={cn(
              "currency-amount text-3xl mb-1",
              netBalance >= 0 ? "balance-positive" : "balance-negative"
            )}>
              {netBalance >= 0 ? '+' : '-'}${Math.abs(netBalance).toFixed(2)}
            </div>
            <p className="text-sm font-medium text-gray-600">
              {netBalance >= 0 ? 'You\'re ahead overall' : 'You\'re behind overall'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center">
        <div className="glass-effect rounded-2xl p-1">
          <div className="flex space-x-1">
            {[
              { id: 'all', label: 'All Balances', count: balances.length },
              { id: 'owed', label: 'You\'re Owed', count: balances.filter(b => b.to.id === currentUser.id).length },
              { id: 'owe', label: 'You Owe', count: balances.filter(b => b.from.id === currentUser.id).length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as 'all' | 'owe' | 'owed')}
                className={cn(
                  "px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center space-x-2",
                  filter === tab.id
                    ? "bg-white text-gray-900 shadow-lg"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                )}
              >
                <span>{tab.label}</span>
                <Badge variant="secondary" className={cn(
                  "text-xs",
                  filter === tab.id ? "bg-gray-100 text-gray-700" : "bg-white/20 text-white"
                )}>
                  {tab.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Balances List */}
      <div className="space-y-4">
        {filteredBalances.length === 0 ? (
          <Card className="expense-card">
            <CardContent className="flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="financial-heading text-xl mb-2">All settled up!</h3>
              <p className="text-gray-600 max-w-sm">
                {filter === 'all' 
                  ? 'No outstanding balances to show.'
                  : filter === 'owed'
                  ? 'Nobody owes you money right now.'
                  : 'You don\'t owe anyone money right now.'
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          filteredBalances.map((balance, index) => {
            const isOwedToMe = balance.to.id === currentUser.id;
            const person = isOwedToMe ? balance.from : balance.to;
            
            return (
              <Card key={index} className="expense-card group cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Avatar className="h-14 w-14 ring-2 ring-gray-200 group-hover:ring-blue-300 transition-colors">
                          <AvatarImage src={person.avatar} alt={person.name} />
                          <AvatarFallback className="bg-gradient-to-br from-gray-500 to-gray-600 text-white font-semibold text-lg">
                            {person.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={cn(
                          "absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center shadow-sm border-2 border-white",
                          isOwedToMe ? "bg-emerald-500" : "bg-red-500"
                        )}>
                          {isOwedToMe ? (
                            <ArrowDownLeft className="h-3 w-3 text-white" />
                          ) : (
                            <ArrowUpRight className="h-3 w-3 text-white" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h3 className="financial-heading text-xl">{person.name}</h3>
                          <Badge variant={isOwedToMe ? "default" : "destructive"} className="font-medium">
                            {isOwedToMe ? 'Owes you' : 'You owe'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mt-1">
                          {isOwedToMe 
                            ? `${person.name} owes you money`
                            : `You owe ${person.name} money`
                          }
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>3 days ago</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>From shared expenses</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-3">
                      <div>
                        <p className={cn(
                          "currency-amount text-2xl font-bold",
                          isOwedToMe ? "balance-positive" : "balance-negative"
                        )}>
                          ${balance.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500 font-medium">
                          Total amount
                        </p>
                      </div>
                      
                      <div className="flex space-x-2">
                        {isOwedToMe ? (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleRemind(balance)}
                              className="border-gray-300 hover:bg-gray-50"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Remind
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => setSelectedBalance(balance)}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Mark Paid
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="border-gray-300 hover:bg-gray-50"
                            >
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Message
                            </Button>
                            <Dialog open={isSettling} onOpenChange={setIsSettling}>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm"
                                  onClick={() => {
                                    setSelectedBalance(balance);
                                    setSettleAmount(balance.amount.toString());
                                  }}
                                  className="premium-button"
                                >
                                  <Send className="h-4 w-4 mr-2" />
                                  Settle Up
                                </Button>
                              </DialogTrigger>
                            </Dialog>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Settle Up Dialog */}
      <Dialog open={isSettling} onOpenChange={setIsSettling}>
        <DialogContent className="card-elevated border-0 max-w-md">
          <DialogHeader>
            <DialogTitle className="financial-heading text-xl">
              Settle with {selectedBalance?.to.name}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 pt-4">
            <div className="flex items-center space-x-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
              <Avatar className="h-12 w-12">
                <AvatarImage src={selectedBalance?.to.avatar} alt={selectedBalance?.to.name} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
                  {selectedBalance?.to.name.split(' ').map((n: string) => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-gray-900">{selectedBalance?.to.name}</p>
                <p className="text-sm text-gray-600">
                  You owe: ${selectedBalance?.amount.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="settleAmount">Amount to settle</Label>
                <Input
                  id="settleAmount"
                  type="number"
                  placeholder="0.00"
                  value={settleAmount}
                  onChange={(e) => setSettleAmount(e.target.value)}
                  className="text-lg font-semibold"
                />
                <p className="text-sm text-gray-500">
                  Maximum: ${selectedBalance?.amount.toFixed(2)}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="settleNote">Note (optional)</Label>
                <Textarea
                  id="settleNote"
                  placeholder="Add a note about this payment..."
                  value={settleNote}
                  onChange={(e) => setSettleNote(e.target.value)}
                  rows={3}
                />
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsSettling(false)} 
                className="flex-1"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSettle} 
                className="premium-button flex-1"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Record Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}