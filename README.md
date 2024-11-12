## Expense Tracker 💰📊

An interactive expense tracking application built with React, allowing users to log, categorize, and visualize their expenses. This app includes features like search and filter options, as well as dynamic charts to help users better understand their spending patterns.
## Demo Video

https://github.com/TeemuStew/expense-tracker/blob/main/docs/demo.mp4


### Table of Contents
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
4. [Usage](#usage)
5. [API Endpoints](#api-endpoints)
6. [Future Enhancements](#future-enhancements)

### Features
- **Add, Edit, and Delete Expenses**: Manage your expenses with easy-to-use forms and actions.
- **Expense Breakdown by Category**: Visualize spending across categories with pie and bar charts.
- **Monthly Summary**: Get a month-over-month summary of expenses.
- **Filtering and Search**: Quickly find expenses by name or category.
- **Responsive Design**: Works seamlessly on desktops and mobile devices.

### Technologies Used
- **Frontend**: React, Material-UI, Chart.js, dayjs
- **Backend**: Express, Node.js, SQLite (replace if different)
- **Libraries**: Axios (for API requests), React Transition Group (for animations)
  
### Getting Started
To get a local copy up and running, follow these steps.

#### Prerequisites
- **Node.js**
- **npm** 

#### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/TeemuStew/expense-tracker.git
   cd expense-tracker
   ```

2. **Install dependencies**:
   ```bash
   cd frontend
   npm install
   ```

3. **Start the backend server**:
   ```bash
   # In a separate terminal, navigate to the backend directory with cd backend
   node server.js
   ```

4. **Run the frontend**:
   ```bash
   npm start
   ```

5. **Access the application**:
   Visit `http://localhost:3000` in your browser.

### Usage
1. **Adding Expenses**:
   - Fill out the form with an expense description, amount, date, and category.
   - Click "Add to Expense" to log the expense, and it will appear in the breakdown list.

2. **Filtering & Searching**:
   - Use the search bar under "Breakdown" to filter expenses by name.
   - Select a category from the dropdown to display only expenses within that category.

3. **Viewing Charts**:
   - **Category Chart**: Shows a pie chart breakdown of expenses by category in real-time.
   - **Monthly Summary Chart**: Displays a bar chart of monthly expenses, making it easy to track spending over time in real-time.

### API Endpoints

The backend exposes the following RESTful API endpoints:

- **GET /api/expenses**: Fetch all expenses
- **POST /api/expenses**: Add a new expense
- **PUT /api/expenses/:id**: Update an existing expense
- **DELETE /api/expenses/:id**: Delete an expense by ID

### Future Enhancements
- **Authentication and Authorization**: Secure user data with authentication.
- **Data Export**: Allow users to export their expenses to CSV or PDF.
- **Advanced Analytics**: Add more visualizations and insights, such as spending trends over time.
