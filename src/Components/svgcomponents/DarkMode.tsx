import React from "react";

const DarkMode: React.FC<ISvgProps> = ({ width, height }) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height={height}
        viewBox="0 0 24 24"
        width={width}
        fill="#2D3748"
      >
        <g>
          <rect fill="none" height="24" width="24" />
        </g>
        <g>
          <path d="M9.27,4.49c-1.63,7.54,3.75,12.41,7.66,13.8C15.54,19.38,13.81,20,12,20c-4.41,0-8-3.59-8-8C4,8.55,6.2,5.6,9.27,4.49 M11.99,2.01C6.4,2.01,2,6.54,2,12c0,5.52,4.48,10,10,10c3.71,0,6.93-2.02,8.66-5.02c-7.51-0.25-12.09-8.43-8.32-14.97 C12.22,2.01,12.11,2.01,11.99,2.01L11.99,2.01z" />
        </g>
      </svg>
    </>
  );
};

export default DarkMode;
