import React from 'react';

import './_index.scss'

function Button({text, isActive, style, className, activeText, onClick, activeIcon}) {
  const color = isActive ? "btn-primary" : "btn-light text-muted";

  return (
    <button
      type="button"
      className={color + " " + className + " btn btn-lg ibm-plex d-flex flex-wrap justify-content-between align-content-center"}
      // style={style}
      onClick={onClick}
    >
      <span>
        {text}
      </span>
      <span>
        {isActive && activeText ? activeText : ""}
        {isActive && activeIcon ? <img src={activeIcon} className="button-icon" alt="button action" /> : ""}
      </span>
    </button>
  );
}

export default Button;