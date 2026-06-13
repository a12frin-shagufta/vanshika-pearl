import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const WholesaleProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${backendUrl}/api/wholesale/list`)
      .then(res => { if (res.data.success) setProducts(res.data.products); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-400 tracking-widest text-sm">LOADING...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#faf9f7]">
      {/* Header */}
      <div className="bg-[#2c2416] text-white py-16 px-8 text-center">
        <p className="tracking-[0.3em] text-xs text-[#c9a84c] mb-3">WHOLESALE CATALOGUE</p>
        <h1 className="text-4xl font-light">Our Wholesale Products</h1>
        <p className="text-gray-400 mt-3 text-sm max-w-xl mx-auto">
          Special pricing for boutiques, gift shops & event planners. Minimum quantities apply.
        </p>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        {products.length === 0 ? (
          <p className="text-center text-gray-400 py-20 tracking-widest text-sm">
            PRODUCTS COMING SOON
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(p => {
              const waText = encodeURIComponent('Hi, I would like to order wholesale: ' + p.name);
              const waLink = 'https://wa.me/19739740185?text=' + waText;
              return (
                <div key={p._id} className="bg-white rounded-sm shadow-sm hover:shadow-md transition group">
                  {/* Image */}
                  <div className="overflow-hidden h-64">
                    {p.images[0] ? (
                      <img
                        src={`${backendUrl}/uploads/${p.images[0]}`}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-300 text-sm">
                        No Image
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <p className="text-xs text-[#c9a84c] tracking-widest uppercase mb-1">{p.category}</p>
                    <h3 className="font-semibold text-gray-800 text-lg">{p.name}</h3>
                    <p className="text-gray-400 text-sm mt-1 line-clamp-2">{p.description}</p>

                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400 mb-0.5">Wholesale Price</p>
                        <div className="flex items-center gap-2">
                          <span className="text-[#2c2416] font-bold text-xl">₹{p.wholesalePrice}</span>
                          {p.retailPrice && (
                            <span className="text-gray-300 line-through text-sm">₹{p.retailPrice}</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">Min. {p.minOrderQty} units</p>
                      </div>

                      
                       <a
  href={waLink}
  target="_blank"
  rel="noreferrer"
  className="bg-[#2c2416] text-white text-xs px-4 py-2.5 rounded hover:bg-[#c9a84c] transition tracking-widest"
>
  ENQUIRE
</a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Back button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/wholesale')}
            className="text-sm text-gray-400 hover:text-[#c9a84c] tracking-widest transition"
          >
            ← BACK TO WHOLESALE
          </button>
        </div>
      </div>
    </div>
  );
};

export default WholesaleProducts;