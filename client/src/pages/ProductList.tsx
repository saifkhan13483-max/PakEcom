import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/products/ProductCard";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProductList() {
  const { data: products, isLoading } = useProducts();
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const categoryParam = searchParams.get("category");

  const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "newest">("newest");

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    
    let result = [...products];

    // Filter by category
    if (categoryParam) {
      result = result.filter(p => p.category === categoryParam);
    }

    // Sort
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else {
      // Default / Newest (assuming id implies newness for now or random)
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [products, categoryParam, sortBy]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container-custom">
          
          {/* Header & Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-primary">
                {categoryParam ? `${categoryParam} Collection` : "All Products"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {filteredProducts.length} items found
              </p>
            </div>

            <div className="flex items-center gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    Sort by: {sortBy === "newest" ? "Newest" : sortBy === "price-asc" ? "Price: Low to High" : "Price: High to Low"}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setSortBy("newest")}>Newest</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-asc")}>Price: Low to High</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-desc")}>Price: High to Low</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="outline" size="icon">
                <SlidersHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Grid */}
          {isLoading ? (
            <LoadingSpinner />
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed border-border">
              <h3 className="text-xl font-bold text-muted-foreground mb-2">No products found</h3>
              <p className="text-muted-foreground">Try clearing your filters or checking back later.</p>
              <Button 
                variant="link" 
                onClick={() => window.location.href = '/products'}
                className="mt-4 text-primary"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
