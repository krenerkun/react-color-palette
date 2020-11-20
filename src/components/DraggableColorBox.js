import React from 'react'
import './DraggableColorBox.css'


const DraggableColorBox = (props) => {
    return (
        <div className="color-box" 
             style={{background: props.color}}>
            {props.colorName}
        </div>
    )
}

export default DraggableColorBox
