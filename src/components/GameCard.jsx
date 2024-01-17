/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Image from './Image';

export const GameCard = ({ game }) => {
    const { name, slug, price } = game;
    return (
        <div>
            <Link to={`/games/${slug}`}>
                <picture className="w-full h-full object-cover">
                    {/* <img src={background_image} alt={name} className="w-full rounded-md aspect-video object-cover hover:scale-110 hover:contrast-125 transition duration-200 ease-in" loading="lazy" /> */}
                    <Image game={game} />
                </picture>
            </Link>
            <div className="flex justify-between mt-2">
                <p>{name}</p>
                <p className="text-xl font-medium">{price}€</p>
            </div>
        </div>
    )
}