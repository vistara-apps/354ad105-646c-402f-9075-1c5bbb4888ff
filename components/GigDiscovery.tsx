'use client';

import { useState } from 'react';
import { Clock, MapPin, Star, Filter } from 'lucide-react';
import { mockGigs } from '../lib/mockData';
import { formatCurrency, formatDate } from '../lib/utils';
import { GigCard } from './GigCard';
import { Button } from './ui/Button';

export function GigDiscovery() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [gigs] = useState(mockGigs);

  const categories = ['all', 'Development', 'Design', 'Writing', 'Marketing'];

  const filteredGigs = selectedCategory === 'all' 
    ? gigs 
    : gigs.filter(gig => gig.category === selectedCategory);

  return (
    <div className="space-y-6 py-6">
      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Discover Gigs</h2>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Category Filter */}
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-surface text-muted hover:bg-muted/20'
              }`}
            >
              {category === 'all' ? 'All Categories' : category}
            </button>
          ))}
        </div>
      </div>

      {/* Gig List */}
      <div className="space-y-4">
        {filteredGigs.map((gig) => (
          <GigCard key={gig.id} gig={gig} />
        ))}
      </div>

      {filteredGigs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted">No gigs found in this category.</p>
        </div>
      )}
    </div>
  );
}
