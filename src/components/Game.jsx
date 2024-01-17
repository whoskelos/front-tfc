/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { TiShoppingCart } from "react-icons/ti";
import { useCart } from "../hooks/useCart";
import { useGames } from "../context/GameContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";
import Image from "./Image";
import { PacmanLoader } from 'react-spinners';

function Game({ slug }) {
    const { getGameBySlug, game, isLoading } = useGames()
    const { addToCart } = useCart()
    const { user } = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        getGameBySlug(slug)
    }, [slug])

    const handleClick = () => {
        addToCart(game)
        navigate("/cart")
    }


    return (
        <>
            {
                !isLoading ? (
                    <section>
                        <article>
                            <div className="w-full flex gap-8 flex-col items-center lg:flex-row justify-center px-4 lg:px-0">
                                <div className="w-full max-w-[616px] max-h-[346px] min-w-fit">
                                    <picture className="w-full h-full rounded-md">
                                        <Image game={game} />
                                    </picture>
                                </div>
                                <div className="w-full max-w-[616px] h-[346px] bg-white/10 backdrop-filter backdrop-blur-lg shadow-lg rounded-md grow p-3 flex flex-col items-center justify-around gap-y-3">

                                    <div>
                                        <h1 className="text-xl md:text-3xl font-medium text-center">{game.name}</h1>
                                    </div>

                                    <div className="flex items-center gap-2 bg-black/20 backdrop-filter backdrop-blur-md shadow-md p-3 rounded-full">
                                        <img src={`/${game?.store?.slug}.svg`} alt={game?.store?.name} className="w-8" />
                                        <span>{game?.store?.name}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <img src="/rating.svg" alt={game.rating} className="w-8" />
                                        <span>Rating de {game.rating}</span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <h4 className="text-2xl md:text-5xl font-medium">
                                            {game.price}€
                                        </h4>
                                    </div>
                                    {
                                        user ? <div className="w-full flex gap-2">
                                            <button className="flex items-center justify-center bg-[#ff346d] w-16 md:w-28 h-[56px] px-4 rounded-md hover:bg-sky-500 transition-colors" onClick={() => addToCart(game)}><TiShoppingCart className="text-4xl" /></button>
                                            <button className="grow items-center justify-center bg-[#ff346d] w-16 md:w-28 h-[56px] px-4 rounded-md font-medium text-md md:text-xl hover:bg-sky-500 transition-colors" onClick={() => handleClick()}>Comprar ahora</button>
                                        </div> : <button className="block items-center justify-center bg-[#ff346d] h-[56px] px-4 rounded-md font-medium text-md md:text-xl hover:bg-sky-500 transition-colors" onClick={() => navigate('/login')}>Acceder</button>
                                    }
                                </div>
                            </div>
                        </article>
                        <article>
                            <div className="w-full mt-16 md:mt-24 flex flex-col gap-8 md:flex-row">
                                <div className="w-full">
                                    <h1 className="text-3xl font-medium pb-2">Acerca del juego</h1>
                                    <p>{game.description}</p>
                                </div>
                                <div className="w-full mb-4">
                                    <h1 className="text-3xl font-medium pb-2">Requisitos del juego</h1>
                                    <p>{game.requirements}</p>
                                </div>
                            </div>
                        </article>
                    </section>
                ) : (
                    <div className="w-full h-full grid place-content-center"><PacmanLoader color="#ff346d" margin={2} size={40} /></div>
                )}
        </>
    )
}

export default Game