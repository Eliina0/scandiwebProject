import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import AddProduct from './Components/AddProduct/AddProduct';
import ProductList from './Components/ProductList/ProductList';
import axios from 'axios';

const App = () => {
    const [products, setProducts] = useState([]);
    const [checkedProducts, setCheckedProducts] = useState(new Set());
    const [productData, setProductData] = useState({
        sku: '',
        name: '',
        price: '',
        size: '',
        weight: '',
        height: '',
        width: '',
        length: '',
        productType: ''
    });
    const [errors, setErrors] = useState({});

    console.log(checkedProducts);
    
    useEffect(() => {
        axios.get('http://localhost:8080/php-practice/_Projects/ProductListProject/backend/ProductHandler.php')
            .then(response => {
                if (response.data.success) {
                    setProducts(response.data.data);
                } else {
                    console.error(response.data.error || 'Failed to fetch products');
                }
            })
            .catch(err => {
                console.error('Error fetching products:', err);
            });
    }, []);

    const handleCheckboxChange = (sku) => {
        setCheckedProducts(prevState => {
            const newCheckedProducts = new Set(prevState);
            if (newCheckedProducts.has(sku)) {
                newCheckedProducts.delete(sku);
            } else {
                newCheckedProducts.add(sku);
            }
            return newCheckedProducts;
        });
    };

    const handleMassDelete = () => {
      if (checkedProducts.size === 0) {
          alert('No products selected for deletion.');
          return;
      }
  
      axios.delete('http://localhost:8080/php-practice/_Projects/ProductListProject/backend/ProductHandler.php', {
          data: {
              skus: Array.from(checkedProducts)
          }
      })
      .then(response => {
          if (response.data.success) {
              setProducts(prevProducts => prevProducts.filter(product => !checkedProducts.has(product.sku)));
              setCheckedProducts(new Set());
          } else {
              console.error(response.data.error || 'Failed to delete products');
          }
      })
      .catch(err => {
          console.error('Error deleting products:', err);
      });
  };
  

    const handleSave = () => {
        const formErrors = validateForm(productData);
        if (Object.keys(formErrors).length === 0) {
            axios.post('http://localhost:8080/php-practice/_Projects/ProductListProject/backend/ProductHandler.php', productData)
                .then(response => {
                    if (response.data.success) {
                        window.location.href = '/';
                    } else if (response.data.error) {
                        if (response.data.error.includes('Duplicate entry')) {
                            setErrors({ sku: 'SKU already exists. Please use a different SKU.' });
                        } else {
                            setErrors({ general: response.data.error });
                        }
                    }
                })
                .catch(error => {
                    console.error('Error saving product:', error);
                    setErrors({ general: 'An unexpected error occurred. Please try again.' });
                });
        } else {
            setErrors(formErrors);
        }
    };

    const validateForm = (data) => {
        const newErrors = {};
        if (!data.sku) newErrors.sku = 'SKU is required';
        if (!data.name) newErrors.name = 'Name is required';
        if (!data.price) newErrors.price = 'Price is required';
        if (!data.productType) newErrors.productType = 'Product type is required';
        if (data.productType === 'DVD' && !data.size) newErrors.size = 'Size is required for DVDs';
        if (data.productType === 'Book' && !data.weight) newErrors.weight = 'Weight is required for Books';
        if (data.productType === 'Furniture') {
            if (!data.height || !data.width || !data.length) newErrors.dimensions = 'All dimensions are required for Furniture';
        }
        return newErrors;
    };

    return (
        <div>
            <Router>
                <Navbar onSave={handleSave} onMassDelete={handleMassDelete} />
                <Routes>
                    <Route exact path='/' element={<ProductList products={products} onCheckboxChange={handleCheckboxChange} />} />
                    <Route path='/add-product' element={
                        <AddProduct 
                            productData={productData} 
                            setProductData={setProductData} 
                            errors={errors} 
                            setErrors={setErrors}
                        />
                    } />
                </Routes>
                <Footer />
            </Router>
        </div>
    );
};

export default App;