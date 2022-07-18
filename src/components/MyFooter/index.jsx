import React from 'react'
import './index.css'
import PubSub from 'pubsub-js'

export default function MyFooter() {
  const [footerObj,setFooterObj] = React.useState({doneCount:0,total:3})
  React.useEffect(() => {
    const token  = PubSub.subscribe('todoArr',(_,todoArr) => {

      const newDoneCount = todoArr.reduce((pre,cur) => pre + (cur.done?1:0),0)
      const total = todoArr.length
      setFooterObj({doneCount:newDoneCount,total})
    })
    return () => {
      PubSub.unsubscribe(token)
    }
  },[])
  
  function handelAllChecked(event) {
    PubSub.publish('allChecked',event.target.checked)
  }

  function handleAllDone() {
    PubSub.publish('handleAllDone','handleAllDone')
  }
  
  return (
    <div className="todo-footer">
      <label>
        <input type="checkbox" onChange={handelAllChecked}/>
      </label>
      <span>
        <span>已完成{footerObj.doneCount}</span>/全部{footerObj.total}
      </span>
      <button onClick = {handleAllDone} className='btn btn-danger'>清除已完成</button>
    </div>
  )
}
