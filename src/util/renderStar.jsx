import React from 'react';
import '../components/root.scss';
import starEmpty from '../assets/starEmpty.svg';
import starFull from '../assets/starFull.svg';

export default function renderStar(Star) {
    switch (Star) {
        case 1 :
            return <div><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starEmpty} alt='' /><img className='ratingStar' src={starEmpty} alt='' /><img className='ratingStar' src={starEmpty} alt='' /><img className='ratingStar' src={starEmpty} alt='' /></div>;
        case  2 :
            return <div><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starEmpty} alt='' /><img className='ratingStar' src={starEmpty} alt='' /><img className='ratingStar' src={starEmpty} alt='' /></div>;
        case 3:
            return <div><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starEmpty} alt='' /><img className='ratingStar' src={starEmpty} alt='' /></div>;
            case 4:
                return <div><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starEmpty} alt='' /></div>;
                case 5:
                    return <div><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starFull} alt='' /><img className='ratingStar' src={starFull} alt='' /></div>;

        default: return <h4 className='unavailable' >Rating not available</h4>;
    }
}