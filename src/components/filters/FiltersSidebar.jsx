import { useContext } from "react";
import { StoreContext } from "../../app/store";
import { useCategories, useAttributes } from "../../hooks/useFilters";
import CheckboxFilter from "./CheckboxFilter";
import AttributeFilter from "./AttributeFilter";

export default function FiltersSidebar() {
  const { state, dispatch } = useContext(StoreContext);
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { data: attributes, isLoading: attributesLoading } = useAttributes();

  function resetFilters() {
    dispatch({ type: "RESET_FILTERS" });
  }

  // Count active filters
  const activeFilterCount = Object.keys(state.filters).filter(
    key => state.filters[key] && (Array.isArray(state.filters[key]) ? state.filters[key].length > 0 : true)
  ).length;

  return (
    <aside style={{
      width: "280px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      maxHeight: '90vh',
      overflowY: 'auto'
    }}>
      <div style={{ position: 'sticky', top: 0, backgroundColor: '#f9f9f9', paddingBottom: '10px', zIndex: 1 }}>
        <h3 style={{ marginTop: 0, marginBottom: "10px" }}>
          Filters
          {activeFilterCount > 0 && (
            <span style={{
              marginLeft: '8px',
              backgroundColor: '#4CAF50',
              color: 'white',
              borderRadius: '12px',
              padding: '2px 8px',
              fontSize: '12px',
              fontWeight: 'normal'
            }}>
              {activeFilterCount}
            </span>
          )}
        </h3>
      </div>

      {/* Category Filter */}
      <CheckboxFilter
        label="Categories"
        filterKey="category"
        options={categories || []}
        isLoading={categoriesLoading}
      />

      {/* Dynamic Attribute Filters */}
      {!attributesLoading && attributes?.map((attribute) => (
        <AttributeFilter key={attribute.id} attribute={attribute} />
      ))}

      {/* Clear Filters Button */}
      {activeFilterCount > 0 && (
        <button
          onClick={resetFilters}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#ff6b6b",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "10px",
            transition: 'background-color 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ff5252'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ff6b6b'}
        >
          Clear All Filters ({activeFilterCount})
        </button>
      )}
    </aside>
  );
}
