import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";

type EditableTextType = {
    text: string
    callBack: (changeTitle: string) => void

}

export const EditableText = (props: EditableTextType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.text)

    const EditTrueHandler = () => {
        setEdit(!edit)
    }
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(event.currentTarget.value)
    }
    return (
        <DivWrapper>

            {edit
                ? <InputWrapper
                    onBlur={EditTrueHandler}
                    autoFocus
                    value={newTitle}
                    onChange={onChangeInputHandler}
                /> :

                <TasksWrapper onDoubleClick={EditTrueHandler}>{newTitle}</TasksWrapper> }


        </DivWrapper>
    );
};

export const DivWrapper = styled.div`
    display: flex;
    justify-content: space-between; 
`

export const TasksWrapper = styled.span`
  //border-radius: 50px;
  flex: 1 1 0%;
  font-weight: bold;
  text-decoration: none;
  overflow: hidden;
  font-size: 14px;
  max-width: 250px;
  

`
export const InputWrapper = styled.input`
  background-color: #f4f4f4;
  font-weight: bold;
  text-decoration: none;
  
`