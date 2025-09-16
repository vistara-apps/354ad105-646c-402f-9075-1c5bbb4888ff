'use client';

import { useState } from 'react';
import { Plus, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { mockTransactions, mockProjects } from '../lib/mockData';
import { formatCurrency, formatDate } from '../lib/utils';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { AddTransactionModal } from './AddTransactionModal';

export function IncomeTracker() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactions] = useState(mockTransactions);
  const [projects] = useState(mockProjects);

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netIncome = totalIncome - totalExpenses;

  const activeProjects = projects.filter(p => p.status === 'active');

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Income Tracker</h2>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Entry
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Income</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(totalIncome)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Expenses</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(totalExpenses)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted">Net Income</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(netIncome)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Active Projects */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Active Projects</h3>
        {activeProjects.map((project) => (
          <Card key={project.id} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-foreground">{project.title}</h4>
                <p className="text-sm text-muted">{project.clientName}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <Calendar className="w-4 h-4 text-muted" />
                  <span className="text-sm text-muted">
                    Started {formatDate(project.startDate)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">
                  {formatCurrency(project.agreedPayment)}
                </p>
                <span className="inline-block px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                  {project.status}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <div className="space-y-3">
          {transactions.slice(0, 5).map((transaction) => (
            <Card key={transaction.id} className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    {transaction.description}
                  </p>
                  <p className="text-sm text-muted">{transaction.category}</p>
                  <p className="text-sm text-muted">
                    {formatDate(transaction.date)}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-bold ${
                    transaction.type === 'income' ? 'text-accent' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    transaction.type === 'income' 
                      ? 'bg-accent/10 text-accent' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <AddTransactionModal
          onClose={() => setShowAddModal(false)}
          onAdd={(transaction) => {
            // TODO: Add transaction to state/database
            console.log('Adding transaction:', transaction);
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
}
