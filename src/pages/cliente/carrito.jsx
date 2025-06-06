import { useState, useEffect } from "react"
import { X, Minus, Plus } from "lucide-react"

const Carrito = ({ isOpen, onClose }) => {
  // Datos de ejemplo para el carrito
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "The Organic Cotton Long-Sleeve Turtleneck",
      size: "Medio",
      color: "Negro",
      originalPrice: 50,
      price: 35,
      discount: "30% Off",
      quantity: 1,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hWaGBiVQIC1fLDK6muaezNe0Dkgrhg.png",
    },
    {
      id: 2,
      name: "The ReWool® Oversized Shirt Jacket",
      size: "Alto",
      color: "Negro",
      originalPrice: 238,
      price: 167,
      discount: "30% Off",
      quantity: 1,
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hWaGBiVQIC1fLDK6muaezNe0Dkgrhg.png",
    },
  ])

  const [suggestedItem, setSuggestedItem] = useState({
    id: 3,
    name: "The Good Merino Wool Beanie",
    size: "Una talla",
    color: "Azul claro",
    price: 35,
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hWaGBiVQIC1fLDK6muaezNe0Dkgrhg.png",
  })

  // Calcular el subtotal
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  // Manejar cambios de cantidad
  const updateQuantity = (id, change) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change)
          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  // Prevenir scroll cuando el carrito está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay oscuro */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />

      {/* Panel del carrito */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 overflow-y-auto shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="p-4 flex flex-col h-full">
          {/* Encabezado del carrito */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Tu carrito</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <X size={24} />
            </button>
          </div>

          {/* Contenido del carrito */}
          <div className="flex-grow">
            {/* Productos en el carrito */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 pb-4 border-b">
                  <div className="w-20 h-24 bg-gray-100 flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.size} | {item.color}
                        </p>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <X size={16} />
                      </button>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <div>
                        <span className="line-through text-gray-500 text-sm">${item.originalPrice}</span>{" "}
                        <span className="font-medium">${item.price}</span>
                        <p className="text-red-500 text-xs">({item.discount})</p>
                      </div>
                      <div className="flex items-center border rounded">
                        <button className="px-2 py-1 hover:bg-gray-100" onClick={() => updateQuantity(item.id, -1)}>
                          <Minus size={16} />
                        </button>
                        <span className="px-2">{item.quantity}</span>
                        <button className="px-2 py-1 hover:bg-gray-100" onClick={() => updateQuantity(item.id, 1)}>
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sección "Before You Go" */}
            <div className="mt-8">
              <h3 className="font-medium mb-4">Before You Go</h3>
              <div className="flex gap-3 pb-4">
                <div className="w-20 h-24 bg-gray-100 flex-shrink-0">
                  <img
                    src={suggestedItem.image || "/placeholder.svg"}
                    alt={suggestedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 className="font-medium">{suggestedItem.name}</h3>
                  <p className="text-sm text-gray-600">
                    {suggestedItem.size} | {suggestedItem.color}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="font-medium">${suggestedItem.price}</span>
                    <button className="bg-gray-900 text-white px-4 py-2 text-sm uppercase hover:bg-gray-800">
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Indicadores de página */}
            <div className="flex justify-center gap-1 mt-4 py-4">
              <div className="w-2 h-2 rounded-full bg-gray-900"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            </div>
          </div>

          {/* Pie del carrito */}
          <div className="mt-auto pt-4 border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <span className="font-medium">Subtotal</span>{" "}
                <span className="text-sm text-gray-600">({cartItems.length} Objetos)</span>
              </div>
              <span className="font-bold text-lg">${subtotal}</span>
            </div>
            <button className="w-full bg-gray-900 text-white py-3 uppercase font-medium hover:bg-gray-800">
              Continuar con el pago
            </button>
            <p className="text-center text-sm mt-2 text-gray-600">Psst, consíguelo ahora antes de que se agote.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Carrito
