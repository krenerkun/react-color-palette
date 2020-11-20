import './App.css';
import Palette from './components/Palette';
import PaletteList from './components/PaletteList'
import NewPalette from './components/NewPalette'
import SingleColorPalette from './components/SingleColorPalette'
import colorSeeds from './colorSeeds'
import { generatePalette } from './colorHelper';
import {Route, Switch} from 'react-router-dom'


function App() {
  const getPalettes = (id) =>{
    return colorSeeds.find(palette => {
      return palette.id === id;
    })
  }

  return (
    <Switch>
      <Route exact
             path='/palette/new' 
             render={()=> <NewPalette/>}/>

      <Route exact
             path='/palette/:paletteId/:colorId'
             render={routeProps=> <SingleColorPalette palette={generatePalette(getPalettes(routeProps.match.params.paletteId))}
                                                      colorId={routeProps.match.params.colorId}/>}/>      
      <Route exact
             path='/palette/:id' 
             render={routeProps=> <Palette palette={generatePalette(getPalettes(routeProps.match.params.id))}/>}
      />
      <Route exact
             path='/'
             render={routeProps=> <PaletteList palettes={colorSeeds} {...routeProps}/>}/>

      <Route render={()=> <h1>Page not found!</h1>}/> 
    </Switch>
    // <div>
    //   <Palette palette={generatePalette(colorSeeds[2])}/>
    // </div>
  );
}

export default App;
