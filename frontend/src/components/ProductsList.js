import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../slices/productsSlice";
import { CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const ProdutsList = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const status = useSelector((state) => state.products.status);
    const error = useSelector((state) => state.products.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

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
                            <Button variant="outlined" sx={{ marginRight: '10px' }} color="success" size="large">+</Button>
                            <Button variant="outlined" color="error" size="large">-</Button>
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
            <h2>List of Products</h2>
            {content}
        </div>
    );

};

export default ProdutsList;