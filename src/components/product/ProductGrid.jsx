import { memo } from "react";
import ProductCard from "./ProductCard.jsx";
function ProductGrid({ products }) {
  if (!Array.isArray(products)) {
    console.error('ProductGrid received non-array products:', products);
    return <p>Error: Products data is not in the expected format</p>;
  }

  if (products.length === 0) {
    return <p>No products found</p>;
  }

  return (
    <div className="grid">
      {products.map(p => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export default memo(ProductGrid);