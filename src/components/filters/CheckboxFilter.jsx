import { useContext } from 'react';
import { StoreContext } from '../../app/store';

export default function CheckboxFilter({ label, filterKey, options, isLoading }) {
  const { state, dispatch } = useContext(StoreContext);

  // Get current selected values (array)
  const selectedValues = state.filters[filterKey] || [];

  function handleChange(value) {
    let newValues;

    if (selectedValues.includes(value)) {
      // Remove if already selected
      newValues = selectedValues.filter(v => v !== value);
    } else {
      // Add if not selected
      newValues = [...selectedValues, value];
    }

    // Dispatch with array or null if empty
    dispatch({
      type: 'SET_FILTER',
      payload: { [filterKey]: newValues.length > 0 ? newValues : null }
    });
  }

  if (isLoading) {
    return (
      <div style={{ marginBottom: '20px' }}>
        <h4 style={{ marginBottom: '10px', fontSize: '14px', fontWeight: 'bold' }}>
          {label}
        </h4>
        <p style={{ fontSize: '12px', color: '#666' }}>Loading...</p>
      </div>
    );
  }

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: '20px' }}>
      <h4 style={{
        marginBottom: '10px',
        marginTop: 0,
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#333'
      }}>
        {label}
      </h4>
      <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '5px' }}>
        {options.map((option) => {
          const value = String(option.id || option.slug);
          const isChecked = selectedValues.includes(value);

          return (
            <label
              key={value}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '8px',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => handleChange(value)}
                style={{
                  marginRight: '8px',
                  cursor: 'pointer',
                  width: '16px',
                  height: '16px'
                }}
              />
              <span style={{ fontSize: '13px', color: '#555', flex: 1 }}>
                {option.name}
              </span>
              {option.count !== undefined && (
                <span style={{
                  fontSize: '11px',
                  color: '#999',
                  marginLeft: '4px'
                }}>
                  ({option.count})
                </span>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}
