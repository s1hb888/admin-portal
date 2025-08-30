import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Users, Star } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import Feedback from '../components/Feedback';
import { GiBabyFace } from 'react-icons/gi';
import axios from 'axios';

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const themeGreen = '#2BCB9A';
const themeYellow = '#FFCF25';
const red = '#EF3349';

const CRM = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // States for API data
  const [stats, setStats] = useState(null);
  const [ageData, setAgeData] = useState([]);
  const [cityUsageData, setCityUsageData] = useState([]);

  // ✅ Fixed theme colors for pie chart slices
  const ageColors = [red, themeGreen, themeYellow, "#4A90E2", "#FF6F61"];

  useEffect(() => {
  const fetchData = async () => {
    try {
      // Get token from localStorage or wherever you store it
      const token = localStorage.getItem("adminToken"); // example

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const statsRes = await axios.get(
        "http://localhost:5000/api/insights/stats",
        config
      );
      const ageRes = await axios.get(
        "http://localhost:5000/api/insights/age-distribution",
        config
      );
      const locationRes = await axios.get(
        "http://localhost:5000/api/insights/locations",
        config
      );
      const ratingsRes = await axios.get(
        "http://localhost:5000/api/insights/ratings",
        config
      );

      // Age distribution transform
      const formattedAgeData = ageRes.data.map((item) => ({
        name: item._id ? item._id.toString() : "Unknown",
        value: item.count,
      }));

      // City-wise transform
      const formattedCityData = locationRes.data.reduce((acc, curr) => {
        const cityIndex = acc.findIndex((item) => item.city === curr.city);
        if (cityIndex !== -1) {
          acc[cityIndex].users += curr.count;
        } else {
          acc.push({ city: curr.city, users: curr.count });
        }
        return acc;
      }, []);

      const avgRating =
        ratingsRes.data.length > 0
          ? (
              ratingsRes.data.reduce((sum, r) => sum + r.avgRating, 0) /
              ratingsRes.data.length
            ).toFixed(2)
          : 0;

      const cleanChanges = {
        users: statsRes.data?.changes?.users ?? 0,
        active: statsRes.data?.changes?.active ?? 0,
        avgRating: statsRes.data?.changes?.avgRating
          ? parseFloat(statsRes.data.changes.avgRating)
          : 0,
      };

      setStats({ ...statsRes.data, avgRating, changes: cleanChanges });
      setAgeData(formattedAgeData);
      setCityUsageData(formattedCityData);
    } catch (err) {
      console.error(
        "Error fetching admin dashboard data",
        err.response ? err.response.data : err.message
      );
    }
  };

  fetchData();
}, []);


  // ✅ Updated renderChange
  const renderChange = (value) => {
    if (value === undefined || value === null) return "--";

    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "--";

    const arrow = num >= 0 ? "↑" : "↓";
    const color = num >= 0 ? "text-success" : "text-danger";

    return (
      <p className={`${color} mb-0`} style={{ fontSize: '0.9rem' }}>
        <span className="me-1">{arrow}</span>
        {Math.abs(num)} from last month
      </p>
    );
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
      <Sidebar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <TopNavbar sidebarOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

      <main
        style={{
          marginLeft: sidebarOpen ? '295px' : '0',
          padding: '2rem',
          marginTop: '60px',
          minHeight: '100vh',
          backgroundColor: '#f3f4f6',
          transition: 'margin-left 0.3s ease',
        }}
      >
        <div className="container-fluid p-0">
          <Row className="mb-4 g-4">
            {/* Total Kids Enrolled Card */}
            <Col md={4}>
              <Card className="shadow-sm" style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}>
                <Card.Body className="d-flex align-items-center justify-content-between p-4">
                  <div>
                    <h6 className="text-muted mb-1">Total Kids Enrolled</h6>
                    <h2 className="mb-0" style={{ fontWeight: 'bold' }}>
                      {stats ? stats.totalUsers : "--"}
                    </h2>
                    {stats && renderChange(stats.changes?.users)}
                  </div>
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      backgroundColor: red,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <GiBabyFace color="#fff" size={32} />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Active Parent Accounts Card */}
            <Col md={4}>
              <Card className="shadow-sm" style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}>
                <Card.Body className="d-flex align-items-center justify-content-between p-4">
                  <div>
                    <h6 className="text-muted mb-1">Active Parent Accounts</h6>
                    <h2 className="mb-0" style={{ fontWeight: 'bold' }}>
                      {stats ? stats.activeUsers : "--"}
                    </h2>
                    {stats && renderChange(stats.changes?.active)}
                  </div>
                  <div className="rounded-circle p-3" style={{ backgroundColor: themeGreen, color: '#fff' }}>
                    <Users size={32} strokeWidth={2.5} />
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Average Rating Card */}
            <Col md={4}>
              <Card className="shadow-sm" style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}>
                <Card.Body className="d-flex align-items-center justify-content-between p-4">
                  <div>
                    <h6 className="text-muted mb-1">Average Rating</h6>
                    <h2 className="mb-0" style={{ fontWeight: 'bold' }}>
                      {stats ? stats.avgRating : "--"}
                    </h2>
                    {stats && renderChange(stats.changes?.avgRating)}
                  </div>
                  <div className="rounded-circle p-3" style={{ backgroundColor: themeYellow, color: '#fff' }}>
                    <Star size={32} strokeWidth={2.5} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mb-4 g-4">
            {/* City Insights Chart */}
            <Col md={7}>
              <Card className="shadow-sm" style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}>
                <Card.Body className="p-4">
                  <h5 className="mb-1" style={{ fontWeight: '600' }}>City Insights</h5>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>Users distribution by city</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={cityUsageData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                      <XAxis dataKey="city" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="users" fill={red} radius={[5, 5, 0, 0]} barSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>

            {/* Age Distribution Chart */}
            <Col md={5}>
              <Card className="shadow-sm" style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}>
                <Card.Body className="p-4">
                  <h5 className="mb-1" style={{ fontWeight: '600' }}>Age Distribution</h5>
                  <p className="text-muted" style={{ fontSize: '0.9rem' }}>Current enrollment by age groups</p>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={ageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {ageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={ageColors[index % ageColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend
                        verticalAlign="bottom"
                        height={36}
                        align="left"
                        layout="horizontal"
                        iconType="square"
                        wrapperStyle={{ marginTop: '20px' }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Recent Activities */}
          <Row>
            <Col>
              <Feedback  />
            </Col>
          </Row>
        </div>
      </main>
    </div>
  );
};

export default CRM;
