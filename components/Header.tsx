'use client';

import { Search, Bell, User } from 'lucide-react';

interface HeaderProps {
  user?: any;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-sm border-b border-muted/20">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">GigFlow</h1>
            <p className="text-xs text-muted">Side Hustle Marketplace</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="p-2 hover:bg-muted/20 rounded-lg transition-colors duration-200">
            <Search className="w-5 h-5 text-muted" />
          </button>
          <button className="p-2 hover:bg-muted/20 rounded-lg transition-colors duration-200 relative">
            <Bell className="w-5 h-5 text-muted" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
          </button>
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            {user?.displayName ? (
              <span className="text-white text-sm font-medium">
                {user.displayName.charAt(0).toUpperCase()}
              </span>
            ) : (
              <User className="w-4 h-4 text-white" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
