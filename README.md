# SIDDU'S THREAD — Fashion Store React App

A premium React fashion store built with Vite, React Router, Axios and JSON Server.

## Features

- Premium responsive fashion-store UI
- Home page with editorial hero
- Product listing with category filters
- Search and sorting
- Product details page
- Add product (POST)
- Edit product (PUT)
- Delete product (DELETE)
- Axios API service
- React Router dynamic routes
- Reusable ProductCard and ProductForm components
- Light / dark theme toggle
- Shopping bag counter using React Context
- Responsive mobile layout

## Run

Install dependencies:

```bash
npm install
```

Start JSON Server:

```bash
npm run server
```

Start React:

```bash
npm run dev
```

Open the Vite URL shown in the terminal, normally:

http://localhost:5173

API:

http://localhost:3000/products

## Routes

- `/` — Home
- `/products` — Shop
- `/products/:id` — Product details
- `/add-product` — Add product
- `/edit-product/:id` — Edit product

## Axios operations

GET `/products`

POST `/products`

PUT `/products/:id`

DELETE `/products/:id`


## Day 3 - Authentication

Added:
- User registration with JSON Server
- Login with email/password
- LocalStorage authentication
- Logout
- Protected routes
- Protected Add Product and Edit Product pages
- Login redirect back to the originally requested protected page
- Navbar changes automatically based on login state
- Demo account: `siddu@gmail.com` / `siddu@123`

### Run

```bash
npm install
npm run server
npm run dev
```

JSON Server runs on `http://localhost:3000`.


## Siddu's Thread enhancements
This version adapts the useful TravelExplorer-style discovery features to the Siddu's Thread fashion store:
- Wishlist/Favorites powered by Redux Toolkit and persisted in localStorage
- Wishlist count in the navigation bar
- Favorite heart controls on product cards and product details
- Dedicated Wishlist page with remove and clear actions
- Search across product name, category, type, and color
- Category filtering plus budget/price filtering
- Sorting by Featured, Price, and Rating
- Empty-state and reset-filter experiences
- Responsive styling for the new discovery controls

## Siddu's Thread role-based product management

- The existing `siddu@gmail.com` account is now the **admin** account.
- Admin password remains `siddu@123`.
- New registrations are always created with the `user` role.
- Customers can browse, search, filter, wishlist and add items to the bag, but they do not see Add Product, Edit or Delete controls.
- `/add-product` and `/edit-product/:id` are protected as admin-only routes.
- Four model-look products were added using the supplied photos:
  - Red Check Overshirt — styled with Essential White T-Shirt + Black Jeans
  - Essential White T-Shirt — styled with Red Check Overshirt + Black Jeans
  - Black Logo Cap — styled with Sky Blue Sweatshirt + Black Pants
  - Navy Stripe Polo T-Shirt — styled with Black Trousers + Black Logo Cap
- Model images are stored under `public/models/` and can be reused from the admin product form.

> Note: because this project uses JSON Server, role enforcement is implemented in the React app. A production deployment should enforce roles again in a real backend/API.
