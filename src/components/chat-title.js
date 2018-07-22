//	Mahran shibly 20.7.2018

import React from 'react'

export default class HeaderTitle extends React.Component {
	
	render(){	
        return (	
			<div>
				<h1>{this.props.title1}</h1>
				<h3>{this.props.title3} </h3>
			</div> 
		);
	}
}