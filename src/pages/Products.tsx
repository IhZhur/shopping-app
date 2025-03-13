import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, Product } from "../store/productsSlice";
import { addToCart } from "../store/cartSlice";
import { RootState, AppDispatch } from "../store";
import { Link } from "react-router-dom"; // Импортируем Link для перехода на страницу товара
import Loader from "../components/Loader";
import ToastNotification from "../components/ToastNotification"; // Уведомления
import "../styles/Products.css";

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items: Product[] = useSelector((state: RootState) => state.products.items);
  const { loading, error } = useSelector((state: RootState) => state.products);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortOption, setSortOption] = useState<string>("default");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Уникальные категории
  const categories = ["all", ...Array.from(new Set((items || []).map((product) => product.category)))];

  // Фильтрация товаров
  let filteredProducts =
    selectedCategory === "all" ? items : items.filter((product) => product.category === selectedCategory);

  // Сортировка товаров
  if (sortOption === "price-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortOption === "title-asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "title-desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.title.localeCompare(a.title));
  }

  // Функция добавления товара в корзину + уведомление
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
    setToastMessage(`"${product.title}" added to cart!`);
  };

  const closeToast = () => setToastMessage(null);

  if (loading) return <Loader />;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div>
      <h1>Products</h1>

      {/*Фильтр и сортировка */}
      <div className="filters">
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "active" : ""}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="sort-filter">
          <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
            <option value="default">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="title-asc">Title: A-Z</option>
            <option value="title-desc">Title: Z-A</option>
          </select>
        </div>
      </div>

      {/*Список товаров */}
      <div className="product-list">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
            </Link>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      {/*Уведомление при добавлении в корзину */}
      {toastMessage && <ToastNotification message={toastMessage} onClose={closeToast} />}
    </div>
  );
};

export default Products;
