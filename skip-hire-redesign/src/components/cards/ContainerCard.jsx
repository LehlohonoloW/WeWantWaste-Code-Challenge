import React from 'react';
import { calculateContainerPrice, getCapacityDescription } from '../../utils/priceCalculations';
import Button from '../ui/Button';
import './ContainerCard.css';

/**
 * Container Card Component - Modern card design for skip containers
 * @param {Object} props - Component props
 * @param {Object} props.container - Container data object
 * @param {boolean} props.isSelected - Whether container is currently selected
 * @param {Function} props.onSelect - Handler for container selection
 * @returns {React.ReactElement} ContainerCard component
 */
const ContainerCard = ({
  container,
  isSelected = false,
  onSelect
}) => {
  const pricing = calculateContainerPrice(container);
  const capacityDescription = getCapacityDescription(container.size);
  
  // Determine if this is a popular size
  const isPopular = [6, 8, 12].includes(container.size);
  
  // Get project type recommendations based on size
  const getProjectTypes = (size) => {
    if (size <= 4) return ['Small garden cleanup', 'Bathroom renovation'];
    if (size <= 8) return ['Kitchen renovation', 'Small extension'];
    if (size <= 12) return ['House renovation', 'Garden landscaping'];
    if (size <= 20) return ['Large construction', 'House clearance'];
    return ['Commercial projects', 'Large construction'];
  };
  
  const projectTypes = getProjectTypes(container.size);

  const handleSelect = () => {
    if (onSelect) {
      onSelect(container);
    }
  };


  const cardClasses = [
    'container-card',
    isSelected ? 'container-card--selected' : ''
  ].filter(Boolean).join(' ');

  return (
    <article className={cardClasses} onClick={handleSelect}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="container-card__popular-badge">
          <span className="container-card__popular-text">Most Popular</span>
        </div>
      )}
      
      {/* Card Header */}
      <header className="container-card__header">
        <div className="container-card__size">
          <span className="container-card__size-number">{container.size}</span>
          <span className="container-card__size-unit">Yard Skip</span>
        </div>
        
        <div className="container-card__badges">
          {container.allowed_on_road && (
            <span className="container-card__badge container-card__badge--road">
              <svg className="container-card__badge-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Road Placement
            </span>
          )}
          
          {container.allows_heavy_waste && (
            <span className="container-card__badge container-card__badge--heavy">
              <svg className="container-card__badge-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Heavy Waste OK
            </span>
          )}
        </div>
      </header>

      {/* Visual Section */}
      <div className="container-card__visual">
        <div className="container-card__container-icon">
          <svg viewBox="0 0 200 120" className="container-card__container-svg">
            {/* Container visualization based on size */}
            <defs>
              <linearGradient id={`containerGradient-${container.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary-400)" />
                <stop offset="100%" stopColor="var(--primary-600)" />
              </linearGradient>
            </defs>
            
            {/* Base container shape */}
            <rect
              x="20"
              y={80 - (container.size * 2)}
              width={Math.min(160, 80 + container.size * 2)}
              height={container.size * 2}
              fill={`url(#containerGradient-${container.id})`}
              rx="4"
              className="container-card__container-shape"
            />
            
            {/* Container details */}
            <rect
              x="20"
              y={80 - (container.size * 2)}
              width={Math.min(160, 80 + container.size * 2)}
              height="8"
              fill="var(--primary-700)"
              rx="4"
              className="container-card__container-rim"
            />
          </svg>
        </div>
        
        <p className="container-card__capacity">{capacityDescription}</p>
        
        {/* Project Types */}
        <div className="container-card__project-types">
          <h4 className="container-card__project-title">Perfect for:</h4>
          <ul className="container-card__project-list">
            {projectTypes.map((type, index) => (
              <li key={index} className="container-card__project-item">
                <svg className="container-card__project-icon" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM6.5 5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm4.5 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm-.5 4a.5.5 0 01-.5.5h-3a.5.5 0 010-1h3a.5.5 0 01.5.5z"/>
                </svg>
                {type}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing Section */}
      <div className="container-card__pricing">
        <div className="container-card__price-main">
          <span className="container-card__price-total">{pricing.formattedTotal}</span>
          <span className="container-card__price-period">14 days hire</span>
        </div>
        
        <div className="container-card__price-breakdown">
          <div className="container-card__price-item">
            <span className="container-card__price-label">Base:</span>
            <span className="container-card__price-value">{pricing.formattedBase}</span>
          </div>
          <div className="container-card__price-item">
            <span className="container-card__price-label">VAT:</span>
            <span className="container-card__price-value">{pricing.formattedVAT}</span>
          </div>
        </div>

        {pricing.hasAdditionalCosts && (
          <div className="container-card__additional-costs">
            {pricing.additionalCosts.transport && (
              <div className="container-card__cost-item">
                <span className="container-card__cost-label">Transport:</span>
                <span className="container-card__cost-value">{pricing.additionalCosts.transport}</span>
              </div>
            )}
            {pricing.additionalCosts.perTonne && (
              <div className="container-card__cost-item">
                <span className="container-card__cost-label">Per tonne:</span>
                <span className="container-card__cost-value">{pricing.additionalCosts.perTonne}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Section */}
      <footer className="container-card__actions">
        <Button
          variant="primary"
          size="md"
          fullWidth
          onClick={handleSelect}
          className="container-card__select-btn"
        >
          {isSelected ? 'Selected' : 'Select This Skip'}
        </Button>
        
      </footer>

      {/* Selection Indicator */}
      {isSelected && (
        <div className="container-card__selection-indicator" aria-hidden="true">
          <svg className="container-card__check-icon" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}

    </article>
  );
};

export default ContainerCard;