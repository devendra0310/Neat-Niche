import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, fetchProductCat } from "../redux/slices/productSlice";
import Product from "../components/Product";
import Empty from "../components/Empty";

const Collection = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProduct("collection"));
  }, []);
  const { products } = useSelector((state) => state.product);
  const [selectedItemId, setSelectedItemId] = useState(1);
  const items = [
    { id: 1, text: "All", name: "collection" },
    { id: 2, text: "Clothes", name: "clothes" },
    { id: 3, text: "Shoes", name: "shoes" },
    { id: 4, text: "Bags", name: "Bags" },
  ];
  const handleRadioChange = (id, name) => {
    setSelectedItemId(id);
    if (id === 1) {
      dispatch(fetchProduct(name));
    } else {
      dispatch(fetchProductCat(name));
    }
  };
  return (
    <div className="w-screen flex flex-col items-center gap-10 font-light">
      <div className="collect w-full h-[200px] mt-10 flex justify-center items-center ">
        <div className="text-[40px] text-white">COLLECTION</div>
      </div>
      <div className="w-[1400px] flex gap-4">
        <div className="w-1/5">
          <div className="text-[20px] border-b border-grey pb-3">FILTER</div>
          <ul>
            Categories
            {items.map((item) => (
              <li key={item.id}>
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
  )
}

export default Collection