import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AnnouncementBar from "./components/AnnouncementBar";
import CartDrawer from "./components/CartDrawer";
import ErrorBoundary from "./components/ErrorBoundary";
import Footer from "./components/Footer";
import Header, { type Theme } from "./components/Header";
import PlaceholderPage from "./components/PlaceholderPage";
import SearchOverlay from "./components/SearchOverlay";
import { ShopProvider, useShop } from "./store/shop";
import Checkout from "./pages/Checkout";
import Collection from "./pages/Collection";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Journal from "./pages/Journal";
import JournalPost from "./pages/JournalPost";
import Policies from "./pages/Policies";
import Product from "./pages/Product";
import Stores from "./pages/Stores";
import Weave from "./pages/Weave";

const THEME_KEY = "tarini-theme";

function readTheme(): Theme {
  try {
    return localStorage.getItem(THEME_KEY) === "dusk" ? "dusk" : "day";
  } catch {
    return "day";
  }
}

const ORG_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TĀRINI",
  description: "The quiet archive of handwoven Kanjivaram and heritage silks.",
  url: "https://tarini.in/",
};

const BREADCRUMB_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://tarini.in/" },
    { "@type": "ListItem", position: 2, name: "Collections", item: "https://tarini.in/collections/rajya-regal-kanjivaram" },
    { "@type": "ListItem", position: 3, name: "Weave", item: "https://tarini.in/weave" },
    { "@type": "ListItem", position: 4, name: "Journal", item: "https://tarini.in/journal" },
  ],
};

function Shell() {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cartCount } = useShop();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage unavailable */
    }
  }, [theme]);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  return (
    <div className="min-h-screen">
      <script type="application/ld+json">{JSON.stringify(ORG_JSON_LD)}</script>
      <script type="application/ld+json">{JSON.stringify(BREADCRUMB_JSON_LD)}</script>
      <div className="grain" aria-hidden="true" />
      <AnnouncementBar />
      <Header
        cartCount={cartCount}
        theme={theme}
        onSearchOpen={openSearch}
        onCartOpen={() => setCartOpen(true)}
        onToggleTheme={() => setTheme((t) => (t === "day" ? "dusk" : "day"))}
      />
      <main>
        <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections/:slug" element={<Collection />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/kanjivaram" element={<Collection fixedSlug="rajya-regal-kanjivaram" />} />
          <Route path="/organza" element={<Collection fixedSlug="nila-archive-organza" />} />
          <Route path="/weave" element={<Weave />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<JournalPost />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="*" element={<PlaceholderPage kicker="404" title="Lost in the archive" />} />
        </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
      <SearchOverlay open={searchOpen} onOpen={openSearch} onClose={closeSearch} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ShopProvider>
        <Shell />
      </ShopProvider>
    </BrowserRouter>
  );
}