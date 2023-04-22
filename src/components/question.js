import React from 'react';

const Question = ({ question, options, onSelect }) => {
  return (
    <div className='w-full border-3 py-10 px-6'>
      <h2 className='text-center text-2xl font-medium  sm:text-3xl pb-6'>{question}</h2>
      <div className='flex flex-row space-x-4 justify-between'>
        {options.map((option, index) => (
          <button
            className='group relative
            px-4 py-4 
            border-3 border-cta-secondary-stroke
            shadow-sm flex-1 text-xl'
            key={index}
            onClick={() => onSelect(index)}>
            <span className='relative z-10'>{option}</span>
            <div className='z-0 absolute inset-0 line-pattern w-full h-full bg-secondary group-hover:bg-primary opacity-40 transition-all duration-200'></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
