import React, { useState } from 'react';
import { Form, Button, Image, Container, Card } from 'react-bootstrap';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const ProfileSettings = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (profileImage) {
      const formData = new FormData();
      formData.append('profileImage', profileImage);
      
      try {
        // API 호출 예시
        // await axios.post('/api/profile/image', formData);
        alert('프로필 이미지가 업데이트되었습니다.');
      } catch (error) {
        alert('이미지 업로드에 실패했습니다.');
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="settings-content">
        <h2>Profile Settings</h2>
        <Container>
          <Card className="mt-4">
            <Card.Body>
              <h2 className="mb-4">프로필 설정</h2>
              
              <Form onSubmit={handleSubmit}>
                <div className="text-center mb-4">
                  <div className="position-relative d-inline-block">
                    <Image
                      src={previewUrl || '/default-profile.png'}
                      roundedCircle
                      style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    />
                    <div className="mt-3">
                      <Form.Group controlId="profileImage">
                        <Form.Label className="btn btn-outline-primary">
                          프로필 사진 변경
                          <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                          />
                        </Form.Label>
                      </Form.Group>
                    </div>
                  </div>
                </div>

                <Form.Group className="mb-3">
                  <Form.Label>이름</Form.Label>
                  <Form.Control type="text" placeholder="이름을 입력하세요" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>이메일</Form.Label>
                  <Form.Control type="email" placeholder="이메일을 입력하세요" />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>전화번호</Form.Label>
                  <Form.Control type="tel" placeholder="전화번호를 입력하세요" />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    저장하기
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </DashboardLayout>
  );
};

export default ProfileSettings;