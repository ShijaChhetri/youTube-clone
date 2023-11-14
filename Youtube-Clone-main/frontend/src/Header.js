// rfce
import React, { useState } from 'react'
import ytLogo from './images/yt-logo.png'
import { ImSearch } from 'react-icons/im'
import pp from './images/pp.jpeg'
import {BsFillMicFill} from 'react-icons/bs'
import {GiHamburgerMenu} from 'react-icons/gi'
import {BiLogOut} from 'react-icons/bi'
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { Link, useSearchParams } from 'react-router-dom'
import { MdVideoCall } from "react-icons/md";


function Header() {
    const [isUserLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem('token') != null
    )

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        localStorage.removeItem('userId')
        localStorage.removeItem('name');

        setIsLoggedIn(false);
    }

    console.log("Is logged in", isUserLoggedIn)
  return (
    <div class="header-container">
        <div class="header">
            <div class="header-items header-logo">
                <div class="header-first">
                    <GiHamburgerMenu class="hamburger" />
                </div>
                <div class="header-second">
                    {/* <a href='/'><img id='yt-logo' src={ytLogo}/></a> */}
                    <Link to={'/'}><img id='yt-logo' src={ytLogo}/></Link>
                </div>
            </div>
            <div class="header-items header-center">
                {/* <div class="header-search"></div> */}
                <input class="header-search" placeholder='Search..'/>
                <button class="search-button">
                   <ImSearch class="search"/>
                </button>
                <div class="header-mic">
                        <BsFillMicFill class="search-icon" />
                </div>
            </div>
            {
                isUserLoggedIn ? (
                    <div class="header-items header-profile">
                        <Link to={'/upload'}>
                            <MdVideoCall class="Upload-Video" title='Upload video'/>
                        </Link>
                        <img src={pp} height={'40px'} width={'40px'}
                        ></img>
                        <p class="user-email margin-0">{localStorage.getItem('email')}</p>
                        <BiLogOut class="logout" title='Logout' onClick={() => handleLogout()}/>
                    </div>
                ) : (
                    <div class="header-items header-profile">
                        <Link to={'/signin'}>
                        <button class="header-tools">Sign In</button>
                        </Link>
                    </div>
                )
            }
        </div>
        

        {/* Modal */}
        {/* <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Sign In to YouTube</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1"/>
                    </div>

                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Submit</button>
            </div>
            </div>
        </div>
        </div> */}
    </div>
  )
}

export default Header
