import React from 'react';

export interface TodoListItem {
  uuid: string;
  text: string;
}
export interface ListsProps {
  editUUid?: string | number;
  todoList?: Partial<TodoListItem>[];
  seeDetail?: (t: Partial<TodoListItem>) => void;
  handleEdit?: (t: Partial<TodoListItem>, i: number) => void;
  handleDelete?: (t: Partial<TodoListItem>, i: number) => void;
}
const Lists: React.FC<ListsProps> = ({
  todoList,
  seeDetail,
  handleEdit,
  editUUid,
  handleDelete
}) => (
  <div className="todo-list">
    {todoList?.map((todo, index) => (
      <div
        className="todo-list-item"
        key={todo.uuid}
        data-order={index + 1 + '.'}
      >
        <p onClick={() => seeDetail?.(todo)}>
          {todo?.uuid}:{todo.text}
        </p>
        <div className="ml-15 ew-btn-group">
          <button
            className="ew-btn ew-btn-primary"
            type="button"
            onClick={() => handleEdit?.(todo, index)}
          >
            {editUUid !== -1 && editUUid === todo.uuid ? '取消' : ''}
            编辑
          </button>
          <button
            className="ew-btn ew-btn-danger ml-15"
            type="button"
            onClick={() => handleDelete?.(todo, index)}
          >
            删除
          </button>
        </div>
      </div>
    ))}
  </div>
);
export default Lists;
