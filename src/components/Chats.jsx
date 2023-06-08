import * as React from 'react';
import List from '@mui/material/List';
import {Chat} from './index'

let theme ={
    height: 400,
    padding: '0',
    overflow: 'auto',
    width: '100%',
    maxWidth: 400,
    bgcolor: 'background.paper' 
}

const Chats =(props)=>{
    return (
        <List sx={theme} id={"scroll-area"}>
          {props.chats.map((chat, index)=>{
             return <Chat text={chat.text} type={chat.type} key={index.toString()} />
          })}
        </List>
    );
};

export default Chats;