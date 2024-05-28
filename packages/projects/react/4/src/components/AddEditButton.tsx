import React from 'react';

interface AddEditButtonProps {
  onToDo?: () => void;
  editUUid?: string | number;
}
const AddEditButton: React.FC<AddEditButtonProps> = ({ onToDo, editUUid }) => (
  <button
    className="ew-btn ew-btn-primary ml-15"
    type="button"
    onClick={onToDo}
  >
    确认{editUUid !== -1 ? '编辑' : '添加'}
  </button>
);

export default AddEditButton;
