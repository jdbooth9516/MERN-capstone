import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const ServiceChart = () => {
  const [builds, setBuilds] = useState([]);
  const [switchLube, setSwitchLube] = useState(0);
  const [stabalizerLube, setStabalizerLube] = useState(0);
  const [switchFilm, setSwitchFilm] = useState(0);

  let newswitch = 0;
  let newstabs = 0;
  let newfilm = 0;

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
      pullServices();
    }
  };

  const pullServices = () => {
    builds.forEach(build => {
      console.log(build);
      if (build.products[2] === 'Switch Lube') {
        newswitch += 1;
        setSwitchLube(newswitch);
      } else if (build.products[2] === 'Stabalizer Lube') {
        newstabs += 1;
        setStabalizerLube(newstabs);
      } else if (build.products[2] === 'Switch Film') {
        newfilm += 1;
        setSwitchFilm(newfilm);
      }
    });
  };

  return (
    <div>
      <Bar
        type="bar"
        data={{
          labels: ['Switch Lube', 'Stabalizer Lube', 'Switch Film'],
          datasets: [
            {
              label: 'Services',
              data: [switchLube, stabalizerLube, switchFilm],
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

export default ServiceChart;
