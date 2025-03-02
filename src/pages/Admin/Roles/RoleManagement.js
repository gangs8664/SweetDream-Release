import React, { useState } from "react";
import { Container, Card, Table, Button, Modal, Form } from "react-bootstrap";
import { PencilSquare, Trash, Plus } from "react-bootstrap-icons";
import Navbar from "../../../components/Navbar/Navbar";
import AdminSidebar from "../../../components/Sidebar/AdminSidebar";

const RoleManagement = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedRole, setSelectedRole] = useState(null);

  // 임시 역할 데이터
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Super Admin",
      description: "Full system access",
      permissions: [
        "user_manage",
        "role_manage",
        "announcement_manage",
        "notification_manage",
        "support_manage",
        "log_view"
      ],
      userCount: 2
    },
    {
      id: 2,
      name: "Admin",
      description: "Limited administrative access",
      permissions: [
        "user_manage",
        "announcement_manage",
        "notification_manage",
        "support_manage"
      ],
      userCount: 5
    },
    {
      id: 3,
      name: "User",
      description: "Standard user access",
      permissions: [
        "profile_edit",
        "notification_view",
        "support_create"
      ],
      userCount: 150
    }
  ]);

  const permissions = [
    { id: "user_manage", label: "User Management" },
    { id: "role_manage", label: "Role Management" },
    { id: "announcement_manage", label: "Announcement Management" },
    { id: "notification_manage", label: "Notification Management" },
    { id: "support_manage", label: "Support Management" },
    { id: "log_view", label: "Log Viewing" },
    { id: "profile_edit", label: "Profile Editing" },
    { id: "notification_view", label: "Notification Viewing" },
    { id: "support_create", label: "Support Ticket Creation" }
  ];

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    permissions: []
  });

  const handleShowModal = (mode, role = null) => {
    setModalMode(mode);
    if (role) {
      setSelectedRole(role);
      setFormData({
        name: role.name,
        description: role.description,
        permissions: role.permissions
      });
    } else {
      setFormData({
        name: "",
        description: "",
        permissions: []
      });
    }
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      // Add new role logic
      const newRole = {
        id: roles.length + 1,
        ...formData,
        userCount: 0
      };
      setRoles([...roles, newRole]);
    } else {
      // Edit role logic
      const updatedRoles = roles.map(role => 
        role.id === selectedRole.id ? { ...role, ...formData } : role
      );
      setRoles(updatedRoles);
    }
    setShowModal(false);
  };

  const handlePermissionChange = (permissionId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const handleDeleteRole = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  return (
    <div>
      <Navbar toggleSidebar={() => setIsOpen(!isOpen)} />
      <div className="d-flex">
        <AdminSidebar isOpen={isOpen} />
        <div className={`content-area ${isOpen ? 'content-open' : 'content-closed'}`}>
          <Container fluid className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2>Role Management</h2>
              <Button variant="primary" onClick={() => handleShowModal('add')}>
                <Plus className="me-2" />
                Add New Role
              </Button>
            </div>

            <Card>
              <Card.Body>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>Role Name</th>
                      <th>Description</th>
                      <th>Permissions</th>
                      <th>Users</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map(role => (
                      <tr key={role.id}>
                        <td>{role.name}</td>
                        <td>{role.description}</td>
                        <td>
                          <div className="d-flex flex-wrap gap-1">
                            {role.permissions.map(permission => (
                              <span key={permission} className="badge bg-info">
                                {permissions.find(p => p.id === permission)?.label}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td>{role.userCount}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleShowModal('edit', role)}
                            >
                              <PencilSquare />
                            </Button>
                            <Button 
                              variant="outline-danger" 
                              size="sm"
                              onClick={() => handleDeleteRole(role.id)}
                              disabled={role.userCount > 0}
                            >
                              <Trash />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>

            {/* Add/Edit Role Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>
                  {modalMode === 'add' ? 'Add New Role' : 'Edit Role'}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Role Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      required
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Permissions</Form.Label>
                    <div className="border rounded p-3">
                      {permissions.map(permission => (
                        <Form.Check
                          key={permission.id}
                          type="checkbox"
                          label={permission.label}
                          checked={formData.permissions.includes(permission.id)}
                          onChange={() => handlePermissionChange(permission.id)}
                          className="mb-2"
                        />
                      ))}
                    </div>
                  </Form.Group>

                  <div className="d-flex justify-content-end gap-2">
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary">
                      {modalMode === 'add' ? 'Add Role' : 'Save Changes'}
                    </Button>
                  </div>
                </Form>
              </Modal.Body>
            </Modal>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default RoleManagement; 