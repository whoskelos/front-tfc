/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { stores } from "../../utils/storesData.js"
import { PacmanLoader } from 'react-spinners';
import { useGames } from "../../context/GameContext.jsx";
import { toast } from "sonner"
export const FormGame = ({ userDataEdit }) => {
    const { createGame, isLoading, updateGame, getGames } = useGames()
    const [isUpdating, setIsUpdating] = useState(false)
    const [options, setOptions] = useState([])
    const defaultValue = {
        slug: '',
        name: '',
        rating: '',
        price: '',
        store: {
            slug: '',
            name: '',
        },
        description: '',
        requirements: '',
        image: null
    }

    const [form, setForm] = useState(defaultValue)

    useEffect(() => {
        if (userDataEdit) {
            setForm(userDataEdit)
            setIsUpdating(true)
        }
        setOptions(stores.map((store) => store.store))
    }, [userDataEdit])

    const handleChange = (e) => {
        if (e.target.name === 'image') {
            const file = e.target.files ? e.target.files[0] : null
            setForm({ ...form, [e.target.name]: file })
        } else {
            setForm({ ...form, [e.target.name]: e.target.value })

        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Construimos el objeto FormData
        const formData = new FormData()
        //Rellenamos los campos del formulario
        for (let key in form) {
            if (key !== 'image') {
                if (typeof form[key] === 'object' && form[key] !== null) {
                    // Si es un objeto (excepto 'image'), conviértelo a cadena JSON y agrégalo al FormData
                    formData.append(key, JSON.stringify(form[key]));
                } else {
                    // De lo contrario, simplemente agrégalo al FormData
                    formData.append(key, form[key]);
                }
            }
        }
        // Agregamos el archivo 'image' al FormData si está presente
        if (form.image instanceof File) {
            formData.append('image', form.image);
        }
        // Enviamos los datos al servidor
        if (isUpdating) {
            const res = await updateGame(formData, userDataEdit.id)
            setForm(defaultValue)
            if (res.status === "success") {
                setIsUpdating(false)
                toast.success(res.message)
                setForm(defaultValue)
                await getGames()
            } else {
                setIsUpdating(false)
                toast.error(res.error || res.message)

            }
        } else {
            const res = await createGame(formData)
            if (res.status === "success") {
                toast.success(res.message)
                setForm(defaultValue)
                await getGames()
            } else {
                toast.error(res.error || res.message)
            }
        }
    }

    if (isLoading) {
        return <div><PacmanLoader color="#ff346d" /></div>
    }

    return (
        <form onSubmit={handleSubmit} className="text-gray-800 font-medium bg-white/10 flex flex-col [&>div]:flex-wrap gap-5 [&>div>input]:p-2 [&>div>input]:rounded-md rounded-md p-4">
            <div className="flex flex-col md:flex-row gap-2 [&>input]:w-full">
                <input type="text" name="slug" id="slug" value={form.slug} required placeholder="Slug" onChange={handleChange} />
                <input type="text" name="name" id="name" value={form.name} required placeholder="Nombre" onChange={handleChange} />
            </div>
            <div className="flex flex-col md:flex-row gap-2 [&>input]:w-full">
                <input type="number" name="rating" id="rating" value={form.rating} required placeholder="Rating" onChange={handleChange} />
                <input type="number" name="price" id="price" value={form.price} required placeholder="Precio" onChange={handleChange} />
            </div>
            <div className="flex">
                <select name="store_slug" id="store_slug" className="w-full p-2 rounded-md [&>option]:font-medium" required onChange={handleChange}>
                    <option value="0">Seleccione una tienda</option>
                    {options.map((opt, index) => (
                        <option key={index} value={opt.slug}>{opt.slug}</option>
                    ))}
                </select>
            </div>
            <div className="flex">
                <select name="store_name" id="store_name" className="w-full p-2 rounded-md [&>option]:font-medium" required onChange={handleChange}>
                    <option value="0">Seleccione una tienda</option>
                    {options.map((opt, index) => (
                        <option key={index} value={opt.name}>{opt.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex">
                <textarea name="description" id="description" className="w-full p-2 rounded-md" required placeholder="Describe el juego" value={form.description} maxLength={300} onChange={handleChange}></textarea>
            </div>
            <div className="flex">
                <textarea name="requirements" id="requirements" className="w-full p-2 rounded-md" required placeholder="Requisitos del juego" value={form.requirements} maxLength={400} onChange={handleChange}></textarea>
            </div>
            <div className="flex">
                <input type="file" name="image" id="image" accept="image/png, image/jpeg, image/jpg" className="w-full p-2 rounded-md text-white" onChange={handleChange} />
            </div>
            {
                isUpdating ? <button className="bg-[#ff346d] text-lg text-white rounded p-3 hover:opacity-80 transition-all">Actualizar</button> : <button className="bg-[#ff346d] text-lg text-white rounded p-3 hover:opacity-80 transition-all">Insertar</button>
            }

        </form>
    )
}