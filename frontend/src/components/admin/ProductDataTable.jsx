import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getAllProducts } from '../services/productService';

const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'price', headerName: 'Price', width: 150 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'platform', headerName: 'Platform', width: 150 },
  { field: 'stock', headerName: 'Stock', width: 150 },
];

const ProductDataTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response.data);
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5, 
            },
          },
        }}
        pageSizeOptions={[5, 10, 25]} 
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default ProductDataTable;