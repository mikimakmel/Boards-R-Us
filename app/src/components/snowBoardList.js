import React, { Component } from 'react'
import SnowBoard from './snowBoard'
import Slider from 'react-slick'
import { MdSave } from 'react-icons/md';
import Modal from 'react-responsive-modal';

class SnowBoardList extends Component {

    constructor(props) {
        super(props)

        if (props.user) {
            this.state = {
                User: props.user,
                hasProfile: props.user.hasProfile,
                name: props.user.name,
                id: props.user.id,
                address: "",
                gender: "",
                level: "",
                ridingStyle: "",
                weight: 0,
                height: 0,
                shoeSize: 0,
                dislikeList: props.user.dislikeList,
                open: false, boards: []
            }
        } else {
            this.state = {
                open: false,
                boards: []
            }
        }

        this.topPicks = []
        this.eachEvent = this.eachEvent.bind(this)
        this.add = this.add.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.getAddressFromUser = this.getAddressFromUser.bind(this)
        this.getWeightFromUser = this.getWeightFromUser.bind(this)
        this.getHeightFromUser = this.getHeightFromUser.bind(this)
        this.getShoeSizeFromUser = this.getShoeSizeFromUser.bind(this)
        this.getStyleFromUser = this.getStyleFromUser.bind(this)
        this.getLevelFromUser = this.getLevelFromUser.bind(this)
        this.getGenderFromUser = this.getGenderFromUser.bind(this)
        this.getUserByMail = this.getUserByMail.bind(this)
        this.markDisLike = this.markDisLike.bind(this)  
    }
    componentWillMount() {
        this.getUserByMail()
    }

    add(name, topPicks) {
        this.setState(prevSate => ({
            boards: topPicks
        }))
    }

    onOpenModal = () => {
        this.setState({ open: true })
    }

    onCloseModal = () => {
        this.setState({ open: false })
    }

    updateUser(e) {
        var self = this
        e.preventDefault()
        
        var newUser = {
            "name": "",
            "id": 0,
            "address": "",
            "gender": "",
            "level": 0,
            "ridingStyle": "",
            "weight": 0,
            "height": 0,
            "shoeSize": 0,
            "dislikeList": [],
        }

        newUser.name = self.state.name;
        newUser.id = self.state.id;
        newUser.address = self.state.address;
        newUser.gender = self.state.gender;
        newUser.level = self.state.level;
        newUser.weight = self.state.weight;
        newUser.height = self.state.height;
        newUser.shoeSize = self.state.shoeSize;
        newUser.dislikeList = self.state.dislikeList;
        newUser.ridingStyle = self.state.ridingStyle;
        newUser = JSON.stringify(newUser)
       
        const url = 'https://boards-r-us-mm.herokuapp.com/updateUserProfile'

        fetch(`${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: newUser
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Something went wrong ...')
            }
        }).then(data => {
                if (data.name != undefined) {
                    this.setState(prevSate => ({
                        User: data,
                        hasProfile: true,
                        boards: data.topPicks
                    }))
                } else {
                    alert(`No update was made.`)
                }
        }).catch(err => {
                console.log(err)
        })
    }

    getUserByMail() {
        const url = 'https://boards-r-us-mm.herokuapp.com/getUserID/'

        if (this.props.user) {
            fetch(`${url}${this.state.id}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error('Something went wrong ...')
                }
            }).then(data => {
                data.map(item => {
                    this.setState(prevSate => ({
                        User: item,
                        hasProfile: true,
                        boards: item.topPicks
                    }))
                })
            })
        }
    }

    getAddressFromUser(event) {
        this.setState({ address: event.target.value })
    }

    getWeightFromUser(event) {
        this.setState({ weight: event.target.value })
    }

    getHeightFromUser(event) {
        this.setState({ height: event.target.value })
    }

    getShoeSizeFromUser(event) {
        this.setState({ shoeSize: event.target.value })
    }

    getStyleFromUser(event) {
        this.setState({ ridingStyle: event.target.value })
    }

    getLevelFromUser(event) {
        this.setState({ level: event.target.value })
    }

    getGenderFromUser(event) {
        this.setState({ gender: event.target.value })
    }

    markDisLike(id) {
        var self = this

        var reqBody = {
            "snowboardID": 0,
            "userID": 0,
            "userGender": "",
            "ridingStyle": "",
            "dislikeList": [],
        }

        reqBody.snowboardID = id;
        reqBody.userGender = self.state.User.gender;
        reqBody.userID = self.state.User.id;
        reqBody.ridingStyle = self.state.User.ridingStyle;
        reqBody.dislikeList = self.state.User.dislikeList;
        reqBody = JSON.stringify(reqBody)

        const url = 'https://boards-r-us-mm.herokuapp.com/markDislikeSnowboard'

        fetch(`${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: reqBody
        }).then(response => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Something went wrong ...')
            }
        }).then(data => {
            if (data.name != undefined) {
                self.setState(prevSate => ({
                    User: data,
                    boards: data.topPicks,
                    open: false
                }))
            } else {
                    alert(`No update was made.`)
            }
        }).catch(err => {
                console.log(err)
        })
    }

    eachEvent(item, i) {
        return (
            <SnowBoard key={`event${i}`} markDisLike={this.markDisLike} user={this.state.User} board={item}>
                <img className="snowboardImage" src={item.imageSource}/>
            </SnowBoard>
        )
    }

    render() {
        const self = this

        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 3,
            speed: 600,
            autoplay: true,
            autoplaySpeed: 4000,
            responsive: [
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    infinite: false,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                  }
                }
              ]
        }

        if (this.state.boards.length != 0) {
            return (
                <div className="eventList">
                    <h2 className="snowboardsTitle general-font centeredText">SNOWBOARDS</h2>
                    <p className="topPickText general-font centeredText">These are our top matches for you.</p>

                    <Slider {...settings}>
                        {this.state.boards.map(this.eachEvent)}
                    </Slider>
                </div>
            )
        } else {
            const { open } = this.state

            return (
                <div className="eventList">
                    <h2 className="snowboardsTitle general-font centeredText">SNOWBOARDS</h2>
                    <h6 className="general-font centeredText createProfileText">We can see that you don't have a profile yet.
                    <br/><br/>We strongly recommend you to create one so our system will find the best boards that match you.</h6>
                    <div className="container">
                        <div className="row">
                            <div>
                                <Modal open={open} onClose={this.onCloseModal} center>
                                    <div className="container">
                                        <div className="searchForm">
                                            <form onSubmit={self.updateUser}>
                                                <h6>Please Fill The Following Fields:</h6>

                                                <div className="container">
                                                    <div className="row top-space first">
                                                        <label className="SearchLabel col-6">
                                                            Address:
                                                        </label>
                                                        <input className="SearchLabel col-6" required type="text" name="Address" onChange={self.getAddressFromUser} />
                                                    </div>

                                                    <div className="row top-space">
                                                        <label className="SearchLabel col-6">
                                                            Weight:
                                                        </label>
                                                        <input className="SearchLabel col-6" required type="number" name="Weight" onChange={self.getWeightFromUser} />
                                                    </div>

                                                    <div className="row top-space">
                                                        <label className="SearchLabel col-6">
                                                            Height:
                                                        </label>
                                                        <input className="SearchLabel col-6" required type="number" name="Height" onChange={self.getHeightFromUser} />
                                                    </div>

                                                    <div className="row top-space">
                                                        <label className="SearchLabel col-6">
                                                            Shoe Size:
                                                        </label>
                                                        <input className="SearchLabel col-6" required type="number" name="Shoe" onChange={self.getShoeSizeFromUser} />
                                                    </div>

                                                    <div className="row top-space">
                                                        <label className="SearchLabel col-6">
                                                            Riding Style:
                                                        </label>
                                                        <select required id="Style" name="Style" onChange={self.getStyleFromUser}>
                                                            <option >Select Riding Style</option>
                                                            <option value="All-mountain">All-mountain</option>
                                                            <option value="Freestyle">Freestyle</option>
                                                            <option value="Splitboard">Splitboard</option>
                                                        </select>
                                                    </div>

                                                    <div className="row top-space">
                                                        <label className="SearchLabel col-6">
                                                            Gender:
                                                        </label>
                                                        <select required id="Style" name="Gender" onChange={self.getGenderFromUser}>
                                                            <option >Select Gender</option>
                                                            <option value="Women">Women</option>
                                                            <option value="Men">Men</option>
                                                        </select>
                                                    </div>

                                                    <div className="row top-space">
                                                        <label className="SearchLabel col-6" >
                                                            Riding Level:
                                                        </label>
                                                        <select required id="Level" name="Level" onChange={self.getLevelFromUser}>
                                                            <option >Select Level</option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </select>
                                                    </div>

                                                    <br />
                                                </div>
                                                
                                                <button type="submit" className="btn btn-primary card-button right"><MdSave /></button>
                                            </form>
                                        </div>
                                    </div>
                                </Modal>
                            </div>
                            <a onClick={this.onOpenModal} style={{ top: "10px", color: "#fff" }} className="generalButton">Create Profile</a>
                        </div>
                    </div>

                </div>
            )
        }  
    }
}

export default SnowBoardList