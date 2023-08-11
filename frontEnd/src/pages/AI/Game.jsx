import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'antd';
import { PlayCircleOutlined } from '@ant-design/icons';
import anime from 'animejs/lib/anime.es.js';
import './game.css';
import confetti from 'canvas-confetti';

const Game = ({ setStarted, started }) => {
  const [isFalling, setIsFalling] = useState(false);
  const [score, setScore] = useState(0);
  const [showWinningText, setShowWinningText] = useState(true);

  // --- Start Egg Boy ---
  const [position, setPosition] = useState(0);
  const eggboyRef = useRef(null);

  useEffect(() => {
    const handleEggMove = (e) => {
      const screenWidth = window.innerWidth;
      const eggboyWidth = eggboyRef.current.clientWidth;

      if (e.key === 'ArrowLeft') {
        if (position - 200 >= 0 - eggboyWidth / 2) {
          setPosition((prevPosition) => prevPosition - 200);
        }
      } else if (e.key === 'ArrowRight') {
        if (position + 200 <= screenWidth - eggboyWidth) {
          setPosition((prevPosition) => prevPosition + 200);
        }
      }
    };

    window.addEventListener('keydown', handleEggMove);
    return () => {
      window.removeEventListener('keydown', handleEggMove);
    };
  }, [position]);
  const handleMouseMove = (e) => {
    const screenWidth = window.innerWidth;
    const eggboyWidth = eggboyRef.current.clientWidth;

    const newPosition = e.clientX - eggboyWidth / 2;

    if (newPosition >= 0 - eggboyWidth / 2 && newPosition <= screenWidth - eggboyWidth) {
      setPosition(newPosition);
    }
  };

  useEffect(() => {
    if (started) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [started]);
  useEffect(() => {
    anime({
      targets: eggboyRef.current,
      duration: 800,
      translateX: position,
    })
  }, [position]);

  // --- End Egg Boy ---

  const startFalling = () => {
    setIsFalling(true);
  };
  useEffect(() => {
    if (started) {
      startFalling();
    }
  }, [started]);

  useEffect(() => {
    if (isFalling) {
      resolveLater();
    }
  }, [isFalling, eggboyRef]);

  var global_food_count = 0;
  var food_count_per_wave = 15;

  const foodsRef = useRef(null);

  useEffect(() => {
    foodsRef.current = document.getElementById('foods');
    create();
  }, []);

  function create() {
    for (var i = 0; i < food_count_per_wave; i++) {
      var food_element = document.createElement('div');
      food_element.setAttribute('id', 'food_' + global_food_count);
      food_element.classList.add('falling-food');
      food_element.style.top = '-25vh';
      food_element.style.left = Math.floor(Math.random() * 95) + 'vw';
      foodsRef.current.appendChild(food_element);
      global_food_count++;
    }
    console.log('creating...');
  }

  async function animateFood(foodId) {
    const food_element_id = 'food_' + foodId;
    const food_element = document.getElementById(food_element_id);

    if (!food_element) {
      return;
    }

    await anime({
      targets: '#' + food_element_id,
      translateY: document.body.clientHeight,
      translateX: 0,
      rotate: 1000,
      easing: 'linear',
      duration: 2000
    }).finished;

    food_element.parentElement.removeChild(food_element);
  }

  async function resolveLater() {
    let foodId = 1;
    while (isFalling && foodId <= food_count_per_wave) {
      await animateFood(foodId);
      await delay(1000);
      foodId++;
    }
  }

  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const checkCollision = () => {
      const food_elements = foodsRef.current.querySelectorAll('.falling-food');
      const eggboy_element = eggboyRef.current;

      food_elements.forEach((food_element) => {
        const foodRect = food_element.getBoundingClientRect();
        const eggboyRect = eggboy_element.getBoundingClientRect();

        const horizontalTouch = foodRect.right >= eggboyRect.left && foodRect.left <= eggboyRect.right;
        const verticalTouch = foodRect.bottom >= eggboyRect.top && foodRect.top <= eggboyRect.bottom;

        if (horizontalTouch && verticalTouch) {
          setScore((prevScore) => prevScore + 1);
          food_element.style.display = 'none';
        }
      });
    };

    const intervalId = setInterval(checkCollision, 100); // Check for collisions every 100ms

    return () => clearInterval(intervalId);
  }, []);

  // --- Confetti :) ---
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  if (score === 15) {
    let duration = 1 * 1000;
    let animationEnd = Date.now() + duration;
    let defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    let interval = setInterval(function () {
      let timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      let particleCount = 20 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 500);

  }

  return (
    <div>
      {score === 15 && showWinningText ? (
        <div>
          <div className='text-center rounded-lg border border-4 border-rose-500/50 bg-[#FFFFFF]/50 text-[#000000] text-6xl w-1/4 absolute bottom-1/2 left-1/3 z-index-9999 fixed py-5 shadow-xl shadow-blue-500/50'
            onClick={() => {
              setShowWinningText(false);
              setScore(0)
            }
            }
          >
            MAMA MIA, ITSA WINNER!🎉
          </div>
        </div>
      ) : (
        null
      )
      }
      <div className='h-[400px]'>
        <div id='foods' ref={foodsRef}></div>
        <div className='absolute bottom-20 w-full'>
          <div className='w-1/12 flex items-end mt-20'>
            <img id='eggboy' ref={eggboyRef} src='/eggboy.png'/>
          </div>
          <div className='mt-10 flex flex-row justify-center'>
            <Button
              icon={<PlayCircleOutlined />}
              className='bg-[#FFFFFF]/50 ml-24 text-3xl h-fit w-fit flex items-center font-medium border-slate-400'
              onClick={() => setStarted(true)}
            >
              Start
            </Button>
            <div className='flex justify-end w-full'>
              <div className='border border-3 border-slate-400 flex items-center justify-end mr-24 text-3xl bg-[#FFFFFF]/50 rounded-md pl-3 pr-3'>
                {score}/15
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
