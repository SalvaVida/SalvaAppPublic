import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './_index.scss'

function AnimatedForm({formType, formPlaceholder}) {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const titleProps = useSpring({
    top: isFocused || inputValue ? '0px' : '10px',
    fontSize: isFocused || inputValue ? '14px' : '16px',
  });

  return (
    <div className="animated-form work-sans">
      <div className="form-group">
        <animated.label style={titleProps} className={isFocused ? 'focused' : ''}>
          {formPlaceholder}
        </animated.label>
        <input
          type={formType}
          className="form-control"
          value={inputValue}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>
    </div>
  );
}

export default AnimatedForm;
