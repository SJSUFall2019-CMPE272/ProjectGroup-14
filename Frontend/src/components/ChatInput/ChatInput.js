import React, { useState } from 'react';
import SimpleForm from './SimpleForm';
import './Chat.css';

const ChatInput = (props) => {
  let [showChat, setShowChat] = useState(false);

  const startChat = () => { setShowChat(true); }
  const hideChat = () => { setShowChat(false); }


        return (
          <div>
              <div class="header">
                        <a style={{color:"blue"}} href="/" class="logo">MEDIREPORT</a>
                            <div class="header-right">
                            </div>
                        </div>
      <div className = "header">
        <h2>MEDIREPORT CHAT HELP</h2>
      </div>
      <div className = "main">
          <div className ="content">
          <div>
            <h1>How can we help??.....</h1>
            <p>Report an issue,update info</p>            
<p>Talk with our health experts to get more info</p>
{!showChat 
            ? <button class="btn btn-primary btn-lg btn-block" onClick={() => startChat()}>click to chat... </button> 
            : <button class="btn btn-primary btn-lg btn-block" onClick={() => hideChat()}>click to hide... </button>}

          </div>
        </div>
      </div>
      <div className = "bot">
        <div style ={{display: showChat ? "" : "none"}}>
          <SimpleForm></SimpleForm>
        </div>      
        {/* <div> {showChat ? <SimpleForm></SimpleForm> : null} </div> */}
     
      </div>   
     </div>  
        );
}

export default ChatInput;