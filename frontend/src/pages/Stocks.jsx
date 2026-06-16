import { useState, useEffect } from 'react';
import stockService from '../services/stockService';
import productService from '../services/productService';

function Stocks() {
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    product_id: '',
    quantite: '',
    emplacement: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    fetchStocks();
    fetchProducts();
  }, []);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const response = await stockService.getAll(1, 100);
      setStocks(response.data.data);
    } catch (error) {
      setError('Failed to fetch stocks');
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await productService.getAll(1, 100);
      setProducts(response.data.data);
    } catch (error) {
      console.error('Failed to fetch products');
    }
  };

  const handleOpenModal = (stock = null) => {
    if (stock) {
      setEditingId(stock.id);
      setFormData(stock);
    } else {
      setEditingId(null);
      setFormData({ product_id: '', quantite: '', emplacement: '' });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ product_id: '', quantite: '', emplacement: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await stockService.update(editingId, formData);
      } else {
        await stockService.create(formData);
      }
      fetchStocks();
      handleCloseModal();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to save stock');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await stockService.delete(id);
        fetchStocks();
      } catch (error) {
        setError('Failed to delete stock');
      }
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Stock Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Add Stock
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4">Product</th>
              <th className="text-left py-3 px-4">Location</th>
              <th className="text-left py-3 px-4">Quantity</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.id} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 font-medium">{stock.product.name}</td>
                <td className="py-3 px-4">{stock.emplacement}</td>
                <td className="py-3 px-4">
                  <span className="font-semibold">{stock.quantite}</span>
                </td>
                <td className="py-3 px-4">
                  {stock.quantite < 10 ? (
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded text-sm">
                      Low Stock
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded text-sm">
                      In Stock
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleOpenModal(stock)}
                    className="text-blue-600 hover:text-blue-800 mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(stock.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              {editingId ? 'Edit Stock' : 'Add Stock'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Product</label>
                <select
                  value={formData.product_id}
                  onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a product</option>
                  {products.map((product) => (
                    <option key={product.id} value={product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Quantity</label>
                <input
                  type="number"
                  value={formData.quantite}
                  onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  min="0"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Location</label>
                <input
                  type="text"
                  value={formData.emplacement}
                  onChange={(e) => setFormData({ ...formData, emplacement: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Stocks;
