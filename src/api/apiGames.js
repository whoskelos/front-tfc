const GAMES_API="https://node-gamekeyzone.fly.dev/api/v1/games"
// const GAMES_API="http://localhost:3000/api/v1/games"
export async function getGamesRequest() {
    try {
        const response = await fetch(`${GAMES_API}`);
        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al realizar la petición:", error);
        return null;
    }
}

export async function createGameRequest(game) {
    try {
        const response = await fetch(
            `${GAMES_API}/create`,
            {
                method: "POST",
                body: game,
            }
        );
        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al realizar la petición:", error);
        return null;
    }
}

export async function getGameBySlugRequest(slug) {
    try {
        const response = await fetch(
            `${GAMES_API}/${slug}`
        );
        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al realizar la petición:", error);
        return null;
    }
}

export async function deleteGameByIdRequest(id) {
    try {
        const response = await fetch(
            `${GAMES_API}/deleteGameById`,
            {
                method: "POST",
                body: JSON.stringify({id}),
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );
        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al realizar la petición:", error);
        return null;
    }
}

export async function updateGameRequest(game, id) {
    try {
        const response = await fetch(
            `${GAMES_API}/updateGame/${id}`,
            {
                method: "PATCH",
                body: game,
            }
        );
        if (!response.ok) {
            throw new Error("La solicitud no fue exitosa");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al realizar la petición:", error);
        return null;
    }
}
