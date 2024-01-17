/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react"
import { GameCard } from "../components/GameCard.jsx"
import { useGames } from "../context/GameContext.jsx"
import { CgSearch } from "react-icons/cg"
import { PacmanLoader } from 'react-spinners';
import _debounce from "lodash/debounce"
function HomePage() {
  const { getGames, games, isLoading } = useGames()
  const [search, setSearch] = useState('')
  const [filteredGames, setFilteredGames] = useState([]);

  useEffect(() => {
    setFilteredGames(games);
  }, [games]);

  useEffect(() => {
    const delayedSearch = _debounce(() => {
      // Filtrar juegos en base a la búsqueda
      const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(search.toLowerCase())
      );
      // Actualizar la lista de juegos filtrados
      setFilteredGames(filteredGames);
    }, 300); // 300 milisegundos de retraso

    delayedSearch();

    return () => delayedSearch.cancel();
  }, [search, games]);

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  useEffect(() => {
    getGames()
  }, [])


  return (
    <>
      {
        isLoading
          ? (
            <div className="w-full h-full grid place-content-center"><PacmanLoader color="#ff346d" margin={2} size={40} /></div>
          ) :
          (
            <div className="w-full">
              <search className="w-full max-w-xs m-auto p-2 text-gray-700 flex gap-x-2 items-center">
                <input type="search" name="q" id="q" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Spider-Man, Fifa, Tekken" onChange={handleChange} />
                <label htmlFor="q" className="text-gray-200"><CgSearch className="text-3xl" /></label>
              </search>
              <h1 className="text-6xl mb-11">Juegos</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                  filteredGames.length > 0 
                  ? filteredGames.map((game) => (
                    <GameCard key={game.id_game} game={game} />
                  ))
                  : <div className="text-xl font-medium pt-4">No se encuentran coincidencias...</div>
                }
              </div>
            </div>
          )
      }

    </>
  )
}

export default HomePage