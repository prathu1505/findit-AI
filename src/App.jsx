
import React, { useState, useEffect } from 'react';
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
import { initialMatches } from './data/mockData';
import { supabase } from './supabaseClient';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [reportInitialType, setReportInitialType] = useState('lost');
  const [items, setItems] = useState([]);
  const [matches, setMatches] = useState(initialMatches);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading items:', error.message);
      return;
    }

    setItems((data || []).map((item) => ({
      ...item,
      name: item.name || item.title,
      imageUrl: item.imageUrl || item.image
    })));
  };

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

  const handleAddItem = async (newItem) => {
    const itemToSave = {
      id: String(newItem.id || Date.now()),
      title: newItem.name || newItem.title,
      description: newItem.description || '',
      category: newItem.category || '',
      type: newItem.type || 'lost',
      location: newItem.location || '',
      date: newItem.date || new Date().toISOString().slice(0, 10),
      image: newItem.imageUrl || newItem.image || null
    };

    const { data, error } = await supabase
      .from('items')
      .insert(itemToSave)
      .select()
      .single();

    if (error) {
      console.error('Error saving item:', error.message);
      alert('Report save aagala. Please try again.');
      return;
    }

    const savedItem = {
      ...data,
      name: data.title,
      imageUrl: data.image
    };

    setItems((prev) => [savedItem, ...prev]);
    alert('Report successfully saved!');
  };

  return (
    <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activePage={currentPage}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onSignOut={handleSignOut}
        matchesCount={matches.length}
      />

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

      {selectedItem && (
        <ItemDetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onNavigate={handleNavigate}
        />
      )}

      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
