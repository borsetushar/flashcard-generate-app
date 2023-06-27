import { CREATE_NEW } from "./Constants/createNew";


const createNew=(data)=>{
    return{
        type : CREATE_NEW,
        payload : data,
    }
};


export {createNew};