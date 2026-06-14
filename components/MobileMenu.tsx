"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="md:hidden" onClick={() => setOpen(true)}>
        <Menu />
      </button>

      {open && (
        <div className="fixed inset-0 bg-white z-50 p-8">
          <div className="flex justify-end">
            <button onClick={() => setOpen(false)}>
              <X />
            </button>
          </div>

          <nav className="flex flex-col gap-6 mt-10 text-xl">
            <Link href="/" onClick={() => setOpen(false)}>Home</Link>
            <Link href="/lehengas" onClick={() => setOpen(false)}>Lehengas</Link>
            <Link href="/bridal-blouses" onClick={() => setOpen(false)}>Bridal Blouses</Link>
            <Link href="/maggam-works" onClick={() => setOpen(false)}>Maggam Works</Link>
            <Link href="/two-minute-sarees" onClick={() => setOpen(false)}>2 Minute Sarees</Link>
            <Link href="/party-wears" onClick={() => setOpen(false)}>Party Wears</Link>
            <Link href="/cart" onClick={() => setOpen(false)}>Cart</Link>
            <Link href="/wishlist" onClick={() => setOpen(false)}>Wishlist</Link>
          </nav>
        </div>
      )}
    </>
  );
}
