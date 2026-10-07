import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const isTouchRef = useRef(false);

  useEffect(() => {
    isTouchRef.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchRef.current) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('button') ||
          target.closest('a') ||
          target.closest('input') ||
          target.closest('select') ||
          target.closest('[role="button"]') ||
          target.closest('.cursor-pointer'))
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div
      className={`hidden lg:block pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Outer follower ring */}
      <div
        className="fixed rounded-full pointer-events-none transition-[width,height,transform,background-color] duration-150 ease-out border border-[#c5a059]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovered ? '44px' : '26px',
          height: isHovered ? '44px' : '26px',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : 1})`,
          backgroundColor: isHovered ? 'rgba(197, 160, 89, 0.12)' : 'transparent',
        }}
      />
      {/* Center pinpoint */}
      <div
        className="fixed rounded-full pointer-events-none bg-[#c5a059]"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: '4px',
          height: '4px',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
