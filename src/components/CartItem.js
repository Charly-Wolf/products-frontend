import { ChevronDown, ChevronUp } from '../icons'
import { removeItem, toggleItemAmount } from '../features/cart/cartSlice'
import { useDispatch } from 'react-redux'

const CartItem = ({ _id, img, title, price, amount }) => {
  const dispatch = useDispatch()
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button
          className='remove-btn'
          onClick={() => {
            dispatch(removeItem(_id))
          }}
        >
          remove
        </button>
      </div>
      <div>
        <button
          className='amount-btn'
          onClick={() => {
            console.log(_id)
            dispatch(toggleItemAmount({ _id, action: 'up' }))
          }}
        >
          <ChevronUp />
        </button>
        <p className='amount'>{amount}</p>
        <button
          className='amount-btn'
          onClick={() => {
            if (amount <= 1) {
              dispatch(removeItem(_id))
            } else {
              dispatch(toggleItemAmount({ _id, action: 'down' }))
            }
          }}
        >
          <ChevronDown />
        </button>
      </div>
    </article>
  )
}
export default CartItem
