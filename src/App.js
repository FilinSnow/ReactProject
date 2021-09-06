import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  useEffect(async () => {
    await axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data);
    });
  });

  const addNewTask = async () => {
    await axios.post('http://localhost:8000/createTask', {
      text,
      isCheck: false
    }).then(res => {
      setText('');
      setTasks(res.data.data);
    });
  }

  // const updateTask = async (index) => {
  //   await axios.patch(`http://localhost:8000/updateTask`, {
  //     _id: tasks[index]._id,
  //     text: tasks[index].text
  //   }).then(res => {
  //     setTasks(res.data.data);
  //   });
  // }

  const delTask = async (index) => {
    await axios.delete(`http://localhost:8000/deleteTask?_id=${tasks[index]._id}`, {
      _id: tasks[index]._id
    }).then(res => {
      setTasks(res.data.data);
    });
  }

  const delAllTask = async () => {
    await axios.delete('http://localhost:8000/deleteAllTask').then(res => {
      setTasks(res.data.data);
    });
  }

  const editTask = (index) => {
    <div className="test_edit" style = {{display: "block"}}>
      <input type="text" id="add-task2" value='' />
      <button type="button" class="btn-add" onclick="onClickEdit()">Add</button>
      <button type="button" class="btn-cancel" onclick="onClickCancel()">Back</button>
    </div>
  }

  return (
    <div className="App">
      <div className="main_bg">
        <div className="main">
          <div className="main-title">
            <h1>To-do lists</h1>
          </div>
          <div className="main-content">
            <div className="main-content-text">
              <div className="main-content-text-alert">
                <span style={{ display: "none" }} id="text_alert">Fill in</span>
              </div>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="main-content-button">
              <button type="button" onClick={() => addNewTask()}>Add</button>
            </div>
          </div>
        </div>
        <div className="result_block" id="content-page" style={{ display: "block" }}>
          {
            tasks.map((task, index) =>

              <div className={'task-container'} key={`task-${index}`}>
                <input type='checkbox' isCheck={task.isCheck} />
                <p className="text-task">{task.text}</p>
                <button className="button_edit" onClick={() => editTask(index)}></button>
                <button className="button_del" onClick={() => delTask(index)}></button>
              </div>
            )
          }
        </div>
        <div className="result_clear_all" id="content-clear" style={{ display: "block" }}>
          <button type="button" onClick={() => delAllTask()}>Clear all</button>
        </div>
      </div>
    </div>
  );
}

export default App;
