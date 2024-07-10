import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProduct } from "../slices/productsSlice";
import { Modal, Box, TextField, Button, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';

const ProductForm = ({ product, open, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({ ...product });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setFormData({ ...product });
    }, [product]);

    const validate = () => {
        let temp = {};
        temp.name = formData.name ? "" : "This field is required.";
        temp.type = formData.type ? "" : "This field is required.";
        temp.price = formData.price > 0 ? "" : "The price must be a positive number.";
        temp.rating = formData.rating >= 0 && formData.rating <= 5 ? "" : "Rating must be between 0 and 5.";
        temp.warrantly_years = formData.warrantly_years > 0 ? "" : "Warranty years should be a positive number.";
        setErrors({...temp});
        return Object.values(temp).every(x => x === "");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name] : value });
    }

    const handleRadioChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, available: value === "yes" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            dispatch(updateProduct({ id: product._id, updateProduct: formData}));
            onClose();
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box component="form" onSubmit={handleSubmit} sx={{p:4, bgcolor: 'background.paper', margin: 'auto', width: 400 }}>
                <TextField name="name" label="Name" value={formData.name} onChange={handleChange} fullWidth margin="normal" {...(errors.name && {error: true, helperText: errors.name})}/>
                <TextField name="type" label="Type" value={formData.type} onChange={handleChange} fullWidth margin="normal" {...(errors.type && {error: true, helperText: errors.type})}/>
                <TextField name="price" label="Price" value={formData.price} onChange={handleChange} fullWidth margin="normal" {...(errors.price && {error: true, helperText: errors.price})}/>
                <TextField name="rating" label="Rating" value={formData.rating} onChange={handleChange} fullWidth margin="normal" {...(errors.rating && {error: true, helperText: errors.rating})}/>
                <TextField name="warrantly_years" label="Warrantly Years" value={formData.warrantly_years} onChange={handleChange} fullWidth margin="normal"{...(errors.warrantly_years && {error: true, helperText: errors.warrantly_years})} />
                <FormControl margin="normal">
                    <FormLabel component="legend">Available</FormLabel>
                    <RadioGroup aria-labelledby="available" value={formData.available ? 'yes' : 'no'} name="available" onChange={handleRadioChange}>
                        <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                        <FormControlLabel value="no" control={<Radio />} label="No" />
                    </RadioGroup>
                </FormControl>
                <Box mt={2}>
                    <Button type="submit" variant="contained" color="primary">Update</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default ProductForm;