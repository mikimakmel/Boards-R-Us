import React, { Component } from 'react'
import Header from './header'
import Section1 from './section1.js'
import SnowBoardList from './snowBoardList.js'
import AboutUs from './aboutUs.js'
import GifsList from './GifsList.js'
import Footer from './footer.js'

class HomePage extends Component {

    constructor(props) {
        super(props)

        if(props.user) {
            this.state = { User: props.user , isLogin : false , open: true }
        }
        else{
            this.state = { user:{}, isLogin : false , open: true }
        }
       
        document.getElementById("body-bg").style.backgroundColor = "white"
    }   
   
    render() {
        var self=this
       
        return(
            <div>
                <Header user = {self.state.User}/>
                <Section1/>
                <SnowBoardList user = {self.state.User}/>
                <AboutUs/>
                <GifsList user = {self.state.User}/>
                <Footer/>
            </div>
        )    
    }
}

export default HomePage