import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import ColorBox from './ColorBox'
import NavBar from './NavBar'
import PaletteFooter from './PaletteFooter'


const SingleColorPalette = (props) => {

    const [format, setFormat] = useState("hex")
    //Get Shades of selected color
    const getShades = (palette, colorSelected) => {
        let shades = []
        let colors = palette.colors

         for (let key in colors) {
             shades = shades.concat(colors[key].filter(color => color.id === colorSelected))         
         }

         return shades.slice(1)
    }

    const _shades = getShades(props.palette, props.colorId)

    const colorBoxes = _shades.map(colorbox =>(
        <ColorBox key={colorbox.id} name={colorbox.name} background={colorbox[format]} showLink={false}/>
    ))

    const changeFormat = (val) =>{
        setFormat(val)
    }

    return (
        <div className="SingleColorPalette Palette">
           <NavBar handleChange={changeFormat} showSlider={false}/>
           <div className="Palette-colors">
               {colorBoxes}
               <div className="go-back ColorBox">
                    <Link to={`/palette/${props.palette.id}`} className="copy-button">Go Back</Link>
               </div>
            </div>
           <PaletteFooter paletteName={props.palette.paletteName} emoji={props.palette.emoji}/>
        </div>
    )
}

export default SingleColorPalette
