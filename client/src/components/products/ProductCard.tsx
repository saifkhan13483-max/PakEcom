import { type Product } from "@shared/schema";
import { Link } from "wouter";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <div className="bg-card rounded-xl overflow-hidden border border-border/50 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 h-full flex flex-col">
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {!product.inStock && (
            <div className="absolute top-2 left-2 z-10">
              <Badge variant="destructive" className="font-bold">Out of Stock</Badge>
            </div>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <div className="absolute top-2 right-2 z-10">
              <Badge className="bg-secondary text-secondary-foreground hover:bg-secondary font-bold">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </Badge>
            </div>
          )}
          
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Quick Actions Overlay */}
          <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex gap-2 justify-center bg-gradient-to-t from-black/60 to-transparent pt-10">
            <Button size="icon" variant="secondary" className="rounded-full h-10 w-10 shadow-lg" onClick={(e) => { e.preventDefault(); }}>
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="icon" className="rounded-full h-10 w-10 shadow-lg bg-primary text-white hover:bg-primary/90" onClick={handleAddToCart} disabled={!product.inStock}>
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">{product.category}</div>
          <h3 className="font-display font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors mb-2">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < (product.rating || 5) ? "fill-secondary text-secondary" : "text-muted-foreground/30"}`}
              />
            ))}
            <span className="text-xs text-muted-foreground ml-1">({product.reviewCount || 0})</span>
          </div>

          <div className="mt-auto flex items-baseline gap-2">
            <span className="text-lg font-bold text-primary">Rs. {product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">Rs. {product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
