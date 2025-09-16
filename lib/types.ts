export interface User {
  farcasterId: string;
  displayName: string;
  bio?: string;
  skills: string[];
  paymentMethods: string[];
}

export interface Gig {
  id: string;
  title: string;
  description: string;
  skillsRequired: string[];
  clientInfo: {
    name: string;
    avatar?: string;
    rating?: number;
  };
  paymentTerms: {
    amount: number;
    currency: string;
    type: 'fixed' | 'hourly';
  };
  location: string;
  postedDate: Date;
  applicationDeadline: Date;
  category: string;
}

export interface Project {
  id: string;
  gigId?: string;
  userId: string;
  clientName: string;
  status: 'active' | 'completed' | 'pending' | 'cancelled';
  startDate: Date;
  endDate?: Date;
  agreedPayment: number;
  title: string;
}

export interface Transaction {
  id: string;
  projectId?: string;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
  description: string;
  category: string;
}

export interface Invoice {
  id: string;
  userId: string;
  clientId: string;
  projectId?: string;
  invoiceNumber: string;
  issueDate: Date;
  dueDate: Date;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  items: InvoiceItem[];
}

export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}
