import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useReducer } from 'react'
import Row from '../row/Row'
import DropRow from '../row/DropRow'
import { checkForWin, deepCloneBoard, generateNewBoard } from '../../utils/gameUtils'
import { colorOptions } from '../../utils/colorOptions'
import './Game.css'


export default function Game() {

  const gameReducer = (state, action) => {
    switch (action.type) {
      case 'newGame':
        return {
          ...initialGameState,
          board: action.board,
        }
      case 'gameStarted':
        return {
          ...state,
          gameStarted: true,
        }
      case 'togglePlayer':
        return {
          ...state,
          currentPlayer: action.nextPlayer,
          board: action.board,
        }
      case 'endGame':
        return {
          ...state,
          gameOver: true,
          message: action.message,
          board: action.board,
          gameStarted: false
        }
      case 'updateMessage':
        return {
          ...state,
          message: action.message,
        }
      default:
        throw Error(`Action "${action.type}" is not a valid action.`)
    }
  }

  let initialGameState = {
    player1: 1,
    player1Color: null,
    player2: 2,
    player2Color: null,
    currentPlayer: 1,
    board: [
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
    ],
    gameStarted: false,
    gameOver: false,
    message: '',
  }

  // first row used for dropping discs
  const dropRow = [0, 0 , 0, 0, 0, 0, 0]

  const [gameState, dispatchGameState] = useReducer(
    gameReducer,
    initialGameState
  )

  const play = (c) => {
    if (!gameState.gameOver) {
      let board = deepCloneBoard(gameState.board)
      //check if cell is taken by starting at the bottom row and working up
      for (let r = 5; r >= 0; r--) {
        if (!board[r][c]) {
          board[r][c] = currentPlayer
          break
        }
      }
      // Check status of board
      let result = checkForWin(board)
      if (result === gameState.player1) {
        dispatchGameState({
          type: 'endGame',
          message: 'Player1 (red) wins!',
          board,
        })
      } else if (result === gameState.player2) {
        dispatchGameState({
          type: 'endGame',
          message: 'Player2 (yellow) wins!',
          board,
        })
      } else if (result === 'draw') {
        dispatchGameState({
          type: 'endGame',
          message: 'Draw Game!',
          board,
        })
      } else {
        const nextPlayer =
          currentPlayer === gameState.player1
            ? gameState.player2
            : gameState.player1

        dispatchGameState({ type: 'togglePlayer', nextPlayer, board })
      }
    }
    // it's gameover and a user clicked a cell
    else {
      dispatchGameState({
        type: 'updateMessage',
        message: 'Game Over. Please start a new game.',
      })
    }
  }

  const handleGameStart = () => {
    console.log(gameState)
    dispatchGameState({
      type: 'gameStarted',
      gameStarted: true,
      currentPlayer: currentPlayer
    })
    console.log(gameState)
  }


  return (
    <>
      {!gameState.gameStarted && (
        <>
          <Typography variant="h5" gutterBottom component="span">Who wants to go first?</Typography>
          <div className='flex-center'>
            <ToggleButtonGroup
              color="primary"
              value={currentPlayer}
              exclusive
              onChange={(e, newAlignment) => setCurrentPlayer(newAlignment)}
              sx={{ marginBottom: 5 }}
            >
              <ToggleButton value={1}>Player 1</ToggleButton>
              <ToggleButton value={2}>Player 2</ToggleButton>
            </ToggleButtonGroup>
          </div>
          {currentPlayer && (
            <>
              <Typography variant="h5" gutterBottom component="span">Players pick your colors</Typography>
              <div className="flex-row">
                <Box sx={{ minWidth: 120, marginRight: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Player 1</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      value={player1Color}
                      label="Player 1"
                      onChange={(e) => setPlayer1Color(e.target.value)}
                    >
                      {player2Color ? (
                        colorOptions.filter(color => color.name !== player2Color).map((color, index) => (
                          <MenuItem value={color.value}>{color.name}</MenuItem>
                        ))
                      )
                      :
                      colorOptions.map((color, index) => (
                        <MenuItem value={color.value}>{color.name}</MenuItem>
                      ))
                      }
                    </Select>
                  </FormControl>
                </Box>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Player 2</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      value={player2Color}
                      label="Player 2"
                      onChange={(e) => setPlayer2Color(e.target.value)}
                    >
                      {player1Color ? (
                        colorOptions.filter(color => color.name !== player1Color).map((color, index) => (
                          <MenuItem value={color.value}>{color.name}</MenuItem>
                        ))
                      )
                      :
                      colorOptions.map((color, index) => (
                        <MenuItem value={color.value}>{color.name}</MenuItem>
                      ))
                      }
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </>
          )}
        </>
      )}
      {gameState.gameOver && gameState.message}
      {!gameState.gameStarted && player1Color && player2Color && (
        <Button
          onClick={handleGameStart}
          size='large' sx={{ margin: 4 }}
          variant='contained'>Start!
        </Button>
      )}
      {gameState.gameStarted && (
        <>
          <Typography variant="h5" gutterBottom component="span">Player {currentPlayer}, your turn!</Typography>
          <div className="board-container fade-in-board flex-column">
            <table style={{ backgroundColor: 'white'}}>
              <tbody>
                <DropRow row={dropRow} play={play} playerColor={currentPlayer === 1 ? player1Color : player2Color}/>
              </tbody>
            </table>
            <table style={{ backgroundColor: 'black'}}>
              <tbody>
                {gameState.board.map((row, i) => (
                  <Row key={i} row={row} colors={[player1Color, player2Color]}/>
                ))}
              </tbody>
            </table>
            <div className='board-base'/>
          </div>
        </>
      )}
    </>
  )
}
