import React, { useState, useEffect, useRef } from "react";
import "./Information.css";

const Information = () => {
  const mainRef = useRef(null);
  const [layout, setLayout] = useState(true);
  const [switches, setSwitches] = useState(false);
  const [services, setServices] = useState(false);
  const [keycaps, setKeycaps] = useState(false);

  const closeAll = () => {
    setLayout(false);
    setSwitches(false);
    setServices(false);
    setKeycaps(false);
  };

  useEffect(() => {
    mainRef.current.focus();
  }, []);

  return (
    <div ref={mainRef} tabIndex="-1" className="information-container">
      {/* VIDEO SECTION */}
      <div className="video-player">
        <iframe
          id="ytplayer"
          type="text/html"
          width="854"
          height="480"
          src={`https://www.youtube.com/embed/Qr3nYR15wxU?autoplay=0&origin=http://example.com`}
          frameborder="0"
        ></iframe>
      </div>
      {/* button tabs */}
      <div className="info-tabs">
        <button
          className="category-btn-1"
          onClick={() => (closeAll(), setLayout(true))}
        >
          Layout
        </button>
        <button
          className="category-btn-2"
          onClick={() => (closeAll(), setSwitches(true))}
        >
          Switches
        </button>
        <button
          className="category-btn-3"
          onClick={() => (closeAll(), setServices(true))}
        >
          Services
        </button>
        {/* <button
          className="category-btn-4"
          onClick={() => (closeAll(), setKeycaps(true))}
        >
          Keycaps
        </button> */}
      </div>
      {/* INFORMATION BY CATEGORY */}
      {layout ? (
        <div className="info-sections">
          <h5>Layouts</h5>
          <div className="info-card-sections">
            <div className="info-card">
              <h5>Full</h5>
              <div className="information details">
                <img
                  src="https://images-na.ssl-images-amazon.com/images/I/71--t5c6-lL._AC_SL1500_.jpg"
                  alt="pic of full keyboard"
                  width="auto"
                  height="100"
                />
                <p>
                  A full-size keyboard has alphabetic characters keys,
                  punctuation symbols keys, numbers keys and a variety of
                  function keys, such as: Home, Mail, Volume Up, Volume Down,
                  etc. Normally, the Shift key on the left will be smaller than
                  the Shift key on the right. The Enter (or Return) key may
                  shaped differently on each keyboard, and make room for other
                  keys. One feature make full-size keyboard distinct from other
                  keyboard sizes is the numeric pad on the right side of the
                  keyboard.
                </p>
              </div>
            </div>
            <div className="info-card-sections">
              <div className="info-card">
                <h5>Ten Keyless TKL</h5>
                <div className="information details">
                  <img
                    src="https://hobgear.com/wp-content/uploads/2016/09/filco-majestouch-2-tkl-1.jpg"
                    alt="pic of TKL keyboard"
                    width="auto"
                    height="75"
                  />
                  <p>
                    Tenkey-less keyboard is, well, tenkey-less. The tenkey-less
                    keyboard is the full-size keyboard, minus the numeric pad on
                    the right side but still retain the arrow keys and function
                    keys. Many people doesn’t require the numeric pad
                    (programmers for example) and prefers simplicity will choose
                    the tenkey-less keyboard over the full-size keyboard. Also,
                    without the numeric pad, the keyboard will be lighter, and
                    easier to transport, not to mention it will take less space
                    for the keyboard.
                  </p>
                </div>
              </div>
            </div>
            <div className="info-card-sections">
              <div className="info-card">
                <h5>60% Keyboard</h5>
                <div className="information details">
                  <img
                    src="https://imgr.search.brave.com/_V_uV9zlQ3vzGd0zJ38mEKkBnEOwhVE9C05tdzzMmOw/fit/632/225/no/1/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5u/ZUFCb29sOEJzenE0/Smh1STNJRjJnSGFG/aiZwaWQ9QXBp"
                    alt="pic of 60% keyboard"
                    width="auto"
                    height="75"
                  />
                  <p>
                    The 60 percent keyboards are mechanical keyboards that have
                    60 percent of the keys that a standard full-size keyboard
                    does. Which means small form factor. Going with a 60 percent
                    keyboard may help with shoulder and wrist aches because its
                    small form factor allows the user greater freedom to adjust
                    the position of their keyboard.
                  </p>
                </div>
              </div>
            </div>
            <div className="info-card-sections">
              <div className="info-card">
                <h5>60% Keyboard</h5>
                <div className="information details">
                  <img
                    src="https://imgr.search.brave.com/-BA_2ENcMtxgun_oSyRnAlsKP-RurtTpXQYjlh189uw/fit/693/225/no/1/aHR0cHM6Ly90c2U0/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5m/c1BoLTBmQmozYk5t/RVVyQmhha2xBSGFG/RSZwaWQ9QXBp"
                    alt="pic of 60% keyboard"
                    width="auto"
                    height="75"
                  />
                  <p>
                    The primary reason split keyboards are so comfortable is
                    because they reduce something ergonomists call ulnar
                    deviation. Ulnar deviation occurs when the wrist is bent
                    outward in the direction of the little finger which causes
                    the carpal tunnel in the wrist to constrict.When the carpal
                    tunnel constricts, it reduces blood flow, strains muscles,
                    and puts pressure on the median nerve. Sounds painful,
                    right?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {switches ? (
        <div className="info-sections">
          <h5>Switches</h5>
          <iframe
            width="854"
            height="480"
            src="https://www.youtube.com/embed/yXfysGqNLeE"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <div className="info-card-sections">
            <div className="info-card">
              <h5>Blues</h5>
              <div className="information details">
                <img
                  src="https://www.ttesports.com/html/Switch/img/A04.png"
                  alt="pic of blue switch"
                  width="auto"
                  height="100"
                />
                <p>
                  The blue switches are still mechanical clicky keys, but
                  they’re more suited for typing since they have strong tactile
                  feedback. They are the loudest Cherry MX switch variety, but
                  they’re great for anyone who loves that classic click. The
                  weight needed to press each key is a little more than the reds
                  (50 centi-newtons instead of 45cN), but because of the very
                  obvious tactile bump, touch typists love them. The key (pun
                  intended) is that you don’t need to push each letter all the
                  way down to register the press.
                </p>
              </div>
            </div>
          </div>
          <div className="info-card-sections">
            <div className="info-card">
              <h5>Reds</h5>
              <div className="information details">
                <img
                  src="https://www.ttesports.com/html/Switch/img/A03.png"
                  alt="pic of Red Switch"
                  width="auto"
                  height="100"
                />
                <p>
                  Red switches are your classic gamer switches. Reds have been
                  around since 2008 and have one of the lowest actuation forces
                  needed of any Cherry MX switch. That means they’re light and
                  fast and offer minimal resistance. These are for the gamer
                  that wants to bounce from key to key and nail each command.
                </p>
              </div>
            </div>
          </div>
          <div className="info-card-sections">
            <div className="info-card">
              <h5>Browns</h5>
              <div className="information details">
                <img
                  src="https://www.ttesports.com/html/Switch/img/A05.png"
                  alt="pic of Brown Switch"
                  width="auto"
                  height="100"
                />
                <p>
                  The brown switches are the jack-of-of-all-trades, they work
                  well as a gaming or typing keyboard. They’ve been around since
                  1994 and have seen very few revisions in that time. They don’t
                  have the same loud click as the blue variants, but they do
                  still have a tactile bump that makes typing easier. So, if you
                  work from home and crack into Overwatch after hours, this one
                  is probably for you.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {services ? (
        <div className="info-sections">
          <h5>Services</h5>
          <div className="info-card-sections">
            <div className="info-card">
              <h5>Lubing switches</h5>
              <div className="information details">
                <p>
                  Lubricating switches can help dampen sounds both from the
                  housing and stem itself but also from the spring. It can
                  smooth out imperfections in the material and help things glide
                  along with less friction and hitches. It can do this without
                  removing tactility if done properly and with the right lube
                  (more on this later) and it can also take a decent linear
                  switch into buttery smooth heaven.
                </p>
              </div>
            </div>
          </div>
          <div className="info-card-sections">
            <div className="info-card">
              <h5>Film switches </h5>
              <div className="information details">
                <p>
                  Normally keystrokes will have slightly different sounds. This
                  depends on a few different variables. One of these variables
                  is friction, which is caused by your switches not being lubed.
                  The other variable would be any sort of wobble from the top
                  and bottom of the switch being loose. Switch films correct the
                  second issue. They are basically a thin piece of plastic that
                  sits between the switch top and the switch bottom. This
                  removes the wobble effect and stabilizes the switch.
                </p>
              </div>
            </div>
          </div>
          <div className="info-card-sections">
            <div className="info-card">
              <h5>Silencing Stablilisers </h5>
              <div className="information details">
                <p>
                  Stabilisers are attached to the larger keys, such as the
                  spacebar, enter, shift, and backspace. They can be loud,
                  rattly and just annoying sounding in general. Silencing them
                  generally involves three steps. Clipping the stabiliser legs
                  can help reduce the sound of the stabiliser hitting the
                  PCB.Silicone grease will create a buffer between the stem and
                  the outer casing which will reduce rattle and
                  plastic-on-plastic contact. Heat shrinking the wire to help
                  reduce the sound of the wire hitting surfaces.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Information;
