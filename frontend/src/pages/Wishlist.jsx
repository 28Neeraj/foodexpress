import Navbar from "../components/Navbar";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

function Wishlist() {

  const { wishlist, toggleWishlist } = useWishlist();

  const { addToCart } = useCart();

  return (

    <>
      <Navbar />

      <main className="page-shell mt-10 pb-16">

        <p className="section-kicker">Saved for later</p><h1 className="section-title mb-10">

          ❤️ My Wishlist

        </h1>

        {wishlist.length === 0 ? (

          <h2 className="text-2xl text-center">

            Wishlist is Empty 💔

          </h2>

        ) : (

          wishlist.map((item) => (

            <div
              key={item.foodId}
              className="flex justify-between items-center bg-white shadow-lg rounded-xl p-5 mb-5"
            >

              <div className="flex gap-5 items-center">

                <img
                  src={item.image}
                  alt={item.foodName}
                  className="w-28 h-28 rounded-lg object-cover"
                />

                <div>

                  <h2 className="text-2xl font-bold">

                    {item.foodName}

                  </h2>

                  <p className="text-red-500 font-bold mt-2">

                    ₹{item.price}

                  </p>

                </div>

              </div>

              <div className="flex gap-4">

                <button

                  onClick={() =>
                    addToCart({
                      _id: item.foodId,
                      name: item.foodName,
                      image: item.image,
                      price: item.price,
                    })
                  }

                  className="bg-green-500 text-white px-5 py-3 rounded-lg"

                >

                  Add To Cart

                </button>

                <button

                  onClick={() =>
                    toggleWishlist({
                      _id: item.foodId,
                      name: item.foodName,
                      image: item.image,
                      price: item.price,
                    })
                  }

                  className="bg-red-500 text-white px-5 py-3 rounded-lg"

                >

                  Remove

                </button>

              </div>

            </div>

          ))

        )}

      </main>

    </>

  );

}

export default Wishlist;
