import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Table } from 'react-bootstrap';
import { Star, AlertCircle, Lightbulb, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import axios from 'axios';

const red = '#EF3349';
const green = '#2BCB9A';
const yellow = '#FFCF25';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [avgStats, setAvgStats] = useState({
    easeOfUse: 0,
    performance: 0,
    design: 0,
    features: 0,
    overall: 0
  });

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await axios.get('http://localhost:5000/api/insights/feedbacks', config);
        setFeedbacks(res.data);
        calculateAverages(res.data);
      } catch (err) {
        console.error('Error fetching feedbacks', err);
      }
    };
    fetchFeedbacks();
  }, []);

  const calculateAverages = (data) => {
    if (data.length === 0) return;
    
    const totals = data.reduce((acc, fb) => ({
      easeOfUse: acc.easeOfUse + fb.appEaseOfUse,
      performance: acc.performance + fb.performanceRating,
      design: acc.design + fb.designSatisfaction,
      features: acc.features + fb.featureUsefulness,
    }), { easeOfUse: 0, performance: 0, design: 0, features: 0 });

    const count = data.length;
    const avg = {
      easeOfUse: (totals.easeOfUse / count).toFixed(1),
      performance: (totals.performance / count).toFixed(1),
      design: (totals.design / count).toFixed(1),
      features: (totals.features / count).toFixed(1),
    };
    
    avg.overall = (
      (parseFloat(avg.easeOfUse) + parseFloat(avg.performance) + 
       parseFloat(avg.design) + parseFloat(avg.features)) / 4
    ).toFixed(1);

    setAvgStats(avg);
  };

  // Rating color logic: >= 4 = green, 3-3.9 = yellow, < 3 = red
  const getRatingColor = (rating) => {
    const num = parseFloat(rating);
    if (num >= 4) return green;
    if (num >= 3) return yellow;
    return red;
  };

  const getRatingIcon = (rating) => {
    const num = parseFloat(rating);
    if (num >= 4) return <TrendingUp size={18} color={green} />;
    if (num >= 3) return <Minus size={18} color={yellow} />;
    return <TrendingDown size={18} color={red} />;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < rating ? yellow : 'none'}
        stroke={i < rating ? yellow : '#d1d5db'}
        strokeWidth={2}
        style={{ marginRight: '2px' }}
      />
    ));
  };

  return (
    <>
      {/* Average Ratings Summary */}
      <Row className="mb-4 g-4">
        <Col md={12}>
          <Card className="shadow-sm" style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}>
            <Card.Body className="p-4">
              <h5 className="mb-1" style={{ fontWeight: '600' }}>Average Ratings Summary</h5>
              <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                Overall performance across all feedback categories
              </p>

              <Row className="g-3">
                {/* Ease of Use */}
                <Col md={3} xs={6}>
                  <div className="text-center p-3 rounded" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      {getRatingIcon(avgStats.easeOfUse)}
                      <span className="ms-2" style={{ fontSize: '0.85rem', fontWeight: '600', color: '#6b7280' }}>
                        Ease of Use
                      </span>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: getRatingColor(avgStats.easeOfUse) }}>
                      {avgStats.easeOfUse}
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      {renderStars(Math.round(avgStats.easeOfUse))}
                    </div>
                  </div>
                </Col>

                {/* Performance */}
                <Col md={3} xs={6}>
                  <div className="text-center p-3 rounded" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      {getRatingIcon(avgStats.performance)}
                      <span className="ms-2" style={{ fontSize: '0.85rem', fontWeight: '600', color: '#6b7280' }}>
                        Performance
                      </span>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: getRatingColor(avgStats.performance) }}>
                      {avgStats.performance}
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      {renderStars(Math.round(avgStats.performance))}
                    </div>
                  </div>
                </Col>

                {/* Design */}
                <Col md={3} xs={6}>
                  <div className="text-center p-3 rounded" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      {getRatingIcon(avgStats.design)}
                      <span className="ms-2" style={{ fontSize: '0.85rem', fontWeight: '600', color: '#6b7280' }}>
                        Design
                      </span>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: getRatingColor(avgStats.design) }}>
                      {avgStats.design}
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      {renderStars(Math.round(avgStats.design))}
                    </div>
                  </div>
                </Col>

                {/* Features */}
                <Col md={3} xs={6}>
                  <div className="text-center p-3 rounded" style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb' }}>
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      {getRatingIcon(avgStats.features)}
                      <span className="ms-2" style={{ fontSize: '0.85rem', fontWeight: '600', color: '#6b7280' }}>
                        Features
                      </span>
                    </div>
                    <div style={{ fontSize: '2rem', fontWeight: 'bold', color: getRatingColor(avgStats.features) }}>
                      {avgStats.features}
                    </div>
                    <div className="d-flex justify-content-center mt-2">
                      {renderStars(Math.round(avgStats.features))}
                    </div>
                  </div>
                </Col>
              </Row>

              {/* Overall Rating Box */}
              <div className="mt-4 p-4 text-center rounded" style={{ backgroundColor: '#fff', border: '2px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.9rem', color: '#6b7280', marginBottom: '8px', fontWeight: '600' }}>
                  Overall Rating
                </div>
                <div className="d-flex align-items-center justify-content-center">
                  <Star size={32} fill={yellow} stroke={yellow} className="me-2" />
                  <span style={{ fontSize: '3rem', fontWeight: 'bold', color: getRatingColor(avgStats.overall) }}>
                    {avgStats.overall}
                  </span>
                  <span style={{ fontSize: '1.5rem', color: '#9ca3af', marginLeft: '8px' }}>/5.0</span>
                </div>
                <div className="mt-2">
                  <span style={{ 
                    padding: '6px 16px', 
                    borderRadius: '20px', 
                    backgroundColor: `${getRatingColor(avgStats.overall)}20`,
                    color: getRatingColor(avgStats.overall),
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>
                    {parseFloat(avgStats.overall) >= 4 ? 'Excellent' : parseFloat(avgStats.overall) >= 3 ? 'Good' : 'Needs Improvement'}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Detailed Feedback Table */}
      <Row>
        <Col>
          <Card className="shadow-sm" style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}>
            <Card.Body className="p-4">
              <h5 className="mb-1" style={{ fontWeight: '600' }}>Detailed Feedback</h5>
              <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
                Individual feedback from parents ({feedbacks.length} total)
              </p>

              {feedbacks.length === 0 ? (
                <div className="text-center py-5">
                  <div 
                    className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center"
                    style={{ width: '80px', height: '80px', backgroundColor: '#f3f4f6' }}
                  >
                    <Star size={40} color="#d1d5db" />
                  </div>
                  <p className="text-muted mb-0">No feedback submitted yet.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <Table hover responsive style={{ marginBottom: 0 }}>
                    <thead style={{ backgroundColor: '#f9fafb' }}>
                      <tr>
                        <th style={{ fontWeight: '600', fontSize: '0.85rem', color: '#6b7280', borderBottom: '2px solid #e5e7eb' }}>Parent Email</th>
                        <th style={{ fontWeight: '600', fontSize: '0.85rem', color: '#6b7280', borderBottom: '2px solid #e5e7eb' }}>Date</th>
                        <th className="text-center" style={{ fontWeight: '600', fontSize: '0.85rem', color: '#6b7280', borderBottom: '2px solid #e5e7eb' }}>Ease of Use</th>
                        <th className="text-center" style={{ fontWeight: '600', fontSize: '0.85rem', color: '#6b7280', borderBottom: '2px solid #e5e7eb' }}>Performance</th>
                        <th className="text-center" style={{ fontWeight: '600', fontSize: '0.85rem', color: '#6b7280', borderBottom: '2px solid #e5e7eb' }}>Design</th>
                        <th className="text-center" style={{ fontWeight: '600', fontSize: '0.85rem', color: '#6b7280', borderBottom: '2px solid #e5e7eb' }}>Features</th>
                        <th className="text-center" style={{ fontWeight: '600', fontSize: '0.85rem', color: '#6b7280', borderBottom: '2px solid #e5e7eb' }}>Overall</th>
                        <th style={{ fontWeight: '600', fontSize: '0.85rem', color: '#6b7280', borderBottom: '2px solid #e5e7eb' }}>Comments</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.map((fb, index) => {
                        const overall = ((fb.appEaseOfUse + fb.performanceRating + fb.designSatisfaction + fb.featureUsefulness) / 4).toFixed(1);
                        
                        return (
                          <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                            <td style={{ fontSize: '0.9rem', verticalAlign: 'middle' }}>
                              <div className="d-flex align-items-center">
                                <div
                                  className="rounded-circle d-flex align-items-center justify-content-center me-2"
                                  style={{
                                    width: '32px',
                                    height: '32px',
                                    backgroundColor: `${green}20`,
                                    color: green,
                                    fontWeight: 'bold',
                                    fontSize: '0.85rem'
                                  }}
                                >
                                  {fb.email?.charAt(0).toUpperCase()}
                                </div>
                                <span style={{ fontWeight: '500' }}>{fb.email}</span>
                              </div>
                            </td>
                            <td style={{ fontSize: '0.85rem', color: '#6b7280', verticalAlign: 'middle' }}>
                              {new Date(fb.dateOfFeedback).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </td>
                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
                              <span style={{ 
                                padding: '4px 12px', 
                                borderRadius: '12px', 
                                backgroundColor: `${getRatingColor(fb.appEaseOfUse)}20`,
                                color: getRatingColor(fb.appEaseOfUse),
                                fontSize: '0.9rem',
                                fontWeight: '600'
                              }}>
                                {fb.appEaseOfUse}
                              </span>
                            </td>
                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
                              <span style={{ 
                                padding: '4px 12px', 
                                borderRadius: '12px', 
                                backgroundColor: `${getRatingColor(fb.performanceRating)}20`,
                                color: getRatingColor(fb.performanceRating),
                                fontSize: '0.9rem',
                                fontWeight: '600'
                              }}>
                                {fb.performanceRating}
                              </span>
                            </td>
                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
                              <span style={{ 
                                padding: '4px 12px', 
                                borderRadius: '12px', 
                                backgroundColor: `${getRatingColor(fb.designSatisfaction)}20`,
                                color: getRatingColor(fb.designSatisfaction),
                                fontSize: '0.9rem',
                                fontWeight: '600'
                              }}>
                                {fb.designSatisfaction}
                              </span>
                            </td>
                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
                              <span style={{ 
                                padding: '4px 12px', 
                                borderRadius: '12px', 
                                backgroundColor: `${getRatingColor(fb.featureUsefulness)}20`,
                                color: getRatingColor(fb.featureUsefulness),
                                fontSize: '0.9rem',
                                fontWeight: '600'
                              }}>
                                {fb.featureUsefulness}
                              </span>
                            </td>
                            <td className="text-center" style={{ verticalAlign: 'middle' }}>
                              <div className="d-flex align-items-center justify-content-center">
                                {getRatingIcon(overall)}
                                <span className="ms-2" style={{ 
                                  fontSize: '1rem',
                                  fontWeight: 'bold',
                                  color: getRatingColor(overall)
                                }}>
                                  {overall}
                                </span>
                              </div>
                            </td>
                            <td style={{ verticalAlign: 'middle', maxWidth: '250px' }}>
                              {fb.bugOrIssueExperience && (
                                <div className="mb-2 d-flex align-items-start" style={{ fontSize: '0.85rem' }}>
                                  <AlertCircle size={14} color={red} className="me-1 mt-1" style={{ flexShrink: 0 }} />
                                  <span style={{ color: '#4b5563' }}>{fb.bugOrIssueExperience}</span>
                                </div>
                              )}
                              {fb.suggestions && (
                                <div className="d-flex align-items-start" style={{ fontSize: '0.85rem' }}>
                                  <Lightbulb size={14} color={green} className="me-1 mt-1" style={{ flexShrink: 0 }} />
                                  <span style={{ color: '#4b5563' }}>{fb.suggestions}</span>
                                </div>
                              )}
                              {!fb.bugOrIssueExperience && !fb.suggestions && (
                                <span style={{ color: '#9ca3af', fontSize: '0.85rem' }}>No comments</span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Feedback;