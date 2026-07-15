const orderPlacedTemplate = (userName, order) => {

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body{
        font-family:Arial,sans-serif;
        background:#f5f5f5;
        padding:20px;
      }

      .container{
        background:white;
        max-width:600px;
        margin:auto;
        border-radius:10px;
        overflow:hidden;
        box-shadow:0 0 10px rgba(0,0,0,.1);
      }

      .header{
        background:#ef4444;
        color:white;
        padding:20px;
        text-align:center;
      }

      .content{
        padding:25px;
      }

      table{
        width:100%;
        border-collapse:collapse;
        margin-top:20px;
      }

      table th,
      table td{
        border:1px solid #ddd;
        padding:10px;
      }

      .footer{
        background:#fafafa;
        text-align:center;
        padding:15px;
        color:#666;
      }

    </style>
  </head>

  <body>

    <div class="container">

      <div class="header">

        <h1>🍔 FoodExpress</h1>

      </div>

      <div class="content">

        <h2>Hello ${userName},</h2>

        <p>

          Thank you for your order ❤️

        </p>

        <table>

          <tr>

            <th>Item</th>

            <th>Qty</th>

            <th>Price</th>

          </tr>

          ${order.items.map(item=>`

          <tr>

            <td>${item.name}</td>

            <td>${item.quantity}</td>

            <td>₹${item.price}</td>

          </tr>

          `).join("")}

        </table>

        <h3>

          Total : ₹${order.totalAmount}

        </h3>

        <p>

          Status : <b>${order.status}</b>

        </p>

      </div>

      <div class="footer">

        FoodExpress © 2026

      </div>

    </div>

  </body>

  </html>
  `;

};

module.exports = {

  orderPlacedTemplate,

};