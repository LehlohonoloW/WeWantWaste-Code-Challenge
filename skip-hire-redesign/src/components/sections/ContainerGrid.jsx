import React from 'react';
import ContainerCard from '../cards/ContainerCard';
import './ContainerGrid.css';

/**
 * Container Grid Component - Responsive grid layout for container cards
 * @param {Object} props - Component props
 * @param {Array} props.containers - Array of container objects
 * @param {Object} props.selectedContainer - Currently selected container
 * @param {Function} props.onSelectContainer - Handler for container selection
 * @param {boolean} props.loading - Whether data is loading
 * @param {string} props.emptyMessage - Message to show when no containers
 * @returns {React.ReactElement} ContainerGrid component
 */
const ContainerGrid = ({
  containers = [],
  selectedContainer = null,
  onSelectContainer,
  loading = false,
  emptyMessage = "No containers found matching your criteria."
}) => {
  // Helper function to check if container is selected
  const isContainerSelected = (container) => {
    return selectedContainer?.id === container.id;
  };


  // Loading state
  if (loading) {
    return (
      <div className="container-grid container-grid--loading">
        <div className="container-grid__loading">
          <div className="container-grid__spinner" aria-hidden="true">
            <svg className="container-grid__spinner-icon" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="32"
                strokeDashoffset="32"
              />
            </svg>
          </div>
          <p className="container-grid__loading-text">Loading containers...</p>
        </div>
      </div>
    );
  }

  // Empty state
  if (!containers || containers.length === 0) {
    return (
      <div className="container-grid container-grid--empty">
        <div className="container-grid__empty">
          <div className="container-grid__empty-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2"/>
              <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" strokeWidth="2"/>
              <path d="M8 14h8" strokeWidth="2"/>
            </svg>
          </div>
          <h3 className="container-grid__empty-title">No Containers Available</h3>
          <p className="container-grid__empty-message">{emptyMessage}</p>
          <div className="container-grid__empty-suggestions">
            <p className="container-grid__empty-suggestion">Try adjusting your filters or search criteria</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="container-grid" aria-label="Available skip containers">
      <div className="container-grid__header">
        <div className="container-grid__title-section">
          <h2 className="container-grid__title">
            Available Skip Containers
            <span className="container-grid__count">({containers.length})</span>
          </h2>
          <p className="container-grid__subtitle">
            Choose the perfect size for your project. All prices include VAT and 14-day hire period.
          </p>
        </div>
        
        <div className="container-grid__badges">
          <div className="container-grid__badge">
            <svg className="container-grid__badge-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Same Day Delivery</span>
          </div>
          <div className="container-grid__badge">
            <svg className="container-grid__badge-icon" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Licensed & Insured</span>
          </div>
        </div>
      </div>

      <div className="container-grid__grid">
        {containers.map((container, index) => (
          <div
            key={container.id}
            className="container-grid__item"
            style={{
              animationDelay: `${index * 50}ms`
            }}
          >
            <ContainerCard
              container={container}
              isSelected={isContainerSelected(container)}
              onSelect={onSelectContainer}
            />
          </div>
        ))}
      </div>

      {/* Grid Statistics */}
      <div className="container-grid__stats">
        <div className="container-grid__stat">
          <span className="container-grid__stat-label">Total Options:</span>
          <span className="container-grid__stat-value">{containers.length}</span>
        </div>
        
        {selectedContainer && (
          <div className="container-grid__stat">
            <span className="container-grid__stat-label">Selected:</span>
            <span className="container-grid__stat-value">
              {selectedContainer.size} Yard Skip
            </span>
          </div>
        )}
        
      </div>
    </section>
  );
};

export default ContainerGrid;