import React from 'react';
import { ThemeProvider } from 'styled-components';
import ChatBot from 'react-simple-chatbot';

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
      message: 'Hi!',
      trigger: '1',
      delay: 1000
    },
    {
      id: '1',
      message: 'This is Nikhil from Pert, Can i know your name ?',
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
      message: 'Hi {previousValue}, How can i help you today ?',
      trigger: function() {
        return '2'
      }
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'What is Pert ?', trigger: '31' },
        { value: 2, label: 'Want to know about Pert Products', trigger: '36' },
        { value: 3, label: 'Become a Dealer', trigger: '5' },
      ],
    },
    {
      id: '31',
      message: 'Pert is a Home Automation Ecosystem',
      trigger: '32',
      delay: 2000
    },
    {
      id: '32',
      message: 'You can Control all your lights, fans, Electrical Appliances using your smartphone',
      trigger: '33',
      delay: 2000
    },
    {
      id: '33',
      message: 'It works on Wi-Fi and all the products are retrofittable',
      trigger: '34',
      delay: 2000
    },
    {
      id: '34',
      message: 'Want to know more about our products ?',
      trigger: '35',
      delay: 2000
    },
    {
      id: '35',
      options: [
        { value: 1, label: 'Yes', trigger: '36' },
        { value: 2, label: 'No', trigger: '6' },
      ],
    },
    {
      id: '36',
      message: 'Here is a list of our products',
      trigger: '37'
    },
    {
      id: '37',
      options: [
        { value: 1, label: '8 Node', trigger: '38'},
        { value: 2, label: '4 Node', trigger: '39' },
        { value: 3, label: 'Plug', trigger: '40' },
        { value: 4, label: 'Multisensor', trigger: '41' },
        { value: 5, label: 'Curtain Control', trigger: '42' }
      ],
    },
    {
      id: '38',
      message: 'The 8 node device can control 8 switches and be retrofitted into your switchboard and can be used to control fans, lights and also dimming applications',
      trigger: '6'
    },
    {
      id: '39',
      message: 'The 4 node device can control 8 switches and be retrofitted into your switchboard and can be used to control fans, lights and also dimming applications',
      trigger: '6'
    },
    {
      id: '40',
      message: 'The Plug can be used to control your Geyser, Refrigerator and other heavy appliances',
      trigger: '401'
    },
    {
      id: '401',
      message: 'For example, You could set a rule to turn On your Geyser at 8 AM every morning',
      trigger: '6'
    },
    {
      id: '41',
      message: 'The multisensor can detect Luminousity, Temperature, Gas',
      trigger: '411'
    },
    {
      id: '411',
      message: 'It can be used to control your Tv, Set Top Box, Air Conditioner and many more devices',
      trigger: '6'
    },
    {
      id: '42',
      message: 'The Curtain Controller can be used to Control your Curtains through your SmartPhone',
      trigger: '6'
    },
    {
        id: '4',
        message: 'Product List',
        trigger: '6'
    },
    {
      id: '5',
      message: 'Good to hear that',
      delay: 2000,
      trigger: '51'
    },
    {
      id: '51',
      message: 'We have a wide network of dealers throughout India and it would be great if you could join that Network',
      delay: 2000,
      trigger: '52'
    },
    {
      id: '52',
      message: 'How many products are you looking to get started with ?',
      delay: 2000,
      trigger: '53'
    },
    {
      id: '53',
      options: [
        { value: 1, label: '50', trigger: '54' },
        { value: 2, label: '100', trigger: '54' },
        { value: 3, label: '150', trigger: '54' },
        { value: 4, label: '>200', trigger: '54' },
      ],
      trigger: '54'
    },
    {
      id: '54',
      message: 'Great ! Can you please drop us a mail at info@pert.me with your name, mobile number and your contact details',
      end: true
    },
    {
      id: '6',
      message: 'It was nice talking to you !',
      delay: 2000,
      trigger: '7'
    },
    {
      id: '7',
      message: 'You can find out more about our products at www.pert.me',
      trigger: '8',
      delay: 2000
    },
    {
      id: '8',
      message: 'You can get in touch with us at info@pert.me',
      delay: 2000,
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