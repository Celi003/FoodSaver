import { useState, useEffect } from 'react';

const images = [
  {
    url: 'src/assets/2148910391.jpg',
    // title: 'Food Saver : Le Don Alimentaire Local.',
    // desc: 'Connectez-vous pour sauver des repas et renforcer votre communauté en temps réel.'
  },
  {
    url: 'src/assets/pexels-thgusstavo-30684081.jpg',
    // title: 'Partagez vos surplus !',
    // desc: 'Donnez ce que vous pouvez, recevez ce dont vous avez besoin.'
  },
  {
    url: 'src/assets/volunteer-collecting-donation-box-from-another-volunteer.jpg',
    // title: 'Agissez pour la planète',
    // desc: 'Réduisez le gaspillage alimentaire et aidez votre quartier.'
  }
];

export default function SplashCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-2/3 overflow-hidden">
      <img
        src={images[index].url}
        // alt={images[index].title}
        className="w-full h-full object-cover rounded-b-xl transition-all duration-700"
        style={{ opacity: 1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent transition-all duration-700" />
      <div className="absolute bottom-0 left-0 right-0 p-6 transition-all duration-700">
        {/* <h1 className="text-3xl text-white mb-2">{images[index].title}</h1>
        <p className="text-base text-gray-300 mb-8">{images[index].desc}</p> */}
      </div>
      {/* Dots */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {images.map((_, i) => (
          <span
            key={i}
            className={`inline-block w-3 h-3 rounded-full ${i === index ? 'bg-orange-500' : 'bg-gray-700'} transition-all duration-300`}
          />
        ))}
      </div>
    </div>
  );
}
