'use client';

import { useState } from 'react';
import { useMiniKit } from '@coinbase/minikit';
import { GigDiscovery } from '../components/GigDiscovery';
import { IncomeTracker } from '../components/IncomeTracker';
import { InvoiceGenerator } from '../components/InvoiceGenerator';
import { ProfileSetup } from '../components/ProfileSetup';
import { Navigation } from '../components/Navigation';
import { Header } from '../components/Header';

type Tab = 'discovery' | 'income' | 'invoices' | 'profile';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>('discovery');
  const { user } = useMiniKit();

  const renderContent = () => {
    switch (activeTab) {
      case 'discovery':
        return <GigDiscovery />;
      case 'income':
        return <IncomeTracker />;
      case 'invoices':
        return <InvoiceGenerator />;
      case 'profile':
        return <ProfileSetup />;
      default:
        return <GigDiscovery />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />
      
      <div className="pb-20">
        {renderContent()}
      </div>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}
