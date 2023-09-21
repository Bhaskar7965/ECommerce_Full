import React from 'react';
import './CheckoutSteps.css';
import { Stepper, Step } from 'react-form-stepper'; // Import the Stepper and Step components
import { GiConfirmed } from 'react-icons/gi';
import { BsCurrencyRupee } from 'react-icons/bs';
import { RiTakeawayFill } from 'react-icons/ri';

const CheckoutSteps = ({ activeStep }) => {
    const steps = [
        {
            label: 'Shipping Details',
            icon: <RiTakeawayFill />,
        },
        {
            label: 'Confirm Order',
            icon: <GiConfirmed />,
        },
        {
            label: 'Payment',
            icon: <BsCurrencyRupee />,
        },
    ];

    return (
        <Stepper activeStep={activeStep} className="checkout-steps">
            {steps.map((step, index) => (
                <Step key={index} label={step.label}>
                    <div
                        className={`checkout-steps__step ${index === activeStep ? 'checkout-steps__step--active' : ''
                            }`}
                    >
                        <div className="checkout-steps__step-icon">{step.icon}</div>
                    </div>
                </Step>
            ))}
        </Stepper>
    );
};

export default CheckoutSteps;
