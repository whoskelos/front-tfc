/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, createContext, useState } from "react";
import { createGameRequest, deleteGameByIdRequest, getGameBySlugRequest, getGamesRequest, updateGameRequest } from "../api/apiGames";

const GameContext = createContext();

export const useGames = () => {
    const context = useContext(GameContext)

    if (!context) {
        throw new Error("useGames debe estar en un GameProvider")
    }
    return context
}

export function GameProvider({ children }) {
    const [games, setGames] = useState([])
    const [game, setGame] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const getGames = async () => {
        setIsLoading(true)
        try {
            const res = await getGamesRequest()
            setGames(res.games)
            setGame({})
            setIsLoading(false)
        } catch (error) {
            console.error("Error obteniendo juegos")
            setIsLoading(false)
        }
    }

    const createGame = async (game) => {
        setIsLoading(true)
        try {
            const res = await createGameRequest(game)
            setIsLoading(false)
            return res
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            return error
        }
    }

    const getGameBySlug = async (slug) => {
        setIsLoading(true)
        try {
            const res = await getGameBySlugRequest(slug)
            setGame(res)
            setIsLoading(false)
        } catch (error) {
            console.error(error)
            setIsLoading(true)

        }
    }

    const deleteGameById = async (id) => {
        try {
            const res = await deleteGameByIdRequest(id)
            return res
        } catch (error) {
            return error
        }
    }

    const updateGame = async (game, id) => {
        setIsLoading(true)
        try {
            const res = await updateGameRequest(game, id)
            setIsLoading(false)
            return res
        } catch (error) {
            console.error(error)
            setIsLoading(false)
            return error
        }
    }

    return (
        <GameContext.Provider
            value={{
                games,
                createGame,
                getGames,
                isLoading,
                getGameBySlug,
                game,
                deleteGameById,
                updateGame
            }}>
            {children}
        </GameContext.Provider>
    )
}