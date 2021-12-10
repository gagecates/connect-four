import { useState } from 'react'
import Box from '@mui/material/Box'
import '../game/Game.css'

export default function DropRow({ row, playerColor, play, gameOver, board }){
  // map each 7 cells of the drop row with default null values
  return (
    <tr>
      {row && row.map((cell, i) => (
        <DropCell key={i} columnIndex={i} playerColor={playerColor} play={play} gameOver={gameOver} board={board}/>
      ))}
    </tr>
  )
}

const DropCell = ({ columnIndex, playerColor, play, gameOver, board }) => {
  // columnIndex is the index of top drop row
  const [hovered, setHovered] = useState(null)
  const droppable = !board[0][columnIndex]

  const cellHovered = hovered === columnIndex
  const enabled = !gameOver && droppable ? '' : 'disabled'

  return (
    <td>
      <Box
        className={"dropCell"}
      >
        <div
          onMouseEnter={() => setHovered(columnIndex)}
          onMouseLeave={() => setHovered(null)}
          onClick={() => {play(columnIndex)}}
          className={cellHovered && droppable ? `${playerColor}Circle` : 'whiteCircle' + ` ${enabled}`}
        ></div>
      </Box>
    </td>
  )
}