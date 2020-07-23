import React from 'react'

export let keyMap = new Map([
    ['ArrowUp','0x2191'],
    ['ArrowLeft','0x2190'],
    ['ArrowDown','0x2193'],
    ['ArrowRight','0x2192']
])

export const Key = (props) => {
    return (<div className="miniKey"><span>{String.fromCharCode(keyMap.get(props.keyCode))}</span></div>)
}


