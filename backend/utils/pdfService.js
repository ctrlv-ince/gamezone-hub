const PDFDocument = require('pdfkit');

/**
 * Generates a receipt PDF for a given order with gaming aesthetics.
 * @param {object} order - The full, populated order object.
 * @returns {Promise<Buffer>} A promise that resolves with the PDF data as a Buffer.
 */
function generateReceiptPdf(order) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ 
      margin: 50,
      size: 'A4'
    });
    const buffers = [];

    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    doc.on('error', (err) => {
      reject(err);
    });

    // Color palette
    const colors = {
      primary: '#8b00ff',
      secondary: '#00d4ff',
      dark: '#0a0e27',
      light: '#ffffff',
      gray: '#6b7280',
      success: '#10b981'
    };

    // Header Section with gradient effect
    doc
      .rect(0, 0, 612, 120)
      .fill('#0a0e27');

    doc
      .fontSize(32)
      .fillColor(colors.light)
      .font('Helvetica-Bold')
      .text('GAMEZONE HUB', 50, 30, { align: 'center' });

    doc
      .fontSize(10)
      .fillColor(colors.secondary)
      .font('Helvetica')
      .text('Your Premium Gaming Store', { align: 'center' })
      .moveDown(0.3);

    doc
      .fontSize(9)
      .fillColor(colors.gray)
      .text('123 Gaming Street | Gametown | support@gamezonehub.com', { align: 'center' });

    // Receipt header line
    doc
      .moveTo(50, 130)
      .lineTo(562, 130)
      .lineWidth(2)
      .strokeColor(colors.primary)
      .stroke();

    doc.moveDown(2);

    // Receipt title
    doc
      .fontSize(18)
      .fillColor(colors.primary)
      .font('Helvetica-Bold')
      .text('ORDER RECEIPT', 50, 150);

    doc
      .fontSize(10)
      .fillColor(colors.gray)
      .font('Helvetica')
      .text('Thank you for your purchase!', 50, 172);

    // Order Information Box
    const infoBoxY = 200;
    doc
      .rect(50, infoBoxY, 512, 80)
      .lineWidth(1)
      .strokeColor(colors.primary)
      .fillColor('#f9fafb')
      .fillAndStroke();

    doc
      .fontSize(10)
      .fillColor(colors.dark)
      .font('Helvetica-Bold')
      .text('Order Information', 60, infoBoxY + 10);

    const leftCol = 60;
    const rightCol = 320;
    const rowHeight = 15;
    let currentY = infoBoxY + 35;

    doc
      .font('Helvetica-Bold')
      .fontSize(9)
      .fillColor(colors.gray)
      .text('Order ID:', leftCol, currentY)
      .font('Helvetica')
      .fillColor(colors.dark)
      .text(order._id, leftCol + 80, currentY);

    doc
      .font('Helvetica-Bold')
      .fillColor(colors.gray)
      .text('Order Date:', rightCol, currentY)
      .font('Helvetica')
      .fillColor(colors.dark)
      .text(new Date(order.createdAt).toLocaleDateString(), rightCol + 80, currentY);

    currentY += rowHeight;
    doc
      .font('Helvetica-Bold')
      .fillColor(colors.gray)
      .text('Customer:', leftCol, currentY)
      .font('Helvetica')
      .fillColor(colors.dark)
      .text(order.user.email, leftCol + 80, currentY);

    doc
      .font('Helvetica-Bold')
      .fillColor(colors.gray)
      .text('Status:', rightCol, currentY)
      .font('Helvetica')
      .fillColor(colors.success)
      .text('Confirmed', rightCol + 80, currentY);

    doc.moveDown(3);

    // Items Table
    const tableTop = 310;
    const itemX = 50;
    const quantityX = 350;
    const priceX = 430;
    const totalX = 500;

    // Table header background
    doc
      .rect(itemX, tableTop - 5, 512, 25)
      .fillColor(colors.primary)
      .fill();

    // Table headers
    doc
      .fontSize(10)
      .fillColor(colors.light)
      .font('Helvetica-Bold')
      .text('PRODUCT', itemX + 5, tableTop + 5)
      .text('QTY', quantityX + 5, tableTop + 5)
      .text('PRICE', priceX + 5, tableTop + 5)
      .text('TOTAL', totalX + 5, tableTop + 5);

    // Table rows
    let currentRowY = tableTop + 35;
    order.orderItems.forEach((item, index) => {
      // Alternate row background
      if (index % 2 === 0) {
        doc
          .rect(itemX, currentRowY - 5, 512, 25)
          .fillColor('#f9fafb')
          .fill();
      }

      doc
        .fontSize(9)
        .fillColor(colors.dark)
        .font('Helvetica')
        .text(item.product.name, itemX + 5, currentRowY, { width: 280, ellipsis: true })
        .text(item.quantity.toString(), quantityX + 5, currentRowY)
        .text(`₱${item.price.toFixed(2)}`, priceX + 5, currentRowY)
        .font('Helvetica-Bold')
        .text(`₱${(item.quantity * item.price).toFixed(2)}`, totalX + 5, currentRowY);

      currentRowY += 25;
    });

    // Table footer line
    doc
      .moveTo(itemX, currentRowY)
      .lineTo(562, currentRowY)
      .lineWidth(2)
      .strokeColor(colors.primary)
      .stroke();

    // Subtotal, Tax, Shipping (if applicable)
    const summaryY = currentRowY + 20;
    const summaryLabelX = priceX;
    const summaryValueX = totalX;

    // Subtotal
    doc
      .fontSize(10)
      .fillColor(colors.gray)
      .font('Helvetica')
      .text('Subtotal:', summaryLabelX, summaryY)
      .fillColor(colors.dark)
      .text(`₱${order.totalPrice.toFixed(2)}`, summaryValueX, summaryY);

    // Total box
    const totalBoxY = summaryY + 30;
    doc
      .rect(priceX - 10, totalBoxY - 5, 160, 35)
      .lineWidth(2)
      .strokeColor(colors.secondary)
      .fillColor('#e0f2fe')
      .fillAndStroke();

    doc
      .fontSize(14)
      .fillColor(colors.dark)
      .font('Helvetica-Bold')
      .text('TOTAL:', summaryLabelX, totalBoxY + 5)
      .fontSize(16)
      .fillColor(colors.secondary)
      .text(`₱${order.totalPrice.toFixed(2)}`, summaryValueX, totalBoxY + 5);

    // Footer section
    const footerY = doc.page.height - 100;
    
    doc
      .moveTo(50, footerY)
      .lineTo(562, footerY)
      .lineWidth(1)
      .strokeColor(colors.gray)
      .stroke();

    doc
      .fontSize(8)
      .fillColor(colors.gray)
      .font('Helvetica')
      .text('Questions? Contact us at support@gamezonehub.com or call 1-800-GAMEZONE', 50, footerY + 15, { 
        align: 'center',
        width: 512
      });

    doc
      .fontSize(7)
      .text('This is an automatically generated receipt. No signature required.', 50, footerY + 35, { 
        align: 'center',
        width: 512
      });

    doc
      .fontSize(8)
      .fillColor(colors.primary)
      .font('Helvetica-Bold')
      .text('Thank you for shopping at Gamezone Hub!', 50, footerY + 55, { 
        align: 'center',
        width: 512
      });

    doc.end();
  });
}

module.exports = { generateReceiptPdf };