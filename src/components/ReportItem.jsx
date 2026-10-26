import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, ArrowRight, Image as ImageIcon, MapPin, Calendar, Tag, ShieldAlert } from 'lucide-react';
import { categories } from '../data/mockData';

export default function ReportItem({ initialType = 'lost', onAddItem, onNavigate }) {
  const [itemType, setItemType] = useState(initialType === 'found' ? 'found' : 'lost');
  const [name, setName] = useState('');
  const [category, setCategory] = useState(categories[1] || 'Electronics');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [verificationQuestion, setVerificationQuestion] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [reporterName, setReporterName] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [submittedItem, setSubmittedItem] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef(null);

  const fallbackPresets = [
    { label: 'Backpack', url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80' },
    { label: 'Headphones', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80' },
    { label: 'Wallet', url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80' },
    { label: 'Bottle', url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleImageFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter an item name.');
      return;
    }
    if (!location.trim()) {
      setErrorMsg('Please enter the location where the item was lost or found.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Please provide a brief description.');
      return;
    }

    const newItem = {
      id: `item-${Date.now()}`,
      type: itemType,
      category,
      name: name.trim(),
      location: location.trim(),
      date,
      description: description.trim(),
      imageUrl:
        imagePreview || null,
        
      verificationQuestion:
        verificationQuestion.trim() ||
        (itemType === 'found'
          ? 'Describe a unique identifying detail or mark on the item'
          : 'Can you specify serial number, sticker, or distinctive feature?'),
      reporter: reporterName.trim() || 'Community Member'
    };

    onAddItem(newItem);
    setSubmittedItem(newItem);
    setErrorMsg('');
  };

  if (submittedItem) {
    return (
      <div className="section" style={{ paddingTop: '3rem' }}>
        <div className="container" style={{ maxWidth: '640px' }}>
          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-xl)',
              padding: '2.5rem',
              textAlign: 'center',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <div
              style={{
                width: '3.5rem',
                height: '3.5rem',
                borderRadius: 'var(--radius-full)',
                backgroundColor: '#f0fdf4',
                color: '#16a34a',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}
            >
              <CheckCircle2 size={32} />
            </div>

            <h2 style={{ fontSize: '1.625rem', marginBottom: '0.5rem' }}>
              {submittedItem.type === 'lost' ? 'Lost Item Reported' : 'Found Item Registered'}
            </h2>

            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
              Your report for <strong>"{submittedItem.name}"</strong> has been logged to the platform.
              Our matching engine will cross-reference it against existing listings.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}
            >
              <button
                type="button"
                className="btn btn-navy btn-md"
                onClick={() => onNavigate('browse')}
              >
                <span>View in Browse Items</span>
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-md"
                onClick={() => onNavigate('matches')}
              >
                Check AI Matches
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-md"
                onClick={() => {
                  setSubmittedItem(null);
                  setName('');
                  setLocation('');
                  setDescription('');
                  setImagePreview(null);
                }}
              >
                Report Another Item
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section" style={{ paddingTop: '2.5rem' }}>
      <div className="container" style={{ maxWidth: '720px' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Report an Item</h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Provide clear item descriptors and location details to facilitate swift identification.
          </p>
        </div>

        {/* Report Type Selector */}
        <div
          style={{
            display: 'flex',
            backgroundColor: 'var(--bg-subtle)',
            padding: '0.375rem',
            borderRadius: 'var(--radius-md)',
            marginBottom: '1.75rem',
            gap: '0.375rem'
          }}
        >
          <button
            type="button"
            className="btn btn-md"
            style={{
              flex: 1,
              backgroundColor: itemType === 'lost' ? 'var(--bg-surface)' : 'transparent',
              color: itemType === 'lost' ? 'var(--text-navy)' : 'var(--text-secondary)',
              boxShadow: itemType === 'lost' ? 'var(--shadow-xs)' : 'none',
              border: itemType === 'lost' ? '1px solid var(--border-light)' : '1px solid transparent'
            }}
            onClick={() => setItemType('lost')}
          >
            I Lost an Item
          </button>
          <button
            type="button"
            className="btn btn-md"
            style={{
              flex: 1,
              backgroundColor: itemType === 'found' ? 'var(--bg-surface)' : 'transparent',
              color: itemType === 'found' ? 'var(--text-navy)' : 'var(--text-secondary)',
              boxShadow: itemType === 'found' ? 'var(--shadow-xs)' : 'none',
              border: itemType === 'found' ? '1px solid var(--border-light)' : '1px solid transparent'
            }}
            onClick={() => setItemType('found')}
          >
            I Found an Item
          </button>
        </div>

        {errorMsg && (
          <div
            style={{
              backgroundColor: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #fee2e2',
              borderRadius: 'var(--radius-md)',
              padding: '0.875rem 1rem',
              marginBottom: '1.5rem',
              fontSize: '0.875rem'
            }}
          >
            {errorMsg}
          </div>
        )}

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-light)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            boxShadow: 'var(--shadow-xs)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          {/* Photo Upload Zone */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--text-navy)',
                marginBottom: '0.5rem'
              }}
            >
              Item Photo (Optional but recommended)
            </label>

            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: '2px dashed var(--border-light)',
                borderRadius: 'var(--radius-lg)',
                padding: '1.75rem',
                textAlign: 'center',
                backgroundColor: 'var(--bg-canvas)',
                cursor: 'pointer',
                transition: 'var(--transition)'
              }}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageFile}
                style={{ display: 'none' }}
              />

              {imagePreview ? (
                <div>
                  <img
                    src={imagePreview}
                    alt="Uploaded item preview"
                    style={{
                      maxHeight: '200px',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '0.75rem'
                    }}
                  />
                  <p style={{ fontSize: '0.8125rem', color: 'var(--blue-accent)' }}>
                    Click to choose a different photo
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <UploadCloud size={32} style={{ color: 'var(--blue-accent)', marginBottom: '0.5rem' }} />
                  <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--text-navy)' }}>
                    Upload or drag item photo here
                  </span>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                    PNG, JPG or WEBP up to 10MB
                  </span>
                </div>
              )}
            </div>

            {/* Quick preset selector if user doesn't have an image file */}
            {!imagePreview && (
              <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Or pick a sample:</span>
                {fallbackPresets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem' }}
                    onClick={() => setImagePreview(preset.url)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Item Name */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--text-navy)',
                marginBottom: '0.5rem'
              }}
            >
              Item Name *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Navy Blue Herschel Classic Backpack"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6875rem 0.875rem',
                fontSize: '0.9375rem',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-canvas)',
                color: 'var(--text-navy)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Category & Date Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--text-navy)',
                  marginBottom: '0.5rem'
                }}
              >
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6875rem 0.875rem',
                  fontSize: '0.9375rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-canvas)',
                  color: 'var(--text-navy)',
                  cursor: 'pointer',
                  fontFamily: 'inherit'
                }}
              >
                {categories.filter((c) => c !== 'All Categories').map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--text-navy)',
                  marginBottom: '0.5rem'
                }}
              >
                {itemType === 'lost' ? 'Date Lost' : 'Date Found'}
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6875rem 0.875rem',
                  fontSize: '0.9375rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-canvas)',
                  color: 'var(--text-navy)',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--text-navy)',
                marginBottom: '0.5rem'
              }}
            >
              Specific Location *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Central Library, 2nd floor desk by reading room window"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6875rem 0.875rem',
                fontSize: '0.9375rem',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-canvas)',
                color: 'var(--text-navy)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Description */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--text-navy)',
                marginBottom: '0.5rem'
              }}
            >
              Description & Distinct Markings *
            </label>
            <textarea
              required
              rows={3}
              placeholder="Provide color, brand, condition, scratches, case, or contents..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '0.6875rem 0.875rem',
                fontSize: '0.9375rem',
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

          {/* Verification Question for Safe Contact */}
          <div
            style={{
              backgroundColor: 'var(--blue-subtle)',
              border: '1px solid var(--blue-border)',
              borderRadius: 'var(--radius-lg)',
              padding: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <ShieldAlert size={18} style={{ color: 'var(--blue-accent)' }} />
              <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--text-navy)' }}>
                Ownership Verification Question
              </span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
              Claimants must answer this specific question before their contact request is forwarded to you.
            </p>
            <input
              type="text"
              placeholder="e.g. What keychain charm is attached to the zipper pull?"
              value={verificationQuestion}
              onChange={(e) => setVerificationQuestion(e.target.value)}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                fontSize: '0.875rem',
                border: '1px solid var(--border-light)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-surface)',
                color: 'var(--text-navy)',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
          </div>

          {/* Reporter Name & Contact (kept private) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--text-navy)',
                  marginBottom: '0.5rem'
                }}
              >
                Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={reporterName}
                onChange={(e) => setReporterName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6875rem 0.875rem',
                  fontSize: '0.9375rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-canvas)',
                  color: 'var(--text-navy)',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: 'var(--text-navy)',
                  marginBottom: '0.5rem'
                }}
              >
                Contact Email or Phone (Protected)
              </label>
              <input
                type="text"
                placeholder="Never shown publicly"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.6875rem 0.875rem',
                  fontSize: '0.9375rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-canvas)',
                  color: 'var(--text-navy)',
                  outline: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: '0.5rem' }}>
            <button type="submit" className="btn btn-navy btn-lg" style={{ width: '100%' }}>
              <span>Submit {itemType === 'lost' ? 'Lost Item' : 'Found Item'} Report</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
