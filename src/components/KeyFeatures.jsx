import React from 'react';
import { ShieldCheck, Search, FileText } from 'lucide-react';

export default function KeyFeatures() {
  const features = [
    {
      icon: ShieldCheck,
      title: 'Protected Contact Protocol',
      description:
        'Your direct phone number and personal email remain private. Contact is only initiated once ownership verification questions are answered.'
    },
    {
      icon: Search,
      title: 'Structured Matching Criteria',
      description:
        'Compare item categories, colors, brands, distinct markings, and location proximities to avoid needle-in-a-haystack searching.'
    },
    {
      icon: FileText,
      title: 'Detailed Item Records',
      description:
        'Comprehensive submission guidelines ensure every report captures the exact details needed for positive identification.'
    }
  ];

  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <p className="section-tagline">Why FindIt AI</p>
          <h2 className="section-title">Built with safety and simplicity first</h2>
          <p className="section-description">
            A reliable system that eliminates clutter and simplifies recovery without compromising security.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div key={index} className="feature-box">
                <div className="feature-icon-wrap">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <h3 className="feature-title">{feat.title}</h3>
                <p className="feature-description">{feat.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
