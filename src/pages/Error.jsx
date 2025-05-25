import React from 'react';

const Error = () => {
  return (
    <div className="error">
      <div className="circle-container">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className='text-svg'>
          <defs>
            <path
              id="circle"
              d="
                M 50,50
                m 40,0
                a 40,40 0 1,1 -80,0
                a 40,40 0 1,1 80,0
              "
            />
          </defs>
          <text
            fontSize="6"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            <textPath
              href="#circle"
              startOffset="50%"
              side="right"
              className=''
            >
              صفحه مورد نظر یافت نشد .
              صفحه مورد نظر یافت نشد .
              صفحه مورد نظر یافت نشد .
              صفحه مورد نظر یافت نشد .
            </textPath>
          </text>
        </svg>
        <h2 className='crimson-color'>404</h2>
      </div>
    </div>
  );
};

export default Error;
