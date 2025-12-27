# CaterSpot 🍽️  
### Catering Reservation and Food Ordering System

CaterSpot is a web-based catering and food ordering application that allows users to browse menu items, add them to a cart, place orders, and track order history. The application also provides an admin interface to manage menu items and monitor orders efficiently.

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

### 🛠️ Admin Features
- Admin registration and login  
- Add, edit, and manage menu items  
- Edit existing menu item details (name, price, stock, image, category)  
- Monitor all user orders  
- Update order status (Pending, Accepted, In Progress, Completed)  
- Manage food availability and stock  
- Maintain overall system control  

---

## 🔐 Authentication
CaterSpot uses **Firebase Authentication** for secure access:

- Admins must register and log in to access admin functionalities  
- Users must register and log in to place orders  
- Role-based access ensures admins and users can only access permitted features  

---

## 🧪 Application Verification Steps

### 🧑‍💼 Admin Verification Steps
To verify the admin workflow:

1. Register an admin account (first-time users only) and log in.
2. Navigate to the **menu management section**.
3. Open the `data.js` file to add, update, or remove menu items by modifying food names, categories, prices, and image URLs.
4. Refresh the application to see the updated menu reflected in the UI.
5. Navigate to the **Orders section** to view customer orders.
6. Review order details and update order status through stages such as **Accepted**, **In Progress**, and **Completed**.
7. Log out securely after verification.

> **Note:** Using `data.js` allows quick testing of menu changes without altering core application logic.

---

### 👤 User Verification Steps
To verify the user workflow:

1. Register a user account and log in.
2. Browse menu items displayed from the admin-defined menu.
3. View item details and add items to the cart.
4. Adjust quantities and place an order.
5. Track order status and view order history.
6. Log out securely.

---

## 📦 Menu Data (`data.js`)
The project includes a `data.js` file that contains:

- Complete menu item details  
- Food item names, categories, and prices  
- Image URLs used across the application  

This file acts as a central data source and is especially useful for:

- Understanding the structure of menu data  
- Testing the application without manual item entry  
- Modifying or extending menu items easily during development  

💡 **Tip for testers:**  
Update `data.js` to quickly add, remove, or modify menu items and image URLs without touching core logic.

---

## 🧰 Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Authentication:** Firebase Authentication  
- **Database:** Firebase Firestore  

---

## 📌 Project Highlights
- Role-based access control (Admin / User)  
- Modular JavaScript structure  
- Real-time data handling with Firebase  
- Clean and intuitive UI  
- Easy-to-test menu data using `data.js`  

---

## 📄 Notes
- This project focuses on frontend logic, authentication, and real-time database interaction.  
- Designed for learning and demonstration of full-stack web development concepts using Firebase.

---

## 👩‍💻 Developer
**Ratna Priya Tiyyagura**

Feel free to explore, test, and modify the project!
