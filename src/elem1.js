import React, { useState } from "react";
import axios from "axios";
import ItemNotEdit from "./ItemNotEdit";
import ItemEdit from "./ItemEdit";

function Elem1({ onTask, index, tasks, setTasks, isCheck }) {
  const [taskEdit, setTaskEdit] = useState(false);
  const delTask = async (index) => {
    await axios.delete(`http://localhost:8000/deleteTask?_id=${tasks[index]._id}`).then(res => {
      setTasks(res.data.data);
      setTaskEdit(false);
    });
  }
  return (
    <>
      {
        taskEdit ? <ItemEdit setTaskEdit={setTaskEdit} index={index} onTask={onTask} setTasks={setTasks} delTask={delTask} isCheck={isCheck} />
          : <ItemNotEdit setTaskEdit={setTaskEdit} index={index} onTask={onTask} setTasks={setTasks} delTask={delTask} isCheck={isCheck} />
      }
    </>
  );
}
export default Elem1;