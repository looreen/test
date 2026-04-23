import { scaleLinear, scaleBand } from "d3-scale";
import { max } from "d3-array";

export default function BarChart({ data, width = 600, height = 400 }) {
  const margin = { top: 20, right: 20, bottom: 20, left: 100 };

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Sort data descending
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // Highlight my country
  const highlightCountry = "Germany";

  // X scale (value scale)
  const x = scaleLinear()
    .domain([0, max(sortedData, (d) => d.students)])
    .range([0, innerWidth]);

  // Y scale (category scale)
  const y = scaleBand()
    .domain(sortedData.map((d) => d.country))
    .range([0, innerHeight])
    .padding(0.1);

  return (
    <svg width={width} height={height}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {sortedData.map((d) => (
          <g key={d.country}>
            <rect
              x={0}
              y={y(d.country)}
              width={x(d.students)}
              height={y.bandwidth()}
              fill={d.country === highlightCountry ? "#ef4444" : "#4f46e5"}
              rx={6}
              ry={6}
            />

            <text
              x={-10}
              y={y(d.country) + y.bandwidth() / 2}
              alignmentBaseline="middle"
              textAnchor="end"
              fontSize="12"
            >
              {d.country}
            </text>

            <text
              x={x(d.students) + 5}
              y={y(d.country) + y.bandwidth() / 2}
              alignmentBaseline="middle"
              fontSize="12"
            >
              {d.students}
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}
