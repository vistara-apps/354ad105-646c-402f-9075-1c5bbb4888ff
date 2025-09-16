'use client';

import { Clock, MapPin, Star, MessageCircle, Send } from 'lucide-react';
import { Gig } from '../lib/types';
import { formatCurrency, formatDate } from '../lib/utils';
import { Button } from './ui/Button';
import { Card } from './ui/Card';

interface GigCardProps {
  gig: Gig;
}

export function GigCard({ gig }: GigCardProps) {
  const handleApply = () => {
    // TODO: Implement apply functionality
    console.log('Applying to gig:', gig.id);
  };

  const handleMessage = () => {
    // TODO: Implement message functionality
    console.log('Messaging client for gig:', gig.id);
  };

  return (
    <Card className="p-4 space-y-4 hover:shadow-lg transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {gig.title}
          </h3>
          <div className="flex items-center space-x-4 text-sm text-muted">
            <div className="flex items-center space-x-1">
              <span className="text-lg">{gig.clientInfo.avatar}</span>
              <span>{gig.clientInfo.name}</span>
            </div>
            {gig.clientInfo.rating && (
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{gig.clientInfo.rating}</span>
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-primary">
            {formatCurrency(gig.paymentTerms.amount)}
            <span className="text-sm text-muted">
              /{gig.paymentTerms.type === 'hourly' ? 'hr' : 'project'}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-900 text-sm leading-relaxed">
        {gig.description}
      </p>

      {/* Skills */}
      <div className="flex flex-wrap gap-2">
        {gig.skillsRequired.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Meta Info */}
      <div className="flex items-center justify-between text-sm text-muted">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{gig.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>Posted {formatDate(gig.postedDate)}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3 pt-2">
        <Button onClick={handleApply} className="flex-1">
          <Send className="w-4 h-4 mr-2" />
          Apply Now
        </Button>
        <Button variant="outline" onClick={handleMessage}>
          <MessageCircle className="w-4 h-4 mr-2" />
          Message
        </Button>
      </div>
    </Card>
  );
}
