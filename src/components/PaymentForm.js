import React from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from "axios";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import "./PaymentForm.css"

// import { db } from '../firebase.config';
// import useAuth from '../custom-hooks/useAuth';
// import { collection, onSnapshot } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

const CARD_OPTIONS = {
	iconStyle: "solid",
	style: {
		base: {
			iconColor: "#gray",
			color: "black",
			fontWeight: 700,
			fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
			fontSize: "16px",
			fontSmoothing: "antialiased",
			":-webkit-autofill": { color: "#fce883" },
			"::placeholder": { color: "gray" }
		},
		invalid: {
			iconColor: "#red",
			color: "#red"
		}
	}
}


function PaymentForm() {
    
    const navigate = useNavigate();
    //const { currentUser } = useAuth();
    // const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector(state => state.cart.totalAmount);
    const [success, setSuccess ] = useState(false)
    const stripe = useStripe()
    const elements = useElements()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        


    if(!error) {
        try {
            const tax = (totalAmount * .0825);
            const totalPrice = (totalAmount + tax).toFixed(2)
            const {id} = paymentMethod
            const response = await axios.post("http://127.0.0.1:5001/se-project-known/us-central1/api", {
                amount: totalPrice * 100,
                id
            })
            

            if(response.data.success) {

                console.log(paymentMethod.id)
                console.log("Successful Payment")
                setSuccess(true)
                navigate("/orders");
                
            }

        } catch (error) {
            console.log("Error", error)
        }
    } else {
        console.log(error.message)
    }
}
    return (
        <>
            {!success ?
            <form onSubmit={handleSubmit}>
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS}/>
                    </div>
                <button className="buttonEdit">
                  Place an order
                </button>
            </form>
            :
            <div>
                <h2>You Just bought a sweet spatula</h2>
            </div>
            }
        </>
  )
}

export default PaymentForm