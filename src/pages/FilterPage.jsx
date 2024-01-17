/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { useGames } from "../context/GameContext.jsx"
import { GameCard } from "../components/GameCard.jsx";
import { useState } from "react";

function FilterPage() {
    const { getGames, games } = useGames()
    const { plataforma } = useParams();
    const [filteredGames, setFilteredGames] = useState([])

    //* Mostrar los juegos filtrados por plataforma que viene como param en la url
    useEffect(() => {
        getGames()
        const filterGames = games.filter(game => game.store.slug === plataforma)
        setFilteredGames(filterGames)
    }, [plataforma])

    return (
        <>
            <div className="w-full">
                <h1 className="text-6xl mb-11">Juegos</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        filteredGames.length > 0 ? (
                            filteredGames.map((game) => (
                                <GameCard key={game.id_game} game={game} />
                            ))
                        ) : (
                            <div className="text-xl">No hay juegos disponibles</div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default FilterPage