import React, { useRef, useEffect } from 'react';

function Logo() {
  const eyeLeft = useRef();
  const eyeRight = useRef();
  const pupilLeft = useRef();
  const pupilRight = useRef();

  const eye = () => {
    const pupilLeftScope = pupilLeft.current.getBoundingClientRect();
    const pupilRightScope = pupilRight.current.getBoundingClientRect();

    return (mouseX, mouseY) => {
      let angleLeft = Math.atan2(
        mouseY - (pupilLeftScope.y + pupilLeftScope.height * 0.5),
        mouseX - (pupilLeftScope.x + pupilLeftScope.width * 0.5)
      );
      pupilLeft.current.style.transform = `rotate(${
        (180 * angleLeft) / Math.PI - 90
      }deg)`;

      let angleRight = Math.atan2(
        mouseY - (pupilRightScope.y + pupilRightScope.height * 0.5),
        mouseX - (pupilRightScope.x + pupilRightScope.width * 0.5)
      );
      pupilRight.current.style.transform = `rotate(${
        (180 * angleRight) / Math.PI - 90
      }deg)`;
    };
  };

  const eyeEventHandler = (e) => {
    eye()(e.pageX, e.pageY);
  };

  useEffect(() => {
    window.addEventListener('mousemove', eyeEventHandler);
    return () => window.removeEventListener('mousemove', eyeEventHandler);
  });

  return (
    <>
      <div className="logo">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="스크루지" />
        <div className="eye">
          <div className="eye-left" ref={eyeLeft}>
            <img
              className="eye"
              src={process.env.PUBLIC_URL + '/eye.png'}
              alt="커서 이펙트1"
            />
            <div className="pupil" ref={pupilLeft}></div>
          </div>
          <div className="eye-right" ref={eyeRight}>
            <img
              className="eye"
              src={process.env.PUBLIC_URL + '/eye.png'}
              alt="커서 이펙트2"
            />
            <div className="pupil" ref={pupilRight}></div>
          </div>
        </div>
      </div>
      <div className="logo-small">
        <img
          src={process.env.PUBLIC_URL + './logoXS.png'}
          alt="스크루지 모바일"
        />
      </div>
    </>
  );
}

export default Logo;
