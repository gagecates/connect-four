import { useState } from 'react'
import Box from '@mui/material/Box'
import '../game/Game.css'

export default function DropRow({ row, playerColor, play }){
  return (
    <tr>
      {row && row.map((cell, i) => (
        <DropCell key={i} columnIndex={i} playerColor={playerColor} play={play}/>
      ))}
    </tr>
  )
}

const DropCell = ({ columnIndex, playerColor, play }) => {
  const [hovered, setHovered] = useState(null)

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
          className={hovered === columnIndex ? `${playerColor}Circle` : 'whiteCircle'}
        ></div>
      </Box>
    </td>
  )
}