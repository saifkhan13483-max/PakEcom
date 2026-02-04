import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, Search, Phone, Heart } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Header() {
  const [location] = useLocation();
  const cartItems = useCartStore((state) => state.items);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/40 shadow-sm">
      {/* Top Bar / Announcement Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-[10px] sm:text-xs md:text-sm text-center font-medium tracking-wide flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 px-4">
        <span>Free Delivery on Orders Over Rs. 2,000 | Cash on Delivery Available Across Pakistan</span>
        <div className="flex items-center gap-1">
          <Phone className="h-3 w-3" />
          <span>WhatsApp: +92 3XX XXXXXXX</span>
        </div>
      </div>

      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" data-testid="button-mobile-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-6 mt-10">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                      data-testid={`link-mobile-nav-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="font-display text-xl md:text-2xl lg:text-3xl font-bold text-primary tracking-tight" data-testid="link-logo">
              PakEcom
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === item.href ? "text-primary border-b-2 border-primary" : "text-muted-foreground"
                }`}
                data-testid={`link-desktop-nav-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className={`relative flex items-center transition-all duration-300 ${isSearchExpanded ? 'w-40 sm:w-60' : 'w-9'}`}>
              <Input 
                placeholder="Search..." 
                className={`pl-9 h-9 bg-muted/30 border-primary/20 focus:border-primary transition-all duration-300 ${isSearchExpanded ? 'opacity-100' : 'opacity-0'}`} 
                onBlur={() => setIsSearchExpanded(false)}
                autoFocus={isSearchExpanded}
                data-testid="input-search"
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-0 top-0 h-9 w-9"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                data-testid="button-search-toggle"
              >
                <Search className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>

            <Button variant="ghost" size="icon" className="hidden sm:flex" data-testid="button-wishlist">
              <Heart className="h-5 w-5 text-foreground/70" />
            </Button>

            <Link href="/cart" data-testid="link-cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 text-foreground/70" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm" data-testid="text-cart-count">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
