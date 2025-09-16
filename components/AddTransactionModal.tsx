'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { Transaction } from '../lib/types';
import { Button } from './ui/Button';
import { TextInput } from './ui/TextInput';
import { Card } from './ui/Card';

interface AddTransactionModalProps {
  onClose: () => void;
  onAdd: (transaction: Omit<Transaction, 'id'>) => void;
}

export function AddTransactionModal({ onClose, onAdd }: AddTransactionModalProps) {
  const [formData, setFormData] = useState({
    amount: '',
    type: 'income' as 'income' | 'expense',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.amount || !formData.description || !formData.category) {
      return;
    }

    onAdd({
      amount: parseFloat(formData.amount),
      type: formData.type,
      description: formData.description,
      category: formData.category,
      date: new Date(formData.date),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Add Transaction</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted/20 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'income' }))}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                formData.type === 'income'
                  ? 'bg-accent text-white'
                  : 'bg-muted/20 text-muted hover:bg-muted/30'
              }`}
            >
              Income
            </button>
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, type: 'expense' }))}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors duration-200 ${
                formData.type === 'expense'
                  ? 'bg-red-500 text-white'
                  : 'bg-muted/20 text-muted hover:bg-muted/30'
              }`}
            >
              Expense
            </button>
          </div>

          <TextInput
            label="Amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
            placeholder="0.00"
            required
          />

          <TextInput
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="What was this for?"
            required
          />

          <TextInput
            label="Category"
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            placeholder="e.g., Project Payment, Tools, etc."
            required
          />

          <TextInput
            label="Date"
            type="date"
            value={formData.date}
            onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
            required
          />

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Transaction
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
