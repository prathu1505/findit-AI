import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Submit Item Details',
      text: 'Upload a clear photo with key attributes—color, category, date, and specific location landmarks.'
    },
    {
      number: '02',
      title: 'Intelligent Cross-Check',
      text: 'The platform compares descriptors, timestamps, and locations to suggest high-confidence matches.'
    },
    {
      number: '03',
      title: 'Secure Handoff',
      text: 'Confirm possession through secure ownership verification without exposing private phone numbers.'
    }
  ];

  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <p className="section-tagline">How It Works</p>
          <h2 className="section-title">Designed for clarity and quick recovery</h2>
          <p className="section-description">
            A straightforward process to reconnect lost belongings with their rightful owners.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((step) => (
            <div key={step.number} className="step-card">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-text">{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
