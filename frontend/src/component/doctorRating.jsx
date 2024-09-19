import React, { useState } from 'react';

const RatingDoctor = ({totalRating}) => {
  // const [rating, setRating] = useState(0);

//   const handleClick = (value) => {
//     setRating(value);
//     setValue('rating',value)
//   };

  return (
    <div className="text-3xl w-[70%] my-1">
      {[1,2,3,4,5].map((value) => (
        
      <span
          key={value}
        //   onClick={() => handleClick(value)}
          style={{ cursor: 'pointer', color: value <= totalRating ? 'gold' : 'gray' }}
          
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default RatingDoctor;
