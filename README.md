# CaterSpot 🍽️  
### Catering Reservation and Food Ordering System

CaterSpot is a web-based catering and food ordering application that allows users to browse menu items, add them to a cart, place orders, and track order history. The application also provides an admin interface for monitoring orders and managing menu configuration.

This project is designed for learning and evaluation purposes, focusing on frontend architecture, authentication, and data flow using Firebase.

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
- View menu configuration  
- Monitor all user orders  
- Update order status (Pending, Accepted, In Progress, Completed)  
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
2. Navigate through the admin dashboard.
3. Review menu items configured in the application.
4. Monitor user orders from the **Orders** section.
5. Update order statuses such as **Accepted**, **In Progress**, and **Completed**.
6. Log out securely after verification.

> **Note:** Menu items are predefined for evaluation and testing purposes.

---

### 👤 User Verification Steps
To verify the user workflow:

1. Register a user account and log in.
2. Browse available menu items.
3. View food item details and add items to the cart.
4. Adjust quantities and place an order.
5. Track order status and view order history.
6. Log out securely.

---

## 📦 Menu Data Configuration

### `data.js` — Menu Configuration File
The `data.js` file contains predefined menu data required for testers and reviewers to effectively test the application. A set of sample products is already included so that the application functions correctly and all features can be verified without additional setup.

This approach keeps the setup simple and ensures a smooth evaluation experience.

---

## 📌 Important Note on Data Handling
For demonstration and evaluation purposes, menu data is maintained in a static configuration file (`data.js`).  
In a real-world production application, this data would be managed and persisted using a backend database such as **Firebase Firestore**, with admin actions updating the database dynamically.

---

## 🧰 Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Authentication:** Firebase Authentication  
- **Database:** Firebase Firestore (used for orders and user data)  

---

## 📌 Project Highlights
- Role-based access control (Admin / User)  
- Modular JavaScript architecture  
- Dynamic UI updates  
- Cart and order management logic  
- Reviewer-friendly setup with predefined data  

---

## 📄 Notes
- This project focuses on frontend logic, authentication, and database interaction.  
- Menu configuration is intentionally kept static for ease of testing and evaluation.  
- Designed for learning, demonstration, and assessment purposes.

---

## 👩‍💻 Developer
**Ratna Priya Tiyyagura**

Feel free to explore, test, and modify the project!
