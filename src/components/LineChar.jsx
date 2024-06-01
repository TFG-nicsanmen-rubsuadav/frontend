import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

export default function LineChar({
  arrayData,
  dataXKey,
  dataYKey,
  dataYLabel,
}) {

  const isMobile = window.innerWidth <= 900;
  const width = isMobile ? "100%" : "150%";
  const height = isMobile ? 300 : 500;

  return (
    <ResponsiveContainer width={width} height={height}>
      <LineChart
        data={arrayData}
        margin={{
          right: 60,
          left: 40,
        }}
      >
        <XAxis
          dataKey={dataXKey}
          interval={0}
          angle={-45}
          textAnchor="end"
          height={100}
        />
        <YAxis
          label={{
            value: dataYLabel,
            angle: -90,
            position: "insideLeft",
            fill: "#034e41",
          }}
        />
        <Tooltip />
        <Line type="monotone" dataKey={dataYKey} stroke="#034e41" />
      </LineChart>
    </ResponsiveContainer>
  );
}
LineChar.propTypes = {
  arrayData: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataXKey: PropTypes.string.isRequired,
  dataYKey: PropTypes.string.isRequired,
  dataYLabel: PropTypes.string.isRequired,
};
