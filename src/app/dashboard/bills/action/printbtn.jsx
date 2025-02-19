import React, { useRef } from "react";
import { IconButton } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import axios from "axios";

export default function Print({ itemId }) {
  const printFrameRef = useRef(null);

  const handlePrint = async () => {
    try {
      // Fetch data for the item
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/bills/read-bill/${itemId}`
      );
      const itemData = response.data;

      // Prepare HTML content for printing
      const printContent = `
        <html>
          <head>
            <title>German Auto Center</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 20px;
                direction: rtl;
                text-align: right;
              }

              h1, h2{
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
                text-align: center;
              }
              .section-title {
                font-weight: bold;
                background-color: #f4f4f4;
              }
              .total-row {
                font-weight: bold;
              }
            </style>
          </head>
          <body>
            <h1>فاتورة رقم : ${itemData.Jobid}</h1>
            <h2>German Auto Center</h2>

            <p>اسم العميل: ${itemData.clientName}</p>
            <p>رقم العميل: ${itemData.clientPhone}</p>
            <p>موديل السيارة: ${itemData.carModel}</p>
            <p>لون السيارة: ${itemData.carColor}</p>

            <!-- Unified Table -->
            <table>
              <thead>
                <tr>
                  <th colspan="2">التفاصيل</th>
                  <th>العدد</th>
                  <th>السعر</th>
                </tr>
              </thead>
              <tbody>
                <!-- قطع الغيار -->
                <tr class="section-title">
                  <td colspan="5">قطع الغيار</td>
                </tr>
                ${itemData.parts
                  .map(
                    (part) => `
                  <tr>
                    <td colspan="2">${part.category}</td>
                    <td>${part.quantity}</td>
                    <td>${part.pricesell}</td>
                  </tr>
                `
                  )
                  .join("")}

                ${itemData.newparts
                  .map(
                    (newPart) => `
                  <tr>
                    <td colspan="2">${newPart.category}</td>
                    <td>${newPart.quantity}</td>
                    <td>${newPart.pricesell}</td>
                  </tr>
                `
                  )
                  .join("")}

                <!-- أعمال الورشة -->
                <tr class="section-title">
                  <td colspan="5">أعمال الورشة</td>
                </tr>
                ${itemData.jobs
                  .map(
                    (jobs) => `
                  <tr>
                    <td colspan="2">${jobs.jobName}</td>
                    <td>-</td>
                    <td>-</td>
                  </tr>
                `
                  )
                  .join("")}

                <!-- أعمال الورشة -->
                <tr class="section-title">
                  <td colspan="5">أعمال خارجية</td>
                </tr>
                ${itemData.outjob
                  .map(
                    (outjob) => `
                  <tr>
                    <td colspan="2">${outjob.jobName}</td>
                    <td>-</td>
                    <td colspan="2">${outjob.jobPriceSell}</td>
                  </tr>
                `
                  )
                  .join("")}

                <!-- نثريات -->
                <tr class="section-title">
                  <td colspan="5">نثريات</td>
                </tr>
                ${itemData.other
                  .map(
                    (other) => `
                  <tr>
                    <td colspan="2">${other.otherName}</td>
                    <td>-</td>
                    <td>${other.otherPrice}</td>
                  </tr>
                `
                  )
                  .join("")}

                <!-- Summary -->
                <tr class="section-title">
                  <td colspan="5">ملخص الفاتورة</td>
                </tr>
                <tr>
                  <td>طريقة الدفع</td>
                  <td colspan="4">${itemData.payment}</td>
                </tr>
                <tr>
                  <td>مصنعية الورشة</td>
                  <td colspan="4">
                    ${itemData.invoice}
                  </td>
                </tr>
                <tr>
                  <td>الخصم</td>
                  <td colspan="4">${itemData.discount}</td>
                </tr>
                <tr class="total-row">
                  <td>الإجمالي</td>
                  <td colspan="4">${itemData.total}</td>
                </tr>
              </tbody>
            </table>
          </body>
        </html>
      `;

      // Load content into the hidden iframe
      const printFrame = printFrameRef.current;
      const printDocument =
        printFrame.contentDocument || printFrame.contentWindow.document;
      printDocument.open();
      printDocument.write(printContent);
      printDocument.close();

      // Trigger the print
      printFrame.contentWindow.print();
    } catch (error) {
      console.error("Error fetching item data:", error);
    }
  };

  return (
    <div>
      <IconButton onClick={handlePrint} sx={{ mx: 1 }}>
        <PrintIcon />
      </IconButton>

      {/* Hidden iframe for printing */}
      <iframe
        ref={printFrameRef}
        style={{ display: "none" }}
        title="Print Frame"
      />
    </div>
  );
}
