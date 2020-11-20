import {useState} from 'react'

function useInput(inputVal) {
    const [value, setValue] = useState(inputVal)

    const handleValueChange = e =>{
        setValue(e.target.value)
        console.log(value)
    }

    const reset = () =>{
        setValue("")
    }
    

    return [value, handleValueChange, reset]
}

export {useInput}
