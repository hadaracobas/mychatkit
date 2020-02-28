import React from 'react';
import './index.css';

//Components Imports
import Room from '../Room';

//libary Imports
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';


class RoomsNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theActiveRoomName: '',
            newRoomNameInputValue: ''
        }
    }

    handleRoomClick = (roomId, roomName) => {
        this.props.getRoomId(roomId, roomName);
        
        this.setState({
            theActiveRoomName: roomName
        });
    }

    handleInputValueNewRoomCreation = (e) => {
        this.setState({
            newRoomNameInputValue: e.target.value
        }, () => console.log(this.state.newRoomNameInputValue));
    }

     handleAddRoom = async (e) => {
        e.preventDefault();
        this.setState({
            newRoomNameInputValue: ''
          });
        await this.props.currentUser.createRoom({
            name: this.state.newRoomNameInputValue,
            addUserIds: ['Hadar', 'Lea', 'Jovana', 'Eva'],
          }).then(room => {
            console.log(`Created room called ${room.name}`)
          })
          .catch(err => {
            console.log(`Error creating room ${err}`)
          })

  
    }

    handleRemoveRoomButton = async (theRoomId) => {
        await this.props.currentUser.deleteRoom({ roomId: theRoomId })
            .then(() => {
                console.log(`Deleted room with ID: ${theRoomId}`)
            })
            .catch(err => {
                console.log(`Error deleted room ${theRoomId}: ${err}`)
            })
    }

  
    render() {
        
        const ROOT_CSS = css({
            height: 460,
             width: 230
          });
          
      
      const mapInArrayOfRooms = this.props.theActiveRooms.map( (r, index) => <Room key={index} roomName={r.roomName} roomClick={ () => this.handleRoomClick(r.roomId, r.roomName)} activeRoom={'active-room'} removeRoomButton={() => this.handleRemoveRoomButton(r.roomId)} />);
        
        return(
            
            <div className="roomsnav-container">
              <ScrollToBottom className={ ROOT_CSS }>
                    <p className="active-room-title">
                        You Are In Room: <br/>
                    {this.state.theActiveRoomName.length === 0 ? <p className="the-active-room-title-dinamic">{this.props.theFirstActiveRoomName}</p> : <p className="the-active-room-title-dinamic">{this.state.theActiveRoomName}</p> }
                    </p>
                    
                    {mapInArrayOfRooms}
               

                    

                <form onSubmit={this.handleAddRoom}>
                    <div className="form-row align-items-center">
                        <div className="col-auto">
                            <label className="add-room-text-label" for="inlineFormInput">Add Room: type room name and click enter</label>
                            <input onChange={this.handleInputValueNewRoomCreation} type="text" className="form-control mb-2" id="inlineFormInput" placeholder="room name.."/>
                        </div>
                    
                    </div>
                </form>
              </ScrollToBottom>
            </div>
            
        );
    }
}

export default RoomsNav;



