import React, { useState, useEffect } from 'react';
import { Users, Star, Filter, Download, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import Feedback from '../components/Feedback';
import { GiBabyFace } from 'react-icons/gi';
import axios from 'axios';
import jsPDF from 'jspdf';

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
  const [stats, setStats] = useState(null);
  const [ageData, setAgeData] = useState([]);
  const [cityUsageData, setCityUsageData] = useState([]);
  const [allFeedbacks, setAllFeedbacks] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  
  // Filter states
  const [filters, setFilters] = useState({
    ageRange: 'all',
    city: 'all',
    dateRange: 'all',
    ratingFilter: 'all'
  });
  
  const [showFilters, setShowFilters] = useState(false);
  const [availableCities, setAvailableCities] = useState([]);

  const ageColors = [themeGreen, red, themeYellow, "#4A90E2", "#FF6F61"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const statsRes = await axios.get("http://localhost:5000/api/insights/stats", config);
      const ageRes = await axios.get("http://localhost:5000/api/insights/age-distribution", config);
      const locationRes = await axios.get("http://localhost:5000/api/insights/locations", config);
      const feedbacksRes = await axios.get("http://localhost:5000/api/insights/feedbacks", config);
      const usersRes = await axios.get("http://localhost:5000/api/insights/", config);

      const formattedAgeData = ageRes.data.map((item) => ({
        name: item._id ? item._id.toString() : "Unknown",
        value: item.count,
      }));

      const formattedCityData = locationRes.data.reduce((acc, curr) => {
        const cityIndex = acc.findIndex((item) => item.city === curr.city);
        if (cityIndex !== -1) {
          acc[cityIndex].users += curr.count;
        } else {
          acc.push({ city: curr.city, users: curr.count });
        }
        return acc;
      }, []);

      const cities = [...new Set(locationRes.data.map(l => l.city))];
      setAvailableCities(cities);

      let avgRating = 0;
      let prevMonthAvgRating = 0;

      if (feedbacksRes.data.length > 0) {
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const currentMonthFeedbacks = feedbacksRes.data.filter(fb => {
          const fbDate = new Date(fb.dateOfFeedback);
          return fbDate.getMonth() === currentMonth && fbDate.getFullYear() === currentYear;
        });

        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
        const prevMonthFeedbacks = feedbacksRes.data.filter(fb => {
          const fbDate = new Date(fb.dateOfFeedback);
          return fbDate.getMonth() === prevMonth && fbDate.getFullYear() === prevMonthYear;
        });

        const feedbacksToUse = currentMonthFeedbacks.length > 0 ? currentMonthFeedbacks : feedbacksRes.data;
        const totalRating = feedbacksToUse.reduce((sum, fb) => {
          return sum + ((fb.appEaseOfUse + fb.performanceRating + fb.designSatisfaction + fb.featureUsefulness) / 4);
        }, 0);
        avgRating = (totalRating / feedbacksToUse.length).toFixed(2);

        if (prevMonthFeedbacks.length > 0) {
          const prevTotalRating = prevMonthFeedbacks.reduce((sum, fb) => {
            return sum + ((fb.appEaseOfUse + fb.performanceRating + fb.designSatisfaction + fb.featureUsefulness) / 4);
          }, 0);
          prevMonthAvgRating = (prevTotalRating / prevMonthFeedbacks.length).toFixed(2);
        }
      }

      const ratingChange = (parseFloat(avgRating) - parseFloat(prevMonthAvgRating)).toFixed(2);

      const cleanChanges = {
        users: statsRes.data?.changes?.users ?? 0,
        active: statsRes.data?.changes?.active ?? 0,
        avgRating: parseFloat(ratingChange) || 0,
      };

      setStats({ 
        ...statsRes.data, 
        avgRating, 
        changes: cleanChanges 
      });
      setAgeData(formattedAgeData);
      setCityUsageData(formattedCityData);
      setAllFeedbacks(feedbacksRes.data);
      setAllUsers(usersRes.data);
    } catch (err) {
      console.error("Error fetching admin dashboard data", err.response ? err.response.data : err.message);
    }
  };

  const getFilteredData = () => {
    let filteredUsers = [...allUsers];
    let filteredFeedbacks = [...allFeedbacks];

    // Age filter
    if (filters.ageRange !== 'all') {
      const [min, max] = filters.ageRange.split('-').map(Number);
      filteredUsers = filteredUsers.filter(user => {
        const age = parseInt(user.kidAge);
        return age >= min && age <= max;
      });
    }

    // City filter
    if (filters.city !== 'all') {
      filteredUsers = filteredUsers.filter(user => user.city === filters.city);
    }

    // Date range filter
    if (filters.dateRange !== 'all') {
      const now = new Date();
      let startDate = new Date();

      switch (filters.dateRange) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
        case 'quarter':
          startDate.setMonth(now.getMonth() - 3);
          break;
        case 'year':
          startDate.setFullYear(now.getFullYear() - 1);
          break;
      }

      filteredUsers = filteredUsers.filter(user => {
        const userDate = new Date(user.createdAt);
        return userDate >= startDate;
      });

      filteredFeedbacks = filteredFeedbacks.filter(fb => {
        const fbDate = new Date(fb.dateOfFeedback);
        return fbDate >= startDate;
      });
    }

    // Rating filter
    if (filters.ratingFilter !== 'all') {
      const minRating = parseFloat(filters.ratingFilter);
      filteredFeedbacks = filteredFeedbacks.filter(fb => {
        const avgRating = (fb.appEaseOfUse + fb.performanceRating + fb.designSatisfaction + fb.featureUsefulness) / 4;
        return avgRating >= minRating;
      });
    }

    // Recalculate age distribution based on filtered users
    const ageDistribution = filteredUsers.reduce((acc, user) => {
      const age = user.kidAge?.toString() || "Unknown";
      const existing = acc.find(item => item.name === age);
      if (existing) {
        existing.value += 1;
      } else {
        acc.push({ name: age, value: 1 });
      }
      return acc;
    }, []).sort((a, b) => parseInt(a.name) - parseInt(b.name));

    // Recalculate city distribution based on filtered users
    const cityDistribution = filteredUsers.reduce((acc, user) => {
      const city = user.city || "Unknown";
      const existing = acc.find(item => item.city === city);
      if (existing) {
        existing.users += 1;
      } else {
        acc.push({ city, users: 1 });
      }
      return acc;
    }, []);

    return { 
      filteredAge: ageDistribution, 
      filteredCity: cityDistribution,
      filteredUsers,
      filteredFeedbacks
    };
  };

  const generatePDFReport = () => {
    const { filteredAge, filteredCity, filteredUsers, filteredFeedbacks } = getFilteredData();
    
    const doc = new jsPDF();
    let yPos = 20;

    // Title
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('CRM INSIGHTS REPORT', 105, yPos, { align: 'center' });
    yPos += 10;

    // Generated Date
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Generated: ${new Date().toLocaleString()}`, 105, yPos, { align: 'center' });
    yPos += 15;

    // Filters Applied Section
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('FILTERS APPLIED', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Age Range: ${filters.ageRange === 'all' ? 'All Ages' : filters.ageRange + ' years'}`, 20, yPos);
    yPos += 6;
    doc.text(`City: ${filters.city === 'all' ? 'All Cities' : filters.city}`, 20, yPos);
    yPos += 6;
    doc.text(`Date Range: ${filters.dateRange === 'all' ? 'All Time' : filters.dateRange}`, 20, yPos);
    yPos += 6;
    doc.text(`Rating Filter: ${filters.ratingFilter === 'all' ? 'All Ratings' : filters.ratingFilter + '+ stars'}`, 20, yPos);
    yPos += 12;

    // Summary Statistics
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('SUMMARY STATISTICS', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Total Kids Enrolled: ${filteredUsers.length}`, 20, yPos);
    yPos += 6;
    const activeParents = filteredUsers.filter(u => u.role === 'parent' && u.isActive).length;
    doc.text(`Active Parent Accounts: ${activeParents}`, 20, yPos);
    yPos += 6;
    
    let avgRating = 0;
    if (filteredFeedbacks.length > 0) {
      avgRating = filteredFeedbacks.reduce((sum, fb) => {
        return sum + ((fb.appEaseOfUse + fb.performanceRating + fb.designSatisfaction + fb.featureUsefulness) / 4);
      }, 0) / filteredFeedbacks.length;
    }
    doc.text(`Average Rating: ${avgRating.toFixed(2)}/5.0`, 20, yPos);
    yPos += 12;

    // Age Distribution
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('AGE DISTRIBUTION', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    filteredAge.forEach(item => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`Age ${item.name}: ${item.value} kids`, 20, yPos);
      yPos += 6;
    });
    yPos += 6;

    // City Insights
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('CITY INSIGHTS', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    filteredCity.forEach(item => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(`${item.city}: ${item.users} users`, 20, yPos);
      yPos += 6;
    });
    yPos += 6;

    // Feedback Summary
    if (yPos > 240) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text('FEEDBACK SUMMARY', 20, yPos);
    yPos += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Total Feedbacks: ${filteredFeedbacks.length}`, 20, yPos);
    yPos += 8;

    if (filteredFeedbacks.length > 0) {
      doc.text('Average Ratings by Category:', 20, yPos);
      yPos += 6;
      
      const avgEaseOfUse = (filteredFeedbacks.reduce((sum, fb) => sum + fb.appEaseOfUse, 0) / filteredFeedbacks.length).toFixed(2);
      const avgPerformance = (filteredFeedbacks.reduce((sum, fb) => sum + fb.performanceRating, 0) / filteredFeedbacks.length).toFixed(2);
      const avgDesign = (filteredFeedbacks.reduce((sum, fb) => sum + fb.designSatisfaction, 0) / filteredFeedbacks.length).toFixed(2);
      const avgFeatures = (filteredFeedbacks.reduce((sum, fb) => sum + fb.featureUsefulness, 0) / filteredFeedbacks.length).toFixed(2);

      doc.text(`  • Ease of Use: ${avgEaseOfUse}/5.0`, 25, yPos);
      yPos += 6;
      doc.text(`  • Performance: ${avgPerformance}/5.0`, 25, yPos);
      yPos += 6;
      doc.text(`  • Design: ${avgDesign}/5.0`, 25, yPos);
      yPos += 6;
      doc.text(`  • Features: ${avgFeatures}/5.0`, 25, yPos);
    }

    // Save PDF
    doc.save(`CRM_Report_${new Date().toISOString().split('T')[0]}.pdf`);
  };

  const renderChange = (value) => {
    if (value === undefined || value === null) return "--";
    const num = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(num)) return "--";
    const arrow = num >= 0 ? "↑" : "↓";
    const color = num >= 0 ? "#10b981" : "#ef4444";
    return (
      <p style={{ color, fontSize: '0.9rem', margin: 0 }}>
        <span style={{ marginRight: '4px' }}>{arrow}</span>
        {Math.abs(num).toFixed(2)} from last month
      </p>
    );
  };

  const { filteredAge, filteredCity, filteredUsers, filteredFeedbacks } = getFilteredData();
  const hasActiveFilters = filters.ageRange !== 'all' || filters.city !== 'all' || filters.dateRange !== 'all' || filters.ratingFilter !== 'all';

  // Calculate filtered stats
  const filteredActiveParents = filteredUsers.filter(u => u.role === 'parent' && u.isActive).length;
  let filteredAvgRating = 0;
  if (filteredFeedbacks.length > 0) {
    filteredAvgRating = filteredFeedbacks.reduce((sum, fb) => {
      return sum + ((fb.appEaseOfUse + fb.performanceRating + fb.designSatisfaction + fb.featureUsefulness) / 4);
    }, 0) / filteredFeedbacks.length;
  }

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
        <div style={{ maxWidth: '100%' }}>
          {/* Filter Section */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.25rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      backgroundColor: showFilters ? themeYellow : 'white',
                      color: showFilters ? '#000' : themeYellow,
                      border: `2px solid ${themeYellow}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Filter size={18} />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>
                  <button
                    onClick={generatePDFReport}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      backgroundColor: themeGreen,
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Download size={18} />
                    Generate PDF Report
                  </button>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={() => setFilters({ ageRange: 'all', city: 'all', dateRange: 'all', ratingFilter: 'all' })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '6px 12px',
                      backgroundColor: 'transparent',
                      color: themeGreen,
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}
                  >
                    <X size={16} />
                    Clear All Filters
                  </button>
                )}
              </div>

              {showFilters && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '16px',
                  marginTop: '1.25rem'
                }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>
                      Age Range
                    </label>
                    <select
                      value={filters.ageRange}
                      onChange={(e) => setFilters({ ...filters, ageRange: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="all">All Ages</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-8">6-8 years</option>
                      <option value="9-12">9-12 years</option>
                      <option value="13-15">13-15 years</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>
                      City
                    </label>
                    <select
                      value={filters.city}
                      onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="all">All Cities</option>
                      {availableCities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>
                      Date Range
                    </label>
                    <select
                      value={filters.dateRange}
                      onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="all">All Time</option>
                      <option value="today">Today</option>
                      <option value="week">This Week</option>
                      <option value="month">This Month</option>
                      <option value="quarter">This Quarter</option>
                      <option value="year">This Year</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '6px', color: '#374151' }}>
                      Rating
                    </label>
                    <select
                      value={filters.ratingFilter}
                      onChange={(e) => setFilters({ ...filters, ratingFilter: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '6px',
                        border: '1px solid #d1d5db',
                        fontSize: '14px',
                        backgroundColor: 'white'
                      }}
                    >
                      <option value="all">All Ratings</option>
                      <option value="4">4+ Stars</option>
                      <option value="3">3+ Stars</option>
                      <option value="2">2+ Stars</option>
                      <option value="1">1+ Stars</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Total Kids Enrolled Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h6 style={{ color: '#6b7280', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Total Kids Enrolled</h6>
                <h2 style={{ marginBottom: '4px', fontWeight: 'bold', fontSize: '2rem' }}>
                  {hasActiveFilters ? filteredUsers.length : (stats ? stats.totalUsers : "--")}
                </h2>
                {!hasActiveFilters && stats && renderChange(stats.changes?.users)}
              </div>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: themeGreen,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <GiBabyFace color="#fff" size={32} />
              </div>
            </div>

            {/* Active Parent Accounts Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h6 style={{ color: '#6b7280', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Active Parent Accounts</h6>
                <h2 style={{ marginBottom: '4px', fontWeight: 'bold', fontSize: '2rem' }}>
                  {hasActiveFilters ? filteredActiveParents : (stats ? stats.activeUsers : "--")}
                </h2>
                {!hasActiveFilters && stats && renderChange(stats.changes?.active)}
              </div>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: red,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Users size={32} strokeWidth={2.5} />
              </div>
            </div>

            {/* Average Rating Card */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <h6 style={{ color: '#6b7280', marginBottom: '8px', fontSize: '0.875rem', fontWeight: '500' }}>Average Rating</h6>
                <h2 style={{ marginBottom: '4px', fontWeight: 'bold', fontSize: '2rem' }}>
                  {hasActiveFilters ? filteredAvgRating.toFixed(2) : (stats ? stats.avgRating : "--")}
                </h2>
                {!hasActiveFilters && stats && renderChange(stats.changes?.avgRating)}
              </div>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: themeYellow,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Star size={32} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* City Insights Chart */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0',
              gridColumn: 'span 2 / span 2'
            }}>
              <h5 style={{ marginBottom: '4px', fontWeight: '600' }}>City Insights</h5>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>Users distribution by city</p>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredCity} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
                  <XAxis dataKey="city" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="users" fill={themeGreen} radius={[5, 5, 0, 0]} barSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Age Distribution Chart */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '1.5rem',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e0e0e0',
              gridColumn: 'span 2 / span 2'
            }}>
              <h5 style={{ marginBottom: '4px', fontWeight: '600' }}>Age Distribution</h5>
              <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '1rem' }}>Current enrollment by age groups</p>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={filteredAge}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {filteredAge.map((entry, index) => (
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
            </div>
          </div>

          {/* Recent Activities */}
          <div>
            <Feedback />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CRM;