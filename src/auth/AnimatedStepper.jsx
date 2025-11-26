import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Paper,
  LinearProgress,
  Button,
  CircularProgress,
} from "@mui/material";
import { CSSTransition } from "react-transition-group";

import PricingTable from "./PricingTable.jsx";
import AccountCreate from "./AccountCreate.jsx";
import axios from "axios";

const AnimatedStepper = ({ onSuccessClose }) => {
  const [activeStep, setActiveStep] = useState(0);

  const [userPayload, setUserPayload] = useState({
    personalInfo: null, 
    planInfo: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // ⭐ FINAL SUBMIT (Modified for Single API Call)
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);

    try {
      const { personalInfo, planInfo } = userPayload;

      // 🛑 CRITICAL: Single API Call to handle both Signup and Plan Assignment
      const finalRes = await axios.post(
        "http://localhost:5000/auth/signup", // आपका नया सिंगल-फंक्शन एंडपॉइंट
        {
          email: personalInfo.email,
          password: personalInfo.password,
          role: "intern", // Assuming a fixed role
          username: personalInfo.fullName,
          // Plan details for combined operation
          planName: planInfo.planName, 
          // internshipStart is required by your server logic
          internshipStart: new Date().toISOString(), 
          
          // Note: planName must match the property name expected by your modified server API
        }
      );

      // Successfully received response means account is created and plan is assigned
      console.log("Final submission successful:", finalRes.data);
      alert("Account created and plan assigned successfully!");

      // 💡 If needed, save the token here: 
      // localStorage.setItem('userToken', finalRes.data.token);

      if (onSuccessClose) onSuccessClose();
    } catch (err) {
      console.error("🔥 FINAL SUBMIT ERROR:", err);
      // Display specific error message from the server if available
      let errorMessage = err.response?.data?.message || "Something went wrong during submission.";
      alert(`Submission Failed: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ⭐ STEPS (Unmodified)
  const steps = [
    {
      label: "Personal Info",
      content: (
        <AccountCreate
          onSuccess={(data) => {
            setUserPayload((prev) => ({ ...prev, personalInfo: data }));
            handleNext();
          }}
        />
      ),
    },
    {
      label: "Select Plan",
      content: (
        <PricingTable
          onSuccess={(plan) => {
            setUserPayload((prev) => ({ ...prev, planInfo: plan }));
            handleNext();
          }}
        />
      ),
    },
    {
      label: "Review & Submit",
      content: (
        <Box sx={{ textAlign: "center", p: 3 }}>
          <h2>Review Details</h2>

          <Box
            sx={{
              padding: 2,
              background: "rgba(255,255,255,0.08)",
              borderRadius: "12px",
              marginBottom: 2,
              textAlign: "left",
            }}
          >
            <h4>👤 Personal Info</h4>
            <p><b>Name:</b> {userPayload.personalInfo?.fullName}</p>
            <p><b>Email:</b> {userPayload.personalInfo?.email}</p>

            <hr style={{ opacity: 0.3 }} />

            <h4>📦 Plan Info</h4>
            <p><b>Plan:</b> {userPayload.planInfo?.planName}</p>
            <p><b>Amount:</b> ₹{userPayload.planInfo?.amount}</p>
          </Box>

          {!isSubmitting ? (
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              onClick={handleFinalSubmit}
            >
              Submit & Create Account
            </Button>
          ) : (
            <CircularProgress />
          )}

          {/* BACK BUTTON FIXED FOR STEP 3 */}
          <p
            style={{ marginTop: 20, cursor: "pointer", color: "#aaa" }}
            onClick={handleBack}
          >
            ← Back
          </p>
        </Box>
      ),
    },
  ];

  return (
    <Box className="account-create-form-panel" 
      sx={{ height: "100%", display: "flex", flexDirection: "column", position: "relative" }}
    >
      <Paper
        sx={{
          backgroundColor: "transparent",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* STEPPER */}
        <Stepper activeStep={activeStep}>
          {steps.map((s, i) => (
            <Step key={i}><StepLabel>{s.label}</StepLabel></Step>
          ))}
        </Stepper>

        {/* ----------------- STEP CONTENT CONTAINER ----------------- */}
        <Box 
          className="step-content-container" 
          sx={{ 
            flexGrow: 1,
            overflowY: "auto",
            paddingBottom: 4
          }}
        >
          <CSSTransition in={true} timeout={400} classNames="fade" appear>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              {steps[activeStep].content}
            </Box>
          </CSSTransition>
        </Box>
        {/* ------------------------------------------------------------------ */}


        {/* ---------------- BACK BUTTONS FOR STEP 1 & 2 ---------------- */}
        {activeStep < 2 && (
          <Box sx={{ m: 4, display: "flex", justifyContent: "space-between" }}>
            
            {/* BACK button (disabled on step 0) */}
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>

            <LinearProgress
              variant="determinate"
              value={((activeStep + 1) / steps.length) * 100}
              sx={{ flexGrow: 1, ml: 2, height: "8px", borderRadius: "5px" }}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AnimatedStepper;