import React from 'react';
import emptySvg from '/icons/empty-svg.svg'

interface NothingFoundProps {
    message: string
}

const NothingFound: React.FC<NothingFoundProps> = ({ message }) => {
    return (
        <div className='space-y-4 py-4'>
            <img src={emptySvg} className='mx-auto' width={70} alt="empty svg" />
            <p className='capitalize text-center text-xl md:text-2xl font-medium'>{message}</p>
        </div>
    );
};

export default NothingFound;