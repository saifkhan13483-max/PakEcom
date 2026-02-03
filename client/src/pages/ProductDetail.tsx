import { useProduct } from "@/hooks/use-products";
import { useRoute, Link } from "wouter";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, Heart, Star, Share2, ShieldCheck, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProductDetail() {
  const [match, params] = useRoute("/products/:slug");
  const { data: product, isLoading, error } = useProduct(params?.slug || "");
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  if (isLoading) return <div className="min-h-screen bg-background"><Header /><main className="py-20"><LoadingSpinner /></main><Footer /></div>;
  
  if (error || !product) return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <h1 className="text-4xl font-display font-bold text-primary mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">We couldn't find the product you're looking for.</p>
        <Link href="/products"><Button size="lg">Continue Shopping</Button></Link>
      </main>
      <Footer />
    </div>
  );

  const displayImage = activeImage || product.image;
  const gallery = [product.image, ...(product.images || [])];

  const handleAddToCart = () => {
    // Add item 'quantity' times
    for(let i=0; i<quantity; i++) {
        addItem(product);
    }
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-primary">Shop</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Gallery */}
            <div className="space-y-6">
              <div className="aspect-[4/5] bg-muted rounded-2xl overflow-hidden border border-border shadow-sm">
                <img 
                  src={displayImage} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {gallery.length > 1 && (
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {gallery.map((img, idx) => (
                    <button 
                      key={idx} 
                      onClick={() => setActiveImage(img)}
                      className={`relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${displayImage === img ? "border-primary" : "border-transparent hover:border-primary/50"}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                    <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">{product.category}</Badge>
                    {product.inStock ? (
                         <span className="text-xs font-medium text-green-600 flex items-center gap-1">In Stock</span>
                    ) : (
                         <span className="text-xs font-medium text-destructive flex items-center gap-1">Out of Stock</span>
                    )}
                </div>
                
                <h1 className="font-display text-4xl font-bold text-foreground mb-3">{product.name}</h1>
                
                <div className="flex items-center gap-4 mb-6">
                   <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                            key={i}
                            className={`w-4 h-4 ${i < (product.rating || 5) ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`}
                        />
                        ))}
                   </div>
                   <span className="text-sm text-muted-foreground border-l border-border pl-4">{product.reviewCount || 0} Reviews</span>
                </div>

                <div className="flex items-end gap-3 mb-8">
                    <span className="text-4xl font-bold text-primary">Rs. {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                    <span className="text-xl text-muted-foreground line-through mb-1">Rs. {product.originalPrice.toLocaleString()}</span>
                    )}
                </div>

                <p className="text-muted-foreground leading-relaxed text-lg mb-8">
                    {product.description}
                </p>
              </div>

              {/* Actions */}
              <div className="border-t border-b border-border py-8 mb-8 space-y-6">
                 {/* Quantity */}
                 <div className="flex items-center gap-6">
                    <span className="font-bold text-sm">Quantity</span>
                    <div className="flex items-center border border-input rounded-full h-10">
                        <button 
                            className="w-10 h-full flex items-center justify-center hover:bg-muted rounded-l-full disabled:opacity-50"
                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                            disabled={quantity <= 1}
                        >
                            <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-medium">{quantity}</span>
                        <button 
                            className="w-10 h-full flex items-center justify-center hover:bg-muted rounded-r-full"
                            onClick={() => setQuantity(quantity + 1)}
                        >
                            <Plus className="w-3 h-3" />
                        </button>
                    </div>
                 </div>

                 <div className="flex gap-4">
                    <Button 
                        size="lg" 
                        className="flex-1 rounded-full h-12 text-base font-bold shadow-lg shadow-primary/20"
                        onClick={handleAddToCart}
                        disabled={!product.inStock}
                    >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                    </Button>
                    <Button size="icon" variant="outline" className="h-12 w-12 rounded-full border-border hover:border-primary hover:text-primary transition-colors">
                        <Heart className="w-5 h-5" />
                    </Button>
                 </div>
              </div>

              {/* Features / Meta */}
              <div className="space-y-4">
                 <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                        <h4 className="font-bold text-sm">Free Delivery</h4>
                        <p className="text-sm text-muted-foreground">On all orders above Rs. 2,000 within Pakistan.</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                        <h4 className="font-bold text-sm">Authenticity Guaranteed</h4>
                        <p className="text-sm text-muted-foreground">Directly sourced from artisans and trusted manufacturers.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
