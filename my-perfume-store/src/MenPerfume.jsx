import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";

function MenPerfume(){
    const dispatch = useDispatch()
    const menperfume = useSelector(state => state.products.men)
    const items = menperfume.map((product, index)=>
    <li key = {index}>
    {product.brand} : {product.name}  -  ${product.price.toFixed(2)}      
        <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button></li>
    )
    return(
        <>
        <h1> Men Perfumes Products!</h1>
        <ul>{items}</ul>
        </>
    )
}
export default MenPerfume;
