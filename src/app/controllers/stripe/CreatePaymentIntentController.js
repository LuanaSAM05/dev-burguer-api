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
      ),
    });

    try {
      schema.validateSync(req.body, {
        abortEarly: false,
        strict: true,
      });
    } catch (err) {
      return res.status(400).json({
        message: 'Validation failed!',
        errors: err.errors,
      });
    }

    const { products } = req.body;

    const amount = calculatedOrderAmount(products);

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // 💰 valor em centavos
        currency: 'brl',

        // 🔥 CORREÇÃO PRINCIPAL (OBRIGATÓRIO)
        payment_method_types: ['card', 'pix'],

      });

      return res.json({
        clientSecret: paymentIntent.client_secret,
      });

    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Erro ao criar pagamento',
      });
    }
  }
}

export default new CreatePaymentIntentController();