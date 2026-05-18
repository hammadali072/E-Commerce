import { useNavigate, useParams } from 'react-router-dom';
import ProductForm from '../../components/admin/productForm/productForm';
import { useProducts } from '../../context/ProductContext';
import TitleComponent from '../../components/titleComponent/titleComponent';

const EditProductPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { getProductById, updateProduct, deleteProduct } = useProducts();

    const product = getProductById(id);

    if (!product) {
        return null;
    }

    const handleUpdate = (data) => {
        updateProduct(id, data);
        navigate('/admin/products');
    };

    const handleDelete = () => {
        deleteProduct(id);
        navigate('/admin/products');
    };

    const handleCancel = () => {
        navigate('/admin/products');
    };

    return (
        <ProductForm
            initialData={product}
            isEditMode={true}
            onSubmit={handleUpdate}
            onDelete={handleDelete}
            onCancel={handleCancel}
            title="Edit Product"
            subtitle={
                <TitleComponent size="small-medium" className="text-dark/40 mt-1 flex gap-1">
                    Editing: <span className="text-amber font-bold">{product.name}</span>
                </TitleComponent>
            }
        />
    );
};

export default EditProductPage;
