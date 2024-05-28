import React, { SyntheticEvent } from 'react';
interface TodoInputProps {
  todo_value?: string;
  handleChange?: (e: SyntheticEvent<HTMLInputElement, Event>) => void;
  handleKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}
const TodoInput: React.FC<TodoInputProps> = ({
  todo_value,
  handleChange,
  handleKeyDown
}) => (
  <input
    type="text"
    className="ew-input"
    value={todo_value}
    placeholder="请输入需要待办的事项"
    onChange={handleChange}
    onKeyDown={handleKeyDown}
  />
);
export default TodoInput;
