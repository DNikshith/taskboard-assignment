# Quick Start Guide

## Setup

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Your Task

Implement Kanban task board functionality. The UI is done - add the logic!

## Main Files to Work On

📂 `src/components/TaskBoard/TaskBoard.jsx` - Main state management and logic
📂 `src/components/AddTaskModal/AddTaskModal.jsx` - Form handling and tag selection
📂 `src/components/TaskCard/TaskCard.jsx` - Card interactions and drag/drop
📂 `src/components/TaskColumn/TaskColumn.jsx` - Drop zone handling

## Key Features to Implement

### 1. Task CRUD Operations

- Add new tasks with all fields
- Edit existing tasks (prefill form)
- Delete tasks (with confirmation)
- Move tasks between columns

### 2. Tag Selection

- Click to select/deselect tags
- Multiple tags can be selected
- Visual indicator for selected tags
- Submit tags with task

### 3. Filters & Search

- Search by title/description
- Filter by assignee
- Filter by priority
- Filter by tags (multi-select)
- Filter by date
- **All filters work together!**

### 4. Sorting

- Sort by priority (High → Medium → Low)
- Then by date (newest first)

### 5. Task Counts

- Update counts when tasks move/added/deleted

## Test Your Work

```bash
npm test
```

Need all 6 test suites to pass! ✅

## Rules

- ❌ Don't change test files
- ❌ Don't modify data or CSS
- ❌ Don't modify GitHub workflows
- ✅ Make all tests pass
- ✅ Implement all features listed above

## Submission

1. Work on `dev` branch
2. Make all tests pass
3. Push to GitHub
4. Create PR to `main` (don't merge)
5. Click submission button

**Time: 1 day | Focus: React State Management + Component Integration**
