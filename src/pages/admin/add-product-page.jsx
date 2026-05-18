import { useNavigate } from 'react-router-dom';
import ProductForm from '../../components/admin/productForm/productForm';
import { useProducts } from '../../context/ProductContext';
import TitleComponent from '../../components/titleComponent/titleComponent';

const AddProductPage = () => {
    const navigate = useNavigate();
    const { addProduct } = useProducts();

    const handleSave = (data) => {
        addProduct(data);
        navigate('/admin/products');
    };

    const handleCancel = () => {
        navigate('/admin/products');
    };

    return (
        <ProductForm
            initialData={null}
            isEditMode={false}
            onSubmit={handleSave}
            onCancel={handleCancel}
            title="Add New Product"
            subtitle={
                <TitleComponent size="small-medium" className="text-dark/40 mt-1">
                    Fill in the details below to add a new product to your catalog
                </TitleComponent>
            }
        />
    );
};

export default AddProductPage;
