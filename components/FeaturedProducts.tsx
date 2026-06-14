import ProductCard from "./ProductCard";
import { products } from "@/lib/products";

export default function FeaturedProducts() {
  return (
    <section id="collections" className="section">
      <h2 className="text-5xl text-center mb-10">Featured Collection</h2>
      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {products.slice(0, 6).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
