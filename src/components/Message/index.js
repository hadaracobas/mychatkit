import React from 'react';
import './index.css';

class Message extends React.Component {
    

    render() {
        return(
            <div className="message-container">
                <span><b>{this.props.theUser} </b></span><span>{this.props.theMessage}</span>  
            </div>
        );
    }
}

export default Message;

