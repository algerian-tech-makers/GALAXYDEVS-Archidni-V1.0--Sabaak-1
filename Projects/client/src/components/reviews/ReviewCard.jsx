import React from 'react';
import teacher from '../../assets/images/teacher.png';
import downQuote from '../../assets/images/downQuote.svg';
import upperQuote from '../../assets/images/upperQuote.svg';
import { AiFillStar } from 'react-icons/ai';
const ReviewCard = ({ reviewer }) => {
  return (
    <div className='review-card'>
      <div className='review-left-side'>
        <img src={teacher} alt='teacher' />
        <h1 style={{ fontSize: 16 }}>{reviewer.name}</h1>
        <p>Mr. {reviewer.role}</p>
      </div>
      <div className='review-right-side'>
        <img src={upperQuote} alt='' />
        <p>{reviewer.review}</p>
        <img src={downQuote} alt='' className='last-quote' />
        <div>
          <span>{reviewer.rating}</span>
          <AiFillStar className='star' />
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
