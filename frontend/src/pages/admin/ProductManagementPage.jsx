import React, { useState } from 'react';
import ProductDataTable from '../../components/admin/ProductDataTable';
import CreateProductModal from '../../components/admin/CreateProductModal';
import { Button } from '@mui/material';

const ProductManagementPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <h1>Product Management</h1>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Create Product
      </Button>
      <ProductDataTable />
      <CreateProductModal open={open} handleClose={handleClose} />
    </div>
  );
};

export default ProductManagementPage;