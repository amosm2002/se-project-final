import { loadStripe } from '@stripe/stripe-js'
import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import PaymentForm from './PaymentForm'

const PUBLIC_KEY = "pk_test_51MZhWVBDbLXLPKqShy9eOAHqZHoEveD71quiHMpj8HBsf6FgMOkRPwyeN9cmfgVANBrEN3v0o4pi4ANQSN4bjWz000nxCbbEtS"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
        <PaymentForm />
    </Elements>
  )
}

export default StripeContainer