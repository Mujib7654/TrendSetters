import {createContext, useContext, useReducer, useEffect} from "react";
import {useProductContext} from "../context/productContext";
import reducer from "../reducer/FilterReducer";
//create context
const FilterContext = createContext();

const initialState ={
    filter_products: [],
    all_products: [],
    grid_view: true,
    sorting : "lowest",
};

//create provider : main function
export const FilterContextProvider = ({children}) => {

    const {products} = useProductContext();

    const [state, dispatch] = useReducer(reducer, initialState);

    const setGridView=() =>{
        return dispatch ({type: "SET_GRID_VIEW"});
    };

    const setListView=() =>{
        return dispatch ({type: "SET_LIST_VIEW"});
    };

    // sorting
    const sorting =() => {
        dispatch ({type: "GET_SORT_VALUES"});
    };

    useEffect(() =>{
        dispatch ({type: "SORTING_PRODUCTS", payload: products})
    }, [state.sorting_value])

    useEffect(() => {
        dispatch({type: "LOAD_FILTER_PRODUCTS", payload: products })
    }, [products]);

    return <FilterContext.Provider value = {{ ...state, setGridView, setListView, sorting}}>
        {children}
    </FilterContext.Provider>
};

//custom hook
export const useFilterContext = () =>{
    return useContext(FilterContext);
};
