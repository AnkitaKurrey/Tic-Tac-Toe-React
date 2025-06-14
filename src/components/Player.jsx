import { useState } from "react"

export default function Player({ initialName, symbol }) {
    // We can have multiple useState to handle multiple states
    const [isEditing, setIsEditing] = useState(false)
    const [playerName, setPlayerName] = useState(initialName)

    function handleClick() {
        // unnecessary logic
        // setIsEditing(isEditing ? false : true)
        // Better option is
        // setIsEditing(!isEditing)
        // Instead doing above, when updating your state based on the previous value of that state,you should pass a function to that state updating function.
        // Because this function which you pass here will be called by React and it will automatically get the current state value. So the value before this state update here as an input.
        setIsEditing(editing => !editing)
    }

    function handleChange(event){
        setPlayerName(event.target.value)
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>
    let btnCaption = 'Edit'
    
    if (isEditing) {
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange}></input>
        btnCaption = 'Save'
    }

    return (
        <li>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleClick}>{btnCaption}</button>
        </li>
    )
}
