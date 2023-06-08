import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextInput from './TextInput'

const FormDialog =(props)=>{
  
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [description, setDescription] = useState("");

    const inputName=(event)=>{
        setName(event.target.value)
    };
    const inputEmail=(event)=>{
        setEmail(event.target.value)
    };
    const inputDescription=(event)=>{
        setDescription(event.target.value)
    };

    const submitForm=()=>{
        const payload={
            text: "お問合せ\n" +
                  'お名前: ' + name + '\n' +
                  'Email: ' + email +'\n' +
                  'お問合せ内容:\n' + description
        }
        
        const url="https://hooks.slack.com/services/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"

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(()=>{
            alert("送信が完了しました。追って連絡します")
            setName("")
            setEmail("")
            setDescription("")
        })
        return props.handleClose()
    }
    
    return (
      <div>
        <Dialog
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
             お問合せフォーム
          </DialogTitle>
          <DialogContent>
             <TextInput 
                label={"お名前(必須)"} multiline={false} rows={1}
                value={name} type={"text"} onChange={inputName}
             />
             <TextInput 
                label={"メールアドレス(必須)"} multiline={false} rows={1}
                value={email} type={"email"} onChange={inputEmail}
             />
             <TextInput 
                label={"お問い合せ内容(必須)"} multiline={true} rows={5}
                value={description} type={"text"} onChange={inputDescription}
             />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose}>キャンセル</Button>
            <Button onClick={submitForm} autoFocus>
              送信する
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default FormDialog;