import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";
import {MdDone, MdModeEditOutline} from "react-icons/md";

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
                <TasksWrapper>{newTitle}</TasksWrapper>}

            {edit
                ? <IconWrapper onClick={() => setEdit(!edit)}><MdDone size='1.4rem'
                                                                      opacity='40%' cursor='pointer'/></IconWrapper>
                : <IconWrapper onClick={() => setEdit(!edit)}><MdModeEditOutline size='1.4rem'
                                                                                 opacity='40%'
                                                                                 cursor='pointer'/></IconWrapper>
            }


        </DivWrapper>
    );
};

export const DivWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

export const TasksWrapper = styled.span`
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;

`
export const InputWrapper = styled.input`
  width: 90%;
  font: 1rem/1em;
  border: none;
  background: none;
  font-size: 20px;


`
export const IconWrapper = styled.div`
  height: 20px;
`