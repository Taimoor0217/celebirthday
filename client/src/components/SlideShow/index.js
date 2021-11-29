import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import './styles.css'
import 'react-alice-carousel/lib/alice-carousel.css';


const handleDragStart = (e) => e.preventDefault();

const items = [
  <img src="https://picsum.photos/id/0/5616/3744" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://picsum.photos/id/10/2500/1667" onDragStart={handleDragStart} role="presentation" />,
  <img src="https://picsum.photos/id/1000/5626/3635" onDragStart={handleDragStart} role="presentation" />,
];

const SlideShow = () => {
  return (
    <div>
    <AliceCarousel mouseTracking items={items} />
    </div>
  );
}

export default SlideShow;