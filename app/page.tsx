"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingBag,
  Heart,
  Home,
  Grid3X3,
  Phone,
  X,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Share2,
  Star,
  MessageSquare
} from "lucide-react";

/* =========================================
   CATEGORIES
========================================= */
const categories = [
  {
    id: 1,
    name: "Blouses",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Bridal Blouses",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Lehengas",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Maggam Works",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Punjabi Suits",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "2 Minute Sarees",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 7,
    name: "Crop Tops",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 8,
    name: "Frocks",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 9,
    name: "Family Set",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=400&auto=format&fit=crop",
  },
];

/* =========================================
   PRODUCTS
========================================= */
const products = [
  {
    id: 1,
    code: "SSB001",
    name: "Royal Silk Saree",
    price: 3499,
    category: "2 Minute Sarees",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 2,
    code: "SSB002",
    name: "Bridal Lehenga",
    price: 8999,
    category: "Lehengas",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 3,
    code: "SSB003",
    name: "Designer Blouse",
    price: 1499,
    category: "Blouses",
    image: "https://images.unsplash.com/photo-1617038220319-276d3cfab638?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 4,
    code: "SSB004",
    name: "Party Crop Top",
    price: 999,
    category: "Crop Tops",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 5,
    code: "SSB005",
    name: "Punjabi Suit Set",
    price: 2499,
    category: "Punjabi Suits",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: 6,
    code: "SSB006",
    name: "Kids Frock",
    price: 799,
    category: "Frocks",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
  },
];

/* =========================================
   REVIEWS DATA (Easy to edit or add new ones)
========================================= */
const reviews = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    date: "2 days ago",
    comment: "Absolutely in love with the Maggam work blouse! The detailing is incredibly neat, and it fits perfectly. Will definitely order again.",
  },
  {
    id: 2,
    name: "Anjali Reddy",
    rating: 5,
    date: "1 week ago",
    comment: "Bought a 2-minute saree for an urgent family gathering. It was so fast to drape and looked extremely elegant. Highly recommend Sri Sai Boutique!",
  },
  {
    id: 3,
    name: "Meenakshi K.",
    rating: 4,
    date: "3 weeks ago",
    comment: "Excellent fabric quality and beautiful designs. The customer service on WhatsApp was very helpful with size adjustments.",
  },
];

const WHATSAPP_NUMBER = "918074723033";
const sizes = ["32", "36", "38", "40", "42", "44"];

type Product = (typeof products)[number];
type CartItem = Product & { quantity: number; size?: string };

export default function Page() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"home" | "categories" | "wishlist" | "contact">("home");

  useEffect(() => {
    if (selectedProduct) {
      setTimeout(() => setIsBottomSheetOpen(true), 50);
    }
  }, [selectedProduct]);

  const closeProductSheet = () => {
    setIsBottomSheetOpen(false);
    setTimeout(() => {
      setSelectedProduct(null);
      setSelectedSize(null);
    }, 300);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product, size?: string | null) => {
    const existingIndex = cart.findIndex(
      (item) => item.id === product.id && item.size === (size || undefined)
    );
    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { ...product, quantity: 1, size: size || undefined }]);
    }
  };

  const getItemQuantity = (productId: number) => {
    return cart
      .filter((item) => item.id === productId)
      .reduce((sum, item) => sum + item.quantity, 0);
  };

  const updateQuantity = (productId: number, delta: number, size?: string) => {
    const itemIndex = cart.findIndex(
      (item) => item.id === productId && item.size === size
    );
    if (itemIndex === -1) return;

    const newCart = [...cart];
    newCart[itemIndex].quantity += delta;

    if (newCart[itemIndex].quantity <= 0) {
      newCart.splice(itemIndex, 1);
    }
    setCart(newCart);
  };

  const toggleWishlist = (product: Product) => {
    if (wishlist.some((item) => item.id === product.id)) {
      setWishlist(wishlist.filter((item) => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const placeOrder = (product: Product, size?: string | null) => {
    const message = `*NEW ORDER - SRI SAI BOUTIQUE*\n\nProduct: ${product.name}\nProduct Code: ${product.code}\nPrice: Rs.${product.price}${size ? `\nSize: ${size}` : ""}\n\nHello, I want to order this product.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const placeCartOrder = () => {
    let orderText = `*NEW CART ORDER - SRI SAI BOUTIQUE*\n\n`;
    cart.forEach((item, index) => {
      orderText += `${index + 1}. ${item.name}\nCode: ${item.code}\nPrice: Rs.${item.price}\nQty: ${item.quantity}${item.size ? `\nSize: ${item.size}` : ""}\n\n`;
    });
    const total = cart.reduce((a, b) => a + b.price * b.quantity, 0);
    orderText += `Total: Rs.${total}\n\nHello, I want to place this order.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderText)}`, "_blank");
  };

  const cartTotal = cart.reduce((a, b) => a + b.price * b.quantity, 0);
  const cartItemCount = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <div className="bg-[#fcfbf7] min-h-screen pb-24 font-sans text-gray-800">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
        <div className="flex items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold tracking-wide text-gray-900 font-serif">Sri Sai Boutique</h1>
          <button onClick={() => setShowCart(true)} className="relative p-1.5 bg-gray-100 rounded-full text-gray-800">
            <ShoppingBag size={22} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] rounded-full h-4.5 w-4.5 flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center bg-gray-100/80 border border-gray-200/50 rounded-xl px-3 py-2.5">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search premium styles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none ml-2 text-sm w-full text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>
      </header>

      {/* CATEGORIES */}
      <section className="px-4 py-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 font-serif">Curated Collections</h2>
          {selectedCategory && (
            <button onClick={() => setSelectedCategory(null)} className="text-xs text-gray-500 underline font-medium">
              View All
            </button>
          )}
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
              className="flex flex-col items-center flex-shrink-0 snap-start"
            >
              <div className={`w-16 h-16 rounded-full overflow-hidden border-2 transition-all shadow-sm ${
                selectedCategory === category.name ? "border-gray-800 scale-105" : "border-gray-200"
              }`}>
                <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
              </div>
              <p className={`text-xs mt-2 font-medium transition-colors ${
                selectedCategory === category.name ? "text-gray-900 font-bold" : "text-gray-600"
              }`}>
                {category.name}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-4 py-2">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900 font-serif">
            {selectedCategory || "Exquisite Designs"}
          </h2>
          <span className="text-xs tracking-wider text-gray-400 font-medium uppercase">
            {filteredProducts.length} Pieces
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div className="relative aspect-[4/5] bg-gray-50 w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onClick={() => { setSelectedProduct(product); setSelectedSize(null); }}
                />
                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-2 right-2 rounded-full p-2 bg-white/80 backdrop-blur shadow-sm"
                >
                  <Heart
                    size={16}
                    className={wishlist.some((item) => item.id === product.id) ? "text-red-500 fill-red-500" : "text-gray-600"}
                  />
                </button>
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[10px] tracking-widest text-gray-400 font-mono uppercase mb-0.5">{product.code}</p>
                  <h3 className="text-sm font-medium text-gray-800 leading-snug truncate font-sans">{product.name}</h3>
                  <p className="text-sm font-bold text-gray-900 mt-1 font-serif">Rs.{product.price}</p>
                </div>

                <div className="mt-3">
                  {getItemQuantity(product.id) === 0 ? (
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-gray-900 text-white text-xs font-bold py-2.5 rounded-xl tracking-wider uppercase transition-all active:scale-95"
                    >
                      Add to Bag
                    </button>
                  ) : (
                    <div className="flex items-center justify-between bg-gray-100 border border-gray-300/60 rounded-xl overflow-hidden">
                      <button onClick={() => updateQuantity(product.id, -1)} className="p-2.5 text-gray-600 hover:bg-gray-200">
                        <Minus size={14} />
                      </button>
                      <span className="font-bold text-xs text-gray-900">{getItemQuantity(product.id)}</span>
                      <button onClick={() => addToCart(product)} className="p-2.5 text-gray-600 hover:bg-gray-200">
                        <Plus size={14} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          NEW REVIEWS SECTION (Luxury Bordered Panel)
      ========================================= */}
      <section className="mx-4 mt-8 mb-6 p-5 bg-white border border-gray-200/60 rounded-2xl shadow-sm">
        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare size={18} className="text-gray-700" />
            <h2 className="text-base font-bold text-gray-900 font-serif tracking-wide">Client Diarise & Reviews</h2>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
            <Star size={12} className="text-amber-500 fill-amber-400" />
            <span className="text-xs font-bold text-amber-800">4.9/5</span>
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-100/80 last:border-0 pb-3 last:pb-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-bold text-gray-800">{review.name}</h4>
                <span className="text-[10px] text-gray-400 font-medium">{review.date}</span>
              </div>
              <div className="flex gap-0.5 mb-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={11} 
                    className={i < review.rating ? "text-amber-500 fill-amber-400" : "text-gray-200"} 
                  />
                ))}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CART FLOATING BAR */}
      {cart.length > 0 && !showCart && !selectedProduct && (
        <div className="fixed bottom-20 left-4 right-4 z-40 animate-fade-in">
          <button
            onClick={() => setShowCart(true)}
            className="w-full bg-gray-900 text-white rounded-xl py-3.5 px-4 flex items-center justify-between shadow-xl"
          >
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold">
              <span>{cartItemCount} Items</span>
              <span className="opacity-40">|</span>
              <span>View Bag</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-sm font-serif">Rs.{cartTotal}</span>
              <ChevronRight size={16} />
            </div>
          </button>
        </div>
      )}

      {/* BOTTOM NAV BAR */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200/80 z-50">
        <div className="flex items-center justify-around py-2">
          <button onClick={() => { setActiveTab("home"); setShowWishlist(false); }} className="flex flex-col items-center py-1 px-3">
            <Home size={20} className={activeTab === "home" ? "text-gray-900" : "text-gray-400"} />
            <span className={`text-[10px] mt-1 font-bold uppercase tracking-widest ${activeTab === "home" ? "text-gray-900" : "text-gray-400"}`}>Home</span>
          </button>
          <button onClick={() => { setActiveTab("categories"); setShowWishlist(false); }} className="flex flex-col items-center py-1 px-3">
            <Grid3X3 size={20} className={activeTab === "categories" ? "text-gray-900" : "text-gray-400"} />
            <span className={`text-[10px] mt-1 font-bold uppercase tracking-widest ${activeTab === "categories" ? "text-gray-900" : "text-gray-400"}`}>Explore</span>
          </button>
          <button onClick={() => { setActiveTab("wishlist"); setShowWishlist(true); }} className="flex flex-col items-center py-1 px-3 relative">
            <Heart size={20} className={activeTab === "wishlist" ? "text-gray-900" : "text-gray-400"} />
            <span className={`text-[10px] mt-1 font-bold uppercase tracking-widest ${activeTab === "wishlist" ? "text-gray-900" : "text-gray-400"}`}>Saved</span>
          </button>
          <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank")} className="flex flex-col items-center py-1 px-3">
            <Phone size={20} className="text-gray-400" />
            <span className="text-[10px] mt-1 font-bold uppercase tracking-widest text-gray-400">Contact</span>
          </button>
        </div>
      </nav>

      {/* PRODUCT SHEET */}
      {selectedProduct && (
        <>
          <div className="fixed inset-0 z-50 bg-black/40 transition-opacity" onClick={closeProductSheet} />
          <div className={`fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl max-h-[85vh] transition-transform duration-300 ${isBottomSheetOpen ? "translate-y-0" : "translate-y-full"}`}>
            <div className="flex justify-center py-2.5"><div className="w-10 h-1 bg-gray-200 rounded-full" /></div>
            <div className="overflow-y-auto p-4 pb-24">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
              </div>
              <div className="mt-4">
                <p className="text-xs font-mono text-gray-400">{selectedProduct.code}</p>
                <h2 className="text-lg font-bold text-gray-900 font-serif mt-0.5">{selectedProduct.name}</h2>
                <p className="text-xl font-bold text-gray-900 font-serif mt-1">Rs.{selectedProduct.price}</p>
              </div>
              <div className="mt-5">
                <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-2">Select Measurement Size</h3>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(selectedSize === size ? null : size)}
                      className={`w-12 h-12 rounded-xl font-bold text-xs transition-all ${
                        selectedSize === size ? "bg-gray-900 text-white shadow-md" : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {size}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 flex gap-3">
              <button onClick={() => addToCart(selectedProduct, selectedSize)} className="flex-1 bg-gray-900 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider">
                Add To Shopping Bag
              </button>
              <button onClick={() => placeOrder(selectedProduct, selectedSize)} className="bg-emerald-600 text-white p-3.5 rounded-xl">
                WhatsApp Order
              </button>
            </div>
          </div>
        </>
      )}

      {/* CART MODAL */}
      {showCart && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end" onClick={() => setShowCart(false)}>
          <div className="w-full max-w-md bg-white h-full flex flex-col justify-between" onClick={(e) => e.stopPropagation()}>
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 font-serif">Shopping Bag</h2>
              <button onClick={() => setShowCart(false)}><X size={20} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cart.length === 0 ? (
                <p className="text-center text-gray-400 py-12 text-sm">Your shopping bag is empty.</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-gray-50 border border-gray-100 p-3 rounded-xl">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-xs truncate text-gray-800">{item.name}</h3>
                      <p className="text-[10px] text-gray-400">{item.code}{item.size ? ` (Size ${item.size})` : ""}</p>
                      <p className="font-bold text-gray-900 text-xs font-serif mt-0.5">Rs.{item.price * item.quantity}</p>
                    </div>
                    <div className="flex items-center bg-white border border-gray-200 rounded-lg">
                      <button onClick={() => updateQuantity(item.id, -1, item.size)} className="p-1.5"><Minus size={10} /></button>
                      <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                      <button onClick={() => addToCart(item, item.size)} className="p-1.5"><Plus size={10} /></button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                <div className="flex justify-between mb-4"><span className="text-sm font-medium text-gray-600">Total Bill</span><span className="text-lg font-bold font-serif text-gray-900">Rs.{cartTotal}</span></div>
                <button onClick={placeCartOrder} className="w-full bg-emerald-600 text-white py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold">
                  Send Order via WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
