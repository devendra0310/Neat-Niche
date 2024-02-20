import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, fetchProductCat } from "../redux/slices/productSlice";
import Product from "../components/Product";
import Empty from "../components/Empty";

const Electronic = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct("electronics"));
  }, []);
  const { products } = useSelector((state) => state.product);
  const [price,setPrice]=useState(0);
  const [selectedItemId, setSelectedItemId] = useState(1);
  const items = [
    { id: 1, text: "All", name: "electronics" },
    { id: 2, text: "Mobiles", name: "mobiles" },
    { id: 3, text: "Laptops", name: "laptops" },
    { id: 4, text: "TV", name: "tv" },
  ];
  const handleRadioChange = (id, name) => {
    setSelectedItemId(id);
    if (id === 1) {
      dispatch(fetchProduct(name));
    } else {
      dispatch(fetchProductCat(name));
    }
  };
  const handlePriceChange = (id) => {
    setPrice(id);
  };

  return (
    <div className="w-screen flex flex-col items-center gap-10 font-light">
      <div className="elec w-full h-[200px] mt-10 flex justify-center items-center ">
        <div className="text-[40px] text-white">ELECTRONICS</div>
      </div>
      <div className="w-[1400px] flex gap-4">
        <div className="w-1/5">
          <div className="text-[20px] border-b border-grey pb-3 flex gap-3">FILTER</div>
          <ul>
            Categories
            {items.map((item) => (
              <li key={item.id} className="flex gap-2">
                <input
                  type="radio"
                  id={item.id}
                  name={item.name}
                  value={item.id}
                  checked={selectedItemId === item.id}
                  onChange={() => handleRadioChange(item.id, item.name)}
                />
                <label htmlFor={`item-${item.id}`}>{item.text}</label>
              </li>
            ))}
          </ul>
          <ul>
            Price
              <li  className="flex gap-2">
                <input
                  type="radio"
                  name="1"
                  checked={price === 1}
                  onChange={() => handlePriceChange(1)}
                />
                <label htmlFor='1'>Lowest to Highest</label>
              </li>
              <li  className="flex gap-2">
                <input
                  type="radio"
                  name="2"
                  checked={price===2}
                  onChange={() => handlePriceChange(2)}
                />
                <label htmlFor='2'>Highest to Lowest </label>
              </li>
          </ul>
        </div>
        <div className="flex flex-wrap w-4/5 justify-center">
          {
            products.length!==0 ? (products.map((product) => {
              return <Product product={product} />;
            })) : (<Empty/>)
          }
        </div>
      </div>
    </div>
  );
};

export default Electronic;
