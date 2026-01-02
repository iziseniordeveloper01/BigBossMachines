import { memo } from "react";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.images?.[0]?.src}
        alt={product.name}
        loading="lazy"
      />

      <h4>{product.name}</h4>

      <p
        dangerouslySetInnerHTML={{
          __html: product.short_description
        }}
      />

      <button>Request Quote</button>
    </div>
  );
}

export default memo(ProductCard);
