
const cartReducer = (state, action) => {
  
    if(action.type === "ADD_TO_CART"){
        let{id, color, quantity, product} = action.payload;
        // console.log({id, color, quantity, product});

        //tackle the existing product
        let existingProduct = state.cart.find((curItem) => 
            curItem.id === id + color );
        if(existingProduct){
            let updatedProduct = state.cart.map((curElem) => {
                if(curElem.id === id + color){
                    let newQuantity = curElem.quantity + quantity;
                    if(newQuantity >= curElem.max){
                        newQuantity = curElem.max;
                    }
                    return {
                        ...curElem,
                        quantity: newQuantity,
                    };
                }else{
                    return curElem;
                }
            });
            return {
                ...state,
                cart: updatedProduct, 
            }        
        }  else
        {
            let cartProduct;
            cartProduct = {
                id : id+color,
                name : product.name,
                color,
                quantity,
                image : product.image[0].url,
                price: product.price,
                max : product.stock,
            };
            return{
                ...state,
                cart: [...state.cart, cartProduct],
            }
        }  
    };

    //increment and decrement
    if(action.type === "SET_DECREMENT"){
        let updatedProduct = state.cart.map((curElem) => {
            if(curElem.id === action.payload){
                let decQuantity = curElem.quantity - 1;
                if(decQuantity <= 1){
                    decQuantity=1;
                }
                return {
                    ...curElem,
                    quantity: decQuantity,
                };
            }else{
                return curElem;
            }
        });
        return {
            ...state,
            cart : updatedProduct,
        }
    };

    if(action.type === "SET_INCREMENT"){
        let updatedProduct = state.cart.map((curElem) => {
            if(curElem.id === action.payload){
                let incQuantity = curElem.quantity + 1;
                if(incQuantity >=  curElem.max){
                    incQuantity= curElem.max;
                }
                return {
                    ...curElem,
                    quantity: incQuantity,
                };
            }else{
                return curElem;
            }
        });
        return {
            ...state,
            cart : updatedProduct,
        }
    }

    if(action.type === "REMOVE_ITEM"){
        let updatedCart = state.cart.filter((curItem) => 
        curItem.id !== action.payload);
        
        return {
            ...state,
            cart: updatedCart,
        }
    };

    if(action.type === "CLEAR_CART"){
        return{
            ...state,
            cart: [],
        };
    }

    if(action.type === "CART_TOTAL_ITEM"){
        let updatedItemVal = state.cart.reduce((initialVal, curElem) => {
            let {quantity} = curElem;
            initialVal = initialVal + quantity;
            return initialVal;
        }, 0)
        return {
            ...state,
            total_item: updatedItemVal,
        }
    }

    if(action.type === "CART_TOTAL_PRICE"){
        let final_price = state.cart.reduce((initialVal, curElem) => {
            let{price, quantity} = curElem;
            initialVal = initialVal + price * quantity;
            return initialVal;
        }, 0)
        return{
            ...state,
            total_price: final_price,
        }
    }
}

export default cartReducer;