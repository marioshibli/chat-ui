//	Mahran shibly 20.7.2018
import React from 'react'

export default class ChatFooter extends React.Component {
    
	constructor(props){
		super(props);
		this.state={
			sendBtnDisabled:true,
			emptyMessage:"Please, type a message...",
			errors:""
		};
	}
	
	
	handleValidationMessage(e){
        
		let errors;
		let formIsValid = true;
        
		const msg = e.target.value;
	
		if(!msg){  
		   formIsValid = false;
           errors = "Message cannot be empty.!";
        }
		if( msg.length<1 ) {
			formIsValid = false;
			errors = "Please, type a valid message(not empty) and press send!";
		}
		
	    //if all chars are letters (dont need )
		if(typeof msg !== "undefined"){
			let IsValid=false
			for (var i = 0; i < msg.length; i++){ 
				if (msg.charAt(i)!==' '){
					IsValid = true;
					errors = ""
					break;
				}else{
					errors = "Message cannot be without any chars.(empty)!";
				}
			}
			formIsValid = IsValid;
        }
		
		this.setState({sendBtnDisabled:!formIsValid}); // send btn Disabled change if formIsValid
		this.props.changeMessage(msg); // props.changeMessage = msg.value
	    this.setState({errors: errors}); // if any errors just show
    }	
	
	
	handleSendClick(e){
		e.target.value="";	// message input = message holder	
		this.props.sendMessage(); // here after props.changeMessage(msg) ..message now sure is valid
		this.setState({sendBtnDisabled: true}); // after send .. sendBtn = true
	}
	
	render(){	
        return (
		
			<div>			
			   
				<div className="container form-group panel-collapse collapse in" id="message-send" >
					
					<div className="row form-group">					
						
						<input id="input_text" 
						className="input-box form-control form-group active col-md-10 is-invalid" 
						placeholder={this.state.emptyMessage}
						value={this.props.message}
						type="text" onChange={this.handleValidationMessage.bind(this)} />
				
						<button id="send_btn" value="Submit"
						disabled={this.state.sendBtnDisabled} 
						onClick={this.handleSendClick.bind(this)}
						className="btn btn-primary form-control form-group active col-md-2">Send</button>
						
						<div className="invalid-feedback">
							<span style={{color: "red"}}><strong>{this.state.errors}</strong></span>
						</div>			
					
					
					</div>
				</div>
						
			</div>
		);
	}
}