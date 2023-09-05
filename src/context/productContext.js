//Context API: It allows data to be passed through a component tree without having to pass props manually at entry level. This makes it easier to share data between components.

//Steps to use Context API
//1. Create a context
//2.return
//3. consumer: to get delivery, needs to scan, verify etc  : using useContext Hooks

//at first we need to create data, a global warehouse from where we can (send/receive) data easily

import {createContext, useContext, useEffect, useReducer} from "react";
import axios from "axios";
import reducer from "../reducer/ProductReducer";
//we can import reducer using any alias name

//create context
const AppContext = createContext();

const API = "https://api.pujakaitem.com/api/products";

const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
    //for featured section those value is true in api
};

//create a provider
//main function
const AppProvider =({children}) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    //[state, dispatch]: useReducer hooks returns two elemnt of array
    //(reducer, initialState): function

    // define getproducts function
    const getProducts= async (url) => {
        dispatch({type: "SET_LOADING"});
        //api gives response while calling it
        try {
            const res = await axios.get(url);
            const products = await res.data;
            // console.log('Products:', products);
            dispatch({ type: "SET_API_DATA", payload: products });
            //Now dispatch will call action method of reducer fn to do that work
            //type: property, payload: requirement
            
            //to check data in console
            // console.log( res.data);
            // console.log('API Response:', res.data);
            // console.log("sucess");

            //we know that we have our api data in our product variable, now we have to store our products with the help of useReducer Hooks, so that we can use this data globally in our project.

            //now our whole data is inside products variable, now we have to store it globally : for that we need state management. Two ways: useState hooks, useReducer Hooks
        } catch (error) {
            dispatch({type: "API_ERROR"});
        }
    };

    //my 2nd api call for single product
    const getSingleProduct = async(url) => {
        dispatch({type: "SET_SINGLE_LOADING"});
        try {
            const res = await axios.get(url);
            const singleProduct = await res.data;
            dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
        } catch (error) {
            dispatch({type: "SET_SINGLE_ERROR"});
        }
    };
      

    //useEffect hook allows us to perform side effects in our component
    //when we open our website, it renders and show data
    // [] : means for the 1st time only
    useEffect(() =>{
        getProducts(API);
    },[])


    return (
    <AppContext.Provider value= {{ ...state, getSingleProduct}}>{children}</AppContext.Provider>
    );
};

//useContext Hooks customization
const useProductContext = () =>{
    return useContext(AppContext);
};

export {AppProvider, AppContext, useProductContext};


//3 initial state to get data from useReducer Hooks
// a. Loading
// b. error part
// c. data

//state: react components has a built in state object. The state object is where you store property values that belongs to the component when the state object changes, the component re-renders

//dispatch: it is a function accepts an object that represents the type of action we want to execute when it is called, basically , it sends the type of action to the reducer function to perform its job, which , of course, is updating the state.

