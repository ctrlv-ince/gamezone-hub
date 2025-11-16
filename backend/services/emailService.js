const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendOrderStatusUpdate = async (to, order, pdfBuffer) => {
  // Status badge colors - safe defaults
  const statusColors = {
    'pending': { bg: '#fef3c7', text: '#92400e', border: '#fbbf24' },
    'processing': { bg: '#dbeafe', text: '#1e3a8a', border: '#3b82f6' },
    'shipped': { bg: '#e0e7ff', text: '#3730a3', border: '#6366f1' },
    'delivered': { bg: '#d1fae5', text: '#065f46', border: '#10b981' },
    'cancelled': { bg: '#fee2e2', text: '#991b1b', border: '#ef4444' },
  };

  const statusColor = statusColors[order.status?.toLowerCase()] || statusColors['processing'];
  const orderIdString = order._id ? order._id.toString() : 'N/A';
  const orderIdShort = orderIdString !== 'N/A' ? orderIdString.slice(-8) : 'N/A';
  const customerName = order.user?.username || 'Gamer';
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }) : 'N/A';

  const mailOptions = {
    from: `"Gamezone Hub" <${process.env.EMAIL_USER}>`,
    to,
    subject: `🎮 Order ${order.status || 'Update'} - #${orderIdShort}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #ffffff;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0a0e27 0%, #1a1a2e 100%); padding: 40px 30px; text-align: center; border-bottom: 4px solid #8b00ff;">
              <h1 style="margin: 0; color: #ffffff; font-size: 32px; font-weight: 800; letter-spacing: 2px;">GAMEZONE HUB</h1>
              <p style="margin: 10px 0 0 0; color: #00d4ff; font-size: 14px; letter-spacing: 1px;">YOUR PREMIUM GAMING STORE</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <p style="font-size: 18px; color: #1f2937; margin-bottom: 20px; line-height: 1.6;">
                Hello, <strong>${customerName}</strong>!
              </p>
              
              <p style="font-size: 18px; color: #1f2937; margin-bottom: 20px; line-height: 1.6;">
                Great news! Your order status has been updated.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <span style="display: inline-block; padding: 12px 24px; border-radius: 8px; font-weight: 700; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; background-color: ${statusColor.bg}; color: ${statusColor.text}; border: 2px solid ${statusColor.border};">
                  ${order.status ? order.status.toUpperCase() : 'PROCESSING'}
                </span>
              </div>

              <div style="background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%); border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px; margin: 30px 0;">
                <p style="font-size: 14px; color: #6b7280; margin: 0 0 8px 0;">
                  <strong style="color: #1f2937;">Order ID:</strong> #${orderIdString}
                </p>
                <p style="font-size: 14px; color: #6b7280; margin: 0;">
                  <strong style="color: #1f2937;">Order Date:</strong> ${orderDate}
                </p>
              </div>

              <div style="height: 2px; background: linear-gradient(to right, transparent, #8b00ff, #00d4ff, transparent); margin: 30px 0;"></div>

              <h2 style="font-size: 20px; color: #1f2937; font-weight: 700; margin: 30px 0 15px 0; padding-bottom: 10px; border-bottom: 2px solid #8b00ff;">
                📦 Order Summary
              </h2>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 20px 0;">
                ${order.orderItems && order.orderItems.length > 0 ? order.orderItems.map(item => `
                  <tr>
                    <td style="background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; margin-bottom: 10px;">
                      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tr>
                          <td style="width: 70%;">
                            <div style="font-size: 16px; color: #1f2937; font-weight: 600; margin-bottom: 5px;">
                              ${item.product?.name || 'Product'}
                            </div>
                            <div style="font-size: 14px; color: #6b7280;">
                              Quantity: ${item.quantity || 0} × $${item.price ? item.price.toFixed(2) : '0.00'}
                            </div>
                          </td>
                          <td style="width: 30%; text-align: right; font-size: 16px; color: #00d4ff; font-weight: 700;">
                            $${item.quantity && item.price ? (item.quantity * item.price).toFixed(2) : '0.00'}
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <tr><td style="height: 10px;"></td></tr>
                `).join('') : '<tr><td style="padding: 20px; text-align: center; color: #6b7280;">No items found</td></tr>'}
              </table>

              <div style="background: linear-gradient(135deg, #8b00ff 0%, #00d4ff 100%); border-radius: 12px; padding: 20px; margin: 30px 0; text-align: right;">
                <div style="font-size: 18px; color: #ffffff; font-weight: 600; margin-bottom: 5px;">Total Amount</div>
                <div style="font-size: 32px; color: #ffffff; font-weight: 800;">$${order.totalPrice ? order.totalPrice.toFixed(2) : '0.00'}</div>
              </div>

              <div style="height: 2px; background: linear-gradient(to right, transparent, #8b00ff, #00d4ff, transparent); margin: 30px 0;"></div>

              <p style="color: #6b7280; font-size: 14px; line-height: 1.6;">
                Your receipt is attached to this email for your records. If you have any questions about your order, 
                please don't hesitate to contact our support team.
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1f2937; padding: 30px; text-align: center; color: #9ca3af; font-size: 13px;">
              <p style="margin: 5px 0;"><strong>Need Help?</strong></p>
              <p style="margin: 5px 0;">Contact us at <a href="mailto:support@gamezonehub.com" style="color: #00d4ff; text-decoration: none;">support@gamezonehub.com</a></p>
              <p style="margin: 5px 0;">or call 1-800-GAMEZONE</p>
              <p style="margin: 20px 0 5px 0; font-size: 11px;">
                © ${new Date().getFullYear()} Gamezone Hub. All rights reserved.<br>
                123 Gaming Street, Gametown
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
    attachments: pdfBuffer ? [
      {
        filename: `receipt-${orderIdString}.pdf`,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ] : [],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOrderStatusUpdate };