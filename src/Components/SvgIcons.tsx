import React from "react";

interface ISvgProps {
  width?: string;
  height?: string;
  color?: string;
}

export const AscArrow: React.FC<ISvgProps> = ({ width, height }) => {
  return (
    
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#CBD5E0"
      >
        <g>
          <rect fill="none" height="24" width="24" />
          <path d="M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8S16.41,20,12,20 M12,22c5.52,0,10-4.48,10-10c0-5.52-4.48-10-10-10 C6.48,2,2,6.48,2,12C2,17.52,6.48,22,12,22L12,22z M11,12l0,4h2l0-4h3l-4-4l-4,4H11z" />
        </g>
      </svg>
  );
};

export const BrokenPortrait: React.FC<ISvgProps> = ({
  width,
  height,
  color,
}) => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        viewBox="0 0 24 24"
        width={width}
        fill={color}
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z" />
      </svg>
  );
};

export const BrokenPoster: React.FC<ISvgProps> = ({ width, height, color }) => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        viewBox="0 0 24 24"
        width={width}
        fill={color}
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5v-4.58l.99.99 4-4 4 4 4-3.99L19 12.43V19zm0-9.41l-1.01-1.01-4 4.01-4-4-4 4-.99-1V5h14v4.59z" />
      </svg>
  );
};

export const Collections: React.FC<ISvgProps> = ({
  width,
  height,
  color,
}) => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill={color}
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M20 4v12H8V4h12m0-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 9.67l1.69 2.26 2.48-3.1L19 15H9zM2 6v14c0 1.1.9 2 2 2h14v-2H4V6H2z" />
      </svg>
  );
};

export const DarkMode: React.FC<ISvgProps> = ({ width, height }) => {
  return (
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
  );
};

export const DayLightMode: React.FC<ISvgProps> = ({ width, height }) => {
  return (
    
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        viewBox="0 0 24 24"
        width={width}
        fill="#FFFFFF"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M20 8.69V4h-4.69L12 .69 8.69 4H4v4.69L.69 12 4 15.31V20h4.69L12 23.31 15.31 20H20v-4.69L23.31 12 20 8.69zm-2 5.79V18h-3.52L12 20.48 9.52 18H6v-3.52L3.52 12 6 9.52V6h3.52L12 3.52 14.48 6H18v3.52L20.48 12 18 14.48zM12 6.5c-3.03 0-5.5 2.47-5.5 5.5s2.47 5.5 5.5 5.5 5.5-2.47 5.5-5.5-2.47-5.5-5.5-5.5zm0 9c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
      </svg>
  );
};

export const DiscoverIcon: React.FC<ISvgProps> = ({ width, height, color }) => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill={color}
      >
        <g>
          <path d="M0,0h24 M24,24H0" fill="none" />
          <path d="M7,6h10l-5.01,6.3L7,6z M4.25,5.61C6.27,8.2,10,13,10,13v6c0,0.55,0.45,1,1,1h2c0.55,0,1-0.45,1-1v-6 c0,0,3.72-4.8,5.74-7.39C20.25,4.95,19.78,4,18.95,4H5.04C4.21,4,3.74,4.95,4.25,5.61z" />
          <path d="M0,0h24v24H0V0z" fill="none" />
        </g>
      </svg>
  );
};

export const DscArrow: React.FC<ISvgProps> = ({ width, height }) => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill="#CBD5E0"
      >
        <g>
          <rect fill="none" height="24" width="24" />
          <path d="M12,4c4.41,0,8,3.59,8,8s-3.59,8-8,8s-8-3.59-8-8S7.59,4,12,4 M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10 c5.52,0,10-4.48,10-10C22,6.48,17.52,2,12,2L12,2z M13,12l0-4h-2l0,4H8l4,4l4-4H13z" />
        </g>
      </svg>
  );
};

export const EmptyStar: React.FC<ISvgProps> = ({ width, height }) => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 0 24 24"
        width="20px"
        fill="#0F8DF7"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
      </svg>
  );
};

export const HalfStar: React.FC<ISvgProps> = () => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="20px"
        viewBox="0 0 24 24"
        width="20px"
        fill="#0F8DF7"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4V6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z" />
      </svg>
  );
};

export const MovieIcon: React.FC<ISvgProps> = ({ width, height, color }) => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill={color}
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M4 6.47L5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4z" />
      </svg>
  );
};

export const PersonIcon: React.FC<ISvgProps> = ({ width, height, color }) => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill={color}
      >
        <g>
          <rect fill="none" height="24" width="24" />
          <rect fill="none" height="24" width="24" />
        </g>
        <g>
          <g>
            <circle cx="10" cy="8" r="4" />
            <path d="M10.35,14.01C7.62,13.91,2,15.27,2,18v1c0,0.55,0.45,1,1,1h8.54C9.07,17.24,10.31,14.11,10.35,14.01z" />
            <path d="M19.43,18.02c0.47-0.8,0.7-1.77,0.48-2.82c-0.34-1.64-1.72-2.95-3.38-3.16c-2.63-0.34-4.85,1.87-4.5,4.5 c0.22,1.66,1.52,3.04,3.16,3.38c1.05,0.22,2.02-0.01,2.82-0.48l1.86,1.86c0.39,0.39,1.02,0.39,1.41,0l0,0 c0.39-0.39,0.39-1.02,0-1.41L19.43,18.02z M16,18c-1.1,0-2-0.9-2-2c0-1.1,0.9-2,2-2s2,0.9,2,2C18,17.1,17.1,18,16,18z" />
          </g>
        </g>
      </svg>
  );
};

export const SeriesIcon: React.FC<ISvgProps> = ({ width, height, color }) => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 0 24 24"
        width="24px"
        fill={color}
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M4 6h16v2H4zm2-4h12v2H6zm14 8H4c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2zm0 10H4v-8h16v8zm-10-7.27v6.53L16 16z" />
      </svg>
  );
};

export const StarIcon: React.FC<ISvgProps> = () => {
  return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        enable-background="new 0 0 24 24"
        height="20px"
        viewBox="0 0 24 24"
        width="20px"
        fill="#0F8DF7"
      >
        <g>
          <path d="M0,0h24v24H0V0z" fill="none" />
          <path d="M0,0h24v24H0V0z" fill="none" />
        </g>
        <g>
          <path d="M12,17.27L18.18,21l-1.64-7.03L22,9.24l-7.19-0.61L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27z" />
        </g>
      </svg>
  );
};

export const TuneIcon: React.FC<ISvgProps> = ({
  width = "30px",
  height = "30px",
  color = "#4b5563",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      viewBox="0 0 24 24"
      width={width}
      fill={color}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />
    </svg>
  )
}