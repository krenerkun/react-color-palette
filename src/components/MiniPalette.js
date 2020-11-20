import React from 'react'
import {Link } from 'react-router-dom'
import './MiniPalette.css'

const MiniPalette = (props) => {

    const {paletteName, emoji, handleClick} = props
    const miniColorBoxes = props.colors.map(miniColor => (
        <div className="mini-color"
            style={ {backgroundColor: miniColor.color }}
            key={miniColor.name}></div>
    ))

    return (
            <div className="MiniPalette" onClick={handleClick}>
                <div className="colors">
                    {miniColorBoxes}
                </div>
                <h5 className="title">
                    {paletteName}
                    <span id='emoji'>{emoji}</span>
                </h5>
            </div>
    )
}

export default MiniPalette
