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

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Men's Kurta", href: "/products?category=Men" },
    { name: "Women's Wear", href: "/products?category=Women" },
    { name: "Peshawari Chappal", href: "/products?category=Footwear" },
    { name: "Electronics", href: "/products?category=Electronics" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/40 shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 text-xs md:text-sm text-center font-medium tracking-wide">
        <span>Free Delivery all over Pakistan on orders above Rs. 2,000</span>
      </div>

      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Mobile Menu & Logo */}
          <div className="flex items-center gap-4">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
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
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>

            <Link href="/" className="font-display text-2xl md:text-3xl font-bold text-primary tracking-tight">
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
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex relative w-60">
              <Input 
                placeholder="Search products..." 
                className="pl-9 h-9 bg-muted/30 border-primary/20 focus:border-primary" 
              />
              <Search className="h-4 w-4 absolute left-3 top-2.5 text-muted-foreground" />
            </div>

            <Button variant="ghost" size="icon" className="hidden sm:flex">
              <Heart className="h-5 w-5 text-foreground/70" />
            </Button>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5 text-foreground/70" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm">
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
