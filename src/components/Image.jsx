/* eslint-disable react/prop-types */
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Blurhash } from "react-blurhash";

function Image({ game }) {

    return (
        <div className='hover:scale-110 hover:contrast-125 transition duration-200 ease-in'>
            <LazyLoadImage
                className='rounded-md'
                alt={game.name}
                src={game.background_image} // use normal <img> attributes as props
                effect='blur'
                placeholderSrc={<Blurhash
                    hash="LJKnVgPT~qI;MdPBQSXApdEME2rq"
                    resolutionX={32}
                    resolutionY={32}
                    punch={1}
                />}
            />
        </div>
    )
}

export default Image