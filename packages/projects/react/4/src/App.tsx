import ewMessage from "ew-message";
import utils from "ew-utils";
import React from "react";
import Lists, { TodoListItem } from "./components/Lists";
import AddEditButton from "./components/AddEditButton";
import TodoInput from "./components/TodoInput";
export interface AppProps {
  className?: string;
}
const App: React.FC<AppProps> = ({ className }) => {
  const [state, setState] = React.useState(""); //输入的值
  const [editUUid, setEditUUid] = React.useState<string | number>(-1); //编辑事项的uuid
  const [listData, setListData] = React.useState<TodoListItem[]>([]); //todoList
  // 请求数据
  const onRequestTodoList = () => {
    let todoList: TodoListItem[] = [];
    todoList.push({
      uuid: utils.createUUID(),
      text: "Now you can learn react.js by writing the todo-list application!",
    });
    setListData(todoList);
  };
  // 值改变时
  const handleChange = (e: React.SyntheticEvent<HTMLInputElement, Event>) => {
    setState((e?.target as HTMLInputElement).value);
  };
  // 点击确认添加或确认编辑
  const handleToDo = (editUUid: string | number) => {
    if (!state) return ewMessage.error("请输入需要待办的事项!");
    // 等于-1表示是添加否则是编辑
    if (editUUid === -1) {
      let newTodoList: TodoListItem[] = [];
      newTodoList.push({
        text: state,
        uuid: utils.createUUID(),
      });
      setListData(listData.concat(newTodoList));
      setState("");
    } else {
      let idx = listData.findIndex((_) => _.uuid === editUUid);
      if (idx > -1) {
        listData[idx].text = state;
      }
      setListData(listData);
      setState("");
      setEditUUid(-1);
    }
  };
  // 当输入值并按下enter键时触发
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleToDo(editUUid);
    } else {
      return null;
    }
  };
  // 点击编辑
  const handleEdit = (
    item: Partial<TodoListItem>,
    editUUid: number | string
  ) => {
    if (editUUid === -1 || editUUid !== item.uuid) {
      setEditUUid(item.uuid!);
      setState(item.text!);
    } else {
      setEditUUid(-1);
      setState("");
    }
  };
  // 点击删除
  const handleDelete = (item: Partial<TodoListItem>) => {
    window.ewConfirm({
      title: "温馨提示",
      content: "确定要删除该待办事项吗?",
      showCancel: true,
      sure: (context: { close: () => void }) => {
        context.close();
        // copy the listData and splice the item,set the copyable data to listData,the dom can update the listData
        // so why?
        const data = listData.slice();
        const idx = data.findIndex((_) => _.uuid === item.uuid);
        if (idx > -1) data.splice(idx, 1);
        setListData(data);
      },
    });
  };
  // 点击查看待办事项详情
  const seeDetail = (item: Partial<TodoListItem>) => {
    return ewMessage.info({
      showClose: true,
      content: `待办事项详情:${item.uuid}:${item.text}`,
      duration: 0,
    });
  };
  React.useEffect(() => {
    onRequestTodoList();
  }, []);
  return (
    <section className={className}>
      <div className="handle-container">
        <TodoInput
          handleChange={(e) => handleChange(e)}
          todo_value={state}
          handleKeyDown={(e) => handleKeyDown(e)}
        />
        <AddEditButton
          onToDo={() => handleToDo(editUUid)}
          editUUid={editUUid}
        />
      </div>
      <Lists
        handleEdit={(item) => handleEdit(item, editUUid)}
        todoList={listData}
        handleDelete={(item) => handleDelete(item)}
        seeDetail={(item) => seeDetail(item)}
        editUUid={editUUid}
      />
    </section>
  );
};

export default App;
