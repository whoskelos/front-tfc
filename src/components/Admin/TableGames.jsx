/* eslint-disable react/prop-types */
import { flexRender, getCoreRowModel, useReactTable, getPaginationRowModel, createColumnHelper } from '@tanstack/react-table'
import classnames from 'classnames'
import { CgTrashEmpty } from "react-icons/cg";
import { MdEdit } from "react-icons/md";
import { useGames } from '../../context/GameContext';
import { toast } from "sonner"

export const TableGames = ({ games, setUserDataEdit }) => {
    const { deleteGameById, getGames } = useGames()
    const columnHelper = createColumnHelper()
    const columns = [
        {
            header: 'Nombre',
            accessorKey: 'name'
        },
        {
            header: 'Tienda',
            accessorKey: 'store.name'
        },
        columnHelper.accessor('background_image', {
            cell: url => <img src={url.getValue()} alt={url.getValue()} className='block m-auto w-[150px] h-auto' loading='lazy' />
        }),
        {
            header: 'Acciones',
            accessorKey: 'id_game',
            cell: (info) => <div className='flex gap-x-4'><button className='text-3xl' onClick={() => handleDelete(info.getValue())}><CgTrashEmpty className='hover:text-[#ff346d] transition-colors' /></button><button className='grow text-3xl transition-colors' onClick={() => handleEdit(info.getValue())}><MdEdit className='hover:text-sky-400 transition-colors' /></button></div>
        }

    ]
    const table = useReactTable({
        data: games,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
    })

    const handleDelete = async (idGame) => {
        toast('¿Estás seguro?', {
            action: {
                label: 'Eliminar',
                onClick: async () => {
                    const res = await deleteGameById(idGame)
                    if (res.status === "success") {
                        toast.success(res.message)
                        getGames()
                    } else {
                        toast.info(res.message)
                    }
                },
            },
        });
    }

    const getGameData = (id) => {
        const gameFounded = games.find((game) => game.id_game === id)
        setUserDataEdit({
            id: gameFounded._id,
            slug: gameFounded.slug,
            name: gameFounded.name,
            rating: gameFounded.rating,
            price: gameFounded.price,
            store: {
                slug: gameFounded.store.slug,
                name: gameFounded.store.name,
            },
            description: gameFounded.description,
            requirements: gameFounded.requirements,
            image: null
        })
    }

    const handleEdit = (idGame) => {
        getGameData(idGame)
    }

    return (
        <>
            <table className="bg-white/10 table-auto w-full text-center">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr className="bg-white text-gray-800 [&>th]:text-center" key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className='py-2 px-4 text-left uppercase'>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className='px-2'>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div className='py-4 flex items-center justify-between'>
                <div className='flex items-center gap-2 [&>button]:font-bold [&>button]:p-2'>
                    <button className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-300' onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()} >
                        {`<<`}
                    </button>
                    <button className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-300' onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} >
                        {`<`}
                    </button>
                    {table.getPageOptions().map((value, key) => (
                        <button key={key} onClick={() => table.setPageIndex(value)} className={classnames({
                            "text-gray-600 bg-gray-200 py-0.5 px-1 font-bold rounded border border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-300": true,
                            "bg-indigo-200 text-[#ff346d]": value === table.getState().pagination.pageIndex
                        })}> {value + 1}</button>
                    ))}
                    <button className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-300' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        {`>`}
                    </button>
                    <button className='text-gray-600 bg-gray-200 py-0.5 px-1 rounded border border-gray-200 disabled:hover:bg-white disabled:hover:text-gray-300' onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                        {`>>`}
                    </button>
                </div>
                <div className='text-gray-100 font-semibold'>
                    Mostrando de {Number(table.getRowModel().rows[0].id) + 1} a {Number(table.getRowModel().rows[table.getRowModel().rows.length - 1].id) + 1} del total de {games.length}
                </div>
            </div>
        </>
    )
}