import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

class MidlPlaces extends React.Component {

  render() {
    if (this.props.places.length > 0) {
      this.props.setMidlRequest(false)
    }
    return (
      this.props.places.map(function(place, i){
        return <div key={i}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title><Card.Link style={linkStyle} href={`https://www.google.com/search?q=${place.name}+${place.vicinity}`}>{place.name}</Card.Link></Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem style={listStyle}>{`${place.rating} ${'★'.repeat(Math.round(place.rating))} (${place.user_ratings_total})`}</ListGroupItem>
                      <ListGroupItem>{`${place.types[0]}, ${place.types[1]}, ${place.types[2]}`}</ListGroupItem>
                      <ListGroupItem>{place.vicinity}</ListGroupItem><br></br>
                    </ListGroup>
                    <Card.Body>
                    </Card.Body>
                  </Card>
                </div>
      })
    )
  }
}

const listStyle = {
  color: 'orange',
  fontFamily: 'Roboto Condensed'
}

const linkStyle = {
    color: '#9B5F8C',
    textDecoration: 'none',
    fontFamily: 'Roboto Condensed'
}

export default MidlPlaces;

// {`${place.rating} ${'★'.repeat(Math.round(place.rating))} (${place.user_ratings_total})`}
