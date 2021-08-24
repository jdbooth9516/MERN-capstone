import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const LayoutChart = ({}) => {
  const [blues, setBlues] = useState(0);
  const [reds, setReds] = useState(0);
  const [browns, setBrowns] = useState(0);

  const [builds, setBuilds] = useState([]);

  let newblues = 0;
  let newreds = 0;
  let newbrowns = 0;

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
      pullLayouts();
    }
  };

  const pullLayouts = () => {
    builds.forEach((build) => {
      console.log(build);
      if (build.products[1] === 'Blue Switches ') {
        newblues += 1;
        setBlues(newblues);
      } else if (build.products[1] === 'Red Switches') {
        newreds += 1;
        setReds(newreds);
      } else if (build.products[1] === 'Brown Switches') {
        newbrowns += 1;
        setBrowns(newbrowns);
      }
    });
  };

  return (
    <div>
      <Bar
        type='bar'
        data={{
          labels: ['Blue Switchs', 'Red Swtiches', 'Brown Switches'],
          datasets: [
            {
              label: 'Layouts',
              data: [blues, reds, browns],
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

export default LayoutChart;
