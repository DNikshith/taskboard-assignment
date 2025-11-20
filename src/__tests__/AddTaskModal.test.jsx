import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddTaskModal from '../components/AddTaskModal/AddTaskModal';

const mockOnAddTask = vi.fn();
const mockOnClose = vi.fn();

describe('AddTaskModal Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('calls onAddTask with correct parameters including selected tags', async () => {
    const user = userEvent.setup();
    render(<AddTaskModal onAddTask={mockOnAddTask} onClose={mockOnClose} />);

    const titleInput = screen.getByLabelText('Title');
    const descriptionInput = screen.getByLabelText('Description');
    const assigneeSelect = screen.getByLabelText('Assignee');
    const prioritySelect = screen.getByLabelText('Priority');

    await user.type(titleInput, 'New Task');
    await user.type(descriptionInput, 'New task description');
    await user.selectOptions(assigneeSelect, 'Sarah Johnson (SJ)');
    await user.selectOptions(prioritySelect, 'high');

    const feWorkTag = screen.getByText('FE Work');
    await user.click(feWorkTag);

    const submitButton = screen.getByRole('button', { name: /Add Task/i });
    await user.click(submitButton);

    expect(mockOnAddTask).toHaveBeenCalledWith(
      'New Task',
      'New task description',
      { name: 'Sarah Johnson', initials: 'SJ' },
      'high',
      ['FE Work']
    );
  });

  test('tag selection and deselection toggles selected class', async () => {
    const user = userEvent.setup();
    render(<AddTaskModal onAddTask={mockOnAddTask} onClose={mockOnClose} />);

    const feWorkTag = screen.getByText('FE Work');

    await user.click(feWorkTag);
    expect(feWorkTag).toHaveClass('selected');

    await user.click(feWorkTag);
    expect(feWorkTag).not.toHaveClass('selected');
  });
});
