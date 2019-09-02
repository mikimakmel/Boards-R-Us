import React, { Component } from 'react'
import Gif from './Gif'
import { MdSend } from 'react-icons/md'
import Modal from 'react-responsive-modal'

class GifsList extends Component {

    constructor(props) {
        super(props)

        if (props.user) {
            this.state = { Gifs: [] , open: false , User:props.user, date: "" , fileSource : ""}
        } else {
            this.state = { Gifs: [] , open: false }
        }

        this.eachEvent = this.eachEvent.bind(this)
        this.add = this.add.bind(this)
        this.addGif = this.addGif.bind(this)
        this.getDateFromUser = this.getDateFromUser.bind(this)
        this.getSourceFromUser = this.getSourceFromUser.bind(this)
        this.getTopGIFS = this.getTopGIFS.bind(this)
    }

    componentWillMount() {
        this.getTopGIFS(false)
    }

    getTopGIFS( isOpen ){
        var self = this
        const url = 'https://boards-r-us-mm.herokuapp.com/getTopGIFs'

        fetch(`${url}`)
        .then(response => { 
          if (response.ok) { 
            return response.json()
          } else {
            throw new Error('Something went wrong ...')
          }
        })
        .then(data => data.map(item => {
            self.add( data , item.fileSource , item.id , item.userID ,isOpen)
        }))
    }
    
    logo = {
        width: "100%",
        height : "100%",
        fontWeight : "bold",
    }       

    add( allGifs , source , id , userId , open) {
        
        if(this.state.Gifs.length < 4) {
            this.setState(prevSate => ({
                Gifs: [ 
                    ...prevSate.Gifs,
                    {
                        fileSource: source,
                        id: id,
                        userId: userId,
                        
                    }
                ]
            }))
        } else {
            this.setState(prevSate => ({
                Gifs: allGifs ,
                open: open 
            }))
        }  
    }

    getSourceFromUser(event) {
        this.setState({ fileSource: event.target.value })
    }

    getDateFromUser(event) {
        this.setState({ date: event.target.value })
    }
    onOpenModal = () => {
        this.setState({ open: true })
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }
  
    addGif(e) {
        e.preventDefault() 
        var self = this

        var newGif = {
            "userID": "",
            "date": 0,
            "fileSource": "",
        }

        newGif.userID = self.state.User.id
        newGif.date = self.state.date
        newGif.fileSource = self.state.fileSource
        newGif = JSON.stringify(newGif)
        
        const url = 'https://boards-r-us-mm.herokuapp.com/addNewGIF'

        fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: newGif
        }).then(response => {
            if (response.ok) {
               self.getTopGIFS(false)
                return response.json();
            } else {
                throw new Error('Something went wrong ...')
            }
        }).catch(err => {     
            console.log(err)
        })
    }

    eachEvent(item, i) {
        return(
            <div className="col-12 col-lg-4 card card-body gifBox"  key={`container${i}`}>
                <Gif key={`event${i}`} gif={item}>
                    <img style={this.logo} src={item.fileSource}/>
                </Gif>
            </div>
        )
    }

    render() {    
        const { open } = this.state
        var self = this

        return( 
            <div className="eventList">
                <h2 className="card-title featuresTitle general-font centeredText">FEATURES</h2>   
                <h5 className="centeredText gifSecondHeadline general-font">Take a look at some of the best riders in our community!</h5>
                <div className = "container">
                    <div className = "row">
                        {this.state.Gifs.map(this.eachEvent)}
                    </div>
                    <h5 className = "centeredText gifUploadText general-font">Think you got what it takes to be part of our best riders? Upload your own GIF now and maybe you'll get there!</h5> 
                </div> 
                

                <a onClick={this.onOpenModal} style={{ top: "10px" , color : "#fff" }} className="generalButton">Upload GIF</a>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div className="container">
                        <div className="searchForm">
                            <form onSubmit={self.addGif}>
                                <h6>Please Fill The Following Fields:</h6>
                                <div className="container">
                                    <div className="row top-space first">
                                        <label className="SearchLabel col-6">
                                            Date:
                                        </label>
                                        <input placeholder = "YYYY-MM-DD" className="SearchLabel col-6" required type="text" name="Address" onChange = {self.getDateFromUser}/>
                                    </div>
                                    <div className="row top-space">
                                        <label className="SearchLabel col-6">
                                            File Source:
                                        </label>
                                        <input className="SearchLabel col-6" required type="text" name="Weight" onChange = {self.getSourceFromUser} />
                                    </div>
                                    <br />
                                </div>
                                <button type="submit" className="btn btn-primary card-button right"><MdSend/></button>
                            </form>
                        </div>
                    </div>
                </Modal>
                <div className="footerBox1 col-12"> 
               <h6 className="footerText1 centeredText general-font1">&copy; 2019 Boards R Us by Miki Makmel & Dor Munsa</h6>
            </div>
            </div>
        )
    }
}

export default GifsList