import React, {useState} from 'react'

function useToggle(initialVal = false) {
    const [toggle, setToggle] = useState(initialVal)

    const handleToggle = ()=> {
        setToggle(!toggle)
    }

    return [toggle, handleToggle]
}

export {useToggle}
