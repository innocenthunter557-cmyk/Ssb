"use client";
import Link from "next/link";
import { Heart, ShoppingCart, Search } from "lucide-react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-gold">
          Sri Sai Boutique
        </Link>

        <nav className="hidden md:flex gap-6">
          <Link href="/">Home</Link>
          <Link href="/collections">Collections</Link>
          <Link href="/wishlist">Wishlist</Link>
          <Link href="/cart">Cart</Link>
        </nav>

        <div className="flex gap-4 items-center">
          <Search size={20} />
          <Heart size={20} />
          <Link href="/cart"><ShoppingCart size={20} /></Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
