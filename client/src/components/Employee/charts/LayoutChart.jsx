import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const LayoutChart = ({}) => {
  const [full, setFull] = useState(0);
  const [tenkeyless, setTenkeyless] = useState(0);
  const [compact, setCompact] = useState(0);
  const [split, setSplit] = useState(0);
  const [builds, setBuilds] = useState([]);

  let newfull = 0;
  let newtenkeyless = 0;
  let newcompact = 0;
  let newsplit = 0;

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
      if (build.products[0] === 'Full Keyboard') {
        newfull += 1;
        setFull(newfull);
      } else if (build.products[0] === 'Tenkeyless') {
        newtenkeyless += 1;
        setTenkeyless(newtenkeyless);
      } else if (build.products[0] === 'compact') {
        newcompact += 1;
        setCompact(newcompact);
      } else if (build.products[0] === 'split') {
        newsplit += 1;
        setSplit(newsplit);
      }
    });
  };

  return (
    <div>
      <Bar
        type='bar'
        data={{
          labels: ['full', 'tenkeyless', 'compact', 'split'],
          datasets: [
            {
              label: 'Layouts',
              data: [full, tenkeyless, compact, split],
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
