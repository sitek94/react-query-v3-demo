import {NavLink, Route, Switch} from 'react-router-dom'
import {useQuery} from 'react-query'

import {api} from './api'

export function Layout() {
  return (
    <>
      <nav>
        <h1>Star Wars</h1>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/films">Films</NavLink>
        <NavLink to="/people">People</NavLink>
      </nav>
      <main>
        <Switch>
          <Route exact path="/films">
            <Films />
          </Route>
          <Route exact path="/people">
            <People />
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

function People() {
  const {data, isLoading, isError} = useQuery('people', api.getPeople)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error :(</p>

  return (
    <>
      <h2>People</h2>
      <ul>
        {data.results.map(person => (
          <li key={person.id}>{person.name}</li>
        ))}
      </ul>
    </>
  )
}

function Films() {
  const {data, isLoading, isError} = useQuery('films', api.getFilms)

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error :(</p>

  return (
    <>
      <h2>Films</h2>
      <ul>
        {data.results.map(film => (
          <li key={film.id}>{film.title}</li>
        ))}
      </ul>
    </>
  )
}
