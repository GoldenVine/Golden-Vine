import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Page imports
import { Home } from "@/pages/Home";
import { Piercings } from "@/pages/Piercings";
import { Aftercare } from "@/pages/Aftercare";
import { Jewellery } from "@/pages/Jewellery";
import { Bvla } from "@/pages/Bvla";
import { Booking } from "@/pages/Booking";
import { Faqs } from "@/pages/Faqs";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="pt-24 md:pt-36 flex flex-col min-h-screen">
      <Nav />
      <main className="flex-1 w-full max-w-[1400px] mx-auto px-4 md:px-8">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/piercings" component={Piercings} />
          <Route path="/aftercare" component={Aftercare} />
          <Route path="/jewellery" component={Jewellery} />
          <Route path="/bvla" component={Bvla} />
          <Route path="/booking" component={Booking} />
          <Route path="/faqs" component={Faqs} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
