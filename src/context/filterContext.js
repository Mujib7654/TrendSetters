import {createContext, useContext, useReducer, useEffect} from "react";
import {useProductContext} from "../context/productContext";
import reducer from "../reducer/FilterReducer";
//create context
const FilterContext = createContext();

const initialState ={
    filter_products: [],
    all_products: [],
    grid_view: true,
};

//create provider : main function
export const FilterContextProvider = ({children}) => {

    const {products} = useProductContext();
    // console.log({products});

    const [state, dispatch] = useReducer(reducer, initialState);

    const setGridView=() =>{
        return dispatch ({type: "SET_GRID_VIEW"});
    };

    const setListView=() =>{
        return dispatch ({type: "SET_LIST_VIEW"});
    };

    useEffect(() => {
        dispatch({type: "LOAD_FILTER_PRODUCTS", payload: products })
    }, [products])

    return <FilterContext.Provider value = {{ ...state, setGridView, setListView}}>
        {children}
    </FilterContext.Provider>
};

//custom hook
export const useFilterContext = () =>{
    return useContext(FilterContext);
};
