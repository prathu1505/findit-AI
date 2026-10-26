import React, { useState } from 'react';
import { Search, Menu, X, Sparkles, User, LogOut } from 'lucide-react';

export default function Navbar({ activePage, onNavigate, currentUser, onOpenAuth, onSignOut, matchesCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'browse', label: 'Browse Items' },
    { id: 'report', label: 'Report Item' },
    { id: 'matches', label: 'AI Matches', badge: matchesCount > 0 ? matchesCount : null }
  ];

  return (
    <header className="navbar-header">
      <div className="container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <button
            type="button"
            className="navbar-brand"
            onClick={() => handleNavClick('home')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <div className="brand-icon-wrap" aria-hidden="true">
              <Search size={18} strokeWidth={2.25} />
            </div>
            <span>FindIt AI</span>
          </button>

          {/* Desktop Navigation Links */}
          <nav aria-label="Main Navigation">
            <ul className="navbar-nav">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    className={`nav-link ${activePage === link.id ? 'active' : ''}`}
                    onClick={() => handleNavClick(link.id)}
                    style={{ border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem' }}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span
                        style={{
                          fontSize: '0.75rem',
                          padding: '0.125rem 0.4375rem',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--blue-accent)',
                          color: '#ffffff',
                          fontWeight: 700
                        }}
                      >
                        {link.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop Right Actions */}
          <div className="navbar-actions">
            {currentUser ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4375rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: 'var(--text-navy)',
                    padding: '0.375rem 0.75rem',
                    backgroundColor: 'var(--bg-canvas)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-full)'
                  }}
                >
                  <div
                    style={{
                      width: '1.5rem',
                      height: '1.5rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--blue-accent)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 700
                    }}
                  >
                    {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
                  </div>
                  <span>{currentUser.name}</span>
                </div>

                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={onSignOut}
                  title="Sign out of FindIt AI"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => onOpenAuth('login')}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  className="btn btn-navy btn-sm"
                  onClick={() => onOpenAuth('signup')}
                >
                  Get Started
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div className={`mobile-menu-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                className={`mobile-nav-link ${activePage === link.id ? 'active' : ''}`}
                onClick={() => handleNavClick(link.id)}
                style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', display: 'flex', justifyContent: 'space-between' }}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    style={{
                      fontSize: '0.75rem',
                      padding: '0.125rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--blue-accent)',
                      color: '#ffffff'
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="mobile-actions">
          {currentUser ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', padding: '0.25rem 0' }}>
                Signed in as <strong>{currentUser.name}</strong>
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-md"
                onClick={() => {
                  onSignOut();
                  setMobileMenuOpen(false);
                }}
              >
                <LogOut size={16} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-secondary btn-md"
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                className="btn btn-navy btn-md"
                onClick={() => {
                  onOpenAuth('signup');
                  setMobileMenuOpen(false);
                }}
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
