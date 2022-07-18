import React,{useRef} from 'react'
import './index.css'

export default function Item(props) {
  /* console.log(props) */
  const {todoObj:{title,id,done}} = props

  const MyRef = useRef()
  const [mouseObj,setMouseObj] = React.useState({mouse:false})

  function handleTodo(id) {
    /* console.log(id) */
    props.deleteTodo(id)
  }

  function handleCheck(id){
      props.changeChecked(MyRef.current.checked,id)
  }
  function handleMouseEnter(flag) {
    setMouseObj({mouse:flag})
  }
  function handleMouseLeave(flag) {
    setMouseObj({mouse:flag})
  }

  return (
    <li style={{backgroundColor:mouseObj.mouse ? '#ddd' : 'white'}} onMouseEnter={() => {handleMouseEnter(true)}} onMouseLeave={() => {handleMouseLeave(false)}}>
        <label>
          <input ref={MyRef} type="checkbox" checked={done} onChange={() => handleCheck(id)}/>
          <span>{title}</span>
        </label>
        <button style={{display:mouseObj.mouse ? 'block' : 'none'}} className='btn btn-danger' onClick={() => handleTodo(id)}>删除</button>
    </li>
  )
}
