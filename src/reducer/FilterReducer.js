
const FilterReducer = (state, action) => {
  
    switch(action.type){
        case "LOAD_FILTER_PRODUCTS":
            let priceArr = action.payload.map((curElem) => curElem.price);
            // 1st way to get max element
            // console.log(Math.max.apply(null, priceArr)) ;  
            // 2nd way
            // let maxPrice = priceArr.reduce((initialVal, curVal) => Math.max(initialVal,curVal),0);
            // console.log(maxPrice);
            //3rd way
            let maxPrice = Math.max(...priceArr);
            // console.log(maxPrice);
            return {
                ...state,
                filter_products: [...action.payload],
                all_products: [...action.payload],
                filters : {
                    ...state.filters,
                    maxPrice,
                    price : maxPrice,
                },
            };

        case "SET_GRID_VIEW":
            return {
                ...state,
                grid_view: true,
            };

        case "SET_LIST_VIEW":
            return {
                ...state,
                grid_view: false,
            };
            
        case "GET_SORT_VALUE":
            let userSortValue = document.getElementById("sort");
            let sort_value = userSortValue.options[userSortValue.selectedIndex].value;
            // console.log(sort_value) ;
            
            return{
                ...state,
                sorting_value: sort_value,
            };

        case "SORTING_PRODUCTS":
            let newSortData;
            let tempSortProduct = action.payload;
            // console.log(tempSortProduct);

            if(state.sorting_value==="lowest"){
                try {
                    const sortingProducts = (a,b) => {
                        return a.price - b.price;
                    }
                    newSortData = tempSortProduct.sort(sortingProducts);
                } catch (error) {
                    console.log("error in lowest filter");
                }
            };

            if(state.sorting_value==="highest"){
                try {
                    const sortingProducts = (a,b) => {
                        return b.price - a.price;
                    }
                    newSortData = tempSortProduct.sort(sortingProducts);
                } catch (error) {
                    console.log("error in highest filter");
                }
            };
            
            if(state.sorting_value=== "a-z"){
                try {
                    newSortData = tempSortProduct.sort((a,b) => a.name.localeCompare(b.name)
                    )
                } catch (error) {
                    console.log("error in a-z filter");
                }
            };

            if(state.sorting_value=== "z-a"){
                try {
                    newSortData = tempSortProduct.sort((a,b) => b.name.localeCompare(a.name)
                    )
                } catch (error) {
                    console.log("error in z-a filter");
                }
            };

            return{
                ...state,
                filter_products: newSortData,
            };

            case "UPDATE_FILTERS_VALUE":
                const{name, value} = action.payload;
                return{
                    ...state,
                    filters:{
                        ...state.filters,
                        [name]:value,
                    }
                };

            case "FILTER_PRODUCTS":
                 let {all_products}  = state;
                 let tempFilterProduct = [...all_products];
                 
                 const {text, category, company, color, price, minPrice} = state.filters;

                 if(text) {
                    tempFilterProduct =tempFilterProduct.filter((curElem) => {
                        return curElem.name.toLowerCase().includes(text);
                    })
                 }

                 if(category !== "all") {
                    tempFilterProduct =tempFilterProduct.filter((curElem) => {
                        return curElem.category === category;
                    })
                 }

                 if(company !== "all") {
                    tempFilterProduct =tempFilterProduct.filter((curElem) => {
                        return curElem.company === company;
                    })
                 }
                 if(color !== "all"){
                    tempFilterProduct = tempFilterProduct.filter((curElem) => 
                    curElem.colors.includes(color)
                    )
                 }
                //  if(price===0){
                //     tempFilterProduct =tempFilterProduct.filter((curElem) => {
                //         return curElem.price === price;
                //     })
                //  }
                 if(price){
                    tempFilterProduct =tempFilterProduct.filter((curElem) => {
                        return curElem.price <= price;
                    })
                 }
                 return{
                    ...state,
                    filter_products : tempFilterProduct ,
                 }

            case "CLEAR_FILTERS":
                return{
                    ...state,
                    filters: {
                        ...state.filters,
                        text: "",
                        category: "all",
                        company: "all",
                        color: "all",
                        minPrice: 0,
                        maxPrice: 0,
                        price: 0,
                    }
                }

            
        default :
            return state;    
    }
};

export default FilterReducer;