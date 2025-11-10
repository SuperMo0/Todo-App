import React from 'react'
import { useState } from 'react'

export default function input({ type, placeholder }) {
    const [value, setValue] = useState(null);
    return (
        <input type={type} placeholder={placeholder}></input>
    )
}
