/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { FormGame } from "../../components/Admin/FormGame"
import { TableGames } from "../../components/Admin/TableGames"
import { useGames } from "../../context/GameContext.jsx"
import { useAuth } from "../../hooks/useAuth.js"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
function AdminPage() {
    const { getGames, games } = useGames()
    const { user } = useAuth()
    const [userDataEdit, setUserDataEdit] = useState(null);
    const navigate = useNavigate()
    useEffect(() => {
        if (!user) return navigate('/')
    }, [])

    useEffect(() => {
        getGames()
    }, [])
    return (
        <>
            {
                user && user.rol === "admin" ? (
                    <div className="w-full">
                        <h1 className="text-6xl mb-11">Panel de juegos</h1>
                        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5">
                            <section>
                                <h2 className="text-3xl pb-3">Crear Juego</h2>
                                <FormGame setUserDataEdit={setUserDataEdit} userDataEdit={userDataEdit} />
                            </section>
                            <section className="grow hidden md:block">
                                <h2 className="text-3xl pb-3">
                                    Listado
                                </h2>
                                {games.length == 0 ? <h3 className="text-3xl font-medium">No hay juegos</h3> : <TableGames games={games} setUserDataEdit={setUserDataEdit} />}
                            </section>
                            <p className="text-3xl text-center block md:hidden py-3"> ⚠️Tabla solo disponible a partir de pantallas medianas⚠️</p>
                        </div>
                    </div>
                ) : (
                    <p>Usuario no autorizado</p>
                )
            }

        </>
    )
}

export default AdminPage