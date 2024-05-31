import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";

export default function BarChar({ arrayData, dataXKey, dataYKey, dataYLabel }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={arrayData}
        margin={{
          right: 55,
          left: 33,
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
        <Bar dataKey={dataYKey} fill="#034e41" />
      </BarChart>
    </ResponsiveContainer>
  );
}

BarChar.propTypes = {
  arrayData: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataXKey: PropTypes.string.isRequired,
  dataYKey: PropTypes.string.isRequired,
  dataYLabel: PropTypes.string.isRequired,
};
