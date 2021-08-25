import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const ExtrasChart = () => {
  const [hoodie, setHoodie] = useState(0);
  const [mousepad, setMouspad] = useState(0);
  const [rgb, setRgb] = useState(0);
  const [builds, setBuilds] = useState([]);

  let newhoodie = 0;
  let newmousepad = 0;
  let newrgb = 0;

  useEffect(() => {
    checkForBuilds();
  }, [builds]);

  async function getAllBuilds() {
    const response = await axios.get('http://localhost:5000/api/build');
    setBuilds(response.data);
    console.log(response.data);
  }

  const checkForBuilds = () => {
    if (builds.length === 0) {
      getAllBuilds();
    } else {
      pullExtras();
    }
  };

  const pullExtras = () => {
    builds.forEach(build => {
      if (build.products[3] === 'XL mousepad') {
        newmousepad += 1;
        setMouspad(newmousepad);
      } else if (build.products[3] === 'Hoodie') {
        newhoodie += 1;
        setHoodie(newhoodie);
      } else if (build.products[3] === 'RGB Lights') {
        newrgb += 1;
        setRgb(newrgb);
      }
    });
  };

  return (
    <div>
      <Bar
        type="bar"
        data={{
          labels: ['Hoodie', 'Xl Mousepad', 'RGB'],
          datasets: [
            {
              label: 'Extras',
              data: [hoodie, mousepad, rgb],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(24, 255, 50, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(24, 255, 50, 1)',
              ],
              borderWidth: 1,
            },
          ],
        }}
        height={300}
        width={300}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default ExtrasChart;
