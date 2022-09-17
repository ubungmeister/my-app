import React, {useState} from 'react';
import './App.css';
import {AppRootStateType} from "./store";
import {addTodo, changeTask, removeTodo, toggleTodo} from "./store/todoSlice";
import {motion} from "framer-motion";
import {FaTrash} from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";


type FilterType = 'All' | 'Completed' | 'Active'

export type Todolist = {
  id: string
  text: string
  completed: boolean
}

function App() {

  const [text, setText] = useState('')
  const [filter, setFilter] = useState<FilterType>('All')


  let todos = useSelector<AppRootStateType, Array<Todolist>>(state => state.todos.todo)
  const dispatch = useDispatch()

  //add Todos
  const addTodosHandler = () => {
    if (text.trim().length > 0) {
      dispatch(addTodo(text))
      setText('')
    }
  }
  //remove Todos
  const removeTodosHandler = (id: string) => {
    dispatch(removeTodo(id))
  }
  //update checkbox
  const checkboxHandler = (id: string) => {
    dispatch(toggleTodo(id))
  }

  //update Todos
  // const editTodoListHandler = (id: string, text: string) => {
  //   dispatch(changeTask({id, text}))
  // }

  const filterTodoList = (filter: FilterType) => {
    return filter === 'Active'
        ? todos.filter(task => !task.completed)
        : filter === 'Completed'
            ? todos.filter(task => task.completed)
            : todos
  }

  //

  return (
      <Conteiner>
        <Wrapper>
          <TitleWrapper>Todo App</TitleWrapper>
          <TodoInputWrapper
              type='text'
              onChange={event => {
                setText(event.target.value)
              }}
              value={text}
              placeholder={'Start writing...'}
          />
          <AddButtonWrapper onClick={addTodosHandler}
                            whileHover={{scale: 1.1}}
                            whileTap={{scale: 0.9}}> Add
          </AddButtonWrapper>
          <ul> {filterTodoList(filter).map((todo) => {
            return (
                <MapTasksWrapper key={todo.id}>
                  <span>{todo.text}</span>
                  {/*<EditableText text={todo.text}*/}
                  {/*              callBack={(changeTitle) => {*/}
                  {/*                  editTodoListHandler(todo.id, changeTitle)*/}
                  {/*                              }}/>*/}

                  <ButtonsTaskWrapper onClick={() => removeTodosHandler(todo.id)}>
                    <FaTrash size='1.2rem' color='#c13923'
                             opacity='40%' cursor='pointer'/>
                  </ButtonsTaskWrapper>
                  <CheckBoxWrapper type={"checkbox"} onClick={() => checkboxHandler(todo.id)}/>
                </MapTasksWrapper>
            )
          })}
          </ul>
          <FilterWrapper>

            <FilterIteamWraper whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                               onClick={() => setFilter('All')}>All</FilterIteamWraper>
            <FilterIteamWraper whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                               onClick={() => setFilter('Completed')}>Completed</FilterIteamWraper>
            <FilterIteamWraper whileHover={{scale: 1.1}} whileTap={{scale: 0.9}}
                               onClick={() => setFilter('Active')}>Active</FilterIteamWraper>
          </FilterWrapper>
        </Wrapper>
      </Conteiner>
  );
}

export default App;


export const Conteiner = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Wrapper = styled.div`
  width: 500px;
  min-height: 50vh;
  padding: 25px;
  background-color: white;
  box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.5);

`
export const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  color: darkslategray;
  font-size: 35px;
  text-shadow: 1px 2px 5px rgba(255, 85, 105, 0.3), 3px -1px 5px rgba(80, 220, 251, 0.08);
`

export const TodoInputWrapper = styled.input`
  width: 75%;
  padding: 11px;
  margin: 8px 0;
  border: 2px solid #ccc;
  border-radius: 4px;

`
export const AddButtonWrapper = styled(motion.button)`
  background-image: linear-gradient(to right, #f5f0ff, #ebf8ff);
  width: 22%;
  cursor: pointer;
  border-radius: 20px;
  height: 20%;
  border: none;
  margin-left: 10px;
  color: black;
  padding: 10px;
  font-size: 17px;
`
export const MapTasksWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 12px;
  border: 0.1rem solid rgb(220, 220, 220);
  background-color: #f4f4f4;
  border-radius: 20px;
  margin: 0.5rem;

  &:hover {
    border: 2px solid rebeccapurple;
  }

`
export const ButtonsTaskWrapper = styled.div`
  margin-left: 365px;
  height: 20px;
  position: fixed
`
export const CheckBoxWrapper = styled.input`
  position: fixed;
  height: 20px;
  margin-left: 390px;

`
export const FilterWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1.5rem;


`
export const FilterIteamWraper = styled(motion.span)`
  font-size: 18px;
  background-image: linear-gradient(to right, #f5f0ff, #ebf8ff);
  cursor: pointer;
  border-radius: 20px;
  border: none;
  color: black;
  padding: 10px 20px;


`

