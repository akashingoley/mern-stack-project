/* eslint-disable no-unused-vars */
import React from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { useState } from 'react'

const AddProduct = () => {
    const [image, setImage] = useState(false);

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }

    const [productDetails, setProductDeatils] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })

    const changeHandler = (e) => {
        setProductDeatils({...productDetails,[e.target.name] : e.target.value})
    }

    const addProduct = async() => {
        console.log(productDetails);
        let responseData;
        let product = productDetails;

        let formData = new FormData();
        formData.append('product', image);

        await fetch('http://localhost:4000/upload', {
            method: 'POST',
            headers: {
                Accept:'application/json',
            }, 
            body: formData,
        }).then((resp) => resp.json()).then((data) => {responseData = data})
        if (responseData.success){
            product.image = responseData.image_url;
            console.log(product);
        }

        await fetch('http://localhost:4000/addproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        }).then((resp) => resp.json()).then((data) => {
            data.success?alert("Product added"):alert("Failed")
        })
    }
  return (
    <div className='add-product'>
        <div className="add-product-itemfield">
            <p>Product Title</p>
            <input onChange={changeHandler} type="text" name='name' value={productDetails.name} placeholder='Type here' />
        </div>
        <div className="add-product-price">
            <div className="add-product-itemfield">
                <p>Price</p>
                <input onChange={changeHandler} type="text" name="old_price" value={productDetails.old_price} placeholder='Type here'/>
            </div>
            <div className="add-product-itemfield">
                <p>Offer Price</p>
                <input onChange={changeHandler} type="text" name="new_price" value={productDetails.new_price} placeholder='Type here'/>
            </div>
        </div>
        <div className="add-product-itemfield">
            <p>Product Category</p>
            <select onChange={changeHandler} name="category" value={productDetails.category} className='add-product-selector'>
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kids</option>
            </select>
        </div>
        <div className="add-product-itemfield">
            <label htmlFor="file-input">
                <img src={ image? URL.createObjectURL(image) : upload_area } className='add-product-thumbnail-img' />
            </label>
            <input onChange={imageHandler} type="file" name='image' id='file_input'/>
        </div>
        <button onClick={addProduct} className='add-product-btn'>Add</button>
    </div>
  )
}

export default AddProduct