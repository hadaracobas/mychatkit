import React from 'react';
import './index.css';

//Components Imports
import User from '../User';


//libary Imports
import ScrollToBottom from 'react-scroll-to-bottom';
import { css } from 'glamor';


import FadeIn from 'react-fade-in';



class UsersList extends React.Component {
   
    render() {

        const ROOT_CSS = css({
            height: 420,
            //width: 600
          });
          console.log(this.props.currentUser.users);
        let mapTheUsers;
        if(this.props.currentUser.users == undefined ) {
            mapTheUsers = 'Loading Users..';
        } else {

             mapTheUsers = this.props.currentUser.users.map( (user, index) => <User key={index} theUserName={user.name} onlineOffline={user.presence.state === "online" ? "online-button" : "offline-button"} />);
        }
        
        return(
            <div className="users-list-container">
                <FadeIn>
                  <ScrollToBottom className={ROOT_CSS}> 
                      {mapTheUsers} 
                    </ScrollToBottom>
                </FadeIn>
            </div>
        );
    }
}

export default UsersList;







