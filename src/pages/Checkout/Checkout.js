import { error } from 'daisyui/src/colors';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Checkout = () => {
    const{title,price,_id}=useLoaderData();
    const{user}=useContext(AuthContext);

    const handlePlaceOrder =event=>{
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message=form.message.value;

        const order={
            service:_id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if(data.acknowledged){
                    alert('Order placed successfully')
                    form.reset();
                    
                }
            })
        .catch(error=>console.error(error));
    }

    return (
        <div>
           <form onSubmit={handlePlaceOrder} className='my-8 md:p-32 p-8' >
                <h2 className="md:text-4xl md:my-5">You are about to order: {title}</h2>
                <h4 className="md:text-3xl md:my-5">Price:{price} </h4>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name="firstName" type="text" placeholder="First Name" className="input input-ghost w-full  input-bordered" />
                    <input name="lastName" type="text" placeholder="Last Name" className="input input-ghost w-full  input-bordered" />
                    <input name="phone" type="text" placeholder="Your Phone" className="input input-ghost w-full  input-bordered" required />
                    <input name="email" type="text" placeholder="Your email" defaultValue={user?.email}  className="input input-ghost w-full  input-bordered" readOnly />
                </div>
                <textarea name="message" className="textarea textarea-bordered h-24 w-full my-5" placeholder="Your Message" required></textarea>

                <input className='btn btn-sm border-none bg-red-500 hover:bg-red-500' type="submit" value="Place Your Order" />
            </form>
        </div>
    );
};

export default Checkout;