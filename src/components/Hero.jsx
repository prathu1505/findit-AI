import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Lock } from 'lucide-react';

export default function Hero({ onNavigate }) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="pill-badge" style={{ marginBottom: '1.25rem' }}>
            <span>Clean, Intelligent Lost & Found</span>
          </div>

          <h1 className="hero-title">
            Reuniting what was lost with calm, intelligent matching.
          </h1>

          <p className="hero-subtitle">
            FindIt AI helps communities and organizations safely report, organize, and
            recover missing belongings. Clear details, smart attribute matching, and protected contact requests.
          </p>

          <div className="hero-cta-group">
            <button
              type="button"
              className="btn btn-navy btn-lg"
              onClick={() => onNavigate('report-lost')}
            >
              Report Lost Item
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={() => onNavigate('report-found')}
            >
              Report Found Item
            </button>
          </div>

          <div className="hero-trust-bar">
            <div className="trust-item">
              <ShieldCheck size={16} className="trust-icon" />
              <span>Verified Ownership Inquiries</span>
            </div>
            <div className="trust-item">
              <Lock size={16} className="trust-icon" />
              <span>Protected Personal Information</span>
            </div>
            <div className="trust-item">
              <CheckCircle2 size={16} className="trust-icon" />
              <span>Attribute-Based Precision</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
