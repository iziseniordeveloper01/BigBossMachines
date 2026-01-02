import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchAttributes, fetchAttributeTerms } from "../api/products.api";

// Hook to fetch all categories
export function useCategories() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: fetchCategories,
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    });
}

// Hook to fetch all product attributes
export function useAttributes() {
    return useQuery({
        queryKey: ["attributes"],
        queryFn: fetchAttributes,
        staleTime: 1000 * 60 * 5,
    });
}

// Hook to fetch terms for a specific attribute
export function useAttributeTerms(attributeId) {
    return useQuery({
        queryKey: ["attributeTerms", attributeId],
        queryFn: () => fetchAttributeTerms(attributeId),
        enabled: !!attributeId, // Only fetch if attributeId exists
        staleTime: 1000 * 60 * 5,
    });
}
