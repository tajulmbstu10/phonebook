import { 
    CONTACT_DETAILS_SUCCESS, 
    CONTACT_DETAILS_REQUEST, 
    CONTACT_DETAILS_FAIL,
    CONTACT_SAVE_REQUEST,
    CONTACT_SAVE_SUCCESS,
    CONTACT_SAVE_FAIL,
    CONTACT_DELETE_REQUEST,
    CONTACT_DELETE_SUCCESS,
    CONTACT_DELETE_FAIL,
    CONTACT_LIST_SUCCESS,
    CONTACT_LIST_REQUEST,
    CONTACT_LIST_FAIL,

 } from '../constants/contactConstants';
import axios from 'axios';


const listContacts = () => async (dispatch)=>{
    try{
        dispatch({type: CONTACT_LIST_REQUEST});
        const { data } = await axios.get("/api/contacts/");
        dispatch({ type: CONTACT_LIST_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: CONTACT_LIST_FAIL, payload: error.message });

    }
};

const detailsContact = (contactId)=> async (dispatch) =>{
    try{
        dispatch({type:CONTACT_DETAILS_REQUEST});
        const { data } = await axios.get("/api/contacts/" + contactId); 
        dispatch({type:CONTACT_DETAILS_SUCCESS, payload: data });
    }
    catch(error){
        dispatch({ type: CONTACT_DETAILS_FAIL, payload: error.message });
    }
};

const saveContact = (contact) => async (dispatch, getState) =>{
    try{
        dispatch({type: CONTACT_SAVE_REQUEST, payload:contact })
        // const { userSignin: { userInfo } } = getState();

        if(!contact._id){

        const { data } = await axios.post("/api/contacts", contact, {
            // headers:{
            //     'Authorization':'Bearer '+ userInfo.token
            // }
        });
        dispatch({type: CONTACT_SAVE_SUCCESS, payload: data });


        }else{
            const { data } = await axios.put("/api/contacts/" + contact._id , contact, {
                // headers:{
                //     'Authorization':'Bearer '+ userInfo.token
                // }
            });
            dispatch({type: CONTACT_SAVE_SUCCESS, payload: data });            

        }
        

        
    } catch (error) {
        console.log(error)
        dispatch({ type: CONTACT_SAVE_FAIL, payload: error.message });
    }
};

const deleteContact = (contactId)=> async (dispatch, getState) =>{
    try{
        dispatch({type:CONTACT_DELETE_REQUEST});
        // const { userSignin: { userInfo } } = getState();
        const { data } = await axios.delete("/api/contacts/" + contactId, {
            // headers:{
            //     'Authorization':'Bearer '+ userInfo.token
            // }
        }); 
        dispatch({type:CONTACT_DELETE_SUCCESS, payload: data, success:true });
    }
    catch(error){
        dispatch({ type: CONTACT_DELETE_FAIL, payload: error.message });
    }
};
export { listContacts, detailsContact, saveContact, deleteContact }