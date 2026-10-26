import React, { useState } from 'react';
import { X, MapPin, Calendar, ShieldCheck, Lock, CheckCircle2, Send, Tag, AlertCircle } from 'lucide-react';

export default function ItemDetailsModal({ item, onClose, onNavigate }) {
  const [answer, setAnswer] = useState('');
  const [claimantName, setClaimantName] = useState('');
  const [claimantContact, setClaimantContact] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!item) return null;

  const handleClaimSubmit = (e) => {
    e.preventDefault();
    if (!answer.trim()) {
      setErrorMsg('Please provide an answer to the verification question to prove ownership.');
      return;
    }
    if (!claimantContact.trim()) {
      setErrorMsg('Please provide your private email or phone for relay contact.');
      return;
    }

    setIsSubmitted(true);
    setErrorMsg('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.6)',
        backdropFilter: 'blur(4px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        overflowY: 'auto'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-xl)',
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--border-light)',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-full)',
            width: '2rem',
            height: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-secondary)',
            zIndex: 10
          }}
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        {/* Modal Content */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {/* Left Column: Image and Specs */}
          <div
            style={{
              padding: '2rem',
              borderRight: '1px solid var(--border-light)',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'var(--bg-canvas)'
            }}
          >
            <div
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                backgroundColor: 'var(--bg-subtle)',
                marginBottom: '1.25rem',
                height: '240px'
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <span className={`status-badge ${item.type}`}>
                {item.type === 'lost' ? 'Lost Item' : 'Found Item'}
              </span>
              <span style={{ fontSize: '0.8125rem', color: 'var(--blue-accent)', fontWeight: 500 }}>
                {item.category}
              </span>
            </div>

            <h2 style={{ fontSize: '1.375rem', marginBottom: '0.75rem', lineHeight: 1.3 }}>
              {item.name}
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} className="trust-icon" />
                <span>{item.location}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} className="trust-icon" />
                <span>{item.date}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShieldCheck size={16} className="trust-icon" />
                <span>Reported by: {item.reporter || 'Verified User'}</span>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.375rem', color: 'var(--text-navy)' }}>
                Description
              </h4>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {item.description}
              </p>
            </div>
          </div>

          {/* Right Column: Safe Contact Request Form */}
          <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Lock size={18} style={{ color: 'var(--blue-accent)' }} />
              <h3 style={{ fontSize: '1.1875rem', fontWeight: 600 }}>Safe Contact Request</h3>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              To prevent fraudulent claims, contact information is never displayed directly. Answer the owner's verification prompt below to request a secure handoff.
            </p>

            {isSubmitted ? (
              <div
                style={{
                  backgroundColor: '#f0fdf4',
                  border: '1px solid #dcfce7',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  textAlign: 'center',
                  margin: 'auto 0'
                }}
              >
                <div
                  style={{
                    width: '3rem',
                    height: '3rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: '#dcfce7',
                    color: '#16a34a',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1rem'
                  }}
                >
                  <CheckCircle2 size={24} />
                </div>
                <h4 style={{ fontSize: '1.125rem', color: '#166534', marginBottom: '0.5rem' }}>
                  Verification Request Dispatched
                </h4>
                <p style={{ fontSize: '0.875rem', color: '#15803d', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                  Your response has been forwarded to the custodian. If the verification details match, you will be notified at <strong>{claimantContact}</strong> with handoff instructions.
                </p>
                <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleClaimSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
                {errorMsg && (
                  <div
                    style={{
                      backgroundColor: '#fef2f2',
                      color: '#991b1b',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.625rem 0.875rem',
                      fontSize: '0.8125rem'
                    }}
                  >
                    {errorMsg}
                  </div>
                )}

                {/* Prompt Question */}
                <div
                  style={{
                    backgroundColor: 'var(--blue-subtle)',
                    border: '1px solid var(--blue-border)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.875rem 1rem'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--blue-accent)', textTransform: 'uppercase' }}>
                    Verification Challenge
                  </span>
                  <p style={{ fontSize: '0.90625rem', fontWeight: 600, color: 'var(--text-navy)', marginTop: '0.25rem' }}>
                    "{item.verificationQuestion || 'Please describe any distinctive markings or serial numbers.'}"
                  </p>
                </div>

                {/* Answer Input */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-navy)',
                      marginBottom: '0.375rem'
                    }}
                  >
                    Your Answer *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Provide the exact details that confirm your ownership..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.625rem 0.75rem',
                      fontSize: '0.875rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-canvas)',
                      color: 'var(--text-navy)',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Claimant Name */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-navy)',
                      marginBottom: '0.375rem'
                    }}
                  >
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={claimantName}
                    onChange={(e) => setClaimantName(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5625rem 0.75rem',
                      fontSize: '0.875rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-canvas)',
                      color: 'var(--text-navy)',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>

                {/* Claimant Private Contact */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--text-navy)',
                      marginBottom: '0.375rem'
                    }}
                  >
                    Your Return Contact (Email or Phone) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="alex@example.com or +1 555-0192"
                    value={claimantContact}
                    onChange={(e) => setClaimantContact(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.5625rem 0.75rem',
                      fontSize: '0.875rem',
                      border: '1px solid var(--border-light)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-canvas)',
                      color: 'var(--text-navy)',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '0.25rem', display: 'block' }}>
                    Relayed privately through our secure dispatcher.
                  </span>
                </div>

                <div style={{ marginTop: '0.5rem' }}>
                  <button type="submit" className="btn btn-navy btn-md" style={{ width: '100%' }}>
                    <Send size={15} />
                    <span>Submit Verification & Contact Request</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
