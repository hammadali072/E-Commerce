import React from 'react';
import { Navigate } from 'react-router-dom';

import InnerHero from '../components/innerHero/innerHero';
import CheckoutForm from '../components/checkoutForm/checkoutForm';
import CheckoutSummary from '../components/checkoutSummary/checkoutSummary';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
    const { items } = useCart();

    if (items.length === 0) {
        return <Navigate to="/cart" replace />;
    }

    return (
        <>
            <InnerHero
                title="Checkout"
                subtitle="COMPLETE YOUR ORDER"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: 'Cart', path: '/cart' },
                    { label: 'Checkout', active: true }
                ]}
            />

            <section className="py-12 md:py-20 lg:py-24">
                <div className="container">
                    <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                        <div className="w-full lg:w-[60%] xl:w-[65%]">
                            <CheckoutForm />
                        </div>

                        <div className="w-full lg:w-[40%] xl:w-[35%]">
                            <CheckoutSummary />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CheckoutPage;
