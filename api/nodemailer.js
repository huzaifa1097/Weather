const nodemailer = require("nodemailer");

// Set up the email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
});

const sendEmailAlert = (subject, text) => {
  const mailOptions = {
    from: "your-email@gmail.com",
    to: "recipient-email@gmail.com",
    subject,
    text,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

// Modify checkForAlerts to send email alerts
const checkForAlerts = (latestData, thresholds) => {
  const { temp_celsius, condition } = latestData;
  const { tempThreshold, specificCondition } = thresholds;

  if (temp_celsius > tempThreshold) {
    alertState.consecutiveAlerts += 1;

    if (alertState.consecutiveAlerts >= 2) {
      const alertMessage = `Alert: Temperature exceeds ${tempThreshold}°C! Current: ${temp_celsius}°C`;
      console.log(alertMessage);
      sendEmailAlert("Temperature Alert", alertMessage); // Send email
      alertState.consecutiveAlerts = 0; // Reset after alerting
    }
  } else {
    alertState.consecutiveAlerts = 0; // Reset if below threshold
  }

  if (specificCondition && condition === specificCondition) {
    const alertMessage = `Alert: Current weather condition is ${condition}`;
    console.log(alertMessage);
    sendEmailAlert("Weather Condition Alert", alertMessage); // Send email
  }
};
