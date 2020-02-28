import React from 'react';
import './index.css';



class Room extends React.Component {
    
    render() {
        return(
            <div>
                <div onClick={this.props.roomClick} className='room'>
                    <button className="remove-room-button" onClick={this.props.removeRoomButton}>X</button>
                    <span className="room-name">{this.props.roomName}</span>
                </div> 
            </div>
        );
    }
}
export default Room;