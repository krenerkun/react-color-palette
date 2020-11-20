import React, { useState} from 'react'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slider from 'rc-slider'
import {Link} from 'react-router-dom'
import 'rc-slider/assets/index.css'
import './NavBar.css'

const NavBar = (props) => {

    const [currentFormat, setCurrentFormat] = useState("hex")
    const [isOpen, setIsOpen] = useState(false)
    const {level, changeLevel, handleChange, showSlider} = props

    const handleChangeCurrentFormat = (e) =>{
        setIsOpen(true)
        setCurrentFormat(e.target.value)
        handleChange(e.target.value)
    }

    const closeSnackbar = () =>{setIsOpen(false)}
    
    return (
        <div className="NavBar">
            <div className="logo">
                <Link to='/'>MyReactColorPicker</Link>
            </div>
            {showSlider && (
            <div className="slider-text">
                <span>Level: {level}</span>
                <div className="slider">
                    <Slider defaultValue={level} 
                            min={100} 
                            max={900} 
                            step={100} 
                            onAfterChange={changeLevel}/>
                </div>
            </div>
            )}
            <div className="select-container">
                <Select value={currentFormat} onChange={handleChangeCurrentFormat}>
                    <MenuItem value="hex">HEX - #FFFFFF</MenuItem>
                    <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
                    <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
                </Select>
            </div>
            <Snackbar   anchorOrigin={ {vertical:"bottom",horizontal:"left"}} 
                        open={isOpen}
                        autoHideDuration={1000}
                        onClose={closeSnackbar}
                        message={<span id='msg-id'>Format Changed!</span>}
                        ContentProps={{"aria-describedby":"msg-id"}}
                        action={[
                            <IconButton onClick={closeSnackbar}
                                        color="inherit"
                                        key="close"
                                        aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                        ]}/>
        </div>
    )
}

export default NavBar
