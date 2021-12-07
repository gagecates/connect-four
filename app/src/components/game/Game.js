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
          ...state,
          board: initialGameState.board,
          gameOver: false,
          currentPlayer: state.currentPlayer === 1 ? 2 : 1
        }
      case 'resetGame':
        return {
          ...initialGameState,
          board: action.board,
        }
      case 'gameStarted':
        return {
          ...state,
          board: initialGameState.board,
          gameStarted: true,
        }
      case 'togglePlayer':
        return {
          ...state,
          currentPlayer: action.nextPlayer,
          board: action.board,
        }
      case 'currentPlayer':
        return {
          ...state,
          currentPlayer: action.player,
        }
      case 'endGame':
        return {
          ...state,
          gameOver: true,
          message: action.message,
          board: action.board,
        }
      case 'updateMessage':
        return {
          ...state,
          message: action.message,
        }
      case 'updatePlayer1Color':
        return {
          ...state,
          player1Color: action.color
        }
      case 'updatePlayer2Color':
        return {
          ...state,
          player2Color: action.color
        }
      case 'incrementPlayer1Score':
        return {
          ...state,
          player1Score: state.player1Score + 1
        }
      case 'incrementPlayer2Score':
        return {
          ...state,
          player2Score: state.player2Score + 1
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
    player1Score: 0,
    player2Score: 0,
    currentPlayer: null,
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
          board[r][c] = gameState.currentPlayer
          break
        }
      }
      // Check status of board
      let result = checkForWin(board)
      if (result === gameState.player1) {
        dispatchGameState({
          type: 'endGame',
          message: `Player 1 (${gameState.player1Color}) wins!`,
          board,
        })
        dispatchGameState({
          type: 'incrementPlayer1Score',
        })
      } else if (result === gameState.player2) {
        dispatchGameState({
          type: 'endGame',
          message: `Player 2 (${gameState.player2Color}) wins!`,
          board,
        })
        dispatchGameState({
          type: 'incrementPlayer2Score',
        })
      } else if (result === 'draw') {
        dispatchGameState({
          type: 'endGame',
          message: 'Draw Game!',
          board,
        })
      } else {
        const nextPlayer =
          gameState.currentPlayer === gameState.player1
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
    dispatchGameState({
      type: 'gameStarted',
      gameStarted: true,
    })
  }
  console.log(gameState)


  return (
    <>
      {!gameState.gameStarted && !gameState.gameOver && (
        <>
          <Typography variant="h5" gutterBottom component="span">Who wants to go first?</Typography>
          <div className='flex-center'>
            <ToggleButtonGroup
              color="primary"
              value={gameState.currentPlayer}
              exclusive
              onChange={(e, newAlignment) => dispatchGameState({type: 'currentPlayer', player: newAlignment})}
              sx={{ marginBottom: 5 }}
            >
              <ToggleButton value={1}>Player 1</ToggleButton>
              <ToggleButton value={2}>Player 2</ToggleButton>
            </ToggleButtonGroup>
          </div>
          {gameState.currentPlayer && (
            <>
              <Typography variant="h5" gutterBottom component="span">Players pick your colors</Typography>
              <div className="flex-row">
                <Box sx={{ minWidth: 120, marginRight: 3 }}>
                  <FormControl fullWidth>
                    <InputLabel id="select-label">Player 1</InputLabel>
                    <Select
                      labelId="select-label"
                      id="simple-select"
                      value={gameState.player1Color}
                      label="Player 1"
                      onChange={(e) => dispatchGameState({type: 'updatePlayer1Color', color: e.target.value})}
                    >
                      {gameState.player2Color ? (
                        colorOptions.filter(color => color.name !== gameState.player2Color).map((color, index) => (
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
                      value={gameState.player2Color}
                      label="Player 2"
                      onChange={(e) => dispatchGameState({type: 'updatePlayer2Color', color: e.target.value})}
                    >
                      {gameState.player1Color ? (
                        colorOptions.filter(color => color.name !== gameState.player1Color).map((color, index) => (
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
      {gameState.gameOver && (
        <>
          <Typography variant="h5" gutterBottom component="span">{gameState.message}</Typography>
          <Button
            onClick={() => dispatchGameState({type: 'newGame'})}
            size='large' sx={{ margin: 1 }}
            variant='contained'>
              Play again?
          </Button>
        </>
      )}
      {!gameState.gameStarted && !gameState.gameOver && gameState.player1Color && gameState.player2Color && (
        <Button
          onClick={handleGameStart}
          size='large' sx={{ margin: 4 }}
          variant='contained'>Start!
        </Button>
      )}
      {gameState.gameStarted && (
        <>
          {!gameState.gameOver && (
            <Typography variant="h5" gutterBottom component="span">Player {gameState.currentPlayer}, your turn!</Typography>
          )}
          <div className="board-container fade-in-board flex-column">
            <table style={{ backgroundColor: 'white'}}>
              <tbody>
                <DropRow
                  row={dropRow}
                  play={play}
                  playerColor={gameState.currentPlayer === 1 ? gameState.player1Color : gameState.player2Color}
                  gameOver={gameState.gameOver}
                />
              </tbody>
            </table>
            <table style={{ backgroundColor: 'black'}}>
              <tbody>
                {gameState.board && gameState.board.map((row, i) => (
                  <Row key={i} row={row} colors={[gameState.player1Color, gameState.player2Color]}/>
                ))}
              </tbody>
            </table>
            <div className='board-base'/>
            <div className="flex-row">
              <div className="score-box">
                <Typography variant="h5" gutterBottom component="div">Player 1</Typography>
                <Typography variant="h5" gutterBottom component="div">{gameState.player1Score}</Typography>
              </div>
              <div className="score-box">
                <Typography variant="h5" gutterBottom component="div">Player 2</Typography>
                <Typography variant="h5" gutterBottom component="div">{gameState.player2Score}</Typography>
              </div>
            </div>
            {gameState.player1Score + gameState.player2Score >= 1 && (
              <Button
                onClick={() => dispatchGameState({type: 'resetGame'})}
                size='large' sx={{ margin: 1 }}
                variant='contained'>
                  Start over
              </Button>
            )}
          </div>
        </>
      )}
    </>
  )
}
