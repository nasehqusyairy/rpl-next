"use client"

import { useEffect, useState } from "react";

interface TodoList {
  name: string
}

function Home() {

  const todolist: TodoList[] = [];
  const [taskList, setTaskList] = useState(todolist);
  const [task, setTask] = useState('');

  useEffect(() => {
    const data = localStorage.getItem('todolist')
    setTaskList(data ? JSON.parse(data) : [])
  }, [])

  useEffect(() => {
    localStorage.setItem('todolist', JSON.stringify(taskList))
  }, [taskList]);

  const handleOnsubmit = (e: any) => {
    e.preventDefault()

    setTaskList([...taskList, { name: task }])
    setTask('')
  }

  const remove = (i: number) => {
    const list = [...taskList]
    list.splice(i, 1)
    setTaskList(list)
  }

  return (
    <main className="bg-primary">
      <section>
        <div className="container">
          <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h3>To Do List - NextJS</h3>
                </div>
                <div className="card-body" style={{ height: '50vh' }}>
                  <ul className="list-group list-group-flush">
                    {taskList.map((el: any, i: number) => (
                      <li key={i} className="list-group-item d-flex justify-content-between">
                        {el.name}
                        <span onClick={() => remove(i)} className="badge bg-danger hoverable"><i className="bi bi-x"></i></span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card-footer">
                  <form onSubmit={handleOnsubmit}>
                    <input type="text" className="form-control" value={task} onChange={(e: any) => setTask(e.target.value)} />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;