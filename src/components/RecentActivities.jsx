import React from 'react';
import { Card } from 'react-bootstrap';
import { Clock } from 'lucide-react';

const activities = [
  {
    user: 'Emma Johnson',
    type: 'New child enrolled',
    time: '2 hours ago',
    status: 'completed',
    icon: '👶' // Using a simple emoji for demonstration
  },
  {
    user: 'Mike Smith',
    type: 'Monthly payment processed',
    time: '5 hours ago',
    status: 'completed',
    icon: '💳'
  },
  {
    user: 'Lisa Brown',
    type: 'Sent inquiry message',
    time: '1 day ago',
    status: 'pending',
    icon: '💬'
  },
  {
    user: 'Noah Davis',
    type: 'Marked absent',
    time: '2 days ago',
    status: 'absent',
    icon: '❌'
  },
  {
    user: 'John Wilson',
    type: 'Account created',
    time: '3 days ago',
    status: 'completed',
    icon: '📝'
  }
];

const getStatusBadgeColor = (status) => {
  switch (status) {
    case 'completed':
      return '#2BCB9A';
    case 'pending':
      return '#FFCF25';
    case 'absent':
      return '#EF3349';
    default:
      return '#6c757d';
  }
};

const RecentActivities = () => {
  return (
    <Card className="shadow-sm" style={{ borderRadius: '12px', borderColor: '#e0e0e0' }}>
      <Card.Body className="p-4">
        <h5 className="mb-1" style={{ fontWeight: '600' }}>Recent Account Activities</h5>
        <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>Latest parent and child account interactions</p>
        
        {activities.map((activity, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-between py-3"
            style={{
              borderBottom: index < activities.length - 1 ? '1px solid #f0f0f0' : 'none',
            }}
          >
            <div className="d-flex align-items-center">
              <div
                className="rounded-circle d-flex align-items-center justify-content-center me-3"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: '#e1f8f2',
                  fontSize: '1.2rem',
                }}
              >
                {activity.icon}
              </div>
              <div>
                <div style={{ fontWeight: 'bold' }}>{activity.user}</div>
                <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                  {activity.type} - {activity.time}
                </div>
              </div>
            </div>
            <div
              className="badge text-white py-1 px-3"
              style={{
                backgroundColor: getStatusBadgeColor(activity.status),
                borderRadius: '16px',
                fontSize: '0.8rem',
              }}
            >
              {activity.status}
            </div>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default RecentActivities;