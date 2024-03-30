import './products.css';
import prodData from './data';
import { useReducer } from 'react';


const reducer = (state, action) => {
    if (action.type === 'add') {
        return {
            ...state,
            data: action.payload.rawData,
            cart: action.payload.arr,
        }
    }
    else if (action.type === 'sub') {
        return {
            ...state,
            data: action.payload.rawData,
            cart: action.payload.arr,
        }
    }

    return state;
}




const Products = () => {

    let arr = [];


    const [state, dispatch] = useReducer(reducer, {
        data: [...prodData],
        cart: [...arr],
        total: 0
    })

    // ******************************************************************

    const sub = (e, id) => {
        let rawData = state.data;
        arr = [...state.cart];
        // console.log(prodName);
        // console.log(prodPrice);
        // console.log(prodCount);

        rawData.map((item) => {
            if (id === item.id && item.count >= 1) {
                item.count -= 1;
                state.total -= item.price;
            }
            return item;
        })

        let index = arr.findIndex((prod) => prod.id === id)

        if (index !== -1) {
            let existingProduct = arr[index];
            console.log(existingProduct);
            console.log(arr);
            if (existingProduct.count > 1) {
                existingProduct.count--;
            }
            else {
                arr.splice(index, 1);
            }
        }
        dispatch({ type: 'sub', payload: { rawData, arr } });
    }




    // ******************************************************************

    const add = (e, id) => {
        let rawData = state.data;
        let prodPrice = e.target.parentElement.parentElement.children[1].innerText;
        let prodCount = e.target.parentElement.children[1].innerText;
        arr = [...state.cart];
        // console.log(prodName);
        // console.log(prodPrice);
        // console.log(prodCount);
        let c = 0;

        rawData.map((item) => {
            if (id === item.id) {
                item.count += 1;
                c = item.count;
                state.total += item.price;
            }

            return item;
        })

        var existingProduct = arr.find(item => item.id === id);
        // console.log(existingProduct);


        if (existingProduct) {
            existingProduct.count++;
        }
        else {
            arr.push({
                id: id,
                price: prodPrice,
                count: c,
            })
        }

        dispatch({ type: 'add', payload: { rawData, arr } });

        // console.log(rawData);
        // console.log(arr);
    }


    // ************************************************************************




    return (
        <div className='product'>
            <div className='container'>
                <div className='container1'>
                    <h1>Products</h1>
                    {
                        state.data && state.data.map((item) => {
                            return (
                                <div className='prod' key={item.id}>
                                    <span>Product {item.id}</span>
                                    <span>Rs. {item.price}</span>
                                    <div className='addsub'>
                                        <strong onClick={(e) => sub(e, item.id)}>-</strong>
                                        <p>{item.count}</p>
                                        <strong onClick={(e) => add(e, item.id)}>+</strong>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='container2'>
                    <h2>Cart</h2>
                    {
                        state.cart && state.cart.map((item) => {
                            return (
                                <div className='cartitem' key={item.id}>
                                    <span>Product {item.id}</span>
                                    <span>{item.count} x {item.price}</span>
                                </div>
                            )
                        })
                    }

                    <div className='total'>
                        <strong>total</strong>
                        <span>Rs. {state.total}</span>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Products;