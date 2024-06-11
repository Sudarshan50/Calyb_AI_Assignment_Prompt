import React, { useState } from 'react'
import './Add.css'
import axios from 'axios'
import { assets } from '../../assets/assets'
import { toast } from 'react-toastify'

const Add = ({url}) => {
    const [image, setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        category:"Salad",
        price:""
    })
    const onChangeHandler = (e) => {
        const {name,value} = e.target;
        setData(data=> ({...data,[name]:value}))
    }

    const onSubmitHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('image',image);
        formData.append('name',data.name);
        formData.append('description',data.description);
        formData.append('category',data.category);
        formData.append('price',Number(data.price));
        const response = await axios.post(`${url}/api/food/add`,formData);
        if(response.data.sucess){
            setData({
                name:"",
                description:"",
                category:"Salad",
                price:""
            })
            setImage(false);
            toast.success('Product Added Successfully');
        }else{
            toast.error('Product Addition Failed')
        }
    }
  return (
    <div className='add'>
    <form onSubmit = {onSubmitHandler} className='flex-col'>
        <div className='add__img__upload flex-col'>
            <p>Upload Image</p>
            <label htmlFor='image'>
                <img src= {image? URL.createObjectURL(image):assets.upload_area} alt=''/>
            </label>
            <input onChange = {(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required />
        </div>
        <div className='add__product__name flex-col'>
            <p>Product Name</p>
            <input onChange = {onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' required />
        </div>
        <div className='add__product__description flex-col'>
            <p>Product Description</p>
            <textarea onChange = {onChangeHandler} value={data.description} name='description' rows= '6' placeholder='Write content here' required />
        </div>
        <div className='add__category__price'>
            <div className='add__category flex-col'>
                <p>Product Category</p>
                <select name = 'category'>
                    <option value= "Salad">Salad</option>
                    <option value= "Rolls">Rolls</option>
                    <option value= "Desserts">Desserts</option>
                    <option value= "Sandwich">Sandwich</option>
                    <option value= "Cake">Cake</option>
                    <option value= "Pure Veg">Pure</option>
                    <option value= "Pasta">Pasta</option>
                    <option value= "Noodle">Noodle</option>
                </select>
            </div>
            <div className='add__price flex-col'>
                <p>Product Price</p>
                <input onChange = {onChangeHandler} data = {data.price} type='number' name='price' placeholder='$20' required />
                </div>
        </div>
        <button type='submit' className='add__button'>Add Product</button>
    </form>

    </div>
  )
}

export default Add