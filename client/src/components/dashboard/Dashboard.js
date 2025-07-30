import React, { useContext } from 'react';
import Header from './Header';
import IncidentForm from './IncidentForm';
import IncidentList from './IncidentList';
import TrafficMap from './TrafficMap';
import AuthContext from '../../context/authContext';
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Header />
      <Container fluid className="py-4">
        <Row>
          <Col lg={4} className="mb-4">
            <IncidentForm />
            <IncidentList />
          </Col>
          <Col lg={8}>
            <TrafficMap />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;