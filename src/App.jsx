import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import RecentItems from './components/RecentItems';
import KeyFeatures from './components/KeyFeatures';
import BrowseItems from './components/BrowseItems';
import ReportItem from './components/ReportItem';
import AIMatches from './components/AIMatches';
import ItemDetailsModal from './components/ItemDetailsModal';
import AuthModal from './components/AuthModal';
import Footer from './components/Footer';
import { initialItems, initialMatches } from './data/mockData';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [reportInitialType, setReportInitialType] = useState('lost');
  const [items, setItems] = useState(initialItems);
  const [matches, setMatches] = useState(initialMatches);
  const [selectedItem, setSelectedItem] = useState(null);
  
  // Auth state
  const [currentUser, setCurrentUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleNavigate = (pageId) => {
    if (pageId === 'report-lost') {
      setReportInitialType('lost');
      setCurrentPage('report');
    } else if (pageId === 'report-found') {
      setReportInitialType('found');
      setCurrentPage('report');
    } else if (pageId === 'login') {
      setAuthMode('login');
      setAuthModalOpen(true);
    } else if (pageId === 'signup') {
      setAuthMode('signup');
      setAuthModalOpen(true);
    } else {
      setCurrentPage(pageId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  const handleAddItem = (newItem) => {
    // 1. Add item to state
    setItems((prev) => [newItem, ...prev]);

    // 2. Intelligent matching check against existing items of the opposite type
    const oppositeType = newItem.type === 'lost' ? 'found' : 'lost';
    const candidates = items.filter(
      (item) => item.type === oppositeType && item.category === newItem.category
    );

    if (candidates.length > 0) {
      const topCandidate = candidates[0];
      const newMatch = {
        id: `match-${Date.now()}`,
        confidenceScore: 92,
        lostItemId: newItem.type === 'lost' ? newItem.id : topCandidate.id,
        foundItemId: newItem.type === 'found' ? newItem.id : topCandidate.id,
        lostItemName: newItem.type === 'lost' ? newItem.name : topCandidate.name,
        foundItemName: newItem.type === 'found' ? newItem.name : topCandidate.name,
        locationDistance: 'Proximate community zone',
        timeDifference: 'Reported recently',
        matchFactors: [
          { factor: 'Category & Keyword Correlation', status: 'high', details: `Both registered under "${newItem.category}"` },
          { factor: 'Location Proximity', status: 'high', details: `Reports filed near ${newItem.location}` },
          { factor: 'Attribute Consistency', status: 'medium', details: 'Matching visual description attributes' }
        ],
        explanation: `AI detected a high-probability match between newly reported "${newItem.name}" and existing listing "${topCandidate.name}".`
      };

      setMatches((prev) => [newMatch, ...prev]);
    }
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Top Navigation */}
      <Navbar
        activePage={currentPage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
        matchesCount={matches.length}
      />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <HowItWorks />
            <RecentItems items={items} onSelectItem={setSelectedItem} onNavigate={handleNavigate} />
            <KeyFeatures />
          </>
        )}

        {currentPage === 'browse' && (
          <BrowseItems
            items={items}
            onSelectItem={setSelectedItem}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'report' && (
          <ReportItem
            key={reportInitialType}
            initialType={reportInitialType}
            onAddItem={handleAddItem}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'matches' && (
          <AIMatches
            matches={matches}
            items={items}
            onSelectItem={setSelectedItem}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Item Details & Safe Contact Modal */}
      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onNavigate={handleNavigate}
        />
      )}

      {/* Login & Sign Up Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
        }}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
