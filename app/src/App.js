import Game from './components/game/Game'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from './components/theme/Theme'
import Logo from './assets/logo.png'
import './App.css'

function App() {
  return (
    <div className="App">
      <img className="logo" src={Logo} alt='Connect 4'/>
      <ThemeProvider theme={theme}>
        <Game/>
      </ThemeProvider>
    </div>
  );
}

export default App;
