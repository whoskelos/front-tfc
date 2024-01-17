/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from "react-router-dom";
import Game from "../components/Game";

function GamePage() {

    const { nombre } = useParams();
    return (
        <>
            <div className="w-full mt-20 md:mt-36">
                {/* Componente juego */}
                <Game slug={nombre} />
            </div>
        </>
    )
}

export default GamePage