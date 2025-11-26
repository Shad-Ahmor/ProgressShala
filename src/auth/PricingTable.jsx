import React, { useState } from "react";

const PricingTable = ({ onSuccess }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: 1,
      planName: "Basic Internship",
      amount: 199,
      features: ["Task Access", "Dashboard Access", "Certificate"],
    },
    {
      id: 2,
      planName: "Premium Internship",
      amount: 399,
      features: ["All Basic Features", "Team Support", "Fast Approval"],
    },
    {
      id: 3,
      planName: "Pro Creator Internship",
      amount: 699,
      features: [
        "All Premium Features",
        "Custom Mentorship",
        "Guaranteed Project",
      ],
    },
  ];

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);

    // ⭐ Return plan to parent (NO API CALL)
    onSuccess({
      planId: plan.id,
      planName: plan.planName,
      amount: plan.amount,
    });
  };

  return (
    <div className="pricing-container">
      <h2 className="pricing-title">Choose Your Internship Plan</h2>

      <div className="pricing-table-wrapper">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`pricing-card ${
              selectedPlan?.id === plan.id ? "selected" : ""
            }`}
            onClick={() => handleSelectPlan(plan)}
          >
            <h3>{plan.planName}</h3>
            <h1>₹{plan.amount}</h1>

            <ul>
              {plan.features.map((f, index) => (
                <li key={index}>{f}</li>
              ))}
            </ul>

            <button className="choose-btn">
              {selectedPlan?.id === plan.id ? "Selected ✓" : "Choose Plan"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;
