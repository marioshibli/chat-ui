//	Mahran shibly 20.7.2018
import React from 'react'
import HeaderTitle from './chat-title.js';

export default class ChatHeader extends React.Component {
    
	constructor(props){
		super(props);
		this.state={
			nameInputDisabled:false,
			joinBtnDisabled:true,
			errors:""
		};
	}
	
	handleValidationUsername(e){
        let errors;
		let formIsValid = true;
        const user = e.target.value;
		
		// error - username cannot be empty || len<3 !"  - to join chat;
		if(!user){  
		   formIsValid = false;
           errors = "UserName cannot be empty!";
        }
		if( user.length<3 ) {
			formIsValid = false;
			errors = "username at least 3 chars ! (my extra) ";
		}
		
		// if all chars are letters - (my extra)
		if(typeof user !== "undefined"){
           if(!user.match(/^[a-zA-Z]+$/)){
              formIsValid = false;
              errors = "Only letters ! [a-z A-Z]+$ (my extra)";
           }        
        }
				
		if ( formIsValid ) 
			this.props.changeTitle3("Great, click join-chat");
		else
			this.props.changeTitle3("Sorry, username not valid!");		

		this.setState({joinBtnDisabled:!formIsValid});
		this.props.changeUsername(user);		
	    this.setState({errors: errors});
    }	
	
	handleLoginClick(e){
		this.setState({nameInputDisabled:true})
		this.setState({joinBtnDisabled:true})
		this.props.joinChat();
	}
	
	render(){	
        return (
		
			<div>
				
				<HeaderTitle 	title1={this.props.title1} 
								title3={this.props.title3}/>
			   
				<div className="container form-group">
								
					<div className="row form-group">
						
						<input type="text" className="input-box form-control form-group active is-invalid col-sm-6 col-md-6"
						placeholder={this.props.username}
						onChange={this.handleValidationUsername.bind(this)} 
						disabled={this.state.nameInputDisabled}
						/>
						
						<button type="button" data-toggle="collapse" data-target="#message-send"
						className="btn btn-primary form-control form-group active col-sm-6 col-md-6"
						disabled={this.state.joinBtnDisabled} 
						onClick={this.handleLoginClick.bind(this)} >
						Join Spot.IM-Chat </button>
						
						<div className="invalid-feedback">
							<span style={{color: "red"}}><strong>{this.state.errors}</strong></span>
						</div>			
					
					</div>				
				
				</div>
			
			</div>
		);
	}
}