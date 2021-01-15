import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        storeNumber: 1,
        dayWeek: 1,
        isOpen: 1,
        isPromotion: 0,
        isStateHoliday: 'a', // '0':0, 'a':1, 'b':2 'c':3 'd':4
        isSchoolHoliday: 0, 
        storeType: 'a', // 'a':1, 'b':2 'c':3 'd':4
        assort: 'a', // 'a':1, 'b':2 'c':3 
        hasCompet: 0,
        month: 1,
        year: 2015,
        day: 1,
        promJan: 0,
        promFeb: 0,
        promMar: 0,
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/prediction/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    var dayWeek = []
    for (var i = 1; i < 8; i += 1) {
      dayWeek.push(<option key = {i} value = {i}>{i}</option>);
    }
    var month = []
    for (var i = 1; i < 13; i += 1) {
      month.push(<option key = {i} value = {i}>{i}</option>);
    }
    var yesNo = []
    for (var i = 0; i < 2; i += 1) {
      if(i==0){
        yesNo.push(<option key = {i} value = {i}>No</option>);
      }
      else{
        yesNo.push(<option key = {i} value = {i}>Yes</option>);
      }
    }
    return (
      <Container>
        <div>
          <Image
            rounded
            width={171}
            height={180}
            alt="171x180"
            src={require(`./wavestone_logo.png`)}
          />
          <h1 className="title">SALES PREDICTION</h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Store number</Form.Label>
                <Form.Control 
                  type="text"
                  name="storeNumber"
                  value={formData.storeNumber}
                  onChange={this.handleChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Store type</Form.Label>
                <Form.Control 
                  type="text"
                  name="storeType"
                  value={formData.storeType}
                  onChange={this.handleChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Day of the week</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.dayWeek}
                  name="dayWeek"
                  onChange={this.handleChange}>
                  {dayWeek}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Is there a state holiday</Form.Label>
                <Form.Control 
                  type="text"
                  value={formData.isStateHoliday}
                  name="isStateHoliday"
                  onChange={this.handleChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Is there a school holiday</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.isSchoolHoliday}
                  name="isSchoolHoliday"
                  onChange={this.handleChange}>
                  {yesNo}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Month</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.month}
                  name="month"
                  onChange={this.handleChange}>
                  {month}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Year</Form.Label>
                <Form.Control 
                  type="text"
                  value={formData.year}
                  name="year"
                  onChange={this.handleChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Day</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.day}
                  name="day"
                  onChange={this.handleChange}>
                  {dayWeek}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Is the store open</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.isOpen}
                  name="isOpen"
                  onChange={this.handleChange}>
                  {yesNo}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Is the store running a promotion</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.isPromotion}
                  name="isPromotion"
                  onChange={this.handleChange}>
                  {yesNo}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>What is the assortement</Form.Label>
                <Form.Control 
                  type="text"
                  value={formData.assort}
                  name="assort"
                  onChange={this.handleChange}>
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Does the store have competition</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.hasCompet}
                  name="hasCompet"
                  onChange={this.handleChange}>
                  {yesNo}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Is the store running a promotion on January, April, July and October ?</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.promJan}
                  name="promJan"
                  onChange={this.handleChange}>
                  {yesNo}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Is the store running a promotion on February, May, August and November ?</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.promFeb}
                  name="promFeb"
                  onChange={this.handleChange}>
                  {yesNo}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Is the store running a promotion on March, June, September, December ?</Form.Label>
                <Form.Control 
                  as="select"
                  value={formData.promMar}
                  name="promMar"
                  onChange={this.handleChange}>
                  {yesNo}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset prediction
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
      </Container>
    );
  }
}

export default App;