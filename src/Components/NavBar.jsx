import { NavLink } from 'react-router-dom';

function NavBar() {
    const navLinkStyles = ({isActive})=>{
        return{
          // style for Links.
          textDecoration: "none",
          display:'flex',
          flexDirection:'column',
          color: isActive ? "#FF0000" : "#808080",
          borderBottom: isActive ? "2px solid red" : "none", 
          width: "130px",
        }
      }
  return (
    <div>
        <h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl text-left ml-22 pt-4">Create Flashcard</h1>

        <div className="flex justify-between">
        <div>
            <ul className="flex ml-4 md:ml-20 px-2 md:px-4 pt-4">
            <li>
                <NavLink
                to={'/'}
                style={navLinkStyles}
                className="font-bold"
                >
                Create New
                </NavLink>
                
            </li>
            <li>
                <NavLink
                to={'/myflashcard'}
                style={navLinkStyles}
                className="font-bold"
                >
                My Flashcards
                </NavLink>
                
            
            </li>

            </ul>
            
        </div>
        </div>
        <hr className="w-5/6 mx-auto border-b-2 border" />
    </div>
    
  )
}

export default NavBar;