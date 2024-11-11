# Expense Tracker App

An interactive expense tracking application built with React, allowing users to log, categorize, and visualize their expenses. This app includes features like search and filter options, as well as dynamic charts to help users better understand their spending patterns.

For frontend this project uses:
- **React**: Frontend framework for building the UI
- **Material-UI**: UI component library for a clean and responsive design
- **Chart.js** & **react-chartjs-2**: For rendering pie and bar charts
- **Day.js**: Lightweight library for date formatting

For backend this project uses:
- **Node.js**: Server-side JavaScript runtime
- **Express.js**: Web application framework for Node.js
- **SQLite**: Lightweight SQL database for storing expenses

## Features

- **Add Expenses**: Users can add new expenses with descriptions, amounts, dates, and categories.
- **Filter by Category**: Filter expenses based on category (Food/Beverage, Travel/Commute, Shopping, Other).
- **Search by Name**: Search for specific expenses by their name or description.
- **Visualize Spending**:
  - **Category Chart**: A pie chart showing the distribution of expenses across different categories.
  - **Monthly Summary Chart**: A bar chart displaying the total expenses for each month.

## How to use

### Prerequisites

- **Node.js** and **npm** should be installed on your machine

### Installation

1. **Clone the repository**:
   
3. **Navigate to the project directory**:
   ```bash
   cd expense-tracker
   cd frontend
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```

### Running the App

1. **Start the application**:
   ```bash
   cd frontend
   npm start

   cd backend
   node server.js
   ```
2. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

## Usage

1. **Adding Expenses**:
   - Fill out the form with an expense description, amount, date, and category.
   - Click "Add to Expense" to log the expense, and it will appear in the breakdown list.

2. **Filtering & Searching**:
   - Use the search bar under "Breakdown" to filter expenses by name.
   - Select a category from the dropdown to display only expenses within that category.

3. **Viewing Charts**:
   - **Category Chart**: Shows a pie chart breakdown of expenses by category in real-time.
   - **Monthly Summary Chart**: Displays a bar chart of monthly expenses, making it easy to track spending over time in real-time.
