import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Switch,
  HStack,
  VStack,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
  Center,
  useToast,
  Fade,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import RSelect from "react-select";
import Creatable from "react-select/creatable";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  AddIcon,
  TimeIcon,
  SunIcon,
  RepeatIcon,
  SpinnerIcon,
  StarIcon,
} from "@chakra-ui/icons";
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import ReactECharts from "echarts-for-react";
import { graphBuilderOptions } from "../components/graphbuilder";
import { PiWaveform } from "react-icons/pi";
import { TiArrowLeftOutline } from "react-icons/ti";

const met_auto = [
  {
    label: "Sleeping (0.8)",
    value: 0.8,
  },
  {
    label: "Sitting Quietly (1)",
    value: 1,
  },
  {
    label: "Standing Quietly (1.2)",
    value: 1.2,
  },
  {
    label: "Walking at 3.2 km/h (2)",
    value: 2,
  },
  {
    label: "Walking at 4.3 km/h (2.6)",
    value: 2.6,
  },
];

const clo_correspondence = [
  {
    name: "Nude",
    clo: 0,
    description: "Nude",
  },
  {
    name: "CATARC_Summer_1",
    clo: 0.4,
    description: "T-shirt, short pants, and sandals",
  },
  {
    name: "CATARC_Winter_1",
    clo: 1,
    description:
      "Long sleeve shirts, cashmere sweater, jacket, long pants and inner pants, socks, and sneakers",
  },
];

const graphsVals = [
  { label: "Overall", value: 0 },
  { label: "Head", value: 1 },
  { label: "Chest", value: 2 },
  { label: "Back", value: 3 },
  { label: "Pelvis", value: 4 },
  { label: "Left Upper Arm", value: 5 },
  { label: "Right Upper Arm", value: 6 },
  { label: "Left Lower Arm", value: 7 },
  { label: "Right Lower Arm", value: 8 },
  { label: "Left Hand", value: 9 },
  { label: "Right Hand", value: 10 },
  { label: "Left Thigh", value: 11 },
  { label: "Right Thigh", value: 12 },
  { label: "Left Lower Leg", value: 13 },
  { label: "Right Lower Leg", value: 14 },
  { label: "Left Foot", value: 15 },
  { label: "Right Foot", value: 16 },
];

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const [params, setParams] = useState([
    {
      exposure_duration: 60,
      air_temperature: 25,
      radiant_temperature: 25,
      air_speed: 0.1,
      relative_humidity: 50,
      met_value: 1,
      clo_value: "1",
      stratification: 0,
      // 0 = no strat, 1 = standing, 2 = seated
      at_delta: 0,
      mr_delta: 0,
      as_delta: 0,
      rh_delta: 0,
    },
  ]);
  const [numtoGraph, setNumToGraph] = useState(0);
  const [fullData, setFullData] = useState([]);
  const [ind, setIndex] = useState(0);
  const [metOptions, setMetOptions] = useState(met_auto);
  const [graphOptions, setGraph] = useState();
  const [graphData, setData] = useState([]);
  const loadingModal = useDisclosure();

  const toast = useToast();

  useEffect(() => {}, [graphOptions, ind, numtoGraph]);

  const displayOptions = [
    {
      title: "Exposure duration",
      icon: <TimeIcon color="gray.400" />,
      unit: "min",
      val: "exposure_duration",
      key: "expd",
      step: 1,
      precision: 0,
    },
    {
      title: "Ambient temperature",
      icon: <SunIcon color="gray.400" />,
      unit: "°C",
      val: "air_temperature",
      key: "ambt",
      step: 0.1,
      precision: 1,
      deltaKey: "at_delta",
    },
    {
      title: "Mean radiant temperature",
      icon: <StarIcon color="gray.400" />,
      unit: "°C",
      val: "radiant_temperature",
      key: "radt",
      step: 0.1,
      precision: 1,
      deltaKey: "mr_delta",
    },
    {
      title: "Air speed",
      icon: <SpinnerIcon color="gray.400" />,
      unit: "m/s",
      val: "air_speed",
      key: "airsp",
      step: 0.1,
      precision: 1,
      deltaKey: "as_delta",
    },
    {
      title: "Relative humidity",
      icon: <RepeatIcon color="gray.400" />,
      unit: "%",
      val: "relative_humidity",
      key: "relhum",
      step: 1,
      precision: 0,
      deltaKey: "rh_delta",
    },
  ];

  const OptionRenderer = ({
    title,
    deltaKey,
    unit,
    val,
    key,
    step,
    precision,
  }) => {
    return (
      <div key={key}>
        <Text fontWeight="black" mb="10px">
          {title}
        </Text>
        <HStack width="100%">
          {/* <InputLeftAddon backgroundColor="white">{icon}</InputLeftAddon> */}
          <NumberInput
            w="5vw"
            allowMouseWheel
            backgroundColor="white"
            type="number"
            textAlign="right"
            value={params[ind][val]}
            onChange={(e) => {
              let newState = [...params];
              newState[ind][val] = parseFloat(e);
              setParams(newState);
            }}
            min={0}
            max={100}
            precision={precision}
            step={step}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Text>{unit}</Text>
          <Spacer />
          {params[ind].stratification != 0 && deltaKey ? (
            <NumberInput
              w="5vw"
              allowMouseWheel
              backgroundColor="white"
              type="number"
              textAlign="right"
              borderColor="yellow.400"
              value={params[ind][deltaKey]}
              onChange={(e) => {
                let newState = [...params];
                newState[ind][deltaKey] = parseFloat(e);
                setParams(newState);
              }}
              precision={0}
              step={1}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          ) : (
            <></>
          )}
        </HStack>
      </div>
    );
  };

  return (
    <Box>
      <Head>
        <title>Berkeley CBE Comfort Tool</title>
      </Head>
      <Modal isCentered isOpen={loadingModal.isOpen}>
        <ModalOverlay />
        <ModalContent boxShadow="0px" bgColor="transparent">
          <ModalBody>
            <Center>
              <Spinner
                size="xl"
                speed="0.75s"
                color="yellow.400"
                thickness="4px"
              />
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
            style={{ fontWeight: "800", fontSize: 35 }}
          >
            <span id="styledText">Berkeley CBE</span> Comfort Tool
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}></Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={2}
          alignItems={"center"}
        >
          <Text>SI</Text>
          <Switch
            size="lg"
            isChecked={false}
            onMouseEnter={() => {
              toast.closeAll();
              toast({
                title: "To be implemented soon!",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
              });
            }}
          />
          <Text mr={5}>IP</Text>
          <Button
            as={"a"}
            display={{ base: "none", md: "inline-flex" }}
            fontSize={"md"}
            fontWeight={600}
            color={"#007AFF"}
            bg={"yellow.400"}
            href={"#"}
            _hover={{
              bg: "yellow.300",
            }}
            onMouseEnter={() => {
              toast.closeAll();
              toast({
                title: "To be implemented soon!",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
              });
            }}
          >
            Help
          </Button>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity></Collapse>
      <Fade
        in={true}
        style={{ width: "100%" }}
        transition={{ enter: { duration: 0.5 } }}
      >
        <HStack margin="20px" alignItems="flex-start" spacing={5}>
          <VStack w="40%">
            <HStack w="100%" padding={2} alignItems="flex-start">
              <HStack w="90%" overflowY={"scroll"} spacing={3}>
                {params.map((elem, indx) => {
                  return (
                    <Button
                      key={indx}
                      minW="110px"
                      colorScheme={ind == indx ? "yellow" : "gray"}
                      textColor={ind == indx ? "#007AFF" : "black"}
                      onClick={() => {
                        if (ind == indx) return false;
                        else setIndex(indx);
                      }}
                    >
                      Condition {indx + 1}
                    </Button>
                  );
                })}
              </HStack>
              {/* <Tooltip
                label={
                  stratification == 0
                    ? "Uniform"
                    : stratification == 1
                    ? "Stratified, standing"
                    : "Stratified, seated"
                }
                bg="#007AFF"
                hasArrow
              >
                <IconButton
                  colorScheme="blue"
                  icon={<PiWaveform />}
                  onClick={() => {
                    changeStratified((stratification + 1) % 3);
                  }}
                ></IconButton>
              </Tooltip> */}
              <IconButton
                w="5%"
                colorScheme="blue"
                textColor="yellow.400"
                icon={<AddIcon />}
                onClick={() => {
                  params.push({
                    exposure_duration: 60,
                    air_temperature: 25,
                    radiant_temperature: 25,
                    air_speed: 0.1,
                    relative_humidity: 50,
                    met_value: 1,
                    clo_value: "1",
                    stratification: 0,
                    at_delta: 0,
                    mr_delta: 0,
                    as_delta: 0,
                    rh_delta: 0,
                  });
                  setIndex(params.length - 1);
                }}
              ></IconButton>
            </HStack>
            <VStack
              w="100%"
              backgroundColor="gray.100"
              borderRadius="10px"
              padding={5}
              spacing={1}
              alignItems="flex-start"
            >
              <>
                <Flex w="100%" alignItems="center">
                  <Text fontSize="2xl" fontWeight="600">
                    Condition #{ind + 1}
                  </Text>
                  <Spacer />
                  <Select
                    mr={3}
                    backgroundColor="white"
                    onChange={(e) => {
                      let newState = [...params];
                      newState[ind].stratification = parseInt(e.target.value);
                      setParams(newState);
                    }}
                    value={params[ind].stratification.toString()}
                    w="15vw"
                  >
                    <option
                      size="md"
                      key={"Option1"}
                      value="0"
                      style={{ backgroundColor: "white" }}
                    >
                      Uniform
                    </option>
                    <option
                      size="md"
                      key={"Option2"}
                      value="1"
                      style={{ backgroundColor: "white" }}
                    >
                      Stratified, standing
                    </option>
                    <option
                      size="md"
                      key={"Option3"}
                      value="2"
                      style={{ backgroundColor: "white" }}
                    >
                      Stratified, sitting
                    </option>
                  </Select>
                  <IconButton
                    w="5%"
                    colorScheme="red"
                    icon={<CloseIcon />}
                    isDisabled={params.length == 1}
                    onClick={() => {
                      let tempParams = [...params];
                      tempParams.splice(ind, 1);
                      setParams(tempParams);
                      setIndex(Math.max(0, ind - 1));
                    }}
                  ></IconButton>
                </Flex>
                <HStack w="100%" alignItems="flex-start">
                  <VStack w="40%" alignItems="flex-start">
                    {displayOptions.map((option) => {
                      return OptionRenderer({
                        title: option.title,
                        icon: option.icon,
                        unit: option.unit,
                        val: option.val,
                        key: option.key,
                        comp: option.comp,
                        step: option.step,
                        deltaKey: option.deltaKey,
                      });
                    })}
                  </VStack>
                  <VStack
                    pl={5}
                    w="60%"
                    alignItems="flex-start"
                    justifyContent={"center"}
                  >
                    <Text fontWeight="black">Metabolic rate</Text>
                    <Creatable
                      instanceId="zjhddjh1oi2euiAUSD901280198"
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          width: "20vw",
                        }),
                      }}
                      placeholder="Input numeric value (mets)"
                      isClearable
                      onChange={(val) => {
                        let newState = [...params];
                        if (val) newState[ind].met_value = val.value;
                        else newState[ind].met_value = -1;
                        setParams(newState);
                      }}
                      onCreateOption={(inputValue) => {
                        const val = parseFloat(inputValue);
                        let newState = [...params];
                        newState[ind].met_value = val;
                        setParams(newState);
                        setMetOptions((prev) => [
                          ...prev,
                          {
                            label: val,
                            value: val,
                          },
                        ]);
                      }}
                      defaultValue={metOptions[1]}
                      options={metOptions}
                    />
                    {params[ind].met_value != -1 ? (
                      <Text>
                        Met:{" "}
                        <span style={{ fontWeight: "bold" }}>
                          {params[ind].met_value}
                        </span>
                      </Text>
                    ) : (
                      <></>
                    )}
                    <Text fontWeight="black">Clothing level</Text>
                    <Select
                      backgroundColor="white"
                      onChange={(e) => {
                        let newState = [...params];
                        newState[ind].clo_value = e.target.value.toString();
                        setParams(newState);
                      }}
                      value={params[ind].clo_value}
                    >
                      {clo_correspondence.map((clo, index) => {
                        return (
                          <option
                            size="md"
                            key={clo.clo}
                            value={index.toString()}
                            style={{ backgroundColor: "white" }}
                          >
                            {clo.name}
                          </option>
                        );
                      })}
                    </Select>
                    <Text color="gray.600">
                      {clo_correspondence[params[ind].clo_value].clo} clo -{" "}
                      <span style={{ fontSize: "13px", color: "gray.600" }}>
                        {clo_correspondence[params[ind].clo_value].description}
                      </span>
                    </Text>
                    {params[ind].stratification != 0 ? (
                      <>
                        <Text
                          fontWeight="black"
                          color="yellow.500"
                          textAlign={"center"}
                          mt={3}
                        >
                          Input head-to-foot deltas in each highlighted field.
                        </Text>
                        <Center w="100%">
                          <TiArrowLeftOutline
                            style={{ color: "#007AFF" }}
                            size={45}
                          />
                        </Center>
                      </>
                    ) : (
                      <></>
                    )}
                  </VStack>
                </HStack>
              </>
            </VStack>
            <div
              style={{ alignSelf: "center" }}
              onMouseEnter={() => {
                if (Object.values(params).some((x) => x == -1 || x == "-1"))
                  toast({
                    title: "Please fill out all fields first.",
                    status: "warning",
                    duration: 2000,
                    isClosable: true,
                  });
              }}
            >
              <Button
                mt="7px"
                colorScheme="yellow"
                textColor="#007AFF"
                alignSelf="center"
                onClick={async () => {
                  loadingModal.onOpen();
                  try {
                    let phases = [],
                      deltas = [];
                    for (let i = 0; i < params.length; i++) {
                      phases.push({
                        exposure_duration: params[i].exposure_duration,
                        met_activity_name: "Custom-defined Met Activity",
                        met_activity_value: parseFloat(params[i].met_value),
                        relative_humidity: params[i].relative_humidity,
                        air_speed: params[i].air_speed,
                        air_temperature: params[i].air_temperature,
                        radiant_temperature: params[i].radiant_temperature,
                        clo_ensemble_name:
                          clo_correspondence[parseInt(params[i].clo_value)]
                            .name,
                        stratification: params[i].stratification,
                      });
                      deltas.push({
                        at: params[i].at_delta,
                        mr: params[i].mr_delta,
                        as: params[i].as_delta,
                        rh: params[i].rh_delta,
                      });
                    }
                    const metrics = await axios
                      .post("/api/process", {
                        phases: phases,
                        deltas: deltas,
                      })
                      .then((res) => {
                        let tempArr = [];
                        for (let j = 0; j < res.data.length; j++) {
                          tempArr.push(res.data[j][numtoGraph]);
                        }
                        setData(tempArr);
                        setFullData(res.data);
                        setGraph(
                          graphBuilderOptions({
                            title: "Comfort and Sensation vs. Time",
                            data: tempArr,
                            legends: ["Comfort", "Sensation"],
                          })
                        );
                        loadingModal.onClose();
                      });
                  } catch (err) {
                    loadingModal.onClose();
                    alert("An error has occurred. Please try again.");
                    console.log(err);
                  }
                }}
                isDisabled={params.some((elem) => !elem.met_value)}
              >
                Run simulation
              </Button>
            </div>
          </VStack>

          <VStack w="60%">
            {graphOptions ? (
              <>
                <VStack
                  alignSelf="center"
                  backgroundColor="gray.200"
                  padding={5}
                  spacing={8}
                  w="100%"
                  borderRadius="10px"
                >
                  <RSelect
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={graphsVals[numtoGraph]}
                    isSearchable={true}
                    isClearable={false}
                    options={graphsVals}
                    instanceId="zjhddiasdwjh1oi2euiAUSD901280198"
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        width: "20vw",
                      }),
                    }}
                    placeholder="Input body part to graph."
                    onChange={(val) => {
                      loadingModal.onOpen();
                      setNumToGraph(val.value);
                      let changedArr = [];
                      for (let j = 0; j < fullData.length; j++) {
                        changedArr.push(fullData[j][val.value]);
                      }
                      setGraph(
                        graphBuilderOptions({
                          title:
                            "Comfort and Sensation vs. Time - " + val.label,
                          data: changedArr,
                          legends: ["Comfort", "Sensation"],
                        })
                      );
                      loadingModal.onClose();
                    }}
                  />
                  <Box width="100%" height="40vh">
                    <ReactECharts notMerge={true} option={graphOptions} />
                  </Box>
                  <VStack>
                    <Text fontWeight="black">
                      After {graphData.length} minutes...
                    </Text>
                    <HStack>
                      <VStack>
                        <Text fontWeight="600">
                          Average comfort:{" "}
                          {(
                            graphData.reduce((r, c) => r + c.comfort, 0) /
                            graphData.length
                          ).toPrecision(3)}
                        </Text>
                        <Text fontWeight="600">
                          Average sensation:{" "}
                          {(
                            graphData.reduce((r, c) => r + c.sensation, 0) /
                            graphData.length
                          ).toPrecision(3)}
                        </Text>
                      </VStack>
                      <VStack align="end">
                        <Text>
                          Start: {graphData[0].comfort.toPrecision(3)} | Final:{" "}
                          {graphData[graphData.length - 1].comfort.toPrecision(
                            3
                          )}{" "}
                          | ∆:{" "}
                          {(
                            graphData[graphData.length - 1].comfort -
                            graphData[0].comfort
                          ).toPrecision(3)}
                        </Text>
                        <Text>
                          Start: {graphData[0].sensation.toPrecision(3)} |
                          Final:{" "}
                          {graphData[
                            graphData.length - 1
                          ].sensation.toPrecision(3)}{" "}
                          | ∆:{" "}
                          {(
                            graphData[graphData.length - 1].sensation -
                            graphData[0].sensation
                          ).toPrecision(3)}
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </VStack>
              </>
            ) : (
              <Text>
                No simulation run yet. Please input data and hit Simulate.
              </Text>
            )}
          </VStack>
        </HStack>
      </Fade>
    </Box>
  );
}

const DesktopSubNav = ({ label, subLabel, children, href }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("pink.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "pink.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"pink.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
