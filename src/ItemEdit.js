import React, { useState } from "react";
import axios from "axios";

function ItemEdit({ onTask, index, setTaskEdit, setTasks, delTask, isCheck }) {
  const [value, setValue] = useState(onTask.text);
  const onClickEdit = async () => {
    await axios.patch(`http://localhost:8000/updateTask`, {
      _id: onTask._id,
      text: value
    }).then(res => {
      setTasks(res.data.data);
      setTaskEdit(false);
    });
  }
  return (
    <div className={'task-container'} key={`task-${index}`}>
      <p className={`text-task ${isCheck ? 'done-text' : ''}`}>{onTask.text}</p>
      <button className="button_edit button_hide" onClick={() => setTaskEdit(true)}></button>
      <button className="button_del" onClick={() => delTask(index)}></button>
      <div className={`test_edit ${isCheck ? 'test_edit_hide' : ''}`}>
        <input type="text" id="add-task2" value={value} onChange={(e) => setValue(e.target.value)} />
        <button type="button" className="btn-add" onClick={() => onClickEdit(index)}>Add</button>
        <button type="button" className="btn-cancel" onClick={() => setTaskEdit(false)}>Back</button>
      </div>
    </div>
  );
}
export default ItemEdit;