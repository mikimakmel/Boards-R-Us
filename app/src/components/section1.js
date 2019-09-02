import React, {Component} from 'react'

class Section1 extends Component {

    constructor(props) {
        super(props)
        
        if(window.innerWidth <= 480) {
            this.state = { isMonbile:true }
        }
    }
   
    render() {
        return(
            <div className = "hide_mobile imgCover"> 
                <h1 className="mainText general-font hide_mobile">RUN OVER<br/>EVERYTHING</h1>
                <a href="#aboutUsID"><button className="seeDetailsButton">SEE DETAILS</button></a>
            </div>
        )
    }
}

export default Section1