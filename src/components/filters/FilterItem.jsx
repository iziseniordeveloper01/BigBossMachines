import { useContext } from 'react';
import { StoreContext } from '../../app/store';

export default function FilterItem({ label, filterKey, options, isLoading }) {
  const { state, dispatch } = useContext(StoreContext);

  function handleChange(e) {
    dispatch({
      type: 'SET_FILTER',
      payload: { [filterKey]: e.target.value || null }
    });
  }

  if (isLoading) {
    return (
      <div style={{ marginBottom: '15px' }}>
        <label>
          {label}
          <select disabled>
            <option>Loading...</option>
          </select>
        </label>
      </div>
    );
  }

  if (!options || options.length === 0) {
    return null;
  }

  return (
    <div style={{ marginBottom: '15px' }}>
      <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
        {label}
      </label>
      <select
        onChange={handleChange}
        value={state.filters[filterKey] || ''}
        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="">All {label}</option>
        {options.map((option) => (
          <option key={option.id || option.slug} value={option.id || option.slug}>
            {option.name} {option.count ? `(${option.count})` : ''}
          </option>
        ))}
      </select>
    </div>
  );
}