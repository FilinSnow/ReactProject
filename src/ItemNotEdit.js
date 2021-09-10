import React from "react";
import axios from "axios";

const ItemNotEdit = ({ onTask, index, setTaskEdit, setTasks, delTask, isCheck }) => {
  const onCheck = () => {
    axios.patch(`http://localhost:8000/updateTask`, {
      _id: onTask._id,
      isCheck: !isCheck
    }).then(res => {
      setTasks(res.data.data);
    });
  }

  return (
    <div className={'task-container'} key={`task-${index}`}>
      <input type='checkbox' checked={isCheck} onChange={(e) => onCheck(e.target.value)} />
      <p className={`text-task ${isCheck ? 'done-text' : ''}`}>{onTask.text}</p>
      <button className={`button_edit ${isCheck ? 'button_hide' : ''}`} onClick={() => setTaskEdit(true)}></button>
      <button className="button_del" onClick={() => delTask(index)}></button>
    </div>
  );
}
export default ItemNotEdit;