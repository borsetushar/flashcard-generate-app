import React, { useRef, useState } from 'react';
import Header from './Header';
import NavBar from './NavBar';
import { AiFillDelete,AiFillEdit } from 'react-icons/ai';
import {  useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CREATE_NEW } from '../State/Actions/Constants/createNew';
import { BiUpload } from 'react-icons/bi';




const Home = () => {
  const [inputSets, setInputSets] = useState([{ id:1 }]);
  const inputRefs = useRef([]);
  const [firstSetClicked, setFirstSetClicked] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [description,setDescription] = useState("");
  const [enterTerm,setEnterTerm] = useState("");
  const [enterDefinition,setEnterDefinition] = useState("");
  const [selectImage,setSelectImage] = useState({});

  const inputRef = useRef(inputSets.map(() => null));

  const dispatch = useDispatch();
  const navigate = useNavigate();


  // logic to be focuss on input set with that particular Id when we click on the edit Icon.
  const handleClick = (setId) => {
    if (setId === 1) {
      setFirstSetClicked(true);
    } else {
      setTimeout(() => {
        const inputRef = inputRefs.current[setId]?.current;
        if (inputRef) {
          inputRef.focus();
        }
      }, 0);
    }
  };
  


//Intial values of all the input fields will be blank.
  const initialValues = {
    groupName: '',
    description: '',
    term:'',
    definition:'',
  };
  


  //Validation for the first two input fields.
  const getValidationSchema = () => {
    const validationSchemaObj = {
      groupName: Yup.string().required('Group Name is required'),
      description: Yup.string().required('Description is required'),
    };
  


  //Validation for set of input sets we dynamically adds clicking on the add more button.
    inputSets.forEach((set) => {
      validationSchemaObj[`term-${set.id}`] = Yup.string().required('Term is required');
      validationSchemaObj[`definition-${set.id}`] = Yup.string().required('Definition is required');
    });
  
    return Yup.object().shape(validationSchemaObj);
  };
  


  //handle Submit function which gets called only when you fill all the required 
  //fields and sends the data as a payload
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Trigger form validation
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        const groupId = Date.now(); // Generate a unique group id
        const data = {
          groupId,
          groupName,
          uploadedImage,
          description,
          enterTerm,
          enterDefinition,
          selectImage,
          inputSets,
        };
  
        dispatch({ type: CREATE_NEW, payload: data });
        navigate("/myflashcard");
      } else {
        // Handle form validation errors or display an error message
        alert("Please fill in all required fields.");
      }
    });
  };
  
  
  
  //using formin liabrary for the form validation
  const formik = useFormik({
    initialValues,
    validationSchema: getValidationSchema(),
    onSubmit: handleSubmit,
  });

  
  
  //handling addSet when we click on the add more button.
  const handleAddSet = () => {
    setInputSets((prevInputSets) => {
      const newSet = { id: prevInputSets.length + 1 };
      inputRefs.current[newSet.id] = React.createRef();
      return [...prevInputSets, newSet];
    });
  };

  //removing an Input set when click on the delete Icon.
  const handleRemoveSet = (id) => {
    setInputSets((prevInputSets) =>
      prevInputSets.filter((set) => set.id !== id)
    );
  };
 

  return (
    <div>
      <Header />
      <NavBar />
      <div className="flex flex-col bg-white md:flex-col lg:flex-col space-y-4 md:space-y-4 mx-auto p-3 rounded-md " style={{ backgroundColor: '#E9DCC9', width: '85%' }}>
       <div className="flex flex-col bg-white md:flex-col lg:flex-col space-y-4 md:space-y-0 mx-auto p-6 rounded-md" style={{ backgroundColor: 'white', width: '100%' }}>
        <div className="flex flex-col md:flex-row lg:ml-[-28%]">
          <div className="flex flex-col w-full md:w-1/2 mx-auto">
            <label htmlFor="groupName" className="text-sm font-medium text-left">Create Group</label>
            <div className="flex flex-col md:flex-row md:space-x-2">
            <input 
                type="text" 
                id="groupName" 
                name="groupName"
                className="border border-gray-300 rounded-md px-3 py-2 mb-2 md:mb-0 w-full lg:h-[40px] sm:w-auto sm:h-auto lg:w-[70%]" 
                placeholder="Group Name" 
                value={formik.values.groupName}
                onChange={(e) => {
                  setGroupName(e.target.value);
                  formik.handleChange(e);
                }}
                onBlur={formik.handleBlur}
              />
              {formik.touched.groupName && formik.errors.groupName && (
                <div className="text-red-500">{formik.errors.groupName}</div>// Display error message if groupName field is touched and has an error
              )}

            <input 
                type="file" 
                id="uploadImage" 
                name='uploadImage'
                className="hidden" 
                ref={inputRefs}
                onClick={(event) => {
                // Reset the value of the file input to allow selecting the same file again
                  event.target.value = null;
                }}
                onInput={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    //Create a temporary URL for the selected file
                    const imageUrl = URL.createObjectURL(file);
                    setUploadedImage(imageUrl); // Update the uploadedImage state with the temporary URL
                    formik.setFieldValue('uploadImage', imageUrl);// Set the formik field value with the temporary URL
                  }
                }}
              />
             <label htmlFor="uploadImage" className="border border-gray-300 rounded-md px-3 py-2 lg:h-[40px] lg:w-[60%] bg-white cursor-pointer hover:bg-red-500 hover:text-white flex items-center justify-center">
              <BiUpload className="mr-2" />
              <span>Upload Image</span>
            </label>


              {uploadedImage && (
                <div className="flex justify-center w-full">
                  <div className="w-full lg:w-[70%]">
                    <img src={uploadedImage} alt="Uploaded Image" className="border border-gray-300 rounded-md px-4 py-3 w-full h-auto lg:w-full lg:h-auto"/>
                  </div>
                </div>
              )}


            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2 mx-auto pt-10 lg:ml-[4%]" >
            <label htmlFor="description" className="text-sm font-medium text-left">Add Description</label>
            <textarea 
            type="text" 
            id="description" 
            name='description'
            className="border border-gray-300 rounded-md px-3 py-2" 
            placeholder="Description" 
            value={formik.values.description}
            onChange={(e) => {
              setDescription(e.target.value);
              formik.handleChange(e);
            }}
            onBlur={formik.handleBlur}
            />
             {formik.touched.description && formik.errors.description && (
                <div className="text-red-500">{formik.errors.description}</div>// Display error message if description field is touched and has an error
              )} 
          </div>
        </div>


        <div className="bg-white rounded-lg shadow p-4" style={{backgroundColor:'white'}} >
        {/* Adding Input Sets Dynamically by clicking on the add more button */}
      {inputSets.map((set) => (
      <div key={set.id} className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-9 h-9 bg-red-500 rounded-full flex items-center justify-center text-white       font-semibold text-lg lg:w-[6%] md:w-[11%]" >
             {set.id}
          </div>

          <div className="flex flex-col w-full md:w-1/2 mx-auto p-2">
            <label htmlFor={`term-${set.id}`} className="text-sm font-medium text-left">Enter Term:</label>
            <input
              type="text"
              id={`term-${set.id}`}
              name={`term-${set.id}`}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              placeholder="Enter Term"
              ref={inputRefs.current[set.id]}
              value={formik.values.enterTerm}//Binds the value of the input element to the enterTerm value from the formik values.
              onChange={(e) => { // This function captures the value user will put,updates the enterTerm state with the new value for the corresponding set.id, and sets the formik field value for the corresponding set.id. 
                const { value } = e.target;
                formik.handleChange(e);
                setEnterTerm((prevEnterTerms) => ({
                  ...prevEnterTerms,
                  [set.id]: value,
                }));
                formik.setFieldValue(`enterTerm-${set.id}`, value);
              }}
              
            onBlur={formik.handleBlur}
            />
              {formik.touched[`term-${set.id}`] && formik.errors[`term-${set.id}`] && (
                <div className="text-red-500">{formik.errors[`term-${set.id}`]}</div>//displays error message if touched.
              )}
          </div>

          <div className="flex flex-col w-full md:w-1/2 mx-auto p-2">
            <label htmlFor={`definition-${set.id}`} className="text-sm font-medium text-left">Enter Definition:</label>
            <input 
            type="text" 
            id={`definition-${set.id}`} 
            name={`definition-${set.id}`}
            className="border border-gray-300 rounded-md px-3 py-2 w-full" 
            placeholder="Enter Definition"
            value={formik.values.enterDefinition}
            onChange={(e) => {
              const { value } = e.target;
              formik.handleChange(e);
              setEnterDefinition((prevEnterTerms) => ({
                ...prevEnterTerms,
                [set.id]: value,
              }));
              formik.setFieldValue(`enterDefinition-${set.id}`, value);
            }}
          onBlur={formik.handleBlur}
            />
              {formik.touched[`definition-${set.id}`] && formik.errors[`definition-${set.id}`] && (
                <div className="text-red-500">{formik.errors[`definition-${set.id}`]}</div>
              )}
          </div>

          <div className="flex flex-col w-full md:w-1/2 mx-auto p-7">
            <input
              type="file"
              id={`image-${set.id}`}
              name={`image-${set.id}`}
              ref={(el) => (inputRef.current[set.id - 1] = el)}
              onClick={(event) => {
                // Reset the value of the file input to allow selecting the same file again
                event.target.value = null;
              }}
              onInput={(event) => { // Handles the onInput event of the input element, which is triggered when a file is selected. It reads the selected file using the FileReader API and converts it to a data URL. It then sets the selectImage state with the image URL for the corresponding set.id and sets the formik field value to store the file object.
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    const imageUrl = reader.result;
                    setSelectImage((prevImages) => ({
                      ...prevImages,
                      [set.id]: imageUrl,
                    }));
                    formik.setFieldValue(`selectImage-${set.id}`, file); // Store the file object
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
          
          {/* By Clicking on the select Image you can chose the Image you want */}
          <label htmlFor={`image-${set.id}`} className="border border-gray-300 rounded-md px-3 py-2 lg:mr-[29%] cursor-pointer hover:bg-red-500 hover:text-white">
            Select Image
          </label>
            {selectImage[set.id] && (
              <img src={selectImage[set.id]}
               alt="Selected" 
               className="mt-4"
               style={{ maxWidth: '150px', maxHeight: '150px' }}
               />
            )}
          </div>


          
              {/* Delete and Edit Icon with each Input set accespt the first one which is by default present on UI */}
          {set.id !== 1 && (
            <div className="flex-grow">
              <button type="button" 
                className="px-3 py-2 lg:ml-[-79%]" 
                onClick={() => handleRemoveSet(set.id)}> 
                <AiFillDelete size={24}/>
              </button>
              <button type="button"
                className="px-5 py-3 lg:pt-0"
                onClick={() => handleClick(set.id)}
              >
               <AiFillEdit size={24} />
              </button>
            </div>             
          )}
     </div>
      ))}
      
      {/* By Clicking on the Add more Button you can add as many input sets as you want. */}
      <div className="flex-grow">
        <button type="button" className=" px-3 py-2 lg:ml-[-79%]" onClick={handleAddSet}>
            <span className="ml-1"> <span className="text-2xl ">+</span>  Add More</span>
        </button>
      </div>
    </div>

            {/* You submit the Form and create a new flashcard By Clicking on the create Button */}
      <div className="flex-grow">
        <button type="button" 
        className="border border-gray-300 rounded-md px-3 py-2 w-36 bg-white cursor-pointer hover:bg-red-500 hover:text-white" 
        onClick={handleSubmit}
        >
            <span className="ml-1"> Create</span>
        </button>
      </div>

      </div>
    </div>
  );
};

export default Home;
