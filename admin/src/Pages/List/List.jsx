import React, { useEffect } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  const [list, setList] = React.useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.sucess) {
      setList(response.data.data);
      toast.success("Data fetched successfully");
    } else {
      toast.error("Failed to fetch data");
    }
  };
  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    if (response.data.sucess) {
      toast.warning("Food removed successfully");
      await fetchList();
    } else {
      toast.error("Failed to remove food");
    }

  }
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list__add flex-col">
      <p>All Food List</p>
      <div className="list__table ">
        <div className="list__table__format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list__table__format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick = {()=>removeFood(item._id)} className="cursor">x</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
