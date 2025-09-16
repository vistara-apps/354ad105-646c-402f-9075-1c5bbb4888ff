'use client';

import { Home, DollarSign, FileText, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: 'discovery' | 'income' | 'invoices' | 'profile') => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: 'discovery', label: 'Discover', icon: Home },
    { id: 'income', label: 'Income', icon: DollarSign },
    { id: 'invoices', label: 'Invoices', icon: FileText },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-muted/20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => onTabChange(id)}
              className={cn(
                'flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors duration-200',
                activeTab === id
                  ? 'text-primary bg-primary/10'
                  : 'text-muted hover:text-foreground hover:bg-muted/10'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
