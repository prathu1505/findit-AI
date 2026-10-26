import React from 'react';
import { MapPin, Calendar, ArrowRight } from 'lucide-react';

export default function RecentItems({ items, onSelectItem, onNavigate }) {
  // Display up to 4 most recent items
  const displayItems = items && items.length > 0 ? items.slice(0, 4) : [];

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <p className="section-tagline">Recent Activity</p>
          <h2 className="section-title">Recently reported items</h2>
          <p className="section-description">
            Items registered across campus and community recovery points.
          </p>
        </div>

        <div className="items-grid">
          {displayItems.map((item) => (
            <article
              key={item.id}
              className="item-card"
              onClick={() => onSelectItem(item)}
              style={{ cursor: 'pointer' }}
            >
              <div className="item-image-wrapper">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="item-image"
                  loading="lazy"
                />
                <div className="item-badge-pos">
                  <span className={`status-badge ${item.type}`}>
                    {item.type === 'lost' ? 'Lost' : 'Found'}
                  </span>
                </div>
              </div>
              <div className="item-body">
                <span className="item-category">{item.category}</span>
                <h3 className="item-name">{item.name}</h3>
                <div className="item-details">
                  <div className="item-detail-row">
                    <MapPin size={14} className="trust-icon" aria-hidden="true" />
                    <span>{item.location}</span>
                  </div>
                  <div className="item-detail-row">
                    <Calendar size={14} className="trust-icon" aria-hidden="true" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <div style={{ marginTop: '0.875rem', paddingTop: '0.625rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'space-between' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectItem(item);
                    }}
                  >
                    <span>View Details</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            type="button"
            className="btn btn-secondary btn-md"
            onClick={() => onNavigate('browse')}
          >
            Browse All Items
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
