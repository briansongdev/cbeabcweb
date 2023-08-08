// title: Comfort and Sensation vs. Time
// legends: ["Comfort", "Sensation"]
export const graphBuilderOptions = (data) => {
  const options = {
    title: {
      text: data.title,
      left: "5%",
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
      min: -4,
      max: 4,
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
          return item.comfort;
        }),
      },
      {
        name: data.legends[1],
        type: "line",
        data: data.data.map(function (item) {
          return item.sensation;
        }),
      },
    ],
  };
  if (data.showRange)
    options.visualMap = {
      show: false,
      top: 50,
      right: 5,
      pieces: [
        {
          gt: -1,
          lte: 1,
          color: "#93CE07",
        },
        {
          gt: 1,
          lte: 2,
          color: "#FBDB0F",
        },
        {
          gt: 2,
          lte: 3,
          color: "#FC7D02",
        },
        {
          gt: 3,
          lte: 4,
          color: "#FD0100",
        },
        {
          gt: -2,
          lte: -1,
          color: "#FBDB0F",
        },
        {
          gt: -3,
          lte: -2,
          color: "#FC7D02",
        },
        {
          gt: -4,
          lte: -3,
          color: "#FD0100",
        },
      ],
      outOfRange: {
        color: "#999",
      },
    };
  else delete options.visualMap;
  return options;
};
