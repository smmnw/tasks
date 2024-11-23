import React from 'react';
import {render, screen,fireEvent} from '@testing-library/react-native';
import TasksScreen from '../screen/TasksScreen';
import useFetchTasks from '../utils/tasks/useFetchTasks';

jest.mock("../utils/Supabase", () => ({
    Supabase: {
        from: jest.fn().mockReturnValue({
            select: jest.fn().mockResolvedValue({
                data: [{id: 1, title: "Task 1", completed: true}], error: null,
            }),
        }),
    },
}));

// Mock the useFetchTasks hook
jest.mock('../utils/tasks/useFetchTasks');


describe('TasksScreen', () => {
    test('renders loading state', () => {
        useFetchTasks.mockReturnValue({
            data: null, isLoading: true, isError: false,
        });

        render(<TasksScreen/>);

        // Check if "Loading..." or some loading indicator is shown
        expect(screen.getByText('Loading...')).toBeTruthy();
    });

    test('renders error state', () => {
        useFetchTasks.mockReturnValue({
            data: null, isLoading: false, isError: true,
        });

        render(<TasksScreen/>);

        // Check if "Error loading tasks" or similar is shown
        expect(screen.getByText('Error loading tasks')).toBeTruthy();
    });

    test('renders tasks successfully', async () => {
        const mockTasks = [{id: 1, name: 'Task 1', completed: false}, {id: 2, name: 'Task 2', completed: false},];

        useFetchTasks.mockReturnValue({
            data: mockTasks, isLoading: false, isError: false,
        });

        render(<TasksScreen/>);

        // Check that task titles are rendered
        expect(screen.getByText('Task 1')).toBeTruthy();
        expect(screen.getByText('Task 2')).toBeTruthy();
    });

    test('press handler is called when task is clicked', async () => {
        const mockTasks = [{id: 1, name: 'Task 1', completed: false}, {id: 2, name: 'Task 2', completed: false},];

        const mockPressHandler = jest.fn();

        useFetchTasks.mockReturnValue({
            data: mockTasks, isLoading: false, isError: false,
        });

        render(<TasksScreen/>);
        // Simulate pressing a task
        fireEvent.press(screen.getByText('Task 1'));

        // Assert that pressHandler is called with the correct ID
        expect(mockPressHandler).toHaveBeenCalled();
    });
});