# CaterSpot 🍽️  
**Catering Reservation and Food Ordering System**

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
- Add new menu items
- Edit existing menu item details (name, price, stock, image, category)
- Monitor all user orders
- Manage food availability and stock
- Maintain overall system control

---

## 🔐 Authentication

CaterSpot uses **Firebase Authentication** for secure access:

- **Admins** must register and log in to access admin functionalities
- **Users** must register and log in to place orders
- Role-based access ensures admins and users can only access permitted features

---

## 📦 Menu Data (`data.js`)

The project includes a **`data.js` file** that contains:
- Complete menu item details
- Food item names, categories, prices, stock values
- Image URLs used across the application

This file acts as a **central data source** and is especially useful for:
- Understanding the structure of menu data
- Testing the application without manually entering menu items
- Modifying or extending menu items easily during development

> 💡 **Tip for testers:**  
> Update `data.js` to quickly add, remove, or modify menu items and image URLs without touching core logic.

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

---

Feel free to explore, test, and modify the project!
