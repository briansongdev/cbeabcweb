// title: Comfort and Sensation vs. Time
// legends: ["Comfort", "Sensation"]

const colorComfort = (comfort) => {
  if (comfort < -1) return "black";
  else if (comfort >= -1 && comfort <= 1) return "gray";
  else return "white";
};
const colorSensation = (sensation) => {
  if (sensation < -1) return "blue";
  else if (sensation >= -1 && sensation <= 1) return "green";
  else return "pink";
};
const miniMax = (value, data) => {
  // 0 for finding min, 1 for finding max
  let curr = 0;
  if (value == 0) {
    curr = Math.min(data[0].comfort, data[0].sensation);
    for (let i = 1; i < data.length; i++) {
      curr = Math.min(curr, data[i].comfort, data[i].sensation);
    }
  } else {
    curr = Math.max(data[0].comfort, data[0].sensation);
    for (let i = 1; i < data.length; i++) {
      curr = Math.max(curr, data[i].comfort, data[i].sensation);
    }
  }
  return curr;
};

export const graphBuilderOptions = (data) => {
  const options = {
    animation: false,
    textStyle: {
      fontFamily: "IBM Plex Sans",
    },
    title: {
      text: data.title,
      left: "5%",
      top: "8%",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: data.legends,
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "5%",
      containLabel: true,
    },
    toolbox: {
      right: 5,
      feature: {
        saveAsImage: {},
        restore: {},
      },
    },
    xAxis: {
      name: "Minutes since start",
      nameLocation: "center",
      nameTextStyle: { padding: 10 },
      data: data.data.map((e, index) => {
        return index + 1;
      }),
    },
    yAxis: {
      type: "value",
      name: "Value",
      nameLocation: "center",
      nameTextStyle: { padding: 10 },
      min: parseInt(Math.floor(miniMax(0, data.data))),
      max: parseInt(Math.ceil(miniMax(1, data.data))),
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        name: data.legends[0],
        type: "line",
        data: data.data.map(function (item) {
          return {
            value: item.comfort,
            itemStyle: {
              normal: {
                color: colorComfort(item.comfort),
              },
            },
          };
        }),
      },
      {
        name: data.legends[1],
        type: "line",
        data: data.data.map(function (item) {
          return {
            value: item.sensation,
            itemStyle: {
              normal: {
                color: colorSensation(item.sensation),
              },
            },
          };
        }),
      },
    ],
  };

  return options;
};
