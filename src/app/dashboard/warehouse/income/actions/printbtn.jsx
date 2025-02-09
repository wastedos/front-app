import React, { useRef } from 'react';
import { IconButton } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import axios from 'axios';

export default function Print({ itemId }) {
  const printFrameRef = useRef(null);

  const handlePrint = async () => {
    try {
      // Fetch data for the item
      const response = await axios.get(`http://localhost:5000/warehouse/read-income/${itemId}`);
      const itemData = response.data;

      // Prepare HTML content for printing
      const printContent = `
        <html>
          <head>
            <title>Print Item</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
              }
              h1 {
                text-align: center;
              }
              table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              table, th, td {
                border: 1px solid black;
              }
              th, td {
                padding: 10px;
                text-align: left;
              }
              .total-row {
                font-weight: bold;
                
              }
            </style>
          </head>
          <body>
            <h1>Income Bill</h1>
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Category</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Seller</th>
                  <th>Seller Number</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${itemData.code}</td>
                  <td>${itemData.category}</td>
                  <td>${itemData.quantity}</td>
                  <td>${itemData.price}</td>
                  <td>${itemData.seller}</td>
                  <td>${itemData.sellerphone}</td>
                </tr>
                <tr class="total-row">
                  <td>Total</td>
                  <td>${itemData.total}</td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
      `;

      // Load content into the hidden iframe
      const printFrame = printFrameRef.current;
      const printDocument = printFrame.contentDocument || printFrame.contentWindow.document;
      printDocument.open();
      printDocument.write(printContent);
      printDocument.close();

      // Trigger the print
      printFrame.contentWindow.print();
    } catch (error) {
      console.error('Error fetching item data:', error);
    }
  };

  return (
    <div>
      <IconButton onClick={handlePrint}>
        <PrintIcon />
      </IconButton>

      {/* Hidden iframe for printing */}
      <iframe
        ref={printFrameRef}
        style={{ display: 'none' }}
        title="Print Frame"
      />
    </div>
  );
}
