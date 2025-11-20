import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskCard from '../components/TaskCard/TaskCard';

const mockTask = {
  id: 1,
  title: 'Test Task',
  description: 'This is a test task description',
  status: 'todo',
  assignee: { name: 'John Doe', initials: 'JD' },
  createdAt: '2024-12-10T10:00:00Z',
  priority: 'high',
  tags: ['FE Work', 'Testing'],
};

const mockOnMoveTask = vi.fn();
const mockOnDeleteTask = vi.fn();
const mockOnEditTask = vi.fn();

describe('TaskCard Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('calls onMoveTask with correct parameters when move button clicked', async () => {
    const user = userEvent.setup();
    render(
      <TaskCard
        task={mockTask}
        onMoveTask={mockOnMoveTask}
        onDeleteTask={mockOnDeleteTask}
        onEditTask={mockOnEditTask}
      />
    );

    const moveButton = screen.getByText('Move to In Progress');
    await user.click(moveButton);

    expect(mockOnMoveTask).toHaveBeenCalledWith(1, 'inprogress');
  });
});
