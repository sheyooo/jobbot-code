import React from 'react';
import { Col, Card, CardBody } from 'reactstrap';

const getPlaceholderBlocks = (count: number) => {
  return new Array(count).fill(0)
    .map((_, idx) => (
      <Col key={idx} xs="12" style={{ padding: 0, paddingTop: 10 }}>
        <PlaceholderBlock />
      </Col>
    ));
}

const PlaceholderBlock = () => {
  let style = {
    height: 20,
    background: 'rgba(0,0,0,0.05)',
    width: '70%',
    marginBottom: 20
  };

  return (
    <Card>
      <CardBody>
        <div style={{ ...style, width: '70%' }}></div>
        <div style={{ ...style, width: '100%' }}></div>
        <div style={{ ...style, width: '50%' }}></div>
        <div style={{ ...style, width: '70%', margin: 0 }}></div>
      </CardBody>
    </Card>
  );
}

export { getPlaceholderBlocks };
export default PlaceholderBlock;