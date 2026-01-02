import { useContext } from "react";
import {StoreContext} from '../app/store.jsx';
import {useProducts} from "../hooks/useProducts.js";
import FiltersSidebar from "../components/filters/FiltersSidebar.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";
import Pagination from "../components/product/Pagination.jsx";
import ActiveFilters from "../components/filters/ActiveFilters.jsx";

export default function Products(){
  const { state } = useContext(StoreContext);
  const {data, isLoading, isError, error, isFetching} = useProducts(state);

  console.log('Products Page - data:', data, 'isLoading:', isLoading, 'isError:', isError);

  if(isLoading){
    return <p>Loading products...</p>
  }

  if(isError){
    return <p>Error loading products: {error?.message || 'Unknown error'}</p>
  }

  return(
    <div style={{display: 'flex', gap: '20px', padding: '20px'}}>
      <FiltersSidebar />
      <div style={{flex:1}}>
        <ActiveFilters />
        <ProductGrid products={data || []} />
        <Pagination />
        {isFetching && <p style={{textAlign: 'center', color: '#666'}}>Updating results...</p>}
      </div>
    </div>
  )
  }