/**
 * Created by liumingyang on 2018/5/7.
 */
import React from 'react';
import logoImg from './job.png';
import './logo.css';
class Logo extends React.Component {
	// constructor(props){
	// 	super(props);
	// 	this.state = {
	//
	// 	}
	// }

	render() {

		return (
			<div className="logo-contianer">
				<img src={logoImg} alt=""/>
			</div>
		)
	}
}

export default Logo;