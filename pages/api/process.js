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

const stand_fr = {
  Head: 1.0,
  Chest: 0.82,
  Back: 0.82,
  Pelvis: 0.65,
  "Left Upper Arm": 0.82,
  "Right Upper Arm": 0.82,
  "Left Lower Arm": 0.65,
  "Right Lower Arm": 0.65,
  "Left Hand": 0.47,
  "Right Hand": 0.47,
  "Left Thigh": 0.47,
  "Right Thigh": 0.47,
  "Left Lower Leg": 0.24,
  "Right Lower Leg": 0.24,
  "Left Foot": 0.0,
  "Right Foot": 0.0,
};
const sit_fr = {
  Head: 1.0,
  Chest: 0.77,
  Back: 0.77,
  Pelvis: 0.65,
  "Left Upper Arm": 0.77,
  "Right Upper Arm": 0.77,
  "Left Lower Arm": 0.65,
  "Right Lower Arm": 0.65,
  "Left Hand": 0.54,
  "Right Hand": 0.54,
  "Left Thigh": 0.54,
  "Right Thigh": 0.54,
  "Left Lower Leg": 0.23,
  "Right Lower Leg": 0.23,
  "Left Foot": 0.0,
  "Right Foot": 0.0,
};

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      let phases = [],
        currTimer = 0;
      for (let i = 0; i < req.body.phases.length; i++) {
        if (req.body.phases[i].stratification == 0) {
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
        } else if (req.body.phases[i].stratification == 1) {
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
            segment_data: {
              Head: {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Head"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Head"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Head"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Head"]) * req.body.deltas[i].as,
              },
              Chest: {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Chest"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Chest"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Chest"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Chest"]) * req.body.deltas[i].as,
              },
              Back: {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Back"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Back"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Back"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Back"]) * req.body.deltas[i].as,
              },
              Pelvis: {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Pelvis"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Pelvis"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Pelvis"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Pelvis"]) * req.body.deltas[i].as,
              },
              "Left Upper Arm": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Left Upper Arm"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Left Upper Arm"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Left Upper Arm"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Left Upper Arm"]) * req.body.deltas[i].as,
              },
              "Right Upper Arm": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Right Upper Arm"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Right Upper Arm"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Right Upper Arm"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Right Upper Arm"]) * req.body.deltas[i].as,
              },
              "Left Lower Arm": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Left Lower Arm"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Left Lower Arm"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Left Lower Arm"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Left Lower Arm"]) * req.body.deltas[i].as,
              },
              "Right Lower Arm": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Right Lower Arm"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Right Lower Arm"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Right Lower Arm"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Right Lower Arm"]) * req.body.deltas[i].as,
              },
              "Left Hand": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Left Hand"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Left Hand"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Left Hand"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Left Hand"]) * req.body.deltas[i].as,
              },
              "Right Hand": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Right Hand"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Right Hand"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Right Hand"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Right Hand"]) * req.body.deltas[i].as,
              },
              "Left Thigh": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Left Thigh"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Left Thigh"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Left Thigh"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Left Thigh"]) * req.body.deltas[i].as,
              },
              "Right Thigh": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Right Thigh"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Right Thigh"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Right Thigh"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Right Thigh"]) * req.body.deltas[i].as,
              },
              "Left Lower Leg": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Left Lower Leg"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Left Lower Leg"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Left Lower Leg"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Left Lower Leg"]) * req.body.deltas[i].as,
              },
              "Right Lower Leg": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Right Lower Leg"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Right Lower Leg"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Right Lower Leg"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Right Lower Leg"]) * req.body.deltas[i].as,
              },
              "Left Foot": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Left Foot"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Left Foot"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Left Foot"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Left Foot"]) * req.body.deltas[i].as,
              },
              "Right Foot": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - stand_fr["Right Foot"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - stand_fr["Right Foot"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - stand_fr["Right Foot"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - stand_fr["Right Foot"]) * req.body.deltas[i].as,
              },
            },
          });
        } else {
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
            segment_data: {
              Head: {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Head"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Head"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Head"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Head"]) * req.body.deltas[i].as,
              },
              Chest: {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Chest"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Chest"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Chest"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Chest"]) * req.body.deltas[i].as,
              },
              Back: {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Back"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Back"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Back"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Back"]) * req.body.deltas[i].as,
              },
              Pelvis: {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Pelvis"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Pelvis"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Pelvis"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Pelvis"]) * req.body.deltas[i].as,
              },
              "Left Upper Arm": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Left Upper Arm"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Left Upper Arm"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Left Upper Arm"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Left Upper Arm"]) * req.body.deltas[i].as,
              },
              "Right Upper Arm": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Right Upper Arm"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Right Upper Arm"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Right Upper Arm"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Right Upper Arm"]) * req.body.deltas[i].as,
              },
              "Left Lower Arm": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Left Lower Arm"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Left Lower Arm"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Left Lower Arm"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Left Lower Arm"]) * req.body.deltas[i].as,
              },
              "Right Lower Arm": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Right Lower Arm"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Right Lower Arm"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Right Lower Arm"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Right Lower Arm"]) * req.body.deltas[i].as,
              },
              "Left Hand": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Left Hand"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Left Hand"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Left Hand"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Left Hand"]) * req.body.deltas[i].as,
              },
              "Right Hand": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Right Hand"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Right Hand"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Right Hand"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Right Hand"]) * req.body.deltas[i].as,
              },
              "Left Thigh": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Left Thigh"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Left Thigh"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Left Thigh"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Left Thigh"]) * req.body.deltas[i].as,
              },
              "Right Thigh": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Right Thigh"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Right Thigh"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Right Thigh"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Right Thigh"]) * req.body.deltas[i].as,
              },
              "Left Lower Leg": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Left Lower Leg"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Left Lower Leg"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Left Lower Leg"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Left Lower Leg"]) * req.body.deltas[i].as,
              },
              "Right Lower Leg": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Right Lower Leg"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Right Lower Leg"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Right Lower Leg"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Right Lower Leg"]) * req.body.deltas[i].as,
              },
              "Left Foot": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Left Foot"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Left Foot"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Left Foot"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Left Foot"]) * req.body.deltas[i].as,
              },
              "Right Foot": {
                mrt:
                  req.body.phases[i].radiant_temperature +
                  (1 - sit_fr["Right Foot"]) * req.body.deltas[i].mr,
                rh:
                  req.body.phases[i].relative_humidity / 100 +
                  (1 - sit_fr["Right Foot"]) * req.body.deltas[i].rh,
                solar: 0,
                ta:
                  req.body.phases[i].air_temperature +
                  (1 - sit_fr["Right Foot"]) * req.body.deltas[i].at,
                v:
                  req.body.phases[i].air_speed +
                  (1 - sit_fr["Right Foot"]) * req.body.deltas[i].as,
              },
            },
          });
        }
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
              let innerGraph = [];
              innerGraph.push(result.data.results[ctr].overall);
              for (const key in result.data.results[ctr].segments) {
                if (result.data.results[ctr].segments.hasOwnProperty(key)) {
                  innerGraph.push(result.data.results[ctr].segments[key]);
                }
              }
              graphObject.push(innerGraph);
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
