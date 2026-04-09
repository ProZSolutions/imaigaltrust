"use client"
import React, { useRef, useEffect } from 'react';
import { useCountUp } from 'react-countup';

interface StatCardProps {
  count: string;
  label: string;
  accentColor?: 'green' | 'red' | 'blue' | 'yellow' | 'purple';
}

const StatCard: React.FC<StatCardProps> = ({ count, label, accentColor = 'green' }) => {
  const countRef = useRef<HTMLElement | null>(null);

  const { start: startCount, reset } = useCountUp({
    ref: countRef as React.RefObject<HTMLElement>,
    end: parseFloat(count),
    delay: 2,
    startOnMount: false,
  });

  useEffect(() => {
    const currentRef = countRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reset();
          startCount();
        }
      },
      { threshold: 0.6 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [reset, startCount]);

  const getBarColor = (side: 'left' | 'right') => {
    const colorMap = {
      red: 'bg-red-600',
      blue: 'bg-blue-600',
      yellow: 'bg-yellow-500',
      purple: 'bg-purple-600',
      green: 'bg-green-600',
    };
    return `absolute  h-full w-1 ${colorMap[accentColor]} rounded-${side}-[20px]`;
  };

  return (
    <div className="relative w-full max-w-xs mx-auto rounded-tr-[40px] rounded-bl-[40px] shadow-md bg-white px-6 min-w-[280px] md:min-w-[250px] py-16 text-center poppins-font">
      <div className={`${getBarColor('left')} max-h-28 top-0 left-0`} />
      <div className={`${getBarColor('right')} max-h-28 bottom-0 right-0`} />

      <p className="text-green-700 font-bold mb-3 text-2xl">
        <span ref={countRef}></span>+
      </p>
      <p className="">{label}</p>
    </div>
  );
};

export default StatCard;
