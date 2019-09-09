import React from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

class MidlPlaces extends React.Component {

  isOpen(venue) {
    if(venue.opening_hours.open_now === true){
      return "open now"
    } else {
      return "closed"
    }
  }

  render() {
    return (
      this.props.places.map(function(place, i){
        return <div key={i}>
                  <Card style={{ width: '18rem' }}>
                    <Card.Body>
                      <Card.Title><Card.Link style={linkStyle} href={`https://www.google.com/search?q=${place.reference}`}>{place.name}</Card.Link></Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                      <ListGroupItem style={listStyle}>{place.rating} ★ ({place.user_ratings_total})</ListGroupItem>
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
  fontFamily: 'Century Gothic'
}

const linkStyle = {
    color: '#9B5F8C',
    textDecoration: 'none',
    fontFamily: 'Century Gothic'
}

export default MidlPlaces;
