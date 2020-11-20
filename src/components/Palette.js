import React, {useState} from 'react'
import ColorBox from './ColorBox';
import NavBar from './NavBar'
import PaletteFooter from './PaletteFooter'
import './Palette.css'


const Palette = (props) => {
    const [level,setLevel] = useState(500);
    const [format, setFormat] = useState('hex')
    const {palette} = props
    const {paletteName, emoji, id} = props.palette

    const handleChangeFormat = (value) =>{
        setFormat(value)
    };
    const colorBoxes = palette.colors[level].map(color => 
        <ColorBox 
            background={color[format]}
            name={color.name} 
            id={color.id} 
            paletteId={id}
            showLink={true}/>
            
    );

    return (
        <div>
            <div className="Palette">
                <NavBar level={level} 
                        changeLevel={newLevel => setLevel(newLevel)} 
                        format={handleChangeFormat} 
                        handleChange={handleChangeFormat}
                        showSlider={true}/>

                <div className="Palette-colors">
                    {colorBoxes} 
                </div>
            </div>
           <PaletteFooter paletteName={paletteName} emoji={emoji}/>
        </div>
    )
}

export default Palette
