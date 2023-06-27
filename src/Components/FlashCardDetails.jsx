import React, { useEffect, useState } from 'react'
import Header from './Header'
import NavBar from './NavBar'
import { FaFacebook, FaInstagram, FaRegCopy, FaShare, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { BiCloudDownload, BiLoader } from 'react-icons/bi';
import { AiOutlinePrinter, AiOutlineShareAlt } from 'react-icons/ai';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GiConfirmed } from 'react-icons/gi';






const FlashCardDetails=()=> { 
  const { groupId } = useParams();  //useParams hook which allow us to access the parameter of current URL
  const cards = useSelector(state => state.createNew);
  const navigate = useNavigate();
  const [selectedTerm, setSelectedTerm] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto'; // Enable scrolling when modal is closed
  };

  // Function to get the current page URL
  const getCurrentPageUrl = () => {
    return window.location.href;
  };

  // Function to copy the URL to clipboard
  const copyUrlToClipboard = () => {
    const url = getCurrentPageUrl();
    navigator.clipboard.writeText(url);
    // Show a success message or perform any other action after copying the URL
    alert('URL copied to clipboard!');
  };

  //finding the flashard with the unique group ID
  const flashcard = cards.find(state => state.groupId == groupId);

  //This function has a logic to display the data relavant to that one particular group ID when clicking on that enterTerm
  const handleTermClick = (id, initialTerm = null) => {
    setSelectedTerm(id);
  };


  //The purpose of this code is to select an initial term when the component renders.
  useEffect(() => {
    if (!selectedTerm && Object.keys(flashcard.enterTerm).length > 0) {
      const termIds = Object.keys(flashcard.enterTerm);
      const initialTerm = termIds[0];
      handleTermClick(initialTerm, initialTerm);
    }
  }, [flashcard.enterTerm, handleTermClick, selectedTerm]);


  //we can navigate to back when clicking on the left arrow.
  const handlePreviousClick = () => {
    const termIds = Object.keys(flashcard.enterTerm);
    const currentIndex = termIds.findIndex((id) => id === selectedTerm);
    if (currentIndex > 0) {
      const previousTermId = termIds[currentIndex - 1];
      handleTermClick(previousTermId);
    }
  };
  
   //we can navigate to forward when clicking on the right arrow.
  const handleNextClick = () => {
    const termIds = Object.keys(flashcard.enterTerm);
    const currentIndex = termIds.findIndex((id) => id === selectedTerm);
    if (currentIndex < termIds.length - 1) {
      const nextTermId = termIds[currentIndex + 1];
      handleTermClick(nextTermId);
    }
  };
  

  if (!flashcard) {
    // Handle the case when the flashcard is not found
    return <div>Flashcard not found</div>;
  }
    

  const handleArrowClick = () => {
    navigate('/myflashcard');
  };

  

  return ( 
    <div>
        <Header/>
        <NavBar/> 
        <div className="flex lg:text-left lg:ml-12 pt-3">
            <div className='p-2'>
                <FaArrowLeft className="ml-12 text-2xl cursor-pointer" onClick={handleArrowClick} />
            </div>
            <div className="text-left ">
                <h3 className="font-bold text-2xl">{flashcard.groupName}</h3>
            </div>
        </div>
        <div className="text-left ml-[10%]">
            <p className="text-lg">{flashcard.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:ml-12 p-12 lg:h-[900px] ">
        <div className="bg-white p-4 lg:h-[90%] lg:w-[70%] sm:col-span-1">
            <h3 className="font-bold text-left p-1">Flashcards</h3><hr/>
            <div>
            <div className="flex flex-col gap-2 pt-2">
              {/* the map function to iterate over the keys of the flashcard.enterTerm object. It returns an array of JSX elements based on the logic inside the map callback function. */}
                {Object.keys(flashcard.enterTerm).map((id,index) => (
                    <div
                    key={id}
                    onClick={() => handleTermClick(id)}
                    className={`cursor-pointer bg-white px-4 py-2 text-left rounded-md cursor-pointer ${
                        (selectedTerm === id || (index === 0 && !selectedTerm)) ? 'text-red-500 font-bold' : ''
                      }`}
                    >
                    {(selectedTerm === id || (index === 0 && !selectedTerm))&& <GiConfirmed className="inline-block mr-2" size="1.5rem"/>}    
                    {flashcard.enterTerm[id]}
                    </div>
                ))}
                </div>
            </div>      
        </div>

        <div className=" flex bg-white p-10 sm:col-span-2 relative">
              {/* Displays the Image with the enteredDefinition */}
                 {selectedTerm && (
                  <div className="flex flex-row">
                    <div className="flex flex-grow-0 w-1/2">
                      <div className="flex items-center justify-center">
                        <img
                          src={flashcard.selectImage[selectedTerm]}
                          alt="Selected"
                          className="max-w-full max-h-full"
                        />
                      </div>
                    </div>
                    <div className="flex flex-grow-0 w-1/2 lg:mt-[15%] p-4">
                      <h3>{flashcard.enterDefinition[selectedTerm]}</h3>
                    </div>
                  </div>
                )}

                {/* Unless you don't select any Selected Term it displays the loading Icon. */}
                {!selectedTerm && (
                  <div className="flex flex-row">
                    <div className="flex flex-grow-0 w-1/2">
                      <div className="flex items-center justify-center">
                        <img
                          src="placeholder.jpg"
                          alt="Placeholder"
                          className="max-w-full max-h-full"
                        />
                      </div>
                    </div>
                    <div className="text-4xl md:text-6xl lg:text-8xl">
                      <h1><BiLoader size="20rem"/></h1>
                    </div>
                  </div>
                )}
                {/* Displaying the arrow buttons to navigate beetween the flashcards */}
               <div className="p-1 absolute bottom-0 left-0 right-0 flex justify-center items-center lg:w-[20%] lg:ml-[40%]">
                <button className="flex items-center justify-center px-4 py-2 rounded text-white bg-white w-full transition-transform hover:scale-105" style={{backgroundColor:'#ff1919'}} onClick={handlePreviousClick}>
                <FaArrowLeft className="mr-2" />
                </button>
                <button className="flex items-center justify-center px-4 py-2 rounded text-white bg-white w-full transition-transform hover:scale-105" style={{backgroundColor:'#ff1919'}} onClick={handleNextClick}>
                <FaArrowRight className="mr-2" />
                </button>
            </div>
        </div>     
                  {/* Share Button */}
            <div className="p-3">
                <div className="mb-4">
                        <button className="flex items-center justify-center px-4 py-2 rounded text-black bg-white w-full transition-transform hover:scale-105" onClick={openModal}>
                        <FaShare size={22} className="mr-2" />
                        <span>Share</span>
                    </button>

                      {/* Once click on the share button you will be able to see the model, copy the URL. */}
                    {showModal && (
                  <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3 ">

                      <h2 className="text-xl font-bold mb-4">Share on Social Media</h2>
                      <div className="flex flex-col sm:flex-row items-center mb-4">
                        <input
                          type="text"
                          value={getCurrentPageUrl()}
                          className="flex-grow border border-gray-400 rounded px-2 py-1 mb-2 sm:mb-0 sm:mr-2"
                          readOnly
                        />
                        <button
                          className="px-4 py-2 rounded text-white bg-blue-500 transition-transform hover:scale-105"
                          onClick={copyUrlToClipboard}
                        >
                        <FaRegCopy/>
                        </button>
                      </div>
                      <div className="flex justify-center">
                        <div className="flex items-center mx-2">
                          <FaFacebook size={24} className="text-blue-500 transition-transform hover:scale-110" />
                        </div>
                        <div className="flex items-center mx-2">
                          <FaInstagram size={24} className="text-pink-500 transition-transform hover:scale-110" />
                        </div>
                        <div className="flex items-center mx-2">
                          <FaWhatsapp size={24} className="text-green-500 transition-transform hover:scale-110" />
                        </div>
                        <div className="flex items-center mx-2">
                          <FaTwitter size={24} className="text-blue-500 transition-transform hover:scale-110" />
                        </div>
                        <div className="flex items-center mx-2">
                          <AiOutlineShareAlt size={24} className="text-black-500 transition-transform hover:scale-110" />
                        </div>
                        <div className="flex items-center mx-2">
                        <button className="absolute w-[12%] h-[12%]]" onClick={closeModal}>
                          <span className="text-black-500 text-1xl">Cancel</span>
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                </div>
                <div className="mb-4">
                <button className="flex items-center justify-center px-4 py-2 rounded text-black bg-white w-full transition-transform hover:scale-105" >
                    <BiCloudDownload size={24} className="mr-2"/>
                <span>Download</span>  
                </button>
                </div>
                <div>
                <button className="flex items-center justify-center px-4 py-2 rounded text-black bg-white w-full transition-transform hover:scale-105">
                    <AiOutlinePrinter size={24} className="mr-2"/>
                    <span>Print</span> 
                </button>
                </div>
            </div>
            </div>
</div>
  )
}

export default FlashCardDetails