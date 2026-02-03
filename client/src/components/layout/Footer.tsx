import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-16 pb-8 mt-24">
      <div className="container-custom grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-4">
          <h3 className="font-display text-2xl font-bold text-white">PakEcom</h3>
          <p className="text-primary-foreground/80 text-sm leading-relaxed max-w-xs">
            Premium quality traditional and modern wear, delivered to your doorstep across Pakistan. Authenticity guaranteed.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="#" className="hover:text-secondary transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="hover:text-secondary transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="hover:text-secondary transition-colors"><Twitter className="w-5 h-5" /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-secondary">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/" className="hover:text-white/80 hover:translate-x-1 inline-block transition-all">Home</Link></li>
            <li><Link href="/products" className="hover:text-white/80 hover:translate-x-1 inline-block transition-all">Shop All</Link></li>
            <li><Link href="/about" className="hover:text-white/80 hover:translate-x-1 inline-block transition-all">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white/80 hover:translate-x-1 inline-block transition-all">Contact Support</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-secondary">Categories</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/products?category=Men" className="hover:text-white/80 hover:translate-x-1 inline-block transition-all">Men's Collection</Link></li>
            <li><Link href="/products?category=Women" className="hover:text-white/80 hover:translate-x-1 inline-block transition-all">Women's Wear</Link></li>
            <li><Link href="/products?category=Footwear" className="hover:text-white/80 hover:translate-x-1 inline-block transition-all">Traditional Footwear</Link></li>
            <li><Link href="/products?category=Electronics" className="hover:text-white/80 hover:translate-x-1 inline-block transition-all">Electronics</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-bold text-lg mb-6 text-secondary">Contact Us</h4>
          <ul className="space-y-4 text-sm">
            <li className="flex gap-3 items-start">
              <MapPin className="w-5 h-5 text-secondary shrink-0" />
              <span>Office 102, Blue Area,<br />Islamabad, Pakistan</span>
            </li>
            <li className="flex gap-3 items-center">
              <Phone className="w-5 h-5 text-secondary shrink-0" />
              <span>+92 300 1234567</span>
            </li>
            <li className="flex gap-3 items-center">
              <Mail className="w-5 h-5 text-secondary shrink-0" />
              <span>support@pakecom.pk</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-custom mt-16 pt-8 border-t border-primary-foreground/10 text-center text-xs text-primary-foreground/60">
        <p>&copy; {new Date().getFullYear()} PakEcom. All rights reserved. Designed with pride in Pakistan.</p>
      </div>
    </footer>
  );
}
