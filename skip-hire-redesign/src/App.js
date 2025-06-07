import React from 'react';
import Header from './components/layout/Header';
import ContainerGrid from './components/sections/ContainerGrid';
import useSkipHire from './hooks/useSkipHire';
import './styles/globals.css';
import './App.css';

function App() {
  const {
    containers,
    selectedContainer,
    loading,
    postcode,
    stats,
    selectContainer,
    setPostcode
  } = useSkipHire();

  const handlePostcodeChange = (newPostcode) => {
    setPostcode(newPostcode);
    console.log('Postcode changed to:', newPostcode);
  };

  const handleSelectContainer = (container) => {
    selectContainer(container);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Header
        postcode={postcode}
        onPostcodeChange={handlePostcodeChange}
      />

      <main className="app__main" role="main">
        <section className="app__hero">
          <div className="container">
            <div className="app__hero-content">
              <h1 className="app__hero-title">
                Find the Perfect Skip for Your Project
              </h1>
              <p className="app__hero-description">
                Professional waste disposal services with same-day delivery. 
                Eco-friendly solutions for residential and commercial projects.
              </p>
              
              {selectedContainer && (
                <div className="app__selection-summary">
                  <div className="app__selection-card">
                    <h3 className="app__selection-title">Selected Container</h3>
                    <div className="app__selection-details">
                      <span className="app__selection-size">
                        {selectedContainer.size} Yard Skip
                      </span>
                      <span className="app__selection-price">
                        £{(selectedContainer.price_before_vat + (selectedContainer.price_before_vat * selectedContainer.vat / 100)).toFixed(2)}
                      </span>
                    </div>
                    <p className="app__selection-period">14 days hire period</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="app__containers">
          <ContainerGrid
            containers={containers}
            selectedContainer={selectedContainer}
            onSelectContainer={handleSelectContainer}
            loading={loading}
            emptyMessage="No containers available for your area. Please try a different postcode."
          />
        </section>

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

        <section className="app__cta">
          <div className="container">
            <div className="app__cta-content">
              <h2 className="app__cta-title">Ready to Book Your Skip?</h2>
              <p className="app__cta-description">
                Get in touch with our team for expert advice and same-day delivery.
              </p>
              <div className="app__cta-actions">
                <a href="tel:01234567890" className="app__cta-phone">
                  Call: 01234 567890
                </a>
                <a href="mailto:info@wewantwaste.co.uk" className="app__cta-email">
                  Email: info@wewantwaste.co.uk
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

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
