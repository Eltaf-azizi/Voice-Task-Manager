<h1 align="center">Voice Task Manager</h1>

# Task Manager App

A feature-rich task management application with voice input, detailed task attributes, and real-time data persistence.

## Features

### Task Management
- **Add tasks** via text input or voice recognition
- **Detailed task attributes**:
  - Priority levels (High/Medium/Low)
  - Custom categories
  - Due dates
  - Additional notes
- **Mark tasks complete** with visual indicators
- **Delete tasks** with confirmation

### Viewing Options
- **Expandable task details** (click arrow to view notes)
- **Multiple filters**:
  - By category
  - By priority
  - By completion status
- **Sorting options**:
  - By due date
  - By priority
  - Alphabetically

### Data Handling
- **Real-time updates** for all changes
- **Persistent storage** using Supabase database
- **Cross-session persistence** - tasks remain after refresh

## How to Use

1. **Adding a Task**:
   - Type your task in the input field at the top OR
   - Click "Speak Task" to use voice input
   - Click "More Options" to add:
     - Priority level
     - Category
     - Due date
     - Additional notes

2. **Managing Tasks**:
   - Click the circle checkbox to mark complete
   - Click the trash icon to delete (with confirmation)
   - Click the expand arrow to view notes


3. **Finding Tasks**:
   - Use the filter dropdowns to view specific tasks
   - Sort tasks using the sort options
   - Search through your task list

## Technical Details

- **Frontend**: React.js
- **Backend**: Supabase (PostgreSQL database)
- **Real-time Updates**: Supabase subscriptions
- **Voice Recognition**: Web Speech API


## Setup (For Developers)

```bash
# Clone the repository
git clone https://github.com/yourusername/task-manager.git

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Run the app
npm start
```

## Contributions

Contributions are **welcome!** Feel free to fork the repository and submit a pull request. I would appreciate your help, whether it's a bug fix, a new feature, or just a typo correction. 

<h3 align="center">Happy Coding!</h3>
