import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';
import { useContext, useState } from 'react';
import { CartContext } from '../../_context/CartContext';
import { useUser } from '@clerk/clerk-react';
import { CreateOrder } from './../../_utila/OrderApi';
import { deleteUserCart } from '../../_utila/CartApi';
import { PacmanLoader } from 'react-spinners';

const CheckoutForm = ({ amount }) => {
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [press,setpress]=useState(false)

  const handleSubmit = async (event) => {
    setpress(true);
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message)
    }
    createOrder();
/*     sendEmail(); */
    // Trigger form validation and wallet collection
    const {error: submitError} = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    const res = await fetch('api/create-intent', {
      method: 'POST',
      body: JSON.stringify({
        amount: amount,
      }),
    })
    const clientSecret = await res.json();
    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      clientSecret,
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/payment-sucess",
      },
    });
  };

  const createOrder = () => {
    let productId = []
    cart.forEach(el => {
      productId.push(el?.product?.id)
    });
    const data = {
      data:{
        username: user.fullName,
        email: user.primaryEmailAddress.emailAddress,
        amount,
        products:productId
      }
    }
    CreateOrder(data).then(res => {
      if (res) {
        cart.forEach(el => {
          deleteUserCart(el?.id).then(result => {
          })
        })
      }
    })
  }

/*   const sendEmail = async () => {
    const res = await fetch('api/send-email', {
      method: 'POST',
    })
  } */

  return (
    <form onSubmit={handleSubmit}>
      <div className='mx-32 md:mx-[320px] mt-12'>
        <PaymentElement />
        {
          !press ?
            (<button className='w-full p-2 mt-4 text-white rounded-md bg-primary'>Submit</button>)
            :
            (
              <div className='flex justify-center pt-10'>
                <PacmanLoader
                  color="#08D9D6"
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            )
        }
      </div>
    </form>
  );
};

export default CheckoutForm;