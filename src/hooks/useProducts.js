import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {fetchProducts} from "../api/products.api";

export function useProducts(state){
    return useQuery({
        queryKey: ["products", state.filters, state.page],
        queryFn: () => fetchProducts({
            filters: state.filters,
            page: state.page,
            perPage: state.perPage
        }),
        placeholderData: keepPreviousData
    });
}