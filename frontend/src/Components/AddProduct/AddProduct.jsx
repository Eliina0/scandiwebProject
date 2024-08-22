import React from 'react';
import './addProduct.scss';

const AddProduct = ({ productData, setProductData, errors, setErrors }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevState => ({ ...prevState, [name]: value }));
        setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    };

    const handleProductTypeChange = (e) => {
        const type = e.target.value;
        setProductData(prevState => ({ ...prevState, productType: type }));
        setErrors(prevErrors => ({ ...prevErrors, productType: '' }));
    };


    return (
        <div className="add-product">
            <form className="product-form">
                <div className="form-group">
                    <label htmlFor="sku">SKU:</label>
                    <input
                        type="text"
                        id="sku"
                        name="sku"
                        value={productData.sku}
                        onChange={handleChange}
                        placeholder="SKU"
                        className={errors.sku ? 'error-input' : ''}
                    />
                    {errors.sku && <p className="error-message">{errors.sku}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={productData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className={errors.name ? 'error-input' : ''}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price ($):</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={productData.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className={errors.price ? 'error-input' : ''}
                    />
                    {errors.price && <p className="error-message">{errors.price}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="productType">Product Type:</label>
                    <select
                        id="productType"
                        name="productType"
                        value={productData.productType}
                        onChange={handleProductTypeChange}
                        className={errors.productType ? 'error-input' : ''}
                    >
                        <option value="">Select type</option>
                        <option value="DVD">DVD</option>
                        <option value="Book">Book</option>
                        <option value="Furniture">Furniture</option>
                    </select>
                    {errors.productType && <p className="error-message">{errors.productType}</p>}
                </div>

                {productData.productType === 'DVD' && (
                    <div className="form-group">
                        <label htmlFor="size">Size (in MB):</label>
                        <input
                            type="number"
                            id="size"
                            name="size"
                            value={productData.size}
                            onChange={handleChange}
                            placeholder="Size in MB"
                            className={errors.size ? 'error-input' : ''}
                        />
                        {errors.size && <p className="error-message">{errors.size}</p>}
                    </div>
                )}

                {productData.productType === 'Book' && (
                    <div className="form-group">
                        <label htmlFor="weight">Weight (in Kg):</label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            value={productData.weight}
                            onChange={handleChange}
                            placeholder="Weight in Kg"
                            className={errors.weight ? 'error-input' : ''}
                        />
                        {errors.weight && <p className="error-message">{errors.weight}</p>}
                    </div>
                )}

{productData.productType === 'Furniture' && (
    <>
        <div className="form-group">
            <label htmlFor="height">Height (cm):</label>
            <input
                type="number"
                id="height"
                name="height"
                value={productData.height}
                onChange={handleChange}
                placeholder="Height"
                className={errors.dimensions ? 'error-input' : ''}
            />
            {errors.dimensions && <p className="error-message">{errors.dimensions}</p>}
        </div>

        <div className="form-group">
            <label htmlFor="width">Width (cm):</label>
            <input
                type="number"
                id="width"
                name="width"
                value={productData.width}
                onChange={handleChange}
                placeholder="Width"
                className={errors.dimensions ? 'error-input' : ''}
            />
            {errors.dimensions && <p className="error-message">{errors.dimensions}</p>}
        </div>

        <div className="form-group">
            <label htmlFor="length">Length (cm):</label>
            <input
                type="number"
                id="length"
                name="length"
                value={productData.length}
                onChange={handleChange}
                placeholder="Length"
                className={errors.dimensions ? 'error-input' : ''}
            />
            {errors.dimensions && <p className="error-message">{errors.dimensions}</p>}
        </div>
    </>
)}


                {errors.general && <p className="error-message">{errors.general}</p>}
            </form>
        </div>
    );
};

export default AddProduct;
