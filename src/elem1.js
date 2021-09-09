import React, { useState } from "react";
import axios from "axios";
import ItemNotEdit from "./ItemNotEdit";
import ItemEdit from "./ItemEdit";

const Elem1 = ({ onTask, index, tasks, setTasks, isCheck }) => {
  const [taskEdit, setTaskEdit] = useState(false);
  const delTask = async (index) => {
    await axios.delete(`http://localhost:8000/deleteTask?_id=${tasks[index]._id}`).then(res => {
      setTasks(res.data.data);
      setTaskEdit(false);
    });
  }

  const props_el = {
    setTaskEdit: setTaskEdit,
    index: index,
    onTask: onTask,
    setTasks: setTasks,
    delTask: delTask,
    isCheck: isCheck
  }

  return (
    <>
      {
        taskEdit ? <ItemEdit {...props_el}/>
          : <ItemNotEdit {...props_el} />
      }
    </>
  );
}
export default Elem1;