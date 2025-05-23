const generateOtpEmail = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your OTP Code</title>
  <style>
    body {
      background: linear-gradient(to right, #0f0c29, #302b63, #24243e);
      font-family: 'Arial', sans-serif;
      color: white;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background: rgba(255, 255, 255, 0.1);
      padding: 40px;
      border-radius: 15px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
      text-align: center;
    }
    .header {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 20px;
      color: #00e676;
    }
    .sub-header {
      font-size: 16px;
      margin-bottom: 30px;
      color: #ccc;
    }
    .otp-box {
      display: inline-block;
      font-size: 36px;
      letter-spacing: 8px;
      font-weight: bold;
      padding: 15px 30px;
      margin: 20px 0;
      background: rgba(0, 0, 0, 0.6);
      border-radius: 12px;
      border: 1px solid #00e676;
      color: #00e676;
    }
    .message {
      font-size: 16px;
      line-height: 1.6;
      color: #ddd;
      margin-bottom: 30px;
    }
    .footer {
      font-size: 12px;
      color: #aaa;
      margin-top: 40px;
    }
    .footer a {
      color: #00bcd4;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">🔐 Secure Your Account</div>
    <div class="sub-header">Hello ${name},</div>
    <p class="message">
      We received a request to reset your password. Use the One-Time Password (OTP) below to proceed. 
      This code is valid for the next <strong>5 minutes</strong>.
    </p>
    <div class="otp-box">${otp}</div>
    <p class="message">
      If you did not request this, please ignore this email or contact our support team immediately.
    </p>
    <p class="footer">
      Need help? <a href="https://support.ticketech.com">Contact Support</a><br />
      © ${new Date().getFullYear()} TickeTech. All rights reserved.
    </p>
  </div>
</body>
</html>
`;

module.exports = generateOtpEmail;