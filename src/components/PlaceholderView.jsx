import React from 'react';
import { ArrowLeft, Clock, Search, PlusCircle, Sparkles, UserCheck } from 'lucide-react';

export default function PlaceholderView({ pageId, onNavigate }) {
  const pageConfigs = {
    browse: {
      icon: Search,
      badge: 'Core Page — Stage 2',
      title: 'Browse Items',
      description: 'Search and filter lost and found listings by category, location, and date will be implemented in the upcoming stage.'
    },
    report: {
      icon: PlusCircle,
      badge: 'Core Page — Stage 2',
      title: 'Report an Item',
      description: 'The photo upload, item details, category selection, and location tagging form will be built in the next milestone.'
    },
    'report-lost': {
      icon: PlusCircle,
      badge: 'Core Page — Stage 2',
      title: 'Report Lost Item',
      description: 'The lost item intake flow with photo capture, loss timeline, and distinguishing feature notes is scheduled for Stage 2.'
    },
    'report-found': {
      icon: PlusCircle,
      badge: 'Core Page — Stage 2',
      title: 'Report Found Item',
      description: 'The found item intake flow with secure location drop-off details and verification prompts is scheduled for Stage 2.'
    },
    matches: {
      icon: Sparkles,
      badge: 'Core Page — Stage 3',
      title: 'AI Matches',
      description: 'The automated match comparison view with attribute similarity breakdown and match explanations will be integrated in Stage 3.'
    },
    login: {
      icon: UserCheck,
      badge: 'Authentication — Upcoming',
      title: 'Sign In to FindIt AI',
      description: 'User authentication and profile management are in preparation. No active login session is required for Stage 1.'
    },
    signup: {
      icon: UserCheck,
      badge: 'Authentication — Upcoming',
      title: 'Create an Account',
      description: 'Account registration with secure credentials and notification preferences will be introduced in an upcoming stage.'
    }
  };

  const config = pageConfigs[pageId] || {
    icon: Clock,
    badge: 'Stage 1 Navigation',
    title: 'Page in Progress',
    description: 'This section is scheduled for the next development milestone.'
  };

  const Icon = config.icon;

  return (
    <div className="placeholder-view">
      <div className="container">
        <div className="placeholder-card">
          <div className="placeholder-icon-wrap">
            <Icon size={24} />
          </div>
          <span className="placeholder-status">{config.badge}</span>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{config.title}</h2>
          <p style={{ maxWidth: '440px', margin: '0 auto 1.75rem', fontSize: '0.9375rem' }}>
            {config.description}
          </p>
          <button
            type="button"
            className="btn btn-navy btn-md"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft size={16} />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
