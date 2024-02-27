/* eslint-disable no-unused-vars */
import React from 'react'
import './ListProduct.css'
import { useState } from 'react'
import { useEffect } from 'react';
import cross_icon from '../../assets/cross_icon.png'

const ListProduct = () => {
    const [allProducts, setAllProducts] = useState([]);

    const fetchInfo = async()=>{
        await fetch('http://localhost:4000/allproducts')
        .then((resp) => resp.json())
        .then((data) => {
            setAllProducts(data)
        })
    }

    useEffect(() => {
        fetchInfo()
    },[]) 

    const removeProduct = async(Id) => {
        await fetch('http://localhost:4000/removeproduct', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id : Id})
        })

        await fetchInfo();
    }
  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="list-product-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Old Price</p>
            <p>New Price</p>
            <p>Category</p>
            <p>Remove</p>
        </div>
        <div className="list-product-all-product">
            <hr />
            {allProducts.map((product, index)=> {
                return <><div key={index} className="list-product-format-main list-product-format">
                    <img className='list-product-product-icon' src={product.image} alt="" />
                    <p>{product.name}</p>
                    <p>{product.old_price}</p>
                    <p>{product.new_price}</p>
                    <p>{product.category}</p>
                    <img onClick={() => {removeProduct(product.id)}} className="list-product-remove-icon" src={cross_icon} alt="" />
                </div>
                <hr />
                </>
            })}
        </div>
    </div>
  )
}

export default ListProduct