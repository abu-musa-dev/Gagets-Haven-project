import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { allDataContext } from "../main";

export default function ProductDetails() {
  const [productObj, addProduct] = useState({});
  const { pid } = useParams();
  const { addWishList, addCartList } = useContext(allDataContext);

  useEffect(() => {
    fetch("../data.json")
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const findOne = data.find((pd) => pd.product_id == pid);
          addProduct(findOne);
        }
      });
  }, [pid]);

  useEffect(() => {
    document.title = "Product Details | Gadgets Haven";
  }, []);

  return (
    <div>
      {/* Banner Section */}
      <div className="bg-violet-700 w-full mx-auto rounded-b-xl relative mb-52">
        <div className="space-y-4 lg:w-3/5 mx-auto px-4 pb-32 pt-28 text-center">
          <h1 className="text-white lg:text-4xl text-2xl font-extrabold leading-snug">
            Upgrade Your Tech Accessories with Gadget Haven
          </h1>
          <p className="text-white lg:text-lg text-sm">
            Discover cutting-edge gadgets that enhance your lifestyle. From smart devices to the coolest accessories – we have it all!
          </p>
        </div>

        {/* Product Details Card */}
        <div className="border shadow-xl rounded-xl p-6 bg-white z-20 absolute md:w-7/12 w-full transform lg:translate-x-[36%] lg:translate-y-[-20%] translate-y-[-15%] md:translate-x-[37%]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
            {/* Product Image */}
            <div className="relative">
              <img
                className="h-60 object-cover mx-auto lg:mx-0 rounded-md"
                src={productObj.product_image}
                alt={productObj.product_title}
              />
              <div className="badge badge-secondary text-xs absolute top-2 left-1/2 transform -translate-x-1/2">
                {productObj.brand}
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:col-span-2 space-y-3">
              <h2 className="text-2xl font-bold text-gray-800">{productObj.product_title}</h2>
              <p className="text-lg font-semibold text-violet-700">Price: ${productObj.price}</p>

              {productObj.availability ? (
                <p className="inline-block px-4 py-1 rounded-full text-sm text-green-700 bg-green-100 border border-green-400">
                  In Stock
                </p>
              ) : (
                <p className="inline-block px-4 py-1 rounded-full text-sm text-red-700 bg-red-100 border border-red-400">
                  Out of Stock
                </p>
              )}

              <p className="text-gray-500">{productObj.description}</p>

              {/* Specifications */}
              <div>
                <p className="font-semibold">Specification:</p>
                {productObj.Specification?.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {productObj.Specification.map((data, i) => (
                      <li key={i}>{`${data.key}: ${data.value}`}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">N/A</p>
                )}
              </div>

              {/* Rating */}
              <div>
                <p className="font-semibold mb-1">Rating ⭐</p>
                <div className="flex items-center gap-2">
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <input
                        key={i}
                        type="radio"
                        name="rating"
                        className="mask mask-star-2 bg-orange-400"
                        defaultChecked={i === 3}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 px-2 py-1 bg-gray-100 rounded-full">4.8</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={() => addCartList(productObj)}
                  className="btn px-6 bg-violet-700 text-white hover:bg-violet-800 rounded-full transition duration-300"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => addWishList(productObj)}
                  className="h-11 w-11 border border-gray-300 text-red-500 hover:bg-red-500 hover:text-white rounded-full flex items-center justify-center transition duration-300"
                >
                  <i className="fa-regular fa-heart"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[400px] lg:h-52"></div>
    </div>
  );
}
