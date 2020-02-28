//Global Imports
import React from 'react';
import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';

//Styles Imports
import './index.css';

//Components Imports
import Message from '../Message';

//libary Imports
import FadeIn from 'react-fade-in';

class ChatDisplay extends React.Component {
    

    render() {
        const ROOT_CSS = css({
            height: 420,
            width: 600
          });

        const mapTheArrayOfObj = this.props.theArrayOfOnlineMessages.map( (obj, index) => <Message key={index} theMessage={obj.msg} theUser={obj.user} />);       
        return(
            <div className="chat-display-container">
                <FadeIn>
                   <ScrollToBottom className={ ROOT_CSS }>
                    {this.props.theArrayOfOnlineMessages.length === 0 ? <h3>Loading Room..</h3> : mapTheArrayOfObj} 
                    </ScrollToBottom>
                </FadeIn>
            </div>
        );
    }
}

export default ChatDisplay;



