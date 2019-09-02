import React, { Component } from 'react'
import Header from './header'
import Section1 from './section1.js'
import SnowBoardList from './snowBoardList.js'
import AboutUs from './aboutUs.js'
import GifsList from './GifsList.js'
import Footer from './footer.js'
import Modal from 'react-responsive-modal'
import HomePage from './homePage.js'
import GoogleLogin from 'react-google-login'

class Gmail extends Component {

    constructor(props) {
        super(props)
        this.CheckUser = this.CheckUser.bind(this)
        this.addUser = this.addUser.bind(this)
        this.state = { User: {} , isLogin : false , open: true }
        document.getElementById("body-bg").style.backgroundColor = "white"
    }

    onOpenModal = () => {
        this.setState({ open: true })
    }

    onCloseModal = () => {
        this.setState({ open: true })
    }

    CheckUser(response){
        var self=this
        const userEmail = response.w3.U3;
        var userName = response.w3.ig
        const url = 'https://boards-r-us-mm.herokuapp.com/getUserByEmail/'

        fetch(`${url}${userEmail}`)
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Something went wrong ...');
            }
        })
        .then(data => {
            if(data.length == 0) {
                self.addUser ( userName , userEmail )
            }
            else {
                this.setState(prevSate => ({
                    User: data[0],
                    isLogin : true
                }))
            }
        })   
    }

    addUser( name , email ) {
        var newUser = {
            "name" : "",
            "email" : ""
        }

        newUser.name = name
        newUser.email = email
    
        const url = 'https://boards-r-us-mm.herokuapp.com/addNewUser'

        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify (newUser)
        }).then(res => res.json())
            .then(json => {
                if(json.name != undefined) {
                    this.setState(prevSate => ({
                        User: json,
                        isLogin : true
                    }))
                } else {
                    alert(`No update was made.`)
                }
        }).catch(err => console.log(err));
    }  

    render() {
        var self=this

        const responseGoogle = (response) => {
            self.CheckUser(response)
        }

        if(self.state.isLogin == true){
            return(
                <div>
                    <HomePage user={self.state.User}/>
                </div>
            )
        } else { 
            const { open } = this.state
            const { closeOnEsc } = false

            return (
                <div>
                    <Header/>
                    <Section1/>
                    <SnowBoardList/>

                    <Modal onClose={this.onCloseModal} closeOnEsc={false}  open={open}  closeOnOverlayClick={false} center>
                        <div className = "container">
                            <div className = "row centeredText">
                                <h2 className = "col-12 login-title"> 
                                    Welcome to "Boards R Us" 
                                </h2>
                                <h4 className = "col-12 login-secondTitle"> 
                                    The best place to find your perfect board!
                                </h4>
                                <img className="login-logo" src="assets/logo.png"/> 
                            </div>

                        <GoogleLogin clientId="714828973797-3630gtl4t8bs231bdmj8ke3h9clu8ua3.apps.googleusercontent.com"
                            render={renderProps => (
                            <img onClick={renderProps.onClick} className="gmailButton" src="assets/Gmail_login_button.png" />
                            )}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                        />

                        </div>  
                    </Modal>

                    <AboutUs/>
                    <GifsList/>
                    <Footer/>
                </div>
            )   
        }   
    }
}

export default Gmail