import React, { useState } from 'react';
import Button from '../ui/Button';
import './Header.css';

/**
 * Header Component - Modern navigation with eco-friendly branding
 * @param {Object} props - Component props
 * @param {string} props.postcode - Current service postcode
 * @param {Function} props.onPostcodeChange - Handler for postcode changes
 * @returns {React.ReactElement} Header component
 */
const Header = ({
  postcode = 'LE10 1SH',
  onPostcodeChange
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [postcodeInput, setPostcodeInput] = useState(postcode);

  const handlePostcodeSubmit = (e) => {
    e.preventDefault();
    if (onPostcodeChange && postcodeInput.trim()) {
      onPostcodeChange(postcodeInput.trim().toUpperCase());
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header" role="banner">
      <div className="header__container">
        {/* Logo/Brand */}
        <div className="header__brand">
          <div className="header__logo">
            <svg className="header__logo-icon" viewBox="0 0 40 40" fill="none">
              <rect
                x="8"
                y="20"
                width="24"
                height="12"
                rx="2"
                fill="var(--primary-500)"
                className="header__logo-container"
              />
              <rect
                x="8"
                y="20"
                width="24"
                height="3"
                rx="1"
                fill="var(--primary-700)"
              />
              <circle
                cx="20"
                cy="35"
                r="2"
                fill="var(--secondary-500)"
                className="header__logo-accent"
              />
              <path
                d="M12 16 Q20 8 28 16"
                stroke="var(--primary-400)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                className="header__logo-eco"
              />
            </svg>
          </div>
          
          <div className="header__brand-text">
            <h1 className="header__company-name">WeWantWaste</h1>
            <p className="header__tagline">wewantwaste.co.uk</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="header__nav" role="navigation">
          {/* Desktop Navigation */}
          <ul className="header__nav-list">
            <li className="header__nav-item">
              <a href="#services" className="header__nav-link">Services</a>
            </li>
            <li className="header__nav-item">
              <a href="#pricing" className="header__nav-link">Pricing</a>
            </li>
            <li className="header__nav-item">
              <a href="#about" className="header__nav-link">About</a>
            </li>
            <li className="header__nav-item">
              <a href="#contact" className="header__nav-link">Contact</a>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="header__menu-toggle"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            type="button"
          >
            <span className="header__menu-icon">
              <span className="header__menu-line"></span>
              <span className="header__menu-line"></span>
              <span className="header__menu-line"></span>
            </span>
          </button>
        </nav>

        {/* Service Area & Actions */}
        <div className="header__actions">
          {/* Postcode Checker */}
          <form className="header__postcode-form" onSubmit={handlePostcodeSubmit}>
            <div className="header__postcode-group">
              <label htmlFor="postcode-input" className="header__postcode-label">
                Service Area:
              </label>
              <input
                id="postcode-input"
                type="text"
                value={postcodeInput}
                onChange={(e) => setPostcodeInput(e.target.value)}
                placeholder="Enter postcode"
                className="header__postcode-input"
                maxLength="8"
              />
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="header__postcode-btn"
              >
                Check
              </Button>
            </div>
          </form>

          {/* Quote Button */}
          <Button
            variant="primary"
            size="sm"
            className="header__quote-btn"
          >
            Get Quote
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <>
          <div
            className="header__menu-overlay"
            onClick={closeMenu}
            aria-hidden="true"
          />
          
          <div className="header__mobile-menu">
            <nav className="header__mobile-nav" role="navigation">
              <ul className="header__mobile-nav-list">
                <li className="header__mobile-nav-item">
                  <a href="#services" className="header__mobile-nav-link" onClick={closeMenu}>
                    Services
                  </a>
                </li>
                <li className="header__mobile-nav-item">
                  <a href="#pricing" className="header__mobile-nav-link" onClick={closeMenu}>
                    Pricing
                  </a>
                </li>
                <li className="header__mobile-nav-item">
                  <a href="#about" className="header__mobile-nav-link" onClick={closeMenu}>
                    About
                  </a>
                </li>
                <li className="header__mobile-nav-item">
                  <a href="#contact" className="header__mobile-nav-link" onClick={closeMenu}>
                    Contact
                  </a>
                </li>
              </ul>
              
              <div className="header__mobile-actions">
                <Button
                  variant="primary"
                  fullWidth
                  onClick={closeMenu}
                >
                  Get Quote
                </Button>
              </div>
            </nav>
          </div>
        </>
      )}

      {/* Service Area Info */}
      <div className="header__service-info">
        <div className="header__container">
          <div className="header__service-badge">
            <svg className="header__service-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
            <span className="header__service-text">
              Serving {postcode} and surrounding areas
            </span>
          </div>
          
          <div className="header__service-features">
            <span className="header__service-feature">
              <svg className="header__feature-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Free Delivery
            </span>
            
            <span className="header__service-feature">
              <svg className="header__feature-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Same Day Service
            </span>
            
            <span className="header__service-feature">
              <svg className="header__feature-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Eco-Friendly
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;