import React from 'react';
import './index.css';



class User extends React.Component {
   
    render() {
        return(
            <div>
                 <div className="user">
                    <button type="button" className={this.props.onlineOffline}></button>
                    <span>{this.props.theUserName}</span>
                </div>
            </div>
        );
    }
}
export default User;