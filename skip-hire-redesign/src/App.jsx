import React from 'react';
import Header from './components/layout/Header';
import ContainerGrid from './components/sections/ContainerGrid';
import useSkipHire from './hooks/useSkipHire';
import './styles/globals.css';
import './App.css';

/**
 * Main App Component - Skip Hire Service Application
 * Complete redesign with eco-friendly color scheme and modern UI
 */
function App() {
  const {
    // Data
    containers,
    selectedContainer,
    
    // UI State
    loading,
    
    // Form State
    postcode,
    
    // Statistics
    stats,
    
    // Container Actions
    selectContainer,
    
    // UI Actions
    setPostcode
  } = useSkipHire();

  const handlePostcodeChange = (newPostcode) => {
    setPostcode(newPostcode);
    // In a real app, this would trigger an API call to fetch containers for the new postcode
    console.log('Postcode changed to:', newPostcode);
  };

  const handleSelectContainer = (container) => {
    selectContainer(container);
    // Scroll to top or show confirmation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      {/* Header with Navigation */}
      <Header
        postcode={postcode}
        onPostcodeChange={handlePostcodeChange}
      />

      {/* Main Content */}
      <main className="app__main" role="main">
        {/* Hero Section */}
        <section className="app__hero">
          <div className="app__hero-background">
            <div className="app__hero-pattern"></div>
          </div>
          <div className="container">
            <div className="app__hero-content">
              <div className="app__hero-badge">
                <span className="app__hero-badge-text">✓ Trusted by 10,000+ customers</span>
              </div>
              <h1 className="app__hero-title">
                Find the Perfect Skip for Your Project
              </h1>
              <p className="app__hero-description">
                Professional waste disposal services with same-day delivery.
                Eco-friendly solutions for residential and commercial projects.
              </p>
              
              <div className="app__hero-features">
                <div className="app__hero-feature">
                  <svg className="app__hero-feature-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Same Day Delivery</span>
                </div>
                <div className="app__hero-feature">
                  <svg className="app__hero-feature-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Free Delivery</span>
                </div>
                <div className="app__hero-feature">
                  <svg className="app__hero-feature-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Licensed & Insured</span>
                </div>
              </div>
              
              <div className="app__hero-cta">
                <a
                  href="#containers"
                  className="app__hero-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('.app__containers')?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                >
                  Browse Skip Sizes
                  <svg className="app__hero-btn-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="tel:01234567890" className="app__hero-phone">
                  <svg className="app__hero-phone-icon" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  Call Now: 01234 567890
                </a>
              </div>
              
              {selectedContainer && (
                <div className="app__selection-summary">
                  <div className="app__selection-card">
                    <h3 className="app__selection-title">Selected Container</h3>
                    <div className="app__selection-details">
                      <span className="app__selection-size">
                        {selectedContainer.size} Yard Skip
                      </span>
                      <span className="app__selection-price">
                        {(() => {
                          const total = selectedContainer.price_before_vat + 
                                      (selectedContainer.price_before_vat * selectedContainer.vat / 100);
                          return new Intl.NumberFormat('en-GB', {
                            style: 'currency',
                            currency: 'GBP'
                          }).format(total);
                        })()}
                      </span>
                    </div>
                    <p className="app__selection-period">14 days hire period</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Container Grid Section */}
        <section id="containers" className="app__containers">
          <ContainerGrid
            containers={containers}
            selectedContainer={selectedContainer}
            onSelectContainer={handleSelectContainer}
            loading={loading}
            emptyMessage="No containers available for your area. Please try a different postcode."
          />
        </section>

        {/* Quick Stats */}
        {stats.filteredCount > 0 && (
          <section className="app__stats">
            <div className="container">
              <div className="app__stats-grid">
                <div className="app__stat">
                  <span className="app__stat-number">{stats.filteredCount}</span>
                  <span className="app__stat-label">Available Containers</span>
                </div>
                
                <div className="app__stat">
                  <span className="app__stat-number">
                    {containers.filter(c => c.allowed_on_road).length}
                  </span>
                  <span className="app__stat-label">Road Placement</span>
                </div>
                
                <div className="app__stat">
                  <span className="app__stat-number">
                    {containers.filter(c => c.allows_heavy_waste).length}
                  </span>
                  <span className="app__stat-label">Heavy Waste OK</span>
                </div>
                
                <div className="app__stat">
                  <span className="app__stat-number">14</span>
                  <span className="app__stat-label">Days Hire Period</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Call to Action */}
        <section className="app__cta">
          <div className="container">
            <div className="app__cta-content">
              <h2 className="app__cta-title">Ready to Book Your Skip?</h2>
              <p className="app__cta-description">
                Get in touch with our team for expert advice and same-day delivery.
              </p>
              <div className="app__cta-actions">
                <a href="tel:01234567890" className="app__cta-phone">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                  </svg>
                  Call: 01234 567890
                </a>
                <a href="mailto:info@wewantwaste.co.uk" className="app__cta-email">
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                  Email: info@wewantwaste.co.uk
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="app__footer">
        <div className="container">
          <div className="app__footer-content">
            <div className="app__footer-brand">
              <h3>WeWantWaste</h3>
              <p>Sustainable waste disposal solutions for a cleaner future.</p>
            </div>
            
            <div className="app__footer-links">
              <div className="app__footer-section">
                <h4>Services</h4>
                <ul>
                  <li><a href="#residential">Residential</a></li>
                  <li><a href="#commercial">Commercial</a></li>
                  <li><a href="#construction">Construction</a></li>
                </ul>
              </div>
              
              <div className="app__footer-section">
                <h4>Information</h4>
                <ul>
                  <li><a href="#pricing">Pricing</a></li>
                  <li><a href="#terms">Terms & Conditions</a></li>
                  <li><a href="#privacy">Privacy Policy</a></li>
                </ul>
              </div>
              
              <div className="app__footer-section">
                <h4>Contact</h4>
                <ul>
                  <li>Phone: 01234 567890</li>
                  <li>Email: info@wewantwaste.co.uk</li>
                  <li>Service Area: {postcode}</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="app__footer-bottom">
            <p>&copy; 2025 WeWantWaste.co.uk. All rights reserved.</p>
            <p>Licensed waste carrier • Environment Agency approved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;