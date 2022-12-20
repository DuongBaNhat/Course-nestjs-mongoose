
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AddCreditCardDto, CreateChargeDto } from 'src/database/dto/charge.dto';
import { CardDto } from 'src/database/dto/customer.dto';
import { CreateStripe } from 'src/database/dto/order.dto';
import Stripe from 'stripe';

@Injectable()
export default class StripeService {

    private stripe: Stripe;

    constructor(
        private configService: ConfigService
    ) {
        this.stripe = new Stripe(configService.get('STRIPE_SECRET_KEY'), {
            apiVersion: '2022-11-15',
        });
    }

    async addCard(stripeCustomerId: string, cardDto: CardDto) {
        const cardToken = await this.stripe.tokens.create({ card: { ...cardDto } });

        const card = await this.stripe.customers.createSource(
            stripeCustomerId,
            { source: cardToken.id }
        );

        return card;
    }
    
    async createCustomer(name: string, email: string) {
        return this.stripe.customers.create({
            name,
            email
        });
    }

    async pay(stripeCustomerId: string, createStripe: CreateStripe) {

        const paymentIntent: Stripe.PaymentIntentCreateParams = {
            amount: createStripe.amount,
            description: createStripe.description,
            currency: this.configService.get('STRIPE_CURRENCY'),
            customer: stripeCustomerId,
            confirm: true,

        }
        const pay = await this.stripe.paymentIntents.create(paymentIntent)
        if (pay) {
            return await this.stripe.paymentIntents.retrieve(`${pay.id}`, {
                expand: ['latest_charge.balance_transaction'],
            }) as any;
        }

        return pay;
    }

    attachCreditCard(addCreditCardDto: AddCreditCardDto, stripeCustomerId: string) {
        return this.stripe.setupIntents.create({
            payment_method: addCreditCardDto.payment_method,
            customer: stripeCustomerId,
        })
    }


    async chargeBySavedCard(createChargeDto: CreateChargeDto, stripeCustomerId: string) {
        return this.stripe.paymentIntents.create({
            ...createChargeDto,
            customer: stripeCustomerId,
            currency: this.configService.get('STRIPE_CURRENCY'),
            off_session: true,
            confirm: true
        })
    }
    async listCreditCards(stripeCustomerId: string) {
        const cards = await this.stripe.paymentMethods.list({
            customer: stripeCustomerId,
            type: 'card',
        });
        if (!cards) {
            return cards;
        }
        const result = cards.data.map((value, index) => {
            return {
                customer: value.customer,
                brand: value.card.brand,
                payment_method: value.id,
                object: value.object,
                type: value.type,
                last4: value.card.last4,
                // billing_details: value.billing_details ,
                // full_info: value,
            }
        });


        return result;
    }

    async listPayments() {
        return await this.stripe.balanceTransactions.list({});
    }
}