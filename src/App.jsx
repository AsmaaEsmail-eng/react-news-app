import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Category from "./pages/Category";
import ArticleDetails from "./pages/ArticleDetails";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="app">
      <Header />

      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/category/:category"
            element={<Category />}
          />

          <Route
            path="/article/:id"
            element={<ArticleDetails />}
          />

          <Route
            path="/favorites"
            element={<Favorites />}
          />

          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;