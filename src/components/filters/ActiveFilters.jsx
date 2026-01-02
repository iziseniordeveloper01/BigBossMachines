import { useContext } from 'react';
import { StoreContext } from '../../app/store';
import { useCategories, useAttributes } from '../../hooks/useFilters';
import { useAttributeTerms } from '../../hooks/useFilters';

// Component to show a single active filter chip
function FilterChip({ label, onRemove }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      backgroundColor: '#e3f2fd',
      color: '#1976d2',
      padding: '4px 12px',
      borderRadius: '16px',
      fontSize: '13px',
      marginRight: '8px',
      marginBottom: '8px',
      border: '1px solid #90caf9'
    }}>
      {label}
      <button
        onClick={onRemove}
        style={{
          marginLeft: '6px',
          background: 'none',
          border: 'none',
          color: '#1976d2',
          cursor: 'pointer',
          fontSize: '16px',
          padding: 0,
          lineHeight: 1,
          fontWeight: 'bold'
        }}
        title="Remove filter"
      >
        ×
      </button>
    </span>
  );
}

export default function ActiveFilters() {
  const { state, dispatch } = useContext(StoreContext);
  const { data: categories } = useCategories();
  const { data: attributes } = useAttributes();

  // Helper function to get label for a filter value
  function getFilterLabel(key, value) {
    // Handle categories
    if (key === 'category' && categories) {
      const category = categories.find(c => String(c.id) === String(value));
      return category ? category.name : value;
    }

    // Handle attributes
    if (key.startsWith('pa_') && attributes) {
      const attributeSlug = key.replace('pa_', '');
      const attribute = attributes.find(a => a.slug === attributeSlug);

      if (attribute) {
        // You'd need to fetch terms to get the label - for now just return the value
        return value;
      }
    }

    return value;
  }

  function removeFilter(key, valueToRemove = null) {
    const currentValue = state.filters[key];

    if (valueToRemove !== null && Array.isArray(currentValue)) {
      // Remove specific value from array
      const newValues = currentValue.filter(v => v !== valueToRemove);
      dispatch({
        type: 'SET_FILTER',
        payload: { [key]: newValues.length > 0 ? newValues : null }
      });
    } else {
      // Remove entire filter
      dispatch({
        type: 'SET_FILTER',
        payload: { [key]: null }
      });
    }
  }

  // Get all active filters
  const activeFilters = [];
  Object.keys(state.filters).forEach(key => {
    const value = state.filters[key];
    if (value) {
      if (Array.isArray(value)) {
        // Multiple values - create chip for each
        value.forEach(val => {
          activeFilters.push({
            key,
            value: val,
            label: getFilterLabel(key, val),
            filterKey: key
          });
        });
      } else {
        // Single value
        activeFilters.push({
          key,
          value,
          label: getFilterLabel(key, value),
          filterKey: key
        });
      }
    }
  });

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div style={{
      padding: '12px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      marginBottom: '16px',
      border: '1px solid #e0e0e0'
    }}>
      <div style={{
        fontSize: '13px',
        fontWeight: 'bold',
        marginBottom: '8px',
        color: '#666'
      }}>
        Active Filters:
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {activeFilters.map((filter, index) => (
          <FilterChip
            key={`${filter.key}-${filter.value}-${index}`}
            label={filter.label}
            onRemove={() => removeFilter(filter.filterKey, filter.value)}
          />
        ))}
      </div>
    </div>
  );
}
