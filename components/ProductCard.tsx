import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden border border-gray-100">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-80 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.name}</h3>
        <p className="text-gold font-bold mt-1">₹{product.price}</p>
        <Link href={`/collections`} className="gold-btn mt-4 inline-block w-full text-center">
          View Details
        </Link>
      </div>
    </div>
  );
}
