import {NavLink, Route, Switch} from 'react-router-dom'

export function Layout() {
  return (
    <>
      <nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/films">Films</NavLink>
        <NavLink to="/characters">Characters</NavLink>
      </nav>
      <main>
        <Switch>
          <Route exact path="/films">
            <Films />
          </Route>
          <Route exact path="/films/:filmId">
            <Film />
          </Route>
          <Route exact path="/characters">
            <Characters />
          </Route>
          <Route exact path="/characters/:characterId">
            <Character />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </main>
    </>
  )
}

function Home() {
  return <h1>Home</h1>
}

function Films() {
  return <h1>Films</h1>
}

function Film() {
  return <h1>Film</h1>
}

function Characters() {
  return <h1>Characters</h1>
}

function Character() {
  return <h1>Character</h1>
}
