// eslint-disable-next-line react/prop-types
function Alert({ message }) {
    return (
        <div className="bg-red-100 text-red-700 font-medium border border-red-400 w-full md:max-w-md px-4 py-3 rounded relative mb-2 text-center">
            <span className="sm:inline block">
                {message}
            </span>
        </div>
    )
}

export default Alert