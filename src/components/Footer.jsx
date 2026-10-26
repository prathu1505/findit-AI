import React from 'react';
import { Search } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand info */}
          <div>
            <div className="navbar-brand" style={{ marginBottom: '0.5rem' }}>
              <div className="brand-icon-wrap" aria-hidden="true">
                <Search size={18} strokeWidth={2.25} />
              </div>
              <span>FindIt AI</span>
            </div>
            <p className="footer-brand-desc">
              An intelligent, privacy-focused lost and found platform designed to reunite people with their belongings.
            </p>
          </div>

          {/* Core Pages */}
          <div>
            <h4 className="footer-col-title">Platform</h4>
            <ul className="footer-links">
              <li>
                <span className="footer-link" onClick={() => onNavigate('home')}>
                  Home
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => onNavigate('browse')}>
                  Browse Items
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => onNavigate('report-lost')}>
                  Report Lost Item
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => onNavigate('report-found')}>
                  Report Found Item
                </span>
              </li>
            </ul>
          </div>

          {/* AI Matching & Features */}
          <div>
            <h4 className="footer-col-title">Intelligence</h4>
            <ul className="footer-links">
              <li>
                <span className="footer-link" onClick={() => onNavigate('matches')}>
                  AI Matches
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => onNavigate('home')}>
                  Verification Protocol
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => onNavigate('home')}>
                  Privacy Guarantee
                </span>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="footer-col-title">Account</h4>
            <ul className="footer-links">
              <li>
                <span className="footer-link" onClick={() => onNavigate('login')}>
                  Sign In
                </span>
              </li>
              <li>
                <span className="footer-link" onClick={() => onNavigate('signup')}>
                  Create Account
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {currentYear} FindIt AI. All rights reserved.</span>
          <span>Designed with simplicity, clarity, and safety.</span>
        </div>
      </div>
    </footer>
  );
}
