import React, { Component } from 'react'

class Gif extends Component {

    constructor(props) {    
        super(props)
        this.state = { User : {}, gif : props.gif , userid: props.gif.userId } 
        this.getUserByid = this.getUserByid.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ gif: nextProps.gif , userid: nextProps.gif.userId }) 
    }

    componentWillMount() {   
        this.getUserByid()
    }

    getUserByid(){     
        const url = 'https://boards-r-us-mm.herokuapp.com/getUserID/'
      
        fetch(`${url}${this.state.userid}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong ...');
            }
        })
        .then( data => {
            this.setState(prevSate => ({
                User: data[0]
            }))
        })
    }

    
    render() {
        const self = this

        return(
            <div className = "col-12">
                <div>
                    {this.props.children}
                </div>
                <h6 className= "centeredText gifNames general-font"><i className="far fa-snowflake"></i> {self.state.User.name} <i className="far fa-snowflake"></i></h6>
            </div> 
        )
    }
}

export default Gif