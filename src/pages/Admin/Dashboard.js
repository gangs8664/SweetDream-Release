import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Navbar from "../../components/Navbar/Navbar";
import AdminSidebar from "../../components/Sidebar/AdminSidebar";
import { 
  People, 
  PersonAdd, 
  PersonCheck, 
  Eye 
} from "react-bootstrap-icons";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(true);

  const stats = [
    {
      title: "Total Users",
      value: "7,265",
      change: "+11.01%",
      icon: <People className="text-primary" size={24} />
    },
    {
      title: "Visits",
      value: "3,671",
      change: "-0.03%",
      icon: <Eye className="text-info" size={24} />
    },
    {
      title: "New Users",
      value: "256",
      change: "+15.03%",
      icon: <PersonAdd className="text-success" size={24} />
    },
    {
      title: "Active Users",
      value: "2,318",
      change: "+6.08%",
      icon: <PersonCheck className="text-warning" size={24} />
    }
  ];

  const recentAnnouncements = [
    {
      id: 1,
      title: "공지사항10",
      author: "Admin",
      date: "2025-02-04"
    },
    {
      id: 2,
      title: "공지사항9",
      author: "Admin",
      date: "2025-02-03"
    },
    {
      id: 3,
      title: "공지사항8",
      author: "Admin",
      date: "2025-02-01"
    }
  ];

  const recentInquiries = [
    {
      id: 1,
      title: "문의사항3",
      author: "한승진",
      date: "2025-02-01"
    },
    {
      id: 2,
      title: "문의사항2",
      author: "권경현",
      date: "2025-01-29"
    }
  ];

  return (
    <div>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="d-flex">
        <AdminSidebar isOpen={isOpen} />
        <div className={`content-area ${isOpen ? 'content-open' : 'content-closed'}`}>
          <Container fluid className="p-4">
            <h2 className="mb-4">Admin Dashboard</h2>
            
            {/* Stats Cards */}
            <Row className="g-3 mb-4">
              {stats.map((stat, index) => (
                <Col key={index} md={3}>
                  <Card className="h-100">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="text-muted small">{stat.title}</div>
                          <h3 className="mb-0">{stat.value}</h3>
                          <div className={`small ${stat.change.includes('+') ? 'text-success' : 'text-danger'}`}>
                            {stat.change}
                          </div>
                        </div>
                        {stat.icon}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Recent Activities */}
            <Row>
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Header>
                    <h5 className="mb-0">Recent Announcements</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentAnnouncements.map(announcement => (
                            <tr key={announcement.id}>
                              <td>{announcement.title}</td>
                              <td>{announcement.author}</td>
                              <td>{announcement.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              
              <Col md={6}>
                <Card>
                  <Card.Header>
                    <h5 className="mb-0">Recent Inquiries</h5>
                  </Card.Header>
                  <Card.Body>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentInquiries.map(inquiry => (
                            <tr key={inquiry.id}>
                              <td>{inquiry.title}</td>
                              <td>{inquiry.author}</td>
                              <td>{inquiry.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 