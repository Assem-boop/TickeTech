const generateOtpEmail = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Your OTP Code</title>
  <style>
    body {
      background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
      font-family: 'Segoe UI', sans-serif;
      color: white;
      padding: 40px 20px;
      margin: 0;
    }
    .container {
      max-width: 500px;
      margin: auto;
      background: rgba(255, 255, 255, 0.05);
      padding: 30px;
      border-radius: 15px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    }
    .header {
      text-align: center;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .otp-box {
      text-align: center;
      font-size: 30px;
      letter-spacing: 8px;
      font-weight: bold;
      padding: 20px;
      margin: 30px auto;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 12px;
      border: 1px solid rgba(0, 230, 118, 0.5);
      color: #00e676;
      width: fit-content;
    }
    .footer {
      font-size: 12px;
      text-align: center;
      margin-top: 40px;
      color: #aaa;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">🔐 Password Reset OTP</div>
    <p style="text-align:center;">Here is your One-Time Password:</p>
    <div class="otp-box">${otp}</div>
    <p style="text-align:center;">This code will expire in 5 minutes.</p>
    <p class="footer">If you didn’t request this, please ignore this email.<br/>© ${new Date().getFullYear()} TickeTech</p>
  </div>
</body>
</html>
`;

module.exports = generateOtpEmail;