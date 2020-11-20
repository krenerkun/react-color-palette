import React, {useState} from 'react'
import {Link} from 'react-router-dom'
import './ColorBox.css'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import chroma from 'chroma-js'

const ColorBox = (props) => {

    const [copied, setCopied] = useState(false);
    const {background, name, paletteId, id, showLink} = props;

    const changeCopyState = () =>{
        setCopied(true,setTimeout(() => {
            setCopied(false)
        }, 1500))
    }

    const isDarkColor = chroma(background).luminance() <= 0.08
    const isLightColor = chroma(background).luminance() >= 0.8
    return (
        <CopyToClipboard text={background} onCopy={changeCopyState}>
            <div style={{background}}className="ColorBox">
                <div style={{background}}className={`copy-overlay ${copied && 'show'}`}/>
                <div className={`copy-msg ${copied && 'show'}`}>
                    <h1>Copied!</h1>
                    <p className={`${isLightColor && 'dark-text'}`}>{background}</p>
                </div>
                <div className="copy-container">
                    <div className="box-content">
                        <span className={isDarkColor && 'light-text' }>{name}</span>
                    </div>
                    <button className={`copy-button ${isLightColor && 'dark-text'}`}>Copy</button>
                </div>
            {showLink && (
                <Link to={`/palette/${paletteId}/${id}`} onClick={e => e.stopPropagation()}>
                    <span className={`see-more ${isLightColor && 'dark-text'}`}>More</span>
                </Link>
            )}
            </div>
        </CopyToClipboard>
    )
}

export default ColorBox
