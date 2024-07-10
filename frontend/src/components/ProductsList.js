import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, fetchProducts, updateProduct, createProduct } from "../slices/productsSlice";
import { CircularProgress, List, ListItem, ListItemText, Typography, Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import ProductForm from "./ProductForm";

const ProdutsList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);


    const handleClickOpen = (product) => {
        setSelectedProduct(product);
        setOpen(true);
    };

    const handleCreate = () => {
        setSelectedProduct(null);
        setIsEditing(true);
    };

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditing(true);
    };

    const handleCloseModal = () => {
        setIsEditing(false);
        setSelectedProduct(null);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedProduct(null);
    };

    const handleDelete = () => {
        if (selectedProduct) {
            dispatch(deleteProduct(selectedProduct._id));
            handleClose();
        }
    };

    const handleSave = (productData) => {
        if (selectedProduct) {
            dispatch(updateProduct({ id: selectedProduct._id, updateProduct: productData }));
        } else {
            dispatch(createProduct(productData));
        }
        handleCloseModal();
    };

    let content;

    if (status === 'loading') {
        content = <CircularProgress />;
    } else if (status === 'succeeded'){
        content = (
            <Card style={{
                width: '100%',
                border: '2px solid rgb(25 118 210)',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 4px 8px 0px',
                marginBottom: '16px',
            }}>
                <CardContent >
                <List>
                    {products.map((product) => (
                        <ListItem key={product._id}>
                            <ListItemText primary={<Typography variant="h6" component="div">
                                    {product.name}</Typography>} secondary={
                                <>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Type : {product.type}
                                    </Typography>
                                    <br />
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Price : ${product.price}
                                    </Typography>
                                    <br />
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Rating : {product.rating}
                                    </Typography>
                                    <br />
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Warrantly Years : {product.warrantly_years}
                                    </Typography>
                                    <br />
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Available : {product.available ? 'Yes' : 'No'}
                                    </Typography>
                                </>
                            } />
                            <IconButton edge="end" aria-label="edit" color="success" sx={{ marginRight: '10px' }} onClick={() => handleEdit(product)}>
                                <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" color="error" onClick={() => handleClickOpen(product)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
                </CardContent>
            </Card>
        );
    } else if (status === 'failed') {
        content = <div>{error}</div>;
    }

    return (
        <div>
           <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <h2>List of Products</h2>
                <Button variant="contained" color="success" onClick={handleCreate}>+</Button>
            </Box> 
            {content}
            {isEditing && (
                <ProductForm product={selectedProduct} open={isEditing} onClose={handleCloseModal} onSave={handleSave} />
            )}
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to remove this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

};

export default ProdutsList;