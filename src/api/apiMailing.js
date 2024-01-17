const MAIL_API="https://node-gamekeyzone.fly.dev/api/v1"
export async function sendTransactionCompleteMail(data) {
    try {
        const response = await fetch(
            `${MAIL_API}/mail`,
            {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json"
                },
            }
        );

        if (!response.ok) {
            throw new Error("La solicitud de correo no fue exitosa");
        }

        const mailResponse = await response.json();
        return mailResponse;
    } catch (error) {
        console.error("Error al enviar la solicitud de correo:", error);
        return null;
    }
}