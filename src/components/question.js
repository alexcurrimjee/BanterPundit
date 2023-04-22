import React from 'react';

const Question = ({ question, options, onSelect }) => {
  return (
    <div className='w-full border-3 py-10 px-6'>
      <h2 className='text-center text-2xl font-medium  sm:text-3xl pb-6'>{question}</h2>
      <div className='flex flex-row space-x-4 justify-between'>
        {options.map((option, index) => (
          <button
            className='px-4 py-4 
            border-3 border-cta-secondary-stroke
            text-cta-secondary-text
            shadow-sm flex-1 text-xl 
            bg-cta-secondary-background-default hover:bg-cta-secondary-background-hover'
            key={index}
            onClick={() => onSelect(index)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
