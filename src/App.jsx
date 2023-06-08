import React, { useEffect, useState, useCallback } from "react";
import './assets/styles/styles.css';
import {AnswersList, Chats, FormDialog} from "./components/index";
import {db} from './firebase/index';
import { collection } from "firebase/firestore";

function App() {
  
  const [answers, setAnswers] = useState([]);
  const [chats, setChats] = useState([]);
  const [currentId, setCurrentId] = useState("init");
  const [dataSet, setDataset] = useState({});
  const [open, setOpen] = useState(false);

  function displayNextQuestion(nextQuestionId, nextDataset) {
    addChats({
      text: nextDataset.question,
      type: 'question'
    });
    setCurrentId(nextQuestionId);
    setAnswers(nextDataset.answers)
  }; 

  const selectAnswer = useCallback((selectedAnswer, nextQuestionId)=> {

    switch(true) {
      case (/^https:*/.test(nextQuestionId)):
         const a = document.createElement('a');
         a.href = nextQuestionId;
         a.target = '_blank';
         a.click();
         break;
      case (nextQuestionId === 'contact'):
        handleOpen();
        break;
      default:
         addChats({
          text: selectedAnswer,
          type: 'answer'
         });
         setTimeout(()=>{displayNextQuestion(nextQuestionId)}, 500); 
         break;
    }
  }, [answers]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const addChats = useCallback((chat) => {
    setChats(prevChats => {
        return [...prevChats, chat]
    })
  },[setChats]);

  useEffect(()=>{
    (async()=>{
         const initDataset={};
         await db.collection('questions').get().then(snapshots => {
          snapshots.forEach(doc => {
              initDataset[doc.id] = doc.data()
          })
    });
    setDataset(initDataset)
    displayNextQuestion(currentId, initDataset[currentId])
    });
  }, []);

  useEffect(()=>{
    const scrollArea =document.getElementById('scroll-area')
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight
    }
  });

  return (
    <div>
       <section className="c-section">
         <div className="c-box">
           <Chats chats={chats}/>
           <AnswersList answers={answers} select={selectAnswer}/>
           <FormDialog open={open} handleClose={handleClose}/>
         </div>
      </section> 
    </div>
  );

};

export default App;
