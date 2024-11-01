import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";

function WomenPerfume(){
    const dispatch = useDispatch()
    const womenperfume = useSelector(state => state.products.women)
    const items = womenperfume.map((product, index)=>
    <li key = {index}>
    {product.brand} : {product.name}  -  ${product.price.toFixed(2)}      
    <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button></li>
    )
    return(
        <>
        <h1> WomenPerfume Products!</h1>
        <ul>{items}</ul>
        </>
    )
}
export default WomenPerfume;
