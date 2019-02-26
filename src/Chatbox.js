import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot, {Loading} from 'react-simple-chatbot';
import request from 'request';   
import axios from 'axios'; 
import PropTypes from 'prop-types';
var baseUrl = 'http://3.208.95.192:3000'
var nodeBaseUrl = 'http://3.208.95.192:3010'

axios.defaults.baseURL = 'http://3.208.95.192:3000';

class DBPedia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }
  componentWillMount() {
    const self = this;
    const { steps } = this.props;
     user.mobile = steps['13'].value;
    user.status = steps['132'].value;
    var result = '';
    switch (user.status) {
      case 0:
        result = 'Thats good to hear, do you need any help?'
        break;
      case 2:
        result = "Don't worry, we will get you help soon, anything you want to ask"
        break;
      case 6:
        result = 'We will get you help as soon as possible, do you need anything ?'        
        break;

      default:
        break;
    }
    request({
      method: 'POST',
      url: baseUrl + '/users',
      body: user,
      json: true
    }, function(err, res, body){
        console.log(body);
        user.locationKey = body.locationKey;
        self.setState({ loading: false, result: result });
        self.triggetNext({value: ''}); //, trigger
    });
  }

  triggetNext(triggerData) {
    this.setState({ trigger: true, loading: false }, () => {
      this.props.triggerNextStep(triggerData);
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="dbpedia">
         { loading ? <Loading /> : result }
      </div> 
    );
  }
}

DBPedia.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

DBPedia.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};

class Suggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      result: '',
      trigger: false,
    };

    this.triggetNext = this.triggetNext.bind(this);
  }
  componentWillMount() {
    console.log('At Suggestion Mount');
    const self = this;
    const { steps } = this.props;
     var message = steps['2'].value;

    request({
      method: 'GET',
      url: nodeBaseUrl + '/api/users/chatMessage?locationKey=' + user.locationKey + '&message=' + message,
    }, function(err, res, body){
        self.setState({ loading: false, result: JSON.parse(body).responseMessage });
        self.triggetNext({value: body.responseMessage}); //, trigger
    });
  }

  triggetNext(triggerData) {
    this.setState({ trigger: true, loading: false }, () => {
      this.props.triggerNextStep(triggerData);
    });
  }

  render() {
    const { trigger, loading, result } = this.state;

    return (
      <div className="dbpedia">
         { loading ? <Loading /> : result }
      </div> 
    );
  }
}

Suggestion.propTypes = {
  steps: PropTypes.object,
  triggerNextStep: PropTypes.func,
};

Suggestion.defaultProps = {
  steps: undefined,
  triggerNextStep: undefined,
};


var user = {
  name: '',
  mobile : '',
  latitude: 0,
  longitude: 0,
  status: 2
}

var getLocation = function(cb){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      // Get the coordinates of the current position.
     
        user.latitude = position.coords.latitude;
        user.longitude = position.coords.longitude;
      cb(null, {});
  });
    // geolocation is available
  } 
  else {
    cb('location not available');
    // geolocation is not supported
  }
}

getLocation(function(err, response){

});

// all available props
const theme = {
    background: '#f5f8fb',
    fontFamily: 'Helvetica Neue',
    headerBgColor: '#f7633d',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#f7633d',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
  };

const steps = [
    {
      id: '0',
      message: 'Hello!',
      trigger: '1',
      delay: 1000
    },
    {
      id: '1',
      message: "I'm here to help you...Can I know your name ?",
      trigger: '11',
      delay: 1000
    },
    {
      id: '11',
      user: true,
      trigger: '12'
    },
    {
      id: '12',
      message: 'Hi {previousValue}, can i know your Mobile Number?',
      trigger: function(records) {
        user.name =  records.steps[11].value;
        return '13'
      }
    },
    {
      id: '13',
      user: true,
      trigger: '131'
    },
    {
      id: '131',
      message: 'What is your current situation ?',
      trigger: '132'
    },
    {
      id: '132',
      options: [
        { value: 0, label: 'Safe', trigger: '14' },
        { value: 2, label: 'Need Help!', trigger: '14' },
        { value: 6, label: 'In an Emergency', trigger: '14' },
      ],
    },
    {
      id: '14',
      // message: 'Thanks for the details ! What is your situation',
      // trigger: function(records) {
      //   user.mobile =  records.steps[13].value;
      //   //return '2'
      // },
      component: <DBPedia />,
      waitAction: true,
      trigger: '2'
    },
    {
      id: '2',
      user: true,
      trigger: '21'
    },
    {
      id: '21',
      component: <Suggestion />,
      waitAction: true,
      trigger: '3'
    },
    {
      id: '3',
      message: 'We have informed nearby authorities about your situation and will get you help as soon as possible',
      end: true
    }
  ];

const Chatbox = () => {

    return (
        <ThemeProvider theme = {theme}>
            <div>
                <ChatBot steps={steps} />
            </div>
        </ThemeProvider>
    )
}

export default Chatbox;