import React, {Component} from 'react'

class Header extends Component {

  constructor(props) {
    super(props)

    if (props.user) {
      this.state = {
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
        name : ""
      }
    }
  }

  render() {
    return(
      <nav id="main_nav" className="navbar navbar-expand-lg navbar-light navHeader">

        <a className="navbar-brand" href = "#">
          <img className="logo" src="assets/logo.png" />
        </a>
        
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent1" aria-controls="navbarSupportedContent1" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent1">
          <ul style={this.navLinks} className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
              SHOP
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                TEAM
              </a>
            </li>
            <li  className="nav-item" >
              <a className="nav-link" href="#">
                EVENTS
              </a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" href="#" >
                EXPIRIENCE
              </a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" href="#">
                COMPANY
              </a>
            </li>
            <li className="nav-item" >
              <a className="nav-link" href="#" >
                <span className='align-nav'> CONTACT </span>
              </a>
            </li>
          </ul>
        
        </div>

        <div className="UserIconBox">
          <img className="userIcon" src="assets/userIcon_white.png" />
          <h6 className="userIconText general-font">Hi, {this.state.name}</h6>
        </div>

      </nav>
    )
  }
}

export default Header