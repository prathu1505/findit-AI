import React, { useState, useMemo } from 'react';
import { Search, MapPin, Calendar, Filter, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { categories } from '../data/mockData';

export default function BrowseItems({ items, onSelectItem, onNavigate }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all'); // 'all', 'lost', 'found'
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Type filter
      if (selectedType !== 'all' && item.type !== selectedType) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All Categories' && item.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesLoc = item.location.toLowerCase().includes(q);
        const matchesCat = item.category.toLowerCase().includes(q);
        return matchesName || matchesDesc || matchesLoc || matchesCat;
      }
      return true;
    });
  }, [items, selectedType, selectedCategory, searchQuery]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCategory('All Categories');
  };

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Browse Lost & Found Items</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Search active listings across campus and community recovery points.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-lg)',
            padding: '1.25rem',
            marginBottom: '2rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            boxShadow: 'var(--shadow-xs)'
          }}
        >
          {/* Search Input Row */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search
              size={18}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-tertiary)'
              }}
            />
            <input
              type="text"
              placeholder="Search by item name, description, color, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.75rem',
                fontSize: '0.9375rem',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-canvas)',
                color: 'var(--text-navy)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-tertiary)'
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Type Tabs & Category Select */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem'
            }}
          >
            {/* Type buttons */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                className={`btn btn-sm ${selectedType === 'all' ? 'btn-navy' : 'btn-secondary'}`}
                onClick={() => setSelectedType('all')}
              >
                All Items ({items.length})
              </button>
              <button
                type="button"
                className={`btn btn-sm ${selectedType === 'lost' ? 'btn-navy' : 'btn-secondary'}`}
                onClick={() => setSelectedType('lost')}
              >
                Lost Items ({items.filter((i) => i.type === 'lost').length})
              </button>
              <button
                type="button"
                className={`btn btn-sm ${selectedType === 'found' ? 'btn-navy' : 'btn-secondary'}`}
                onClick={() => setSelectedType('found')}
              >
                Found Items ({items.filter((i) => i.type === 'found').length})
              </button>
            </div>

            {/* Category Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={16} style={{ color: 'var(--text-secondary)' }} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '0.4375rem 0.875rem',
                  fontSize: '0.875rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-canvas)',
                  color: 'var(--text-navy)',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Counter and Active filters */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '1.25rem',
            fontSize: '0.875rem',
            color: 'var(--text-secondary)'
          }}
        >
          <span>
            Showing <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'item' : 'items'}
          </span>
          {(searchQuery || selectedType !== 'all' || selectedCategory !== 'All Categories') && (
            <button
              type="button"
              onClick={resetFilters}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--blue-accent)',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: 500
              }}
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="items-grid">
            {filteredItems.map((item) => (
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
                  <h3 className="item-name" style={{ fontSize: '1.0625rem' }}>{item.name}</h3>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.45,
                      marginBottom: '0.75rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {item.description}
                  </p>

                  <div className="item-details">
                    <div className="item-detail-row">
                      <MapPin size={14} className="trust-icon" />
                      <span>{item.location}</span>
                    </div>
                    <div className="item-detail-row">
                      <Calendar size={14} className="trust-icon" />
                      <span>{item.date}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ width: '100%', justifyContent: 'space-between' }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item);
                      }}
                    >
                      <span>View Details & Claim</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
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
            <Search size={36} style={{ color: 'var(--text-tertiary)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>No matching items found</h3>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto 1.5rem' }}>
              Try adjusting your search terms or clearing your filters to see more results.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button type="button" className="btn btn-secondary btn-md" onClick={resetFilters}>
                Clear Filters
              </button>
              <button
                type="button"
                className="btn btn-navy btn-md"
                onClick={() => onNavigate('report')}
              >
                Report a New Item
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
