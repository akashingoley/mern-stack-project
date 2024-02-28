import React, { useContext } from 'react'
import './RelatedProducts.css'
// import data_product from '../Assets/data'
import Item from '../Items/Item'
import { ShopContext } from '../../Context/ShopContext'

const RelatedProducts = (props) => {
  const {product} = props;
  const { all_product } = useContext(ShopContext);
  let relatedProd = all_product.filter((e) => e.category === product.category);

  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr/>
        <div className="relatedproducts-item">
            { relatedProd.slice(0,4).map((item, i) => {
              return <Item key = { i } id = { item.id } name = { item.name } image = { item.image } new_price = { item.new_price } old_price = { item.old_price }/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts