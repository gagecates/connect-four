import Box from '@mui/material/Box'
import '../game/Game.css'


export default function Row({ row, colors }){
  return (
    <tr>
      {row && row.map((cell, i) => (
        <Cell key={i} value={cell} columnIndex={i} colors={colors}/>
      ))}
    </tr>
  )
}

const Cell = ({ value, columnIndex, colors }) => {
  let color = 'whiteCircle'

  if (value === 1) { color = colors[0]}
  else if (value === 2) { color = colors[1]}

  return (
    <td>
      <Box
        className={"gameCell"}
      >
        <div className={value ? `${color}Circle` : "whiteCircle"}></div>
      </Box>
    </td>
  )
}