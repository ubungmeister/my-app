import React, {useState} from 'react';
import './App.css';
import {AppRootStateType} from "./store";
import {addTodo, changeTask, removeTodo, toggleTodo} from "./store/todoSlice";
import {motion} from "framer-motion";
import {FaTrash} from 'react-icons/fa';
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components";
import {EditableText} from "./components/EditableText";


type FilterType = 'All' | 'Completed' | 'Active'

export type Todolist = {
    id: string
    text: string
    completed: boolean
}

function App() {
    const [text, setText] = useState('')
    const [filter, setFilter] = useState<FilterType>('All')

    const getDate = () => {
        let month = ['January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'][new Date().getMonth()]
        let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date().getDay()]
        let fullDay = weekday + ', ' + new Date().getDate() + ' of';
        const date = [fullDay, month]
        return date
    }

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

    // update Todos
    const editTodoListHandler = (id: string, text: string) => {
        dispatch(changeTask({id, text}))
    }

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
                <BackgroundWrapper>
                    <TitleWrapper>{getDate()[0]}</TitleWrapper>
                    <TitleWrapper>{getDate()[1]}</TitleWrapper>
                </BackgroundWrapper>
                <TodoInputWrapper
                    type='text'
                    onChange={event => {
                        setText(event.target.value)
                    }}
                    onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                            addTodosHandler()
                        }
                    }}
                    value={text}
                    placeholder={'Start writing...'}
                />
                <ul> {filterTodoList(filter).map((todo) => {
                    return (
                        <MapTasksWrapper key={todo.id}>
                            <MapTodosWrapper>
                                {/*{todo.text}</MapTodosWrapper>*/}
                                <EditableText text={todo.text}
                                              callBack={(changeTitle) => {
                                                  editTodoListHandler(todo.id, changeTitle)
                                              }}/>
                            </MapTodosWrapper>
                            <IconsWrapper>
                                <CheckBoxWrapper type={"checkbox"} onClick={() => checkboxHandler(todo.id)}/>
                                <ButtonsTaskWrapper onClick={() => removeTodosHandler(todo.id)}>
                                    <FaTrash size='1.2rem'
                                             opacity='40%' cursor='pointer'/>
                                </ButtonsTaskWrapper>
                            </IconsWrapper>
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
  background-color: white;
  box-shadow: 5px 5px 30px 0px rgba(0, 0, 0, 0.5);

`
export const BackgroundWrapper = styled.div`
  padding: 2.7em;
  background-image: linear-gradient(90deg, rgba(224, 195, 252, 0.7) 0%, rgba(142, 197, 252, 0.7) 100%),
  url(https://images.unsplash.com/photo-1553335538-efce787fe4f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
`
export const TitleWrapper = styled.div`
  font-size: 25px;
  text-align: center;
  margin-bottom: -0.3rem;
  color: #ffffff;
  text-shadow: 1px 2px 5px rgba(255, 85, 105, 0.3), 3px -1px 5px rgba(80, 220, 251, 0.08);
`

export const TodoInputWrapper = styled.input`
  background-color: rgb(237, 236, 248);
  border: none;
  font-size: 1.3em;
  margin: 0;
  padding: 1em 1em;
  width: 100%;
`
export const MapTasksWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border: 0.1rem solid rgb(220, 220, 220);
  background-color: #f4f4f4;
  border-radius: 20px;
  margin: 0.5rem;

  &:hover {
    border: 2px solid rebeccapurple;
  }
`
export const MapTodosWrapper = styled.span`
  padding: 10px;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
  width: 90%
`

export const IconsWrapper = styled.div`
  display: inline-flex;
  padding: 12px;
  gap: 1.2rem;
  cursor: pointer;
`
export const ButtonsTaskWrapper = styled.div`
  height: 20px;

`
export const CheckBoxWrapper = styled.input`
  height: 20px;
  width: 15px;
`
export const FilterWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 1.5rem;
  margin-bottom: 2rem;
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

