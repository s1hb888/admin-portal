import React, { useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Smile, Users, Star } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import RecentActivities from '../components/RecentActivities';
import { GiBabyFace } from 'react-icons/gi'; 

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
const lightGreen = '#E9FBF6';
const red = '#EF3349';

const CRM = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Enrollment data (still used for kids/parents stats)
  const enrollmentData = [
    { month: 'Jan', parents: 38, kids: 45 },
    { month: 'Feb', parents: 43, kids: 52 },
    { month: 'Mar', parents: 51, kids: 61 },
    { month: 'Apr', parents: 49, kids: 58 },
    { month: 'May', parents: 56, kids: 67 },
    { month: 'Jun', parents: 62, kids: 73 },
    { month: 'Jul', parents: 69, kids: 81 },
    { month: 'Aug', parents: 75, kids: 89 }
  ];

  // Age distribution for pie chart
  const ageData = [
    { name: '2-3 years', value: 28, color: '#EF3349' },
    { name: '3-4 years', value: 35, color: '#2BCB9A' },
    { name: '4-5 years', value: 26, color: '#FFCF25' }
  ];

  // City usage data for the new insights chart
  const cityUsageData = [
    { city: 'Karachi', users: 120 },
    { city: 'Lahore', users: 95 },
    { city: 'Islamabad', users: 75 },
    { city: 'Faisalabad', users: 60 },
    { city: 'Peshawar', users: 40 },
  ];

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
        <h2 className="mb-0" style={{ fontWeight: 'bold' }}>89</h2>
        <p className="text-success mb-0" style={{ fontSize: '0.9rem' }}>
          <span className="me-1">↑</span>+12% from last month
        </p>
      </div>
      <div
        style={{
          width: '60px',           // a bit larger circle
          height: '60px',
          borderRadius: '50%',
          backgroundColor: red,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <GiBabyFace color="#fff" size={32} /> {/* bigger white baby icon */}
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
                    <h2 className="mb-0" style={{ fontWeight: 'bold' }}>75</h2>
                    <p className="text-success mb-0" style={{ fontSize: '0.9rem' }}>
                      <span className="me-1">↑</span>+8% from last month
                    </p>
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
                    <h2 className="mb-0" style={{ fontWeight: 'bold' }}>4.6</h2>
                    <p className="text-success mb-0" style={{ fontSize: '0.9rem' }}>
                      <span className="me-1">↑</span>+0.2 from last month
                    </p>
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

            {/* Age Distribution Chart Card */}
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
                          <Cell key={`cell-${index}`} fill={entry.color} />
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
              <RecentActivities />
            </Col>
          </Row>
        </div>
      </main>
    </div>
  );
};

export default CRM;
