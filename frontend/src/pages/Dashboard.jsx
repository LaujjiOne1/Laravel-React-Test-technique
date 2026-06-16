import { useState, useEffect } from 'react';
import productService from '../services/productService';
import stockService from '../services/stockService';

function Dashboard() {
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalStocks, setTotalStocks] = useState(0);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const productsRes = await productService.getAll(1, 100);
      setTotalProducts(productsRes.data.total);

      const stocksRes = await stockService.getAll(1, 100);
      setTotalStocks(stocksRes.data.total);

      const lowStocks = stocksRes.data.data.filter(stock => stock.quantite < 10);
      setLowStockItems(lowStocks.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Products</h3>
          <p className="text-4xl font-bold text-blue-600 mt-2">{totalProducts}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Total Stock Entries</h3>
          <p className="text-4xl font-bold text-green-600 mt-2">{totalStocks}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-gray-500 text-sm font-medium">Low Stock Alerts</h3>
          <p className="text-4xl font-bold text-red-600 mt-2">{lowStockItems.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Low Stock Items</h2>
        {lowStockItems.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Product</th>
                  <th className="text-left py-2 px-4">Location</th>
                  <th className="text-left py-2 px-4">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {lowStockItems.map((stock) => (
                  <tr key={stock.id} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{stock.product.name}</td>
                    <td className="py-2 px-4">{stock.emplacement}</td>
                    <td className="py-2 px-4">
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded">
                        {stock.quantite}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No low stock items</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
