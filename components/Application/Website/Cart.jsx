import { TiShoppingCart } from "react-icons/ti";

const Cart = () => {
  return (
    <button type='button'>
        <TiShoppingCart className='text-gray-500 hover:text-primary cursor-pointer' 
                    size={25} />
    </button>

  )
}

export default Cart
