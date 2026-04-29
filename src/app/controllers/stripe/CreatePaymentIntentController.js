import Stripe from 'stripe';
import * as Yup from 'yup';
import 'dotenv/config';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

function calculatedOrderAmount(products) {
    return products.reduce((acc, product) => {
        return acc + product.price * product.quantity;
    }, 0);
}

class CreatePaymentIntentController {
    async store(req, res) {
        const schema = Yup.object({
            products: Yup.array().required().of(
                Yup.object({
                    id: Yup.number().required(),
                    quantity: Yup.number().required(),
                    price: Yup.number().required(),
                })
            )
        });

        try {
            schema.validateSync(req.body, {
                abortEarly: false,
                strict: true
            });
        } catch (err) {
            return res.status(400).json({
                message: 'Validation failed!',
                errors: err.errors,
            });
        }

        const { products } = req.body;

        const amount = calculatedOrderAmount(products);

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'brl',
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
            dpmCheckerLink: `https://dashboard.stripe.com/settings/payment_methods/review?transaction_id=${paymentIntent.id}`,
        });
    }
}

export default new CreatePaymentIntentController();