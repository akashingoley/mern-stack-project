import React, { useContext } from 'react'
import './RelatedProducts.css'
// import data_product from '../Assets/data'
import Item from '../Items/Item'
import { ShopContext } from '../../Context/ShopContext'

const RelatedProducts = (props) => {
  const {product} = props;
  const { all_product } = useContext(ShopContext)
  // console.log("all products: ",all_product[4, 5]);

  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className="relatedproducts-item">
            { all_product.map((item, i) => {
              if(product.category === item.category){
                return <Item key = { i } id = { item.id } name = { item.name } image = { item.image } new_price = { item.new_price } old_price = { item.old_price }/>
              }else{
                return null;
              }
            })}
        </div>
    </div>
  )
}

export default RelatedProducts