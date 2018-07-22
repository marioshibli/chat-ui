//	Mahran shibly 18.7.2018


import React from 'react'
import logo from '../assets/spotim-logo.jpg'
import {Container, Image} from 'semantic-ui-react'
import styled from 'styled-components';
 
import ChatHeader from './chat-header.js'; // username input  +  join-chat button
import ChatBody from './chat-body.js';     // all messages (sent + received)
import ChatFooter from './chat-footer.js'; // user message input + send button

import {sendMsgByIOSocket} from './../index.js' // io.socket methods in file ./../index.js.

const Logo = styled.div`
      img{
        margin-left: auto;
        margin-right: auto;
        margin-top: 15px; 
		vertical-align: middle;
		padding : 5px;
		border-radius: 50px 15px;
      }
      
`;

export default class App extends React.Component {
    
	constructor(props){
		super(props);
		
		this.state= {
					title1:"Wellcome to Spot.IM-Chat",
					title3:"Please signup to join chat-room!",
					username:"",
					message:"",
					allMessages:[ ],
		};
	}
	
	changeTitle1(title1){
		this.setState({title1});
	}
	changeTitle3(title3){
		this.setState({title3});
	}
	changeUsername(username){
		this.setState({username});
	}
	changeMessage(message){
		this.setState({message});
	}
	
	joinChat(){
		this.setState( {login:true} );
		this.setState({title1:"Connected..."});
		let titleWithUserName = "Wellcome "+this.state.username;
		this.setState({title3:titleWithUserName});
		sendMsgByIOSocket(logo,this.state.username,"Hello, I joined the Spot.IM-Chat");
	}
	
	
	sendMessage(){
		let user = this.state.username;
		let msg = this.state.message;
		this.setState({message:""});
        sendMsgByIOSocket(logo,user,msg); // function in file ./../index.js  (io.socket methods) 

	}
	
	addMessagesToPage(logo,user,msg,time,userId) {
		if(userId){
			const { allMessages } = this.state;
			const nextState = [...allMessages, 
			{user:user,msg:msg,logo:logo,time:time,styleLi:
			"list-group-item list-group-item-info",styleImg :"avatar avatar-user"}];
			this.setState({ allMessages: nextState, });
		}else{
			const { allMessages } = this.state;
			const nextState = [...allMessages, 
			{user:user,msg:msg,logo:logo,time:time,
			styleImg:"avatar",styleLi:"list-group-item list-group-item-success"}];
			this.setState({ allMessages: nextState, });
		}		
	}
	
	
	render(){	
	    
        return (
	
			<div>
			
				<Container className={'spotim-header'}>
					
					<div className={'spotim-title'}>
					Welcome to the Spot.IM Chat app
					</div>	
					
					<div>
						<Logo>
							<Image size={'tiny'} src={logo}/>
						</Logo>
					</div>
					
					
				</Container>	
				
				<Container className={'spotim-body'}>
					
					<div className={'spotim-chat-header'}>
						<ChatHeader className={'form-group form-control'}
							changeTitle3={this.changeTitle3.bind(this)} 
							changeUsername={this.changeUsername.bind(this)} 
							changeTitle1={this.changeTitle1.bind(this)} 
							joinChat={this.joinChat.bind(this)}
							title1={this.state.title1}
							title3={this.state.title3}
							username={this.state.username}
						/>
					</div>
					
					<div className={'spotim-chat-body'}>
						<ChatBody className={'form-group form-control'}
							allMessages={this.state.allMessages}/>
					</div>
					
					<div className={'spotim-chat-footer'}>
						<ChatFooter className={'form-group form-control'}
								changeMessage={this.changeMessage.bind(this)} 
							sendMessage={this.sendMessage.bind(this)}
							message={this.state.message} 
						/>
					</div>
					
				</Container>
				
				<Container className={'spotim-footer form-group'}> 				
					<strong>Mahran Shibly</strong> - Practical Programming Challenge
				</Container>
				
			</div>
		);
	}
}