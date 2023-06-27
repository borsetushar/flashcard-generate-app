import React, { useState } from 'react'
import Header from './Header'
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import { ImSad2 } from 'react-icons/im';
import { useSelector } from 'react-redux';

function MyFlashCard() {
    const createNewData = useSelector(state=>state.createNew)
    const [showAll, setShowAll] = useState(false);    

  const handleSeeAll = () => {
    setShowAll(true);
  };

  const displayedFlashcards = showAll ? createNewData : createNewData.slice(0, 6);

  return (
    <div>
    <Header />
    <NavBar />
    {/* Dynamically adding flashcards */}
    <div className="container mx-auto p-10 mt-5">
  {createNewData.length === 0 ? (
    <div className="flex justify-center">
      <p className="flex items-center text-lg">
        No flashcards created.<ImSad2 className="ml-1" />
        <Link to="/" className="flex items-center ml-2 text-lg text-blue-500">
          Create Flashcard
        </Link>
      </p>
    </div>
  ) : (
    <div className="flex flex-wrap -mx-4">
      {displayedFlashcards.map((card, index) => (
        <div
          key={index}
          className="w-full sm:w-1/2 md:w-1/2 lg:w-2/6 xl:w-3/7 px-2 sm:px-4 mb-11"
        >
          <div
            className="relative bg-white-200 w-full rounded h-60 md:h-60 p-8"
            style={{ backgroundColor: 'white' }}
          >
            <div>
              <img
                src={card.uploadedImage}
                alt="perimg2"
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-16 h-16 md:w-20 md:h-20 rounded-full"
              />
            </div>
            <div className="relative mt-2">
              <h4 className="text-xl font-bold mb-2">{card.groupName}</h4>
              <p className="text-gray-600 mb-4">{card.description}</p>
              <h4 className="text-lg font-semibold">{card.numberOfInputSets} cards</h4>
              <button className="border-2 border-red-500 rounded py-2 px-4 w-[100%] hover:bg-red-500 hover:text-white transition-colors duration-300">
              <Link to={`/flashcarddetails/${card.groupId}`} >
                View Cards
              </Link>
            </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )}
  {/* See All button */}
  {!showAll && createNewData.length > 6 && (
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={handleSeeAll}
            >
              See All
            </button>
          </div>
        )}
</div>

  </div>
  );
}

export default MyFlashCard