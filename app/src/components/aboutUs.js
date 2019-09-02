import React, {Component} from 'react'

class AboutUs extends Component {
    render() {
        return(
            <div id="aboutUsID" className = "hide_mobile aboutUsCoverPic"> 
                <h1 className="aboutUsHeadline general-font hide_mobile">Boards R Us &reg;</h1>
                <p className="aboutUsParagraph general-font hide_mobile">
                    The company was originally founded by Miki Makmel and Dor Munsa at Shenkar college.<br/><br/>
                    Everything we do at "Boards R Us" started in the mountains.<br/>
                    From getting the most out of every journey to chasing snow around the globe,<br/> 
                    we've charged ahead to innovate and change the way people enjoy the outdoors since day one.<br/><br/> 
                    Our main purpose is to match you with your perfect board taking into consideration<br/> body measures,  
                    riding style, and riding level.<br/>
                    So just fill in your details and we will take care of the rest!<br/><br/>
                    See you in the mountains!<br/> 
                </p> 
           </div>
        )
    }
}

export default AboutUs