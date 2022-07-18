import React from 'react'
import './index.css'
import PubSub from 'pubsub-js'

export default function MyHeader() {
  function addTodo(event){
    //console.log(MyRef.current.value)
    //console.log(event.keyCode)
    if(event.keyCode !== 13)return
    if(event.target.value.trim() === ''){
      alert('输入不能为空')
      return
    }
    PubSub.publish('addTodo',event.target.value)
    event.target.value = ''
  }
  return (
    <div className="todo-header">
      <input type="text" placeholder="输入任务并回车" onKeyUp={addTodo} />
    </div>
  )
}
