import Game from './components/game/Game'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './components/theme/Theme'
import './App.css'

function App() {
  return (
    <div className="App">
      <img className="logo" src='connect4-img.png' alt='Connect 4'/>
      <ThemeProvider theme={theme}>
        <Game/>
      </ThemeProvider>
    </div>
  );
}

export default App;
