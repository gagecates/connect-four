import { useState } from 'react'
import Box from '@mui/material/Box'
import '../game/Game.css'

export default function DropRow({ row, playerColor, play, gameOver }){
  return (
    <tr>
      {row && row.map((cell, i) => (
        <DropCell key={i} columnIndex={i} playerColor={playerColor} play={play} gameOver={gameOver}/>
      ))}
    </tr>
  )
}

const DropCell = ({ columnIndex, playerColor, play, gameOver }) => {
  const [hovered, setHovered] = useState(null)

  console.log(gameOver)
  const cellHovered = hovered === columnIndex
  const enabled = gameOver ? 'disabled' : ''
  return (
    <td>
      <Box
        className={"dropCell"}
        disabled={hovered !== columnIndex}
      >
        <div
          onMouseEnter={() => setHovered(columnIndex)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => {play(columnIndex)}}
          className={cellHovered ? `${playerColor}Circle` : 'whiteCircle' + ` ${enabled}`}
        ></div>
      </Box>
    </td>
  )
}