import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface QuestionResultProps {
  optionOneVotes: number;
  optionTwoVotes: number;
}

const QuestionResult: React.FC<QuestionResultProps> = ({
  optionOneVotes,
  optionTwoVotes,
}: {
    optionOneVotes: number;
    optionTwoVotes: number;
}) => {
  const data = {
    labels: ["Option One", "Option Two"],
    datasets: [
      {
        label: "Votes",
        data: [optionOneVotes, optionTwoVotes],
        backgroundColor: ["#6200ea", "#ff4081"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Poll Results",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default QuestionResult;
