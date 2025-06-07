import React from 'react';
import './Button.css';

/**
 * Reusable Button Component
 * @param {Object} props - Button props
 * @param {string} props.variant - Button variant ('primary', 'secondary', 'outline', 'ghost', 'danger')
 * @param {string} props.size - Button size ('sm', 'md', 'lg')
 * @param {boolean} props.disabled - Whether button is disabled
 * @param {boolean} props.loading - Whether button is in loading state
 * @param {string} props.fullWidth - Whether button takes full width
 * @param {React.ReactNode} props.children - Button content
 * @param {React.ReactNode} props.leftIcon - Icon to display on the left
 * @param {React.ReactNode} props.rightIcon - Icon to display on the right
 * @param {string} props.className - Additional CSS classes
 * @param {Function} props.onClick - Click handler
 * @returns {React.ReactElement} Button component
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  children,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseClass = 'btn';
  const variantClass = `btn--${variant}`;
  const sizeClass = `btn--${size}`;
  const disabledClass = disabled || loading ? 'btn--disabled' : '';
  const loadingClass = loading ? 'btn--loading' : '';
  const fullWidthClass = fullWidth ? 'btn--full-width' : '';

  const buttonClasses = [
    baseClass,
    variantClass,
    sizeClass,
    disabledClass,
    loadingClass,
    fullWidthClass,
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (disabled || loading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="btn__spinner" aria-hidden="true">
          <svg className="btn__spinner-icon" viewBox="0 0 24 24">
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
        </span>
      )}
      
      {leftIcon && !loading && (
        <span className="btn__icon btn__icon--left" aria-hidden="true">
          {leftIcon}
        </span>
      )}
      
      <span className={`btn__content ${loading ? 'btn__content--loading' : ''}`}>
        {children}
      </span>
      
      {rightIcon && !loading && (
        <span className="btn__icon btn__icon--right" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;