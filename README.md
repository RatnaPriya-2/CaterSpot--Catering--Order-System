# CaterSpot 🍽️  
### Catering Reservation and Food Ordering System

CaterSpot is a web-based catering and food ordering application that allows users to browse menu items, add them to a cart, place orders, and track order history. The application also provides an admin interface to manage menu items and monitor orders efficiently.

This project is designed to demonstrate frontend architecture, role-based access, and real-time data handling using Firebase.

---

## 🚀 Features

### 👤 User Features
- User registration and login using email and password  
- Browse menu items by category (Starters, Main Course, Desserts, Beverages)  
- View detailed information for each menu item  
- Add items to cart with quantity control  
- Place food orders  
- View order history and order status  
- Secure logout functionality  

---

### 🛠️ Admin Features
- Admin registration and login  
- Add menu items to the active menu  
- Edit existing menu item details (name, price, stock, image, category)  
- Monitor all user orders  
- Update order status (Pending, Accepted, In Progress, Completed)  
- Manage food availability and stock  
- Maintain overall system control  

---

## 🔐 Authentication
CaterSpot uses **Firebase Authentication** to ensure secure access:

- Users must register and log in to place orders  
- Admins must register and log in to access admin functionalities  
- Role-based access control ensures admins and users can only access permitted features  

---

## 🧪 Application Verification Steps

### 🧑‍💼 Admin Verification Steps
To verify the admin workflow:

1. Register an admin account and log in.
2. Navigate to the **Menu Management** section.
3. The application initially uses predefined menu items from `data.js` as **seed data**.
4. Select items from this list and **add them to the system menu**.
5. Once added, products are stored in `addedProducts.js`, which represents the **active menu**.
6. Verify that added products are available for users to browse.
7. Navigate to the **Orders** section to view user orders.
8. Update order status through stages such as **Accepted**, **In Progress**, and **Completed**.
9. Log out securely after verification.

> **Note:** This two-step flow (seed data → active products) is intentional and helps demonstrate admin-controlled menu management.

---

### 👤 User Verification Steps
To verify the user workflow:

1. Register a user account and log in.
2. Browse menu items that have been **added by the admin**.
3. View item details and add items to the cart.
4. Adjust quantities and place an order.
5. Track order status and view order history.
6. Log out securely.

---

## 📦 Menu Data Structure

### `data.js` — Seed Menu Data
The `data.js` file contains **predefined menu items** used as reference and seed data.

It includes:
- Food item names  
- Categories  
- Prices  
- Image URLs  

This file is useful for:
- Quick testing and evaluation  
- Understanding menu data structure  
- Avoiding manual item creation during demos  

---

### `addedProducts.js` — Active Menu Data
The `addedProducts.js` file stores **products that have been added by the admin**.

It represents:
- The actual menu visible to users  
- Admin-approved items  
- Products used for cart and order processing  

This separation ensures:
- Clear distinction between demo data and active application data  
- Better admin control over menu availability  
- A realistic product management workflow  

---

## 📌 Why Two Data Files?
The use of both `data.js` and `addedProducts.js` is intentional:

- `data.js` → Acts as **seed/demo data**  
- `addedProducts.js` → Acts as **active application data**

This approach:
- Simplifies testing for reviewers  
- Demonstrates admin-driven control  
- Improves maintainability and clarity  

> **Reviewer Note:**  
> The application is pre-configured with seed menu data (`data.js`) to allow smooth evaluation. Admins can selectively add products, which are then stored in `addedProducts.js` and made available to users for ordering.

---

## 🧰 Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Authentication:** Firebase Authentication  
- **Database:** Firebase Firestore  

---

## 📌 Project Highlights
- Role-based access control (Admin / User)  
- Modular JavaScript architecture  
- Dynamic page loading  
- Real-time database integration  
- Admin-controlled menu workflow  
- Reviewer-friendly seed data setup  

---

## 📄 Notes
- This project focuses on frontend logic, authentication, and database interaction.  
- Backend services are handled using Firebase.  
- Designed for learning, evaluation, and demonstration purposes.

---

## 👩‍💻 Developer
**Ratna Priya Tiyyagura**

Feel free to explore, test, and modify the project!
