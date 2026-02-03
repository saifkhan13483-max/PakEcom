import { useCartStore } from "@/store/cartStore";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";

export default function Cart() {
  const { items, removeItem, updateQuantity, total } = useCartStore();
  const cartTotal = total();
  const shipping = cartTotal > 2000 ? 0 : 250;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-display font-bold text-primary mb-8">Shopping Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-20 border-2 border-dashed border-border rounded-xl">
              <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
              <Link href="/products">
                <Button size="lg" className="rounded-full">Start Shopping</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-card rounded-xl border border-border shadow-sm">
                    <Link href={`/products/${item.slug}`} className="shrink-0 w-24 h-24 sm:w-32 sm:h-32 bg-muted rounded-lg overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link href={`/products/${item.slug}`} className="font-bold text-lg hover:text-primary transition-colors line-clamp-2">
                            {item.name}
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.category}</p>
                        </div>
                        <span className="font-bold text-lg text-primary">Rs. {(item.price * item.quantity).toLocaleString()}</span>
                      </div>

                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center border border-input rounded-md h-8 sm:h-9">
                          <button 
                            className="w-8 h-full flex items-center justify-center hover:bg-muted"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <button 
                            className="w-8 h-full flex items-center justify-center hover:bg-muted"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          <span className="hidden sm:inline">Remove</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:sticky lg:top-24 h-fit">
                <div className="bg-muted/30 rounded-2xl p-6 sm:p-8 border border-border">
                  <h3 className="font-display font-bold text-xl mb-6">Order Summary</h3>
                  
                  <div className="space-y-3 text-sm mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal ({items.reduce((a, b) => a + b.quantity, 0)} items)</span>
                      <span className="font-medium">Rs. {cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        <span className="font-medium">Rs. {shipping}</span>
                      )}
                    </div>
                    {shipping > 0 && (
                      <div className="text-xs text-muted-foreground italic">
                        Add items worth Rs. {(2000 - cartTotal).toLocaleString()} more for free shipping.
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-border pt-4 mb-8">
                    <div className="flex justify-between items-end">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-bold text-2xl text-primary">Rs. {(cartTotal + shipping).toLocaleString()}</span>
                    </div>
                  </div>

                  <Link href="/checkout" className="w-full">
                    <Button size="lg" className="w-full rounded-full h-12 text-base font-bold shadow-lg shadow-primary/20">
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  
                  <div className="mt-6 flex flex-col gap-2 text-xs text-center text-muted-foreground">
                    <p>🔒 Secure Checkout</p>
                    <p>Cash on Delivery Available</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
