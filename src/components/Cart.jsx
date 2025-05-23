import { useContext } from "react";
import { NavLink } from "react-router-dom";
import buyOK from '../assets/Group.png';
import { allDataContext } from "../main";
import DCard from "./DCard";
export default function Cart() {
  
    const {cartList,setcartList,total}=useContext(allDataContext)
    
    const handleSort = ()=>{
      const sort = [...cartList].sort((a,b)=>b.price - a.price)
      setcartList(sort)
    }
    const handlePurchase =()=>{
document.getElementById('my_modal_1').showModal()
document.getElementById('price').innerText=total
setcartList([])
    }
  return (
    <div className="container px-2 mx-auto mb-12">
  <div className="flex items-start justify-between py-5">
    <h1 className="text-3xl font-bold">Cart</h1>
    <div className="flex lg:flex-row text-end flex-col gap-4 lg:items-center">
      <h1 className="lg:text-2xl text-xl font-bold">Total cost: ${total.toFixed(3)}</h1>
      <div className="flex gap-4 items-center">
        <button onClick={handleSort} className="btn bg-transparent px-6 border border-violet-700 hover:bg-violet-500 hover:text-white rounded-full md:btn-md btn-sm text-sm md:text-md font-bold">Sort by Price <i className="fa-solid fa-sliders"></i></button>
        <button disabled={total<=0} onClick={handlePurchase} className="btn hover:bg-violet-500 bg-violet-700 text-white px-6 border md:btn-md btn-sm text-sm md:text-md border-violet-700 rounded-full font-bold">Purchase</button>
      </div>
    </div>
  </div>

{/* Modal start */}
<dialog id="my_modal_1" className="modal">
  <div className="modal-box rounded-2xl shadow-xl p-6 bg-white">
    <div className="text-center space-y-4">
      <img src={buyOK} className="mx-auto w-20 h-20" alt="Success Icon" />
      <h3 className="font-bold text-2xl lg:text-3xl text-green-600">
        Payment Successful
      </h3>
      <div className="divider mx-auto w-1/2"></div>
      <p className="text-gray-600">Thank you for your purchase!</p>
      <p className="text-lg font-medium text-gray-800">
        Total: <span className="text-green-700 font-bold">$<span id="price"></span></span>
      </p>
    </div>
    <div className="modal-action justify-center mt-6">
      <form method="dialog">
        <NavLink to="/" className="btn bg-green-500 hover:bg-green-600 text-white px-6">
          Close
        </NavLink>
      </form>
    </div>
  </div>
</dialog>



<div className="grid grid-cols-1 gap-6 mt-6">

{cartList.length?cartList.map(cart=><DCard addbtn={false} cart={cart} key={cart.product_id}></DCard>):<p className="text-center">No Product available</p>}

</div>

</div>
  )
}
