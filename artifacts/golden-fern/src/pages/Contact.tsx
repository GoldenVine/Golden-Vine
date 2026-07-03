import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FadeIn } from "@/components/FadeIn";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  botcheck: z.boolean().optional()
});

export function Contact() {
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      botcheck: false
    }
  });

  const onSubmit = async (values: z.infer<typeof contactSchema>) => {
    if (values.botcheck) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "38d2b800-a54a-4d02-b50d-a6b8a4c75283",
          ...values
        })
      });

      const result = await response.json();
      if (response.ok) {
        setShowPopup(true);
        form.reset();
      } else {
        console.error("Form submission failed", result);
        alert("There was an error sending your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-500 pb-12">
      
      <FadeIn>
        <h1 className="text-4xl md:text-5xl font-bold font-serif text-center mb-12">Contact Us</h1>
      </FadeIn>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10">
        
        <FadeIn className="flex-1" delay={0.05}>
          <div className="section-cream h-full">
            <h3 className="text-2xl font-bold font-serif mb-8 text-center md:text-left border-b border-foreground/10 pb-2">Contact - Booking & Inquiries</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-serif font-bold text-lg">Name:</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} className="bg-background border-primary/20 focus-visible:ring-primary py-6" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-serif font-bold text-lg">Email:</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your.email@example.com" {...field} className="bg-background border-primary/20 focus-visible:ring-primary py-6" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-serif font-bold text-lg">Message:</FormLabel>
                      <FormControl>
                        <Textarea placeholder="How can we help?" rows={6} {...field} className="bg-background border-primary/20 focus-visible:ring-primary text-base resize-y" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="botcheck"
                  render={({ field }) => (
                    <input type="checkbox" className="hidden" {...field} value={field.value ? "true" : "false"} />
                  )}
                />

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="pill-btn w-full py-4 text-xl mt-4"
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </form>
            </Form>
          </div>
        </FadeIn>

        <FadeIn className="flex-1" delay={0.15}>
          <div className="section-cream h-fit">
            <h3 className="text-2xl font-bold font-serif mb-8 text-center md:text-left border-b border-foreground/10 pb-2">Get in Touch</h3>
            
            <div className="space-y-10">
              <div>
                <h4 className="font-serif text-xl font-bold underline mb-4">Our studio is located at:</h4>
                <address className="not-italic text-lg font-serif leading-relaxed">
                  Golden Fern Piercing<br />
                  3 The Shambles<br />
                  Bradford-on-Avon<br />
                  BA15 1JS<br />
                  United Kingdom<br />
                  <a href="tel:01225592292" className="text-primary hover:text-foreground no-underline mt-2 inline-block">01225 592292</a>
                </address>
              </div>
              
              <div>
                <h4 className="font-serif text-xl font-bold underline mb-4">Opening Hours</h4>
                <ul className="space-y-2 text-lg font-serif">
                  <li><strong className="underline">Monday:</strong> Closed</li>
                  <li><strong className="underline">Tuesday:</strong> Closed</li>
                  <li><strong className="underline">Wednesday:</strong> 11am-5pm</li>
                  <li><strong className="underline">Thursday:</strong> 11am-5pm</li>
                  <li><strong className="underline">Friday:</strong> 11am-5pm</li>
                  <li><strong className="underline">Saturday:</strong> 11am-5pm</li>
                  <li><strong className="underline">Sunday:</strong> 11.30am-3.30pm</li>
                </ul>
              </div>
            </div>
          </div>
        </FadeIn>

      </div>

      <FadeIn delay={0.1} className="max-w-5xl mx-auto mt-12">
        <section className="text-center section-cream">
          <h3 className="text-3xl font-bold font-serif mb-6">Our Location</h3>
          <div className="w-full rounded-xl overflow-hidden shadow-md aspect-video max-h-[450px]">
            <iframe 
              src="https://www.google.com/maps?q=3+The+Shambles,+Bradford-on-Avon,+BA15+1JS,+UK&output=embed" 
              className="w-full h-full border-0" 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location for Golden Fern Piercing"
            />
          </div>
          <p className="mt-4 text-base text-foreground/80 font-serif">Find us at: 3 The Shambles, Bradford-on-Avon, BA15 1JS, UK</p>
        </section>
      </FadeIn>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-card p-8 rounded-xl max-w-md w-full text-center shadow-2xl relative">
            <button 
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-foreground/50 hover:text-foreground bg-transparent border-none text-2xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Thank You!</h2>
            <p className="text-lg font-serif mb-8 text-foreground/80">
              Thank you for your enquiry! We aim to reply within 2 business days. Please wait at least that long before contacting us on other platforms or resubmitting the form. We appreciate your support.
            </p>
            <button 
              onClick={() => setShowPopup(false)}
              className="pill-btn px-8"
            >
              Continue
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
