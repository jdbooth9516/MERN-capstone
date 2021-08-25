import React, { useState } from 'react';

const Buildhelper = () => {
  const [question, setQuestion] = useState(1);
  const [layout, setLayout] = useState('');
  const [switchchoice, setSwitch] = useState('');
  const [services, setServices] = useState('');

  return (
    <div className="main-body">
      {question === 1 && (
        <div className="question-body">
          <h4>How much functionality do you require from your keyboard?</h4>
          <div className="btn-holder">
            <div className="info-card">
              <p
                onClick={() => {
                  setLayout('Full');
                  setQuestion(2);
                }}>
                I need full function and media keys. I also spend a lot of time
                typing numbers
              </p>
            </div>
            <div className="info-card">
              <p
                onClick={() => {
                  setLayout('Tenkeyless');
                  setQuestion(2);
                }}>
                I type and navigate using the keyboard, but I do use the
                function keys for shortcuts and window management.
              </p>
            </div>
            <div className="info-card">
              <p
                onClick={() => {
                  setLayout('60%');
                  setQuestion(2);
                }}>
                I use the keyboard for typeing and gameing that's it.
              </p>
            </div>
            <div className="info-card">
              <p
                onClick={() => {
                  setLayout('Split');
                  setQuestion(2);
                }}>
                h5 and adjustablity
              </p>
            </div>
          </div>
        </div>
      )}
      {question === 2 && (
        <div className="question-body">
          <h4>
            What kind of noise is acceptable and what kinds of feel sounds good?
          </h4>
          <div className="btn-holder">
            <div className="info-card">
              <p
                onClick={() => {
                  setSwitch('Blue');
                  setQuestion(3);
                }}>
                I like hearing the key activate and having a very tactile feel.
              </p>
            </div>
            <div className="info-card">
              <p
                onClick={() => {
                  setSwitch('Red');
                  setQuestion(3);
                }}>
                I want a very quite switch with a smooth feel
              </p>
            </div>
            <div className="info-card">
              <p
                onClick={() => {
                  setSwitch('Brown');
                  setQuestion(3);
                }}>
                I want a quiet switch with a little bit of a activation feeling.
              </p>
            </div>
          </div>
        </div>
      )}
      {question === 3 && (
        <div className="question-body">
          <h4>How picky about noise and feel are you?</h4>
          <div className="btn-holder">
            <div className="info-card">
              <p
                onClick={() => {
                  setServices('full tune');
                  setQuestion(4);
                }}>
                I want the quietest and best sound as well as smooth keypress.
              </p>
            </div>
            <div className="info-card">
              <p
                onClick={() => {
                  setServices('switch lube');
                  setQuestion(4);
                }}>
                I want a smooth press of the key.
              </p>
            </div>
            <div className="info-card">
              <p
                onClick={() => {
                  setServices('stablizer tuning');
                  setQuestion(4);
                }}>
                I just want the really annoying sound to be gone.
              </p>
            </div>
            <div className="info-card">
              <p
                onClick={() => {
                  setServices('None');
                  setQuestion(4);
                }}>
                I have never noticed any issues with standard keyboards.
              </p>
            </div>
          </div>
        </div>
      )}
      {question === 4 && (
        <div className="answer-container">
          <h5>Here is where you should start looking</h5>
          <div className="info-card">
            <div className="question-card">
              <h6>Layout: {layout}</h6>
            </div>
            <div className="question-card">
              <h6>Switch: {switchchoice}</h6>
            </div>
            <div className="question-card">
              <h6>Service: {services}</h6>
            </div>
          </div>
          <h6>Ready to start building</h6>
          <button
            className="build-btn"
            onClick={() => (window.location.href = '/build')}>
            Build
          </button>
        </div>
      )}
    </div>
  );
};

export default Buildhelper;
