// Every public page on the site. Used to build the sitemap and to pre-render
// pages. Add new pages here when you add them to src/App.tsx.
export const SITE_URL = "https://goldenvinepiercing.co.uk";

export const ROUTES = [
  { path: "/", priority: "1.0" },
  { path: "/piercings", priority: "0.9" },
  { path: "/tattooists", priority: "0.9" },
  { path: "/aftercare", priority: "0.7" },
  { path: "/aftercare/tattoo", priority: "0.7" },
  { path: "/jewellery", priority: "0.8" },
  { path: "/bvla", priority: "0.7" },
  { path: "/booking", priority: "0.8" },
  { path: "/faqs", priority: "0.7" },
  { path: "/about", priority: "0.6" },
  { path: "/contact", priority: "0.6" },
];
