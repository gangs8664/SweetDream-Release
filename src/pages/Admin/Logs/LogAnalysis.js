import React, { useState } from "react";
import { Container, Card, Table, Form, Row, Col, Button, Badge } from "react-bootstrap";
import { Download, Search, ArrowClockwise } from "react-bootstrap-icons";
import Navbar from "../../../components/Navbar/Navbar";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";

const LogAnalysis = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    type: "all",
    level: "all",
    user: ""
  });

  // 임시 로그 데이터
  const [logs, setLogs] = useState([
    {
      id: 1,
      timestamp: "2024-03-15 14:30:25",
      type: "Login",
      level: "Info",
      user: "한승진",
      ip: "192.168.1.1",
      action: "User login successful",
      details: "Browser: Chrome, OS: Windows"
    },
    {
      id: 2,
      timestamp: "2024-03-15 14:25:10",
      type: "Security",
      level: "Warning",
      user: "권경현",
      ip: "192.168.1.2",
      action: "Failed login attempt",
      details: "Multiple failed attempts detected"
    },
    {
      id: 3,
      timestamp: "2024-03-15 14:20:15",
      type: "System",
      level: "Error",
      user: "System",
      ip: "localhost",
      action: "Database connection error",
      details: "Connection timeout after 30s"
    }
  ]);

  const logTypes = ["all", "Login", "Security", "System", "User", "Data"];
  const logLevels = ["all", "Info", "Warning", "Error", "Critical"];

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRefresh = () => {
    // 로그 새로고침 로직
    console.log("Refreshing logs...");
  };

  const handleExport = () => {
    // CSV 내보내기 로직
    console.log("Exporting logs...");
  };

  const getLevelBadge = (level) => {
    const variants = {
      Info: 'info',
      Warning: 'warning',
      Error: 'danger',
      Critical: 'dark'
    };
    return <Badge bg={variants[level]}>{level}</Badge>;
  };

  const getTypeBadge = (type) => {
    const variants = {
      Login: 'primary',
      Security: 'danger',
      System: 'info',
      User: 'success',
      Data: 'warning'
    };
    return <Badge bg={variants[type]}>{type}</Badge>;
  };

  return (
    <div>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="d-flex">
        <AdminSidebar isOpen={isOpen} />
        <div className={`content-area ${isOpen ? 'content-open' : 'content-closed'}`}>
          <Container fluid className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Log Analysis</h2>
              <div className="d-flex gap-2">
                <Button variant="outline-primary" onClick={handleRefresh}>
                  <ArrowClockwise className="me-2" />
                  Refresh
                </Button>
                <Button variant="outline-success" onClick={handleExport}>
                  <Download className="me-2" />
                  Export CSV
                </Button>
              </div>
            </div>

            <Card className="mb-4">
              <Card.Body>
                <Row className="g-3">
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Start Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="startDate"
                        value={filters.startDate}
                        onChange={handleFilterChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>End Date</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="endDate"
                        value={filters.endDate}
                        onChange={handleFilterChange}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>Log Type</Form.Label>
                      <Form.Select
                        name="type"
                        value={filters.type}
                        onChange={handleFilterChange}
                      >
                        {logTypes.map(type => (
                          <option key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>Log Level</Form.Label>
                      <Form.Select
                        name="level"
                        value={filters.level}
                        onChange={handleFilterChange}
                      >
                        {logLevels.map(level => (
                          <option key={level} value={level}>
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>User</Form.Label>
                      <Form.Control
                        type="text"
                        name="user"
                        value={filters.user}
                        onChange={handleFilterChange}
                        placeholder="Search user..."
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Timestamp</th>
                      <th>Type</th>
                      <th>Level</th>
                      <th>User</th>
                      <th>IP Address</th>
                      <th>Action</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.map(log => (
                      <tr key={log.id}>
                        <td>{log.timestamp}</td>
                        <td>{getTypeBadge(log.type)}</td>
                        <td>{getLevelBadge(log.level)}</td>
                        <td>{log.user}</td>
                        <td>{log.ip}</td>
                        <td>{log.action}</td>
                        <td>
                          <small className="text-muted">{log.details}</small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default LogAnalysis; 