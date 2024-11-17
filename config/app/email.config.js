'use strict';
const date = new Date();
const year = date.getFullYear();
const AppointmentConfirmationTemplate = (
  PatientName = '',
  doctorName = '',
  department = '',
  date = '',
  slotTime = '',
  appointmentId = '',
  queue = '',
) => {
  return `

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f9;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid #e6e6e6;
    }
    .header {
      background-color: #5a9a6f;
      color: #ffffff;
      padding: 30px 20px;
      text-align: center;
      font-size: 26px;
      font-weight: bold;
      letter-spacing: 1px;
    }
    .content {
      padding: 25px 20px;
      color: #333333;
    }
    .content p {
      margin: 12px 0;
      line-height: 1.8;
    }
    .details {
      margin: 20px 0;
      padding: 20px;
      background-color: #f9fdf9;
      border: 1px solid #e0f2e9;
      border-radius: 8px;
    }
    .details p {
      margin: 8px 0;
      color: #555555;
    }
    .details p span {
      font-weight: bold;
      color: #333333;
    }
    .footer {
      background-color: #f9f9f9;
      color: #777777;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      border-top: 1px solid #e6e6e6;
    }
    .footer a {
      color: #5a9a6f;
      text-decoration: none;
    }
    .footer a:hover {
      text-decoration: underline;
    }
    .cta-button {
      display: inline-block;
      margin: 20px 0 10px;
      padding: 10px 25px;
      background-color: #5a9a6f;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
    }
    .cta-button:hover {
      background-color: #4a865d;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="header">
      🩺 Appointment Confirmed
    </div>
    <div class="content">
      <p>Dear <strong>${PatientName}</strong>,</p>
      <p>We are excited to confirm your appointment with <strong>${doctorName}</strong>. Please review the appointment details below:</p>
      <div class="details">
        <p>👨‍⚕️ <span>Doctor:</span> ${doctorName}</p>
        <p>🏢 <span>Department:</span> ${department}</p>
        <p>📅 <span>Date:</span> ${date}</p>
        <p>⏰ <span>Time Slot:</span> ${slotTime}</p>
        <p>🆔 <span>Appointement ID:</span> ${appointmentId}</p>
        <p>👤 <span>Appointment Queue:</span> ${queue}</p>
      </div>
      <p>Please arrive at least 10 minutes early to ensure a smooth check-in process. If you need assistance or wish to reschedule, contact us at <a href="mailto:clinic@example.com">clinic@example.com</a>.</p>
      <a href="https://mediboard-66331.web.app/Patient/${appointmentId}" class="cta-button">View Appointment Details</a>
    </div>
    <div class="footer">
      <p>Thank you for choosing <strong>MediBoard</strong>.</p>
      <p><em>If you cannot attend, please notify us at least 24 hours in advance.</em></p>
      <p>&copy; ${year} MediBoard. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>

`;
};

const EmailTemplates = {
  AppointmentConfirmationTemplate,
};

export default EmailTemplates;
