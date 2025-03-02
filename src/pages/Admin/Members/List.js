import React, { useState } from "react";
import { Container, Card, Table, Button, Form, InputGroup } from "react-bootstrap";
import { Search, PersonFillX, PencilSquare } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";

const MemberList = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // 임시 회원 데이터
  const members = [
    {
      id: 1,
      name: "한승진",
      email: "32204837@dankook.ac.kr",
      role: "User",
      status: "Active",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      name: "권경현",
      email: "user2@example.com",
      role: "Admin",
      status: "Active",
      joinDate: "2024-01-16"
    },
    {
      id: 3,
      name: "홍길동",
      email: "user3@example.com",
      role: "User",
      status: "Inactive",
      joinDate: "2024-01-17"
    }
  ];

  return (
    <div>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="d-flex">
        <AdminSidebar isOpen={isOpen} />
        <div className={`content-area ${isOpen ? 'content-open' : 'content-closed'}`}>
          <Container fluid className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Member Management</h2>
              <div className="d-flex gap-2">
                <InputGroup style={{ width: '300px' }}>
                  <Form.Control
                    placeholder="Search members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline-secondary">
                    <Search />
                  </Button>
                </InputGroup>
              </div>
            </div>

            <Card>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Status</th>
                      <th>Join Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map(member => (
                      <tr key={member.id}>
                        <td>{member.name}</td>
                        <td>{member.email}</td>
                        <td>
                          <span className={`badge ${member.role === 'Admin' ? 'bg-primary' : 'bg-secondary'}`}>
                            {member.role}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${member.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                            {member.status}
                          </span>
                        </td>
                        <td>{member.joinDate}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => navigate(`/admin/members/${member.id}/edit`)}
                            >
                              <PencilSquare />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => console.log('Deactivate member:', member.id)}
                            >
                              <PersonFillX />
                            </Button>
                          </div>
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

export default MemberList; 