//Global Imports
import React from 'react';

//Styles Imports
import './App.css';

//Router Imports
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";


//Components Imports
import ChatContainer from './components/ChatContainer';
import LogIn from './components/LogIn';

//ChatKits Import
import { ChatManager, TokenProvider} from '@pusher/chatkit-client';

//Libary Imports
import FadeIn from 'react-fade-in';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserObj: {},
      theMessages: [],
      theActiveRooms: [],
      theActiveRoomId: "",
      theFirstActiveRoomName: "",
      theUsersInTheActiveRoom: []
      
    }
  }
/*
room1: 1ed2ee9e-de40-4c30-b267-6d283a4bcc0d
room2: 91bf299d-aced-485c-a5c3-200960016a2c
room3: 3a233229-4403-45b8-b856-3b09bf6e2547

*/
 

  handlechangeRoomByClick = (theRoomId) => {
    this.setState({
      theActiveRoomId: theRoomId
    })
  }
 


  createArrayOfObjRooms = () => {
    const rooms = [];
    for(let i = 0; i < this.state.currentUserObj.rooms.length; i++) {
      const objOfRoom = {
        roomId: this.state.currentUserObj.rooms[i].id,
        roomName: this.state.currentUserObj.rooms[i].name
      };
      rooms.push(objOfRoom);
    }
    this.setState({
      theActiveRooms: rooms
    });
  }


 
 

 
  componentDidMount() {

    const tokenProvider = new TokenProvider({
      url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/62673e5b-08e2-45d5-8da6-0c35c59055a8/token"
    });
    
    const chatManager = new ChatManager({
      instanceLocator: "v1:us1:62673e5b-08e2-45d5-8da6-0c35c59055a8",
      userId: "Hadar",
      tokenProvider: tokenProvider
    });
   
    chatManager
    .connect()
      .then(currentUser => {
        
        this.setState({
          currentUserObj: currentUser,
          theActiveRoomId: currentUser.rooms[2].id,
          theFirstActiveRoomName: currentUser.rooms[2].name
        })
        this.createArrayOfObjRooms();
       
        this.state.currentUserObj.subscribeToRoomMultipart({
          roomId: this.state.theActiveRoomId,
          hooks: {
            onMessage: message => {
             
              const messages = this.state.theMessages;
              const objOfMsg = {user: message.senderId, msg: message.parts[0].payload.content};
              messages.push(objOfMsg);
              
              this.setState({
                theMessages: messages      
              })
             
            }
          },
          messageLimit: 50,
          onPresenceChanged: (state, user) => {
            console.log(`User ${user.name} is ${state.current}`);
            this.forceUpdate();
          },
          onUserStartedTyping: user => {
            console.log(`User ${user.name} started typing`)
          },
          onUserStoppedTyping: user => {
            console.log(`User ${user.name} stopped typing`)
          }

        });
      })
      
      .catch(error => {
        console.error("error:", error); 
      })

  }/* end componentDidMount ! */



  componentDidUpdate(prevPrps, prevState) {
    if(prevState.theActiveRoomId !== this.state.theActiveRoomId) {

      this.setState({
        theMessages: []
      });
      
      const tokenProvider = new TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/62673e5b-08e2-45d5-8da6-0c35c59055a8/token"
      });
      
      const chatManager = new ChatManager({
        instanceLocator: "v1:us1:62673e5b-08e2-45d5-8da6-0c35c59055a8",
        userId: "Hadar",
        tokenProvider: tokenProvider
      });
     
      chatManager
      .connect()
        .then(currentUser => {
         // console.log(currentUser.users[0]);
          this.setState({
            currentUserObj: currentUser
          })
          this.createArrayOfObjRooms();
          
          this.state.currentUserObj.subscribeToRoomMultipart({
            roomId: this.state.theActiveRoomId,
            hooks: {
              onMessage: message => {
               
                const messages = this.state.theMessages;
                const objOfMsg = {user: message.senderId, msg: message.parts[0].payload.content};
                messages.push(objOfMsg);
                
                this.setState({
                  theMessages: messages,
                  
                }) 
               
               
              }
            },
            
            messageLimit: 50,
            onPresenceChanged: (state, user) => {
              console.log(`User ${user.name} is ${state.current}`);
              this.forceUpdate();
            },
            onUserStartedTyping: user => {
              console.log(`User ${user.name} started typing`)
            },
            onUserStoppedTyping: user => {
              console.log(`User ${user.name} stopped typing`)
            }
          });
        })
        
        .catch(error => {
          console.error("error:", error); 
        })
  
      
    }/* end if statement */
    
}/* end componentDidUpdate() */

 



  render() {
    return(
      <Router>
        <FadeIn>
          <div className="App">
          <div className="main-title-container">
            <h1 className="main-title">The Online Chat</h1>
            </div>
            {/* 
              <nav>
                <ul>
                  <li>
                    <Link to="/">Log In Page</Link>
                  </li>
                  <li>
                    <Link to="/chatcontainer">Chat Container</Link>
                  </li>
                </ul>
              </nav>
              */}

              <Switch>
                <Route path="/chatcontainer">
                  <ChatContainer theUsersOfActiveRoom={this.state.theUsersInTheActiveRoom} theFirstActiveRoomName={this.state.theFirstActiveRoomName} theActiveRoomId={this.state.theActiveRoomId} getRoomId={this.handlechangeRoomByClick} theActiveRooms={this.state.theActiveRooms} currentUser={this.state.currentUserObj} theArrayOfOnlineMessages={this.state.theMessages}  />
                </Route>
                <Route exact path="/" >
                  <LogIn />
                </Route>
              </Switch>
          </div>
        </FadeIn>
      </Router>
    );
  }
}


export default App;







