import { MetricCard } from "../components/MetricCard";
import { Users, TrendingUp, TrendingDown } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <MetricCard
        title="Active Users"
        value="1,245"
        change="+12%"
        changeType="positive"
        icon={Users}
        color="green"
      />
      <MetricCard
        title="Dropouts"
        value="56"
        change="-3%"
        changeType="negative"
        icon={TrendingDown}
        color="red"
      />
      <MetricCard
        title="Enrollments"
        value="320"
        change="0%"
        changeType="neutral"
        icon={TrendingUp}
        color="yellow"
      />
    </div>
  );
}
