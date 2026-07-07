"use client";

import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //Display
  useEffect(() => {
    try {
      setTimeout(() => {
        setProducts([
          { id: 1, name: "Laptop" },
          { id: 2, name: "Mouse" },
          { id: 3, name: "Keyboard" },
          { id: 4, name: "Headset" },
          { id: 5, name: "USB" },
        ]);
        setLoading(false);
      }, 1000);
    } catch {
      setError("Failed to load products.");
      setLoading(false);
    }
  }, []);

  // Add
  const addProduct = () => {
    if (!name.trim()) {
      alert("Product name is required.");
      return;
    }

    const newProduct: Product = {
      id: Date.now(),
      name,
    };

    setProducts([...products, newProduct]);
    setName("");
  };

  // Delete
  const deleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  if (loading) {
    return <h2 className="text-center mt-10">Loading...</h2>;
  }

  if (error) {
    return <h2 className="text-center text-red-500">{error}</h2>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6">

      <h1 className="text-3xl font-bold mb-6">
        Product List
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">

        <input
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded flex-1"
        />

        <button
          onClick={addProduct}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>

      </div>

      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row justify-between items-center border rounded p-4"
            >
              <span>{product.name}</span>

              <button
                onClick={() => deleteProduct(product.id)}
                className="bg-red-500 text-white px-3 py-2 rounded mt-2 sm:mt-0"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}