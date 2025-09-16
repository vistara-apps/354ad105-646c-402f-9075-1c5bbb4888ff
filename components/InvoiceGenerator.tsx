'use client';

import { useState } from 'react';
import { Plus, FileText, Send, Eye } from 'lucide-react';
import { Invoice } from '../lib/types';
import { formatCurrency, formatDate, generateInvoiceNumber } from '../lib/utils';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { CreateInvoiceModal } from './CreateInvoiceModal';

export function InvoiceGenerator() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([
    {
      id: '1',
      userId: 'user1',
      clientId: 'client1',
      projectId: '1',
      invoiceNumber: 'INV-240115-ABC',
      issueDate: new Date('2024-01-15'),
      dueDate: new Date('2024-02-15'),
      amount: 1500,
      status: 'sent',
      items: [
        {
          description: 'Website Development - Phase 1',
          quantity: 1,
          rate: 1500,
          amount: 1500,
        },
      ],
    },
    {
      id: '2',
      userId: 'user1',
      clientId: 'client2',
      invoiceNumber: 'INV-240110-XYZ',
      issueDate: new Date('2024-01-10'),
      dueDate: new Date('2024-02-10'),
      amount: 800,
      status: 'paid',
      items: [
        {
          description: 'Logo Design',
          quantity: 1,
          rate: 800,
          amount: 800,
        },
      ],
    },
  ]);

  const getStatusColor = (status: Invoice['status']) => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-600';
      case 'sent':
        return 'bg-blue-100 text-blue-600';
      case 'paid':
        return 'bg-accent/10 text-accent';
      case 'overdue':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const totalPending = invoices
    .filter(inv => inv.status === 'sent')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6 py-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Invoices</h2>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted">Pending Payment</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(totalPending)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted">Total Paid</p>
              <p className="text-xl font-bold text-foreground">
                {formatCurrency(totalPaid)}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Invoice List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Invoices</h3>
        {invoices.map((invoice) => (
          <Card key={invoice.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-medium text-foreground">
                    {invoice.invoiceNumber}
                  </h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </div>
                <p className="text-sm text-muted mb-1">
                  Issued: {formatDate(invoice.issueDate)}
                </p>
                <p className="text-sm text-muted">
                  Due: {formatDate(invoice.dueDate)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary mb-2">
                  {formatCurrency(invoice.amount)}
                </p>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  {invoice.status === 'draft' && (
                    <Button size="sm">
                      <Send className="w-4 h-4 mr-1" />
                      Send
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Invoice Modal */}
      {showCreateModal && (
        <CreateInvoiceModal
          onClose={() => setShowCreateModal(false)}
          onCreate={(invoice) => {
            setInvoices(prev => [...prev, { ...invoice, id: Date.now().toString() }]);
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}
