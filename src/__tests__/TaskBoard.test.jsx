import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskBoard from '../components/TaskBoard/TaskBoard';

describe('TaskBoard Component', () => {
  test('search filters tasks by title or description', async () => {
    const user = userEvent.setup();
    render(<TaskBoard />);

    const searchInput = screen.getByPlaceholderText('Search tasks...');
    await user.type(searchInput, 'authentication');

    expect(screen.getByText('Implement authentication')).toBeInTheDocument();
    expect(screen.queryByText('Design user interface')).not.toBeInTheDocument();
  });

  test('assignee filter shows only tasks for selected assignee', async () => {
    const user = userEvent.setup();
    render(<TaskBoard />);

    const assigneeFilter = screen.getByDisplayValue('All Assignees');
    await user.selectOptions(assigneeFilter, 'Sarah Johnson');

    expect(screen.getByText('Design user interface')).toBeInTheDocument();
    expect(screen.queryByText('Set up database')).not.toBeInTheDocument();
  });

  test('priority filter shows only tasks with selected priority', async () => {
    const user = userEvent.setup();
    render(<TaskBoard />);

    const priorityFilter = screen.getByDisplayValue('All Priorities');
    await user.selectOptions(priorityFilter, 'high');

    expect(screen.getByText('Design user interface')).toBeInTheDocument();
    expect(screen.queryByText('Set up database')).not.toBeInTheDocument();
  });
});
