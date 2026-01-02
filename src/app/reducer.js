export const initialState = {
  filters: {
    // Dynamic filters will be added here automatically
    // Single value: category: "18"
    // Multiple values: pa_engine-type: ["diesel", "electric"]
  },
  page: 1,
  perPage: 12,
};

export function productsReducer(state, action) {
  switch (action.type) {
    case "SET_FILTER":
      // Merge new filter values
      const newFilters = { ...state.filters, ...action.payload };

      // Clean up null, empty string, and empty array values
      Object.keys(newFilters).forEach(key => {
        const value = newFilters[key];
        if (
          value === null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0)
        ) {
          delete newFilters[key];
        }
      });

      return {
        ...state,
        filters: newFilters,
        page: 1, // Reset to page 1 when filters change
      };

    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };

    case 'RESET_FILTERS':
      return {
        ...initialState,
        filters: {}, // Clear all filters
      };

    default:
      return state;
  }
}
