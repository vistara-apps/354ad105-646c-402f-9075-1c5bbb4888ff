'use client';

import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import { Invoice, InvoiceItem } from '../lib/types';
import { generateInvoiceNumber, calculateInvoiceTotal } from '../lib/utils';
import { Button } from './ui/Button';
import { TextInput } from './ui/TextInput';
import { Card } from './ui/Card';

interface CreateInvoiceModalProps {
  onClose: () => void;
  onCreate: (invoice: Omit<Invoice, 'id'>) => void;
}

export function CreateInvoiceModal({ onClose, onCreate }: CreateInvoiceModalProps) {
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    dueDate: '',
    notes: '',
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { description: '', quantity: 1, rate: 0, amount: 0 }
  ]);

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof InvoiceItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    
    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }
    
    setItems(newItems);
  };

  const totalAmount = calculateInvoiceTotal(items);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.clientName || !formData.dueDate || items.some(item => !item.description)) {
      return;
    }

    const invoice: Omit<Invoice, 'id'> = {
      userId: 'user1',
      clientId: 'client-' + Date.now(),
      invoiceNumber: generateInvoiceNumber(),
      issueDate: new Date(),
      dueDate: new Date(formData.dueDate),
      amount: totalAmount,
      status: 'draft',
      items: items.filter(item => item.description.trim() !== ''),
    };

    onCreate(invoice);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl p-6 space-y-6 my-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Create Invoice</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-muted/20 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-muted" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Information */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Client Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                label="Client Name"
                value={formData.clientName}
                onChange={(e) => setFormData(prev => ({ ...prev, clientName: e.target.value }))}
                placeholder="Client or Company Name"
                required
              />
              <TextInput
                label="Client Email"
                type="email"
                value={formData.clientEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, clientEmail: e.target.value }))}
                placeholder="client@example.com"
              />
            </div>
          </div>

          {/* Invoice Details */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Invoice Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Invoice Number
                </label>
                <div className="px-3 py-2 bg-muted/10 border border-muted/30 rounded-lg text-muted">
                  {generateInvoiceNumber()}
                </div>
              </div>
              <TextInput
                label="Due Date"
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-foreground">Line Items</h4>
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="w-4 h-4 mr-1" />
                Add Item
              </Button>
            </div>

            <div className="space-y-3">
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-end">
                  <div className="col-span-5">
                    <TextInput
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => updateItem(index, 'description', e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <TextInput
                      type="number"
                      placeholder="Qty"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2">
                    <TextInput
                      type="number"
                      step="0.01"
                      placeholder="Rate"
                      value={item.rate}
                      onChange={(e) => updateItem(index, 'rate', parseFloat(e.target.value) || 0)}
                    />
                  </div>
                  <div className="col-span-2">
                    <div className="px-3 py-2 bg-muted/10 border border-muted/30 rounded-lg text-sm">
                      ${item.amount.toFixed(2)}
                    </div>
                  </div>
                  <div className="col-span-1">
                    {items.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeItem(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <div className="text-right">
                <p className="text-sm text-muted">Total Amount</p>
                <p className="text-2xl font-bold text-primary">
                  ${totalAmount.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Notes (Optional)
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              className="w-full p-3 border border-muted/30 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              rows={3}
              placeholder="Additional notes or payment terms..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Create Invoice
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
