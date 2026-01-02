const BASE_URL = import.meta.env.VITE_BASE_URL;
const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;
// Helper function to add auth params
function getAuthParams() {
    return {
        consumer_key: CONSUMER_KEY,
        consumer_secret: CONSUMER_SECRET
    };
}

export async function fetchProducts({filters, page, perPage}) {
    try {
        const params = new URLSearchParams({
            page,
            per_page: perPage,
            ...getAuthParams()
        });

        // Handle category filter (can be single value or array)
        if(filters.category){
            const categories = Array.isArray(filters.category) ? filters.category : [filters.category];
            // WooCommerce accepts comma-separated category IDs
            params.append('category', categories.join(','));
        }

        // Handle dynamic attribute filters (can be single value or array)
        Object.keys(filters).forEach(key => {
            if (key.startsWith('pa_') && filters[key]) {
                const values = Array.isArray(filters[key]) ? filters[key] : [filters[key]];

                // For multiple values of the same attribute, use comma-separated terms
                params.append('attribute', key);
                params.append('attribute_term', values.join(','));
            }
        });

        const url = `${BASE_URL}/products?${params}`;
        console.log('Fetching products from:', url);
        console.log('Filters being applied:', filters);

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Products response:', data);
        return data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }
}

// Fetch product categories
export async function fetchCategories() {
    try {
        const params = new URLSearchParams({
            per_page: 100,
            ...getAuthParams()
        });

        const url = `${BASE_URL}/products/categories?${params}`;
        console.log('Fetching categories from:', url);

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Categories response:', data);
        return data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw error;
    }
}

// Fetch product attributes (like engine-type, weight, etc.)
export async function fetchAttributes() {
    try {
        const params = new URLSearchParams(getAuthParams());

        const url = `${BASE_URL}/products/attributes?${params}`;
        console.log('Fetching attributes from:', url);

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Attributes response:', data);
        return data;
    } catch (error) {
        console.error("Error fetching attributes:", error);
        throw error;
    }
}

// Fetch terms for a specific attribute (e.g., all engine types)
export async function fetchAttributeTerms(attributeId) {
    try {
        const params = new URLSearchParams({
            per_page: 100,
            ...getAuthParams()
        });

        const url = `${BASE_URL}/products/attributes/${attributeId}/terms?${params}`;
        console.log('Fetching attribute terms from:', url);

        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        console.log('Attribute terms response:', data);
        return data;
    } catch (error) {
        console.error("Error fetching attribute terms:", error);
        throw error;
    }
}