import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function AdminDashboard() {
  // Fake site navigation data
  const labels = ["Home", "About", "Services", "Blog", "Contact"];
  const data = {
    labels,
    datasets: [
      {
        label: "Number of Clicks",
        data: [120, 90, 75, 60, 45],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top", // <-- TS knows 'top' is valid
      },
      title: {
        display: true,
        text: "Site Navigation Clicks",
      },
    },
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <Bar options={options} data={data} />
    </div>
  );
}
