//	Mahran shibly 20.7.2018
import React from 'react'
import logo from '../assets/spotim-logo.jpg'

const ListMessage = ({ value, onClick }) => (
  
  <li onClick={onClick} className={value.styleLi}>
  <img src={logo} alt={logo} className={value.styleImg}/>
  <strong> {value.user} : </strong> {value.msg} 
  <span className="badge badge-light badge-pill float-right">
  {value.time}</span> </li>
);
	
	
const List = ({ allMessages, onMessageAdd }) => (

  <ul>
    {allMessages.map((msg, i) => <ListMessage key={i} value={msg} onClick={onMessageAdd} />)}
  </ul>
);


export default class ChatBody extends React.Component {

	render(){	
        return (
			<List allMessages={this.props.allMessages}/>
		);
	}
}