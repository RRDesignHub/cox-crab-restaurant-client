import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../Hooks/useAxiosSecure";
import { SectionHeader } from "../../Components/SectionHeader";
import { FaBusinessTime } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Sector,
  ResponsiveContainer,
  Legend,
} from "recharts";
const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "red", "pink"];
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#001735"];
export const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/admin-stats");
      return data;
    },
  });
  const { data: chartData = [] } = useQuery({
    queryKey: ["chart-data"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/order-stats");
      return data;
    },
  });

  // custom shape hill for chart:
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${
      x + width / 2
    },${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${
      x + width
    }, ${y + height}
    Z`;
  };
  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // custom shape for the pie chart:
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const pheChartData = chartData.map(data =>{
    return {name: data.category, value: data.revenue}
  })
  return (
    <div className="py-5 pe-5">
      <SectionHeader header="Statistics"></SectionHeader>

      <div className="stats w-full stats-vertical lg:stats-horizontal gap-5 bg-blue-50 shadow">
        <div className="stat flex items-center justify-evenly">
          <div className="text-4xl text-[rgba(0,23,53,0.8)] bg-blue-200 rounded-2xl p-4 drop-shadow-lg">
            <FaBusinessTime></FaBusinessTime>
          </div>
          <div>
            <div className="stat-title text-[#001735] ">Revenue</div>
            <div className="stat-value text-[rgba(0,23,53,0.9)]">
              {stats?.revenue}{" "}
            </div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>
        </div>
        <div className="stat flex items-center justify-evenly">
          <div className="text-4xl text-[rgba(0,23,53,0.8)] bg-blue-200 rounded-2xl p-4 drop-shadow-lg">
            <GiForkKnifeSpoon></GiForkKnifeSpoon>
          </div>
          <div>
            <div className="stat-title">Menu</div>
            <div className="stat-value">{stats?.totalMenu}</div>
            <div className="stat-desc">Jan 1st - Feb 1st</div>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Orders</div>
          <div className="stat-value">{stats?.totalOrder}</div>
          <div className="stat-desc">↗︎ 400 (22%)</div>
        </div>

        <div className="stat">
          <div className="stat-title">Reviews</div>
          <div className="stat-value">{stats.totalReview}</div>
          <div className="stat-desc">↘︎ 90 (14%)</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center pt-5 ">
        <div className="md:w-1/2">
          <BarChart
            width={500}
            height={300}
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="category" />
            <YAxis />
            <Bar
              dataKey="quantity"
              fill="#8884d8"
              shape={<TriangleBar />}
              label={{ position: "top" }}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div className="md:w-1/2">
        <PieChart width={400} height={400}>
        <Legend></Legend>
              <Pie
                data={pheChartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pheChartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              
            </PieChart>
        </div>
      </div>
    </div>
  );
};
