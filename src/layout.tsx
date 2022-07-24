import {NavLink, Route, Switch} from 'react-router-dom'
import {useQuery} from 'react-query'

import {api} from './api'

export function Layout() {
  return (
    <>
      <nav className="navbar bg-neutral text-neutral-content">
        <h1 className="flex-1">Star Wars</h1>
        <ul className="menu menu-horizontal">
          <li>
            <NavLink exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/films">Films</NavLink>
          </li>
          <li>
            <NavLink to="/people">People</NavLink>
          </li>
        </ul>
      </nav>
      <main className="prose p-4">
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
  return (
    <>
      <h2>Home</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias animi
        asperiores cupiditate debitis dolorem et ex ipsa iste magni maxime natus
        nostrum odio optio, quas quibusdam sit tempore, velit! Illo?
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam esse
        est minus vel vitae! Eaque laudantium quidem rerum! Cupiditate eos
        laudantium possimus vel? Architecto iusto quis sit. Expedita, maxime
        quam?
      </p>
    </>
  )
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
          <li key={person.name}>{person.name}</li>
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
          <li key={film.title}>{film.title}</li>
        ))}
      </ul>
    </>
  )
}
