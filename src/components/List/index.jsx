import React, { useState, useEffect } from 'react'
import Item from "../Item";
import './index.css'
import PubSub from 'pubsub-js'
import { nanoid } from "nanoid";


export default function List() {
  const [todoArr, setTodoArr] = useState([
    { id: '1', title: '喝咖啡', done: false },
    { id: '2', title: '打扫整个家', done: false },
    { id: '3', title: '算命', done: false }
  ])

  useEffect(() => {
    const token1 = PubSub.subscribe('addTodo', (_, newTitle) => {
      //console.log(newTitle)
      const newTodoObj = { id: nanoid(), title: newTitle, done: false }
      setTodoArr(todoArr => [newTodoObj, ...todoArr])
    });
    const token2 = PubSub.subscribe('allChecked',(_,done) => {
      
      setTodoArr(todoArr => {
        const newTodoArr = todoArr.map(todoObj => {return {...todoObj,done}})
        return newTodoArr
      })
    });

    return () => {
      //console.log('@@')?未显示
      PubSub.unsubscribe(token1)
      PubSub.unsubscribe(token2)
    }
  }, [])
  //console.log(todoArr)

  useEffect(() => {
    PubSub.publish('todoArr',todoArr)
  },[todoArr])

  /* 清除已完成 */
  useEffect(() => {
    PubSub.subscribe('handleAllDone',(_,str) => {
      setTodoArr((todoArr) => {
        const newTodoArr = todoArr.filter((todoObj) => { return !todoObj.done })
        return newTodoArr
      })
    })
  },[])

  /* 删除某一项todo */
  function deleteTodo(id) {
    //console.log(id)
    const newTodoArr = todoArr.filter((todoObj) => { return id !== todoObj.id })
    setTodoArr(newTodoArr)
  }

  function changeChecked(done, id) {
    /* map一定要有返回值 */
    //console.log('@@',done,id)
    const newTodoArr = todoArr.map((todoObj) => {
      if (id === todoObj.id)
        return { ...todoObj, done }
      else return todoObj
    })

    setTodoArr(newTodoArr)
  }
  return (
    <ul className="todo-list">
      {
        todoArr.map((todoObj) => {
          return <Item key={todoObj.id} todoObj={todoObj} deleteTodo={deleteTodo} changeChecked={changeChecked} />
        })
      }
    </ul>
  )
}
