/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Controllers
import Price from './controllers/price';
import Down from './controllers/down';
import Interest from './controllers/interest';
import Loan from './controllers/loan';

// Raw Components
import Svg from './svg';
import Data from './data';

// Styles
import Label from './styles/label';
import DarkBox from './styles/darkBox';
import Title from './styles/title';
import Text from './styles/text';
import SvgStyle from './styles/svgStyle';
import View from './styles/view';
import DataContainer from './styles/dataContainer';
import SvgData from './styles/svgData';
import Connect from './styles/connections';

export default function Main() {
  // State declarations and Functions

  const [homePrice, setHomePrice] = useState(1000000);
  const [downPaymentRate, setDownPaymentRate] = useState(20);
  const [downPayment, setDownPayment] = useState(
    homePrice * (downPaymentRate / 100),
  );
  const [term, setTerm] = useState(360);
  const [interestRate, setInterestRate] = useState(2.88);

  // Helper Declarations

  const monthlyRate = interestRate / 1200;
  const firstEQ = (homePrice - downPayment) * monthlyRate;

  // Data Calculations

  const principal = Math.round(firstEQ / (1 - 1 / (1 + monthlyRate) ** term));
  const propertyTax = principal * 0.1682;
  const homeInsurance = 75;
  const mortgageInsurance = Math.ceil(downPaymentRate < 20 ? principal * 0.1 : 0);
  const total = Math.round(
    principal + propertyTax + homeInsurance + mortgageInsurance,
  );
  // const url = window.location.pathname.split('/');
  // API request to Mongo for initial HomePrice

  useEffect(() => {
    axios({
      method: 'get',
      url: `${window.location.pathname}price`,
    })
      .then((res) => {
        setHomePrice(res.data.price);
        setDownPayment(res.data.price * (downPaymentRate / 100));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Helper functions

  function toNum(value) {
    let num = parseFloat(value.replace(/\D/g, '')); // 86-89 Helper
    if (Number.isNaN(num)) {
      num = 0;
    }
    return num;
  }

  function toCash(value) {
    return `$${Math.round(value).toLocaleString()}`;
  }

  function toPerc(value) {
    return `${value}%`;
  }

  // On Change Calculations

  function changePrice(value) {
    setHomePrice(toNum(value));
    setDownPayment(toNum(value) * (downPaymentRate / 100));
  }
  function changeRate(value) {
    setDownPaymentRate(toNum(value));
    setDownPayment(homePrice * (toNum(value) / 100));
  }
  function changeValue(value) {
    setDownPaymentRate((toNum(value) / homePrice) * 100);
    setDownPayment(toNum(value));
  }
  function changeInterest(value) { // has bug when editing input box to NaN
    let num = value.replace('%', '');
    if (num === '0') {
      num = 0.1;
    }
    setInterestRate(num);
  }
  function changeLoan(value) {
    // [0] = term | [1] = interest | [2] = rate
    setTerm(Number(value[0]));
    setInterestRate(Number(value[1]));
    setDownPaymentRate(Number(value[2]));
  }

  // DOM Rendering

  return (
    <Text>
      <View id="mainView">
        <Title>
          <h3 style={{ fontWeight: 'bold' }}>Affordability</h3>
          <div>Calculate your monthly mortgage payments</div>
          <div id="paymentTitle" style={{ fontWeight: '1', fontSize: '16px' }}>
            Your est. payment:
            {` ${toCash(total)}`}
            /month
          </div>
        </Title>
        <DarkBox>
          <Label>
            <Price
              id="priceSection"
              // style={style.slider}
              price={toCash(homePrice)}
              homePrice={homePrice}
              onChange={changePrice}
            />
          </Label>
          <Label>
            <Down
              id="down"
              // style={style.slider}
              value={downPayment}
              valueStr={toCash(downPayment)}
              rate={downPaymentRate}
              rateStr={toPerc(downPaymentRate)}
              onRateChange={changeRate}
              onValueChange={changeValue}
            />
          </Label>
          <Label>
            <Interest
              id="interest"
              value={interestRate}
              valueStr={toPerc(interestRate)}
              onChange={changeInterest}
            />
          </Label>
          <Label>
            <Loan
              id="loan"
              onChange={changeLoan}
            />
          </Label>
        </DarkBox>
      </View>
      <View style={{ paddingTop: '0px' }}>
        <SvgStyle>
          <div id="paymentsData" value={toCash(total)}>
            <Svg
              principal={principal}
              tax={propertyTax}
              homeInsurance={homeInsurance}
              mortgageInsurance={mortgageInsurance}
              total={total}
              payments={toCash(total)}
            />
            <SvgData
              value={toCash(total)}
            />
          </div>
        </SvgStyle>
        <div style={{ flex: 'auto', alignSelf: 'flex-end' }}>
          <DataContainer>
            <Data // Cant map over an object with color & text because data needs to be independant
              color="#052286"
              text="Principal & Interest"
              value={toCash(principal)}
            />
            <Data
              color="#00adbb"
              text="Property Taxes"
              value={toCash(propertyTax)}
            />
            <Data
              color="#c2d500"
              text="Home Insurance"
              value={toCash(homeInsurance)}
            />
            <Data
              color="#ceb6ff"
              text="Mortgage ins. & other"
              value={toCash(mortgageInsurance)}
            />
            <Connect />
          </DataContainer>
        </div>
      </View>
    </Text>
  );
}
