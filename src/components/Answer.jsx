import React from "react";
import Button from '@mui/material/Button';

let theme = {
    borderColor: "#FFB549",
    color: "#FFB549",
    fontWeight: 600,
    marginBottom: "8px",
    ":hover":{
       backgroundColor: "#FFB549",
       color: "#fff"
    },
};


const Answer =(props)=>{
   return (
     <Button sx={theme} className="classes.button" variant="outlined" onClick={()=>props.select(props.content, props.nextId)} disableElevation>
        {props.content}
     </Button>
   );
}

export default Answer