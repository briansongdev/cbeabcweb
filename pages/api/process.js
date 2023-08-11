// Schema for req.body
// exposure_duration
// met_activity_name
// met_activity_value
// relative_humidity
// air_speed
// air_temperature
// radiant_temperature
// clo_ensemble_name

import axios from "axios";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      let phases = [],
        currTimer = 0;
      for (let i = 0; i < req.body.phases.length; i++) {
        phases.push({
          start_time: currTimer,
          time_units: "minutes",
          ramp: false,
          end_time: currTimer + req.body.phases[i].exposure_duration,
          met_activity_name: req.body.phases[i].met_activity_name,
          met: req.body.phases[i].met_activity_value,
          default_data: {
            rh: req.body.phases[i].relative_humidity / 100,
            v: req.body.phases[i].air_speed,
            solar: 0,
            ta: req.body.phases[i].air_temperature,
            mrt: req.body.phases[i].radiant_temperature,
          },
          clo_ensemble_name: req.body.phases[i].clo_ensemble_name,
        });
        currTimer += req.body.phases[i].exposure_duration;
      }
      const obj = {
        name: "CBE Interface Test",
        description: "Prototype testing requests",
        reference_time: new Date(),
        output_freq: 60,
        options: {
          csvOutput: false,
          sensation_adaptation: false,
          sensation_coredTdt: false,
          ignore_segments: false,
          ignore_physiology: false,
          neutralSimulationOutput: false,
        },
        phases: phases,
      };
      const interfaceResult = await axios
        .post(process.env.DB_URL, {
          ...obj,
        })
        .then((result) => {
          let graphObject = [],
            ctr = 0;
          for (let i = 0; i < req.body.phases.length; i++) {
            for (let j = 0; j < req.body.phases[i].exposure_duration; j++) {
              graphObject.push(result.data.results[ctr].overall);
              ctr += 1;
            }
          }
          return res.json(graphObject);
        });
    } catch (err) {
      console.log(err);
      return res.json({ success: false, error: err.response });
    }
  }
}
