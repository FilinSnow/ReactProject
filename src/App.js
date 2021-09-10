import React, { useState, useEffect } from "react";
import axios from "axios";
import Elem1 from "./elem1";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [flagErr, setFlagErr] = useState(false);
  tasks.sort((a, b) => a.isCheck - b.isCheck);
  useEffect(() => {
    axios.get('http://localhost:8000/allTasks').then(res => {
      setTasks(res.data.data);
    });
  });
  const addNewTask = async () => {
    if (text.length) {
      await axios.post('http://localhost:8000/createTask', {
        text,
        isCheck: false
      }).then(res => {
        setText('');
        setTasks(res.data.data);
        setFlagErr(false);
      });
    } else {
      setFlagErr(true);
    }
  }
  const delAllTask = async () => {
    await axios.delete('http://localhost:8000/deleteAllTask').then(res => {
      setTasks(res.data.data);
    });
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
                <span className={`text_alert ${flagErr ? 'text_alert_show' : ''}`}>Fill in</span>
              </div>
              <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
            </div>
            <div className="main-content-button">
              <button type="button" onClick={() => addNewTask()}>Add</button>
            </div>
          </div>
        </div>
        <div className={`result_block ${!tasks.length ? 'result_block_hide' : ''}`}>
          {
            tasks.map((task, index) =>

              <Elem1 onTask={task} index={index} tasks={tasks} setTasks={setTasks} isCheck={task.isCheck} />
            )
          }
        </div>
        <div className={`result_clear_all ${!tasks.length ? 'result_clear_all_hide' : ''}`}>
          <button type="button" onClick={() => delAllTask()}>Clear all</button>
        </div>
      </div>
    </div>
  );
}
export default App;