# 🍔 Continental Restaurant Website 🍷

Welcome to the Continental Restaurant website! 🎉

![Continental Restaurant Logo](https://tse1.mm.bing.net/th?id=OIP.U30YGYxLpm6zxzh15Rp3MAHaEJ&pid=Api&rs=1&c=1&qlt=95&w=170&h=95.png)

## Table of Contents 📑

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Backend Repository](#backend-repository)
- [Importing the Database](#importing-the-database)
- [Admin Account](#admin-account)
- [Golden User Account](#golden-user-account)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Introduction 🍽️

The Continental Restaurant website is an online platform designed for fans of the legendary assassin John Wick. This website serves as an imaginary concept, where users can explore the world of John Wick while also getting a glimpse of the Continental Restaurant and its offerings.

## Features 🚀

- Explore the history and lore of the Continental Hotel and its secret restaurant.
- Browse the exclusive menu with a variety of delectable dishes and drinks.
- Access special events and offers for registered users.

## Installation 🛠️

To run the Continental Restaurant website locally, follow these steps:

1. Clone this repository to your local machine.

```bash
git clone https://github.com/W0lfBl4d3/app-finalcapstonefrontend.git
cd app-finalcapstonefrontend
```

2. Clone the backend repository and add it to your workspace.

```bash
git clone https://github.com/W0lfBl4d3/SpringApiCapstone.git
```

3. Install the required dependencies.

```bash
npm install
```

4. Start the development server.

```bash
npm start
```

5. Open your web browser and visit `http://localhost:3000` to access the website.

## Backend Repository 🌐

The backend part of this project is available at [https://github.com/W0lfBl4d3/SpringApiCapstone](https://github.com/W0lfBl4d3/SpringApiCapstone). Make sure to clone this repository and set it up alongside the frontend to have a fully functional application.

## Importing the Database 🗄️

To use the website with the required data, you'll need to import the provided `.sql` file into your PostgreSQL database.

1. Make sure you have PostgreSQL installed and running on your system.
2. Create a new database for the project.

```sql
CREATE DATABASE spring_api_capstone;
```

3. Import the data from the `.sql` file using the `psql` command.

```bash
psql -U your_postgres_username -d spring_api_capstone -f path/to/your/sql/file.sql
```

Please replace `your_postgres_username` with your actual PostgreSQL username and `path/to/your/sql/file.sql` with the actual path to the `.sql` file.

## Admin Account 👑

You can access the website's admin account with the following credentials:

- Email: luigicervo@example.it
- Password: 12345

As an admin, you'll have access to manage and update the website's content.

## Golden User Account 🌟

For a more exclusive experience, you can log in as a Golden User:

- Email: johnwick@example.it
- Password: 12345

Golden Users enjoy special privileges and secret menus at the Continental Restaurant.

## Technologies Used 💻

This project was developed using the following technologies:

- Frontend: React, React Bootstrap, React Router DOM
- Backend: Java, Spring Boot, Spring Security
- Database: SQL
- Language: TypeScript

## Contributing 🤝

We welcome contributions to enhance the Continental Restaurant website! If you find any issues or have ideas for improvements, please feel free to open an issue or submit a pull request.

---

Enjoy your experience at the Continental Restaurant! If you have any questions or need further assistance, please don't hesitate to reach out to us. Happy dining! 🍽️🎊
