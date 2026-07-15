import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function OrdersChart({ orders }) {

  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec",
  ];

  const data = months.map((month, index) => ({
    month,
    orders: orders[index],
  }));

  return (

    <div className="bg-white shadow-lg rounded-xl p-6">

      <h2 className="text-2xl font-bold mb-5">

        Monthly Orders

      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >

        <BarChart data={data}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="orders"
            fill="#3b82f6"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default OrdersChart;