import React from 'react';
import './index.css';

//Components Imports
import ChatDisplay from '../ChatDisplay';
import ChatInput from '../ChatInput';
import UsersList from '../UsersList';
import RoomsNav from '../RoomsNav';

import { css } from 'glamor';
import ScrollToBottom from 'react-scroll-to-bottom';

class ChatContainer extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            getArrayOfObjMsg: []
        }
    }
/*
    getMessageFromInput = (getMessage) => {
        
        console.log(getMessage);
        this.setState({
            getArrayOfObjMsg: getMessage
        });
    }
*/
    getRoomIdFromRoomsNav = (getTheRoomId) => {
        this.props.getRoomId(getTheRoomId);
    }


    render() {
        
        return(
            
            <div className="chat-container-container">
               
                
                <RoomsNav currentUser={this.props.currentUser} theFirstActiveRoomName={this.props.theFirstActiveRoomName} theActiveRooms={this.props.theActiveRooms} getRoomId={this.getRoomIdFromRoomsNav} />
                <div>
                    <ChatDisplay theArrayOfOnlineMessages={this.props.theArrayOfOnlineMessages} />
                    <ChatInput theActiveRoomId={this.props.theActiveRoomId} currentUser={this.props.currentUser} />
                </div>
                <UsersList theUsersOfActiveRoom={this.props.theUsersOfActiveRoom} currentUser={this.props.currentUser} />
                
            </div>
            
        ); 
    }
}

export default ChatContainer;



