import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import Spinner from '../components/_UI/Spinner'
import Calculator from '../components/Calculator/Calculator'
import {clearProductById, getProductById} from '../redux/products/products.actions'

const ProductPage = () => {
   const {id} = useParams()
   const dispatch = useDispatch()
   const {productById, isLoaded} = useSelector(({products}) => products)

   useEffect(() => {
      dispatch(getProductById(+id))
      return () => {
         dispatch(clearProductById())
      }
   }, [id])

   return (
      <div className="product">
         {
            !isLoaded
               ? <Spinner/>
               : productById &&
               <div className="container-content">
                  <div className="product-header">
                     <div className="product-text">
                        <h2>{productById.title}</h2>
                        <p><small className="mt-4">Description...</small></p>
                     </div>
                     <img src={productById.imageUrl} alt="Product"/>
                  </div>
                  <Calculator calculatorType={productById.calculator}/>
               </div>
         }
      </div>
   )
}

export default ProductPage