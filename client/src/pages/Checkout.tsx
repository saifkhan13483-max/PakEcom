import { useCartStore } from "@/store/cartStore";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useLocation } from "wouter";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

// Simple schema for checkout form
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(10, "Full address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().optional(),
  paymentMethod: z.enum(["cod", "card"]),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { items, total, clearCart } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const cartTotal = total();
  const shipping = cartTotal > 2000 ? 0 : 250;
  const finalTotal = cartTotal + shipping;

  const form = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      paymentMethod: "cod",
    },
  });

  const onSubmit = async (data: CheckoutForm) => {
    setIsProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Order submitted:", { ...data, items, total: finalTotal });
    
    clearCart();
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for shopping with PakEcom. You will receive a confirmation email shortly.",
    });
    
    // Redirect to home or success page (mocking success redirect to home for now)
    setLocation("/");
    setIsProcessing(false);
  };

  if (items.length === 0) {
     return (
        <div className="min-h-screen bg-background flex flex-col">
            <Header />
            <main className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
                    <Button onClick={() => setLocation("/products")}>Start Shopping</Button>
                </div>
            </main>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container-custom">
          <h1 className="text-3xl font-display font-bold text-primary mb-8 text-center">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
            
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                    <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                    <h2 className="text-xl font-bold">Shipping Information</h2>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Ali Khan" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input placeholder="0300 1234567" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input placeholder="ali@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Street Address</FormLabel>
                            <FormControl>
                              <Textarea placeholder="House 123, Street 4, Sector F-6..." className="resize-none" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Islamabad" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                       <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="44000" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-border">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                            <h2 className="text-xl font-bold">Payment Method</h2>
                        </div>
                        
                        <FormField
                            control={form.control}
                            name="paymentMethod"
                            render={({ field }) => (
                            <FormItem className="space-y-3">
                                <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                >
                                    <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors [&:has(input:checked)]:border-primary [&:has(input:checked)]:bg-primary/5">
                                        <FormControl>
                                            <RadioGroupItem value="cod" />
                                        </FormControl>
                                        <FormLabel className="font-medium cursor-pointer flex-1">
                                            Cash on Delivery (COD)
                                        </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors disabled:opacity-50">
                                        <FormControl>
                                            <RadioGroupItem value="card" disabled />
                                        </FormControl>
                                        <div className="flex-1">
                                            <FormLabel className="font-medium cursor-pointer">
                                                Credit / Debit Card
                                            </FormLabel>
                                            <p className="text-xs text-muted-foreground">Currently unavailable</p>
                                        </div>
                                    </FormItem>
                                </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" size="lg" className="w-full h-12 text-base font-bold mt-8" disabled={isProcessing}>
                        {isProcessing ? "Processing..." : `Place Order (Rs. ${finalTotal.toLocaleString()})`}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div>
              <div className="bg-muted/30 rounded-xl p-6 border border-border sticky top-24">
                <h3 className="font-bold text-lg mb-4">Your Order</h3>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 mb-6 scrollbar-thin">
                    {items.map((item) => (
                        <div key={item.id} className="flex gap-3">
                            <div className="h-16 w-16 bg-muted rounded overflow-hidden shrink-0">
                                <img src={item.image} alt="" className="h-full w-full object-cover" />
                            </div>
                            <div className="flex-1 text-sm">
                                <p className="font-medium line-clamp-2">{item.name}</p>
                                <p className="text-muted-foreground">Qty: {item.quantity} x Rs. {item.price.toLocaleString()}</p>
                            </div>
                            <div className="font-medium text-sm">
                                Rs. {(item.price * item.quantity).toLocaleString()}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-border pt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>Rs. {cartTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        {shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : <span>Rs. {shipping}</span>}
                    </div>
                    <div className="flex justify-between pt-2 border-t border-border/50 mt-2">
                        <span className="font-bold text-lg">Total</span>
                        <span className="font-bold text-lg text-primary">Rs. {finalTotal.toLocaleString()}</span>
                    </div>
                </div>
                
                <div className="bg-green-50 text-green-800 text-xs p-3 rounded-lg mt-6 flex gap-2 items-start">
                    <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                    <p>All transactions are secure and encrypted. You are protected by our buyer guarantee.</p>
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
