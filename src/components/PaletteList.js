import React from 'react'
import MiniPalette from './MiniPalette'
import {Link} from 'react-router-dom'
import './PaletteList.css'

const PaletteList = (props) => {
    const {palettes} = props
    const goPalette = id =>{
        props.history.push(`/palette/${id}`)
    }

    return (
        <div className="PaletteList">
            <div className="palette-container">
                <div className="nav">
                    <h1>React Colors</h1>
                    <Link to='palette/new'>Create new palette</Link>
                </div>
                <div className="palettes">
                    {palettes.map(palette => (
                    <MiniPalette {...palette} handleClick={() => goPalette(palette.id)}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default PaletteList
