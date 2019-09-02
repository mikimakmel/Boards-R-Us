import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';

class SnowBoard extends Component {

    constructor(props) {    
        super(props)

        this.state = { User:props.user, board : props.board , isMarked:false } 
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ board: nextProps.board }) 
    }

    componentWillMount(){
        this.setState({ board: this.props.board })
    }
  
    render() {
        const self = this

        var handleToUpdate = this.props.markDisLike

        return(
            <div>
                <div onClick={() => handleToUpdate(self.state.board.id)}>
                    <i className = "far fa-times-circle center-x centeredText"></i>
                </div>
                
                <div className="event">
                    {this.props.children}
                </div>
                
                <h5 className="showAtCurrent centeredText general-font brandText">{self.state.board.brand}</h5>
                <h6 className="showAtCurrent centeredText general-font nameText">{self.state.board.name}</h6>
            </div>    
        )
    }
}

export default SnowBoard