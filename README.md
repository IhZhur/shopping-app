# Shopping App

A modern, modular e-commerce frontend built with React 19 (TypeScript), Redux Toolkit, and React Router. Features product catalog, cart management, checkout, and product details, all with client-side routing and state management. Styled with styled-components, tested via Testing Library.

---

## Features

* Product catalog page
* Cart management (add/remove/update products)
* Product details page
* Checkout flow
* Responsive layout
* Modern UI with styled-components, Heroicons, React Icons
* State management with Redux Toolkit & redux-thunk
* Client-side routing (React Router)
* Test coverage with Testing Library

---

## Tech Stack

* React 19 (TypeScript)
* Redux Toolkit, redux-thunk
* React Router v7+
* Styled Components
* React Icons, Heroicons
* Testing Library (Jest)

---

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/IhZhur/shopping-app.git
   cd shopping-app
   ```
2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**

   ```bash
   npm start
   # or
   yarn start
   ```

   App will be available at [http://localhost:3000](http://localhost:3000)

---

## Main Routes

* `/` — Product catalog (list)
* `/cart` — Cart page
* `/product/:id` — Product details
* `/checkout` — Checkout page

---

## Project Structure

* `src/pages/` — Pages: Products, Cart, ProductDetails, Checkout
* `src/components/` — UI components (Header, etc.)
* `src/store/` — Redux Toolkit slices and store (if present)
* `src/App.tsx` — Main app, routing
* `src/index.tsx` — Entry point

---

## Testing

* Run all tests with:

  ```bash
  npm test
  # or
  yarn test
  ```
* Tests use Testing Library and Jest

---

## Author

IhZhur

---

##
