import React from 'react';
import './productList.scss';

const ProductList = ({ products, onCheckboxChange }) => {
    console.log(products);
    
    return (
        <div className="product-list">
            {products.length === 0 ? (
                <p>No products available</p>
            ) : (
                products.map(product => (
                    <div key={product.sku} className="product-card">
                        <div className='checkbox'>
                            <input
                                type="checkbox"
                                className="delete-checkbox"
                                onChange={() => onCheckboxChange(product.sku)}
                            />
                        </div>
                        <div className="product-info">
                            <h3>{product.name}</h3>
                            <p>SKU: {product.sku}</p>
                            <p>Price: ${product.price}</p>
                            {product.type === 'DVD' && (
                                <p>Size: {product.size} MB</p>
                            )}
                            {product.type === 'Book' && (
                                <p>Weight: {product.weight} Kg</p>
                            )}
                            {product.type === 'Furniture' && (
                                <div className="furniture-dimensions">
                                    <p>Dimension: {product.height}x{product.width}x{product.length} </p>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProductList;
