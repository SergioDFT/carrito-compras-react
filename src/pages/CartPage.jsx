import { useContext } from "react"
import { CartContext } from "../context/CartContext"
import Swal from "sweetalert2"

export const CartPage = () => {
  const { shoppingList, removeProduct, decrementQuantity, incrementQuantity } = useContext(CartContext)

  const calculateTotal = () => {
    return shoppingList.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)
  }

  const handlerPurchase = () =>{
    const productsPruchase = shoppingList.map(product => `${product.title} x ${product.quantity}`).join('\n')
    Swal.fire({
      icon:'success',
      title:'La compra se ha realizado con exito',
      html:`<p>Has comprado: </p> <pre>${productsPruchase}</pre>`
    })
  }

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Cantidad</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {shoppingList.map(product => (
            <tr key={product.id}>
              <td scope="row">{product.title}</td>
              <td scope="row">{product.price}</td>
              <td scope="row">
                <button className="btn btn-outline-primary" onClick={() => decrementQuantity(product.id)}>-</button>
                <button className="btn btn-primary">{product.quantity}</button>
                <button className="btn btn-outline-primary" onClick={() => incrementQuantity(product.id)}>+</button>

              </td>
              <td scope="row"><button className="btn btn-danger" onClick={() => removeProduct(product.id)}>Eliminar</button></td>
            </tr>
          ))}
          <tr>
            <th><b>TOTAL: </b></th>
            <td></td>
            <td></td>
            <td>${calculateTotal()}</td>
          </tr>
        </tbody>
      </table>
      <div className="d-grid gap-2">
        <button className="btn btn-primary" type="button" onClick={handlerPurchase}>Comprar</button>
      </div>
    </>
  )
}
