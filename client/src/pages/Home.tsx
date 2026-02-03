import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const { data: products, isLoading } = useProducts();

  // Filter products for sections
  const featuredProducts = products?.slice(0, 4) || [];
  const newArrivals = products?.slice(4, 8) || [];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[650px] md:h-[800px] flex items-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/hero-pakistani-fashion.png" 
              alt="High-end Pakistani Fashion" 
              className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
          
          <div className="container-custom relative z-10 text-white">
            <div className="max-w-3xl animate-in fade-in slide-in-from-left-8 duration-1000 text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/20 border border-secondary/30 backdrop-blur-md mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-secondary font-bold tracking-widest text-xs uppercase">Premium Summer 2024</span>
              </div>
              <h1 className="font-display text-6xl md:text-8xl font-bold mb-6 leading-[1.1] tracking-tight text-left">
                Authentic <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary via-secondary/80 to-secondary/40">
                  Heritage
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-10 leading-relaxed max-w-xl font-light text-left">
                Experience the soul of Pakistan through our curated collection of artisanal Kurtas, luxury fabrics, and handcrafted footwear.
              </p>
              <div className="flex flex-wrap gap-6 items-center justify-start">
                <Link href="/products">
                  <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-10 h-14 rounded-full text-lg shadow-[0_0_20px_rgba(var(--secondary),0.3)] hover:scale-105 transition-all duration-300">
                    Explore Shop
                  </Button>
                </Link>
                <Link href="/products?category=Men">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white hover:text-black font-semibold px-10 h-14 rounded-full text-lg backdrop-blur-sm transition-all duration-300">
                    Men's Edit
                  </Button>
                </Link>
              </div>
              
              <div className="mt-12 flex items-center gap-8 pt-12 border-t border-white/10">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-muted" />
                  ))}
                </div>
                <p className="text-sm text-white/60">
                  <span className="text-white font-bold">10k+</span> Happy Customers <br /> across Pakistan
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features / USPs */}
        <section className="py-12 border-b border-border/50 bg-muted/20">
          <div className="container-custom grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Nationwide Delivery</h3>
                <p className="text-muted-foreground text-sm">Free shipping on orders over Rs. 2,000 anywhere in Pakistan.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Authentic Quality</h3>
                <p className="text-muted-foreground text-sm">100% original products sourced directly from artisans.</p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 p-4">
              <div className="bg-primary/10 p-3 rounded-full text-primary">
                <RefreshCw className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">Easy Returns</h3>
                <p className="text-muted-foreground text-sm">7-day hassle-free return policy for your peace of mind.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Categories */}
        <section className="py-20">
          <div className="container-custom">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Shop by Category</h2>
                <p className="text-muted-foreground">Curated collections for every occasion</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Category 1 */}
              <Link href="/products?category=Men" className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer">
                {/* Unsplash image: Man in Kurta */}
                <img 
                  src="https://images.unsplash.com/photo-1560243563-062bfc001d68?q=80&w=2070&auto=format&fit=crop" 
                  alt="Men's Collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-white text-2xl font-bold font-display mb-2 group-hover:text-secondary transition-colors">Men's Eastern</h3>
                  <div className="flex items-center text-white/80 gap-2 group-hover:translate-x-2 transition-transform">
                    <span>Explore</span> <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* Category 2 */}
              <Link href="/products?category=Women" className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer lg:col-span-2">
                 {/* Unsplash image: Woman in Shalwar Kameez / Eastern wear */}
                 <img 
                  src="https://images.unsplash.com/photo-1627225924765-552d49cf474d?q=80&w=2070&auto=format&fit=crop" 
                  alt="Women's Collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-white text-2xl font-bold font-display mb-2 group-hover:text-secondary transition-colors">Women's Unstitched</h3>
                  <div className="flex items-center text-white/80 gap-2 group-hover:translate-x-2 transition-transform">
                    <span>Shop Now</span> <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
              
               {/* Category 3 */}
               <Link href="/products?category=Footwear" className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer lg:col-span-2">
                {/* Unsplash image: Leather shoes / Chappal */}
                <img 
                  src="https://images.unsplash.com/photo-1617614246835-08e0f612d334?q=80&w=2070&auto=format&fit=crop" 
                  alt="Footwear Collection"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-white text-2xl font-bold font-display mb-2 group-hover:text-secondary transition-colors">Handcrafted Footwear</h3>
                  <div className="flex items-center text-white/80 gap-2 group-hover:translate-x-2 transition-transform">
                    <span>View Collection</span> <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>

              {/* Category 4 */}
              <Link href="/products?category=Electronics" className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer">
                 {/* Unsplash image: Modern gadgets */}
                 <img 
                  src="https://images.unsplash.com/photo-1498049860654-af1a5c5668ba?q=80&w=2070&auto=format&fit=crop" 
                  alt="Electronics"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <h3 className="text-white text-2xl font-bold font-display mb-2 group-hover:text-secondary transition-colors">Tech & Gadgets</h3>
                  <div className="flex items-center text-white/80 gap-2 group-hover:translate-x-2 transition-transform">
                    <span>Browse</span> <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-muted/30">
          <div className="container-custom">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">Best Sellers</h2>
                <p className="text-muted-foreground">Our most loved items this season</p>
              </div>
              <Link href="/products">
                <Button variant="outline" className="hidden md:flex">View All Products</Button>
              </Link>
            </div>

            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            
            <div className="mt-10 text-center md:hidden">
              <Link href="/products">
                <Button variant="outline" size="lg" className="w-full">View All Products</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter / CTA */}
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10 pattern-dots" /> {/* Assuming a pattern class or just use opacity */}
          <div className="container-custom relative z-10 text-center max-w-2xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">Join the PakEcom Family</h2>
            <p className="text-white/80 text-lg mb-8">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <div className="flex gap-2 flex-col sm:flex-row">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 h-12 px-6 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
              <Button size="lg" className="rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-8 h-12">
                Subscribe
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
