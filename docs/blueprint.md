# **App Name**: TableTop Reservations

## Core Features:

- Reservation Dashboard: Display a list of existing reservations in a clear, tabular format, allowing users to quickly view and manage bookings.
- Add Reservation Form: Implement a user-friendly form for creating new reservations, including fields for customer name, date, time slot, and table number.
- Edit Reservation Feature: Enable users to modify existing reservation details through a pre-filled form, ensuring accuracy and ease of updating information.
- Delete Confirmation: Implement a confirmation modal to prevent accidental deletions, ensuring users are certain before removing a reservation.
- AI Table Optimization: Use an AI tool to suggest optimal table arrangements based on party size and time of day to maximize seating efficiency. The tool can suggest combining tables for larger parties or optimizing table assignments based on historical data.

## Style Guidelines:

- Primary color: Use a warm, inviting color like a muted red or deep brown to evoke a sense of comfort and hospitality.
- Secondary color: A light beige or cream to provide a neutral background and ensure readability.
- Accent: Gold (#FFD700) to highlight important actions and elements, conveying a sense of quality and sophistication.
- Clean and readable typography for form labels and data display.
- Use simple, elegant icons for navigation and actions.
- Ensure a responsive layout that adapts to different screen sizes.
- Use subtle transitions and animations to enhance user experience.

## Original User Request:
Project Title
Modern Restaurant Reservation System using React, Spring Boot, and PostgreSQL

📌 Objective
Develop a full-featured web-based Restaurant Reservation System that allows customers or restaurant staff to manage table reservations through a modern, responsive UI (React.js), a powerful Java-based backend (Spring Boot), and a reliable database (PostgreSQL).

🏗️ Tech Stack
Frontend: React.js, Tailwind CSS (or Bootstrap), Axios

Backend: Java with Spring Boot (RESTful API)

Database: PostgreSQL

Tools: Maven or Gradle, Postman for API testing, pgAdmin for DB

Optional: Docker for containerization, JWT for authentication

🧰 Backend Development Prompt (Java + Spring Boot)
Create REST API endpoints for reservation management:

Entity: Reservation
java
Copy
Edit
ReservationID: Integer (Primary Key)  
CustomerName: String  
ReservationDate: Date  
TimeSlot: String  
TableNumber: Integer
Required Endpoints:
Method	Endpoint	Description
GET	/reservations	Get all reservations
GET	/reservations/{id}	Get a reservation by ID
POST	/reservations	Create a new reservation
PUT	/reservations/{id}	Update reservation by ID
DELETE	/reservations/{id}	Delete reservation by ID
Include:

Spring Boot project with JPA + PostgreSQL

CORS enabled for React

Global exception handling

Request validation with @Valid

🌐 Frontend Development Prompt (React.js)
Pages to Build:

Dashboard (HomePage) – List all reservations in a responsive table.

Add Reservation Page – Form to add new reservation.

Edit Reservation Page – Pre-filled form to update reservation.

Delete Confirmation Modal

Navigation Bar – Links to home, add reservation.

Functionality:

Fetch data from backend using axios.

Use React Router for navigation.

Use useState and useEffect to manage state.

Show success/error notifications.

Form validation using custom logic or libraries like Formik + Yup.

🛢️ Database Setup Prompt (PostgreSQL)
Table: reservations

sql
Copy
Edit
CREATE TABLE reservations (
  reservation_id SERIAL PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  reservation_date DATE NOT NULL,
  time_slot VARCHAR(100) NOT NULL,
  table_number INT NOT NULL
);
Sample Data:

sql
Copy
Edit
INSERT INTO reservations (customer_name, reservation_date, time_slot, table_number)
VALUES ('John Doe', '2025-04-15', '7:00 PM', 5);
🔄 Interaction Flow
User opens app → Dashboard lists all reservations.

User clicks "Add" → fills form → hits backend /POST.

User clicks "Edit" → form pre-filled with existing data → hits /PUT.

User clicks "Delete" → confirmation modal → hits /DELETE.

After each operation → UI refreshes via updated /GET call.

🧪 Bonus Features (Optional)
Pagination + search on dashboard

Date/time picker in form

Filter by date or time slot

Auth system with login for admin/staff (JWT)

Email confirmation after reservation

Deploy backend on Render and frontend on Vercel/Netlify

📂 Folder Structure (Example)
📁 React Frontend
pgsql
Copy
Edit
restaurant-reservation-client/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/ ← Axios API calls
│   ├── App.js
│   └── index.js
📁 Spring Boot Backend
css
Copy
Edit
restaurant-reservation-api/
├── src/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── exception/
│   └── RestaurantReservationApplication.java
✅ Expected Deliverables
Fully responsive React frontend with CRUD UI.

RESTful backend with full CRUD support and validations.

PostgreSQL database integration.

Dynamic reservation management with user feedback and UI updates.

Clean code, reusable components, and error handling.
give me steps to build this application
  