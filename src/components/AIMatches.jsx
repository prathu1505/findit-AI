import React from 'react';
import { Sparkles, ArrowRight, CheckCircle2, MapPin, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AIMatches({ matches, items, onSelectItem, onNavigate }) {
  // Helper to find full item details
  const getItem = (id) => items.find((i) => i.id === id);

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div className="pill-badge" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={14} />
            <span>Intelligent Correlation Engine</span>
          </div>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>AI Suggested Matches</h1>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px' }}>
            The platform compares reported attributes—visual features, categories, geolocation, and timestamps—to highlight probable recoveries without manual guesswork.
          </p>
        </div>

        {matches.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {matches.map((match) => {
              const lostItem = getItem(match.lostItemId);
              const foundItem = getItem(match.foundItemId);

              return (
                <div
                  key={match.id}
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '2rem',
                    boxShadow: 'var(--shadow-sm)'
                  }}
                >
                  {/* Match Header with Confidence Score */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid var(--border-subtle)',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          backgroundColor: 'var(--blue-subtle)',
                          color: 'var(--blue-accent)',
                          padding: '0.375rem 0.875rem',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.875rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          border: '1px solid var(--blue-border)'
                        }}
                      >
                        <Sparkles size={15} />
                        <span>{match.confidenceScore}% Match Confidence</span>
                      </div>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Cross-referenced against verified listings
                      </span>
                    </div>

                    <button
                      type="button"
                      className="btn btn-navy btn-sm"
                      onClick={() => {
                        if (foundItem) onSelectItem(foundItem);
                        else if (lostItem) onSelectItem(lostItem);
                      }}
                    >
                      <span>Verify & Request Contact</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Paired Items Comparison Grid */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '1.5rem',
                      marginBottom: '1.75rem'
                    }}
                  >
                    {/* Lost Item Column */}
                    <div
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.25rem',
                        display: 'flex',
                        gap: '1rem'
                      }}
                    >
                      {lostItem?.imageUrl && (
                        <img
                          src={lostItem.imageUrl}
                          alt={lostItem.name}
                          style={{
                            width: '90px',
                            height: '90px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-md)',
                            flexShrink: 0
                          }}
                        />
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span className="status-badge lost" style={{ marginBottom: '0.375rem' }}>
                          Reported Lost
                        </span>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-navy)', marginBottom: '0.375rem' }}>
                          {lostItem ? lostItem.name : match.lostItemName}
                        </h4>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <MapPin size={13} />
                            {lostItem?.location || 'Central Campus'}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <Calendar size={13} />
                            {lostItem?.date || 'Recent'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Found Item Column */}
                    <div
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '1.25rem',
                        display: 'flex',
                        gap: '1rem'
                      }}
                    >
                      {foundItem?.imageUrl && (
                        <img
                          src={foundItem.imageUrl}
                          alt={foundItem.name}
                          style={{
                            width: '90px',
                            height: '90px',
                            objectFit: 'cover',
                            borderRadius: 'var(--radius-md)',
                            flexShrink: 0
                          }}
                        />
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span className="status-badge found" style={{ marginBottom: '0.375rem' }}>
                          Turned In / Found
                        </span>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-navy)', marginBottom: '0.375rem' }}>
                          {foundItem ? foundItem.name : match.foundItemName}
                        </h4>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <MapPin size={13} />
                            {foundItem?.location || 'Turned in to Desk'}
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                            <Calendar size={13} />
                            {foundItem?.date || 'Recent'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* AI Explanation & Match Factors */}
                  <div
                    style={{
                      backgroundColor: 'var(--bg-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '1.25rem'
                    }}
                  >
                    <h5
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--text-navy)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        marginBottom: '0.75rem'
                      }}
                    >
                      Match Analysis & Breakdown
                    </h5>

                    <p style={{ fontSize: '0.9375rem', color: 'var(--text-navy-muted)', marginBottom: '1rem', lineHeight: 1.5 }}>
                      {match.explanation}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      {match.matchFactors.map((mf, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            alignItems: 'baseline',
                            gap: '0.5rem',
                            fontSize: '0.875rem'
                          }}
                        >
                          <CheckCircle2 size={15} style={{ color: 'var(--blue-accent)', flexShrink: 0, marginTop: '2px' }} />
                          <div>
                            <strong style={{ color: 'var(--text-navy)', marginRight: '0.375rem' }}>{mf.factor}:</strong>
                            <span style={{ color: 'var(--text-secondary)' }}>{mf.details}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '4rem 2rem',
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-light)'
            }}
          >
            <Sparkles size={36} style={{ color: 'var(--text-tertiary)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No pending matches</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              When new lost or found items are reported with correlated features, they will appear here.
            </p>
            <button
              type="button"
              className="btn btn-navy btn-md"
              onClick={() => onNavigate('report')}
            >
              Report an Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
