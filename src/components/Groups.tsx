import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Users, Plus, Calendar, DollarSign, Settings, MoreHorizontal, Star, TrendingUp } from 'lucide-react';
import { groups, expenses } from '../data/mockData';
import toast from 'react-hot-toast';

export function Groups() {
  const [isCreating, setIsCreating] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const getGroupExpenseTotal = (groupId: string) => {
    return expenses
      .filter(expense => expense.group?.id === groupId)
      .reduce((sum, expense) => sum + expense.amount, 0);
  };

  const getGroupExpenseCount = (groupId: string) => {
    return expenses.filter(expense => expense.group?.id === groupId).length;
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) {
      toast.error('Please enter a group name');
      return;
    }
    
    // Here you would create the group in your data store
    toast.success(`Group "${newGroupName}" created successfully!`);
    setNewGroupName('');
    setIsCreating(false);
  };

  return (
    <div className="space-y-8 pt-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="financial-heading text-4xl lg:text-5xl">
          Your Groups
        </h2>
        <p className="text-white/80 text-lg max-w-2xl mx-auto font-medium">
          Organize expenses with friends, family, and colleagues
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="stat-card border-0">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Groups</p>
              <p className="currency-amount text-2xl text-blue-600">{groups.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card border-0">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-green-100 rounded-xl">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Spent</p>
              <p className="currency-amount text-2xl text-green-600">
                ${groups.reduce((sum, group) => sum + getGroupExpenseTotal(group.id), 0).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="stat-card border-0">
          <CardContent className="flex items-center space-x-4 p-6">
            <div className="p-3 bg-purple-100 rounded-xl">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Active Groups</p>
              <p className="currency-amount text-2xl text-purple-600">
                {groups.filter(g => getGroupExpenseCount(g.id) > 0).length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="premium-button text-lg px-8 py-4">
              <Plus className="h-5 w-5 mr-2" />
              Create New Group
            </Button>
          </DialogTrigger>
          <DialogContent className="card-elevated border-0 max-w-md">
            <DialogHeader>
              <DialogTitle className="financial-heading text-xl">Create New Group</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="groupName">Group Name</Label>
                <Input
                  id="groupName"
                  placeholder="e.g., Weekend Trip, Roommates..."
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="text-base"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <Button variant="outline" onClick={() => setIsCreating(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleCreateGroup} className="premium-button flex-1">
                  Create Group
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Groups Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => {
          const totalExpenses = getGroupExpenseTotal(group.id);
          const expenseCount = getGroupExpenseCount(group.id);
          const isActive = expenseCount > 0;
          
          return (
            <Card key={group.id} className="expense-card group cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Users className="h-7 w-7 text-white" />
                      </div>
                      {isActive && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white shadow-sm">
                          <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <CardTitle className="financial-heading text-lg">{group.name}</CardTitle>
                        {totalExpenses > 500 && <Star className="h-4 w-4 text-yellow-500" />}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Calendar className="h-3 w-3 text-gray-500" />
                        <span className="text-sm text-gray-500">
                          Created {group.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between mt-4">
                  <Badge variant={isActive ? "default" : "secondary"} className="font-medium">
                    {group.members.length} members
                  </Badge>
                  {isActive && (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                      Active
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Group Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <div className="flex items-center justify-center space-x-1 text-blue-600 mb-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-xs font-semibold uppercase tracking-wide">Total Spent</span>
                    </div>
                    <p className="currency-amount text-xl font-bold text-blue-700">
                      ${totalExpenses.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                    <div className="flex items-center justify-center space-x-1 text-purple-600 mb-2">
                      <span className="text-xs font-semibold uppercase tracking-wide">Expenses</span>
                    </div>
                    <p className="currency-amount text-xl font-bold text-purple-700">
                      {expenseCount}
                    </p>
                  </div>
                </div>

                {/* Group Members */}
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    Members
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 4).map((member, index) => (
                        <Avatar key={member.id} className="h-8 w-8 border-2 border-white shadow-sm" style={{ zIndex: 10 - index }}>
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="bg-gradient-to-br from-gray-400 to-gray-600 text-white text-xs font-semibold">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {group.members.length > 4 && (
                        <div className="h-8 w-8 border-2 border-white shadow-sm rounded-full bg-gray-100 flex items-center justify-center z-0">
                          <span className="text-xs font-semibold text-gray-600">
                            +{group.members.length - 4}
                          </span>
                        </div>
                      )}
                    </div>
                    {totalExpenses > 0 && (
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Avg per person</p>
                        <p className="text-sm font-semibold text-gray-900">
                          ${(totalExpenses / group.members.length).toFixed(2)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1 border-gray-300 hover:bg-gray-50">
                    <Settings className="h-4 w-4 mr-1" />
                    Manage
                  </Button>
                  <Button size="sm" className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Expense
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}

        {/* Create New Group Card */}
        <Card className="expense-card border-dashed border-2 border-gray-300 hover:border-purple-400 transition-all duration-300 cursor-pointer group">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl flex items-center justify-center mb-4 group-hover:shadow-lg transition-shadow">
              <Plus className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="financial-heading text-xl mb-2">Create New Group</h3>
            <p className="text-gray-600 mb-4 max-w-sm leading-relaxed">
              Start organizing expenses with friends, family, or colleagues
            </p>
            <Button 
              onClick={() => setIsCreating(true)}
              className="premium-button"
            >
              Get Started
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}