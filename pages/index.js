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
  Container,
  HStack,
  VStack,
  Heading,
  Spacer,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  RadioGroup,
  Radio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Spinner,
  Center,
  useToast,
  Fade,
} from "@chakra-ui/react";
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

const met_correspondence = [
  {
    action: "Sleeping",
    met: 0.8,
  },
  {
    action: "Sitting Quietly",
    met: 1,
  },
  {
    action: "Standing Quietly",
    met: 1.2,
  },
  {
    action: "Walking at 3.2 km/h",
    met: 2,
  },
  {
    action: "Walking at 4.3 km/h",
    met: 2.6,
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

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure();
  const [params, setParams] = useState({
    exposure_duration: -1,
    air_temperature: -1,
    radiant_temperature: -1,
    air_speed: -1,
    relative_humidity: -1,
  });
  const [metValue, setMetValue] = useState("-1");
  const [cloValue, setCloValue] = useState("-1");
  const [showRange, setShowRange] = useState(false);
  const [graphOptions, setGraph] = useState();
  const [graphData, setData] = useState([]);
  const loadingModal = useDisclosure();

  const toast = useToast();

  useEffect(() => {}, [graphOptions]);

  const displayOptions = [
    {
      title: "Exposure duration",
      icon: <TimeIcon color="gray.400" />,
      unit: "min",
      val: "exposure_duration",
      key: "expd",
    },
    {
      title: "Ambient temperature",
      icon: <SunIcon color="gray.400" />,
      unit: "°C",
      val: "air_temperature",
      key: "ambt",
    },
    {
      title: "Mean radiant temperature",
      icon: <StarIcon color="gray.400" />,
      unit: "°C",
      val: "radiant_temperature",
      key: "radt",
    },
    {
      title: "Air speed",
      icon: <SpinnerIcon color="gray.400" />,
      unit: "m/s",
      val: "air_speed",
      key: "airsp",
    },
    {
      title: "Relative humidity",
      icon: <RepeatIcon color="gray.400" />,
      unit: "%",
      val: "relative_humidity",
      key: "relhum",
    },
  ];

  const OptionRenderer = ({ title, icon, unit, val, key }) => {
    return (
      <div key={key}>
        <Text fontWeight="black" mb="10px">
          {title}
        </Text>
        <HStack>
          <InputGroup w="15vw">
            <InputLeftElement>{icon}</InputLeftElement>
            <Input
              backgroundColor="white"
              type="number"
              value={params.val == -1 ? "" : params.val}
              onChange={(e) => {
                if (
                  e.target.value != "" &&
                  val == "relative_humidity" &&
                  e.target.value <= 0
                )
                  e.target.value = 0;
                if (
                  e.target.value != "" &&
                  val == "relative_humidity" &&
                  e.target.value >= 100
                )
                  e.target.value = 100;
                setParams((params) => ({
                  ...params,
                  [val]: parseInt(e.target.value),
                }));
              }}
            />
          </InputGroup>
          <Text>{unit}</Text>
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
              <Spinner size="xl" speed="0.75s" color="white" thickness="4px" />
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
        <HStack margin="20px" alignItems="flex-start">
          <VStack
            w="40%"
            backgroundColor="gray.100"
            borderRadius="10px"
            padding={5}
            spacing={3}
            alignItems="flex-start"
          >
            {!graphOptions || graphData.length == 0 ? (
              <>
                <Flex w="100%">
                  <Text fontSize="2xl" fontWeight="600">
                    Condition #1
                  </Text>
                  <Spacer />
                  <Button
                    backgroundColor="gray.300"
                    leftIcon={<AddIcon />}
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
                    Add Condition
                  </Button>
                </Flex>
                <HStack w="100%" alignItems="flex-start">
                  <VStack w="50%" alignItems="flex-start">
                    {displayOptions.map((option) => {
                      return OptionRenderer({
                        title: option.title,
                        icon: option.icon,
                        unit: option.unit,
                        val: option.val,
                        key: option.key,
                        comp: option.comp,
                      });
                    })}
                  </VStack>
                  <VStack pl={5} w="50%" alignItems="flex-start">
                    <Text fontWeight="black">Metabolic rate</Text>
                    <RadioGroup
                      defaultChecked={false}
                      onChange={setMetValue}
                      value={metValue}
                    >
                      <Stack direction="column">
                        {met_correspondence.map((met, index) => {
                          return (
                            <Radio
                              key={met.met}
                              size="md"
                              value={index.toString()}
                              backgroundColor="white"
                            >
                              {met.action} ({met.met} met)
                            </Radio>
                          );
                        })}
                      </Stack>
                    </RadioGroup>
                    <Text fontWeight="black">Clothing level</Text>
                    <RadioGroup
                      defaultChecked={false}
                      onChange={setCloValue}
                      value={cloValue}
                    >
                      <Stack direction="column">
                        {clo_correspondence.map((clo, index) => {
                          return (
                            <div key={clo.clo}>
                              <Radio
                                size="md"
                                value={index.toString()}
                                backgroundColor="white"
                              >
                                {clo.name} ({clo.clo} clo)
                              </Radio>
                              <Text fontSize="13px" color="gray.600">
                                {clo.description}
                              </Text>
                            </div>
                          );
                        })}
                      </Stack>
                    </RadioGroup>
                  </VStack>
                </HStack>
                <HStack alignItems="center" alignSelf="center">
                  <Text fontWeight="600">Color-code ranges on graph</Text>
                  <Switch
                    size="lg"
                    isChecked={showRange}
                    onMouseEnter={() => {
                      toast.closeAll();
                      toast({
                        title:
                          "To be implemented soon! (comfort and sensation have different ranges for normality)",
                        status: "warning",
                        duration: 3500,
                        isClosable: true,
                        position: "top",
                      });
                    }}
                  />
                </HStack>
                <div
                  style={{ alignSelf: "center" }}
                  onMouseEnter={() => {
                    if (
                      Object.values(params).some((x) => x == -1) ||
                      metValue == "-1" ||
                      cloValue == "-1"
                    )
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
                        const metrics = await axios
                          .post("/api/process", {
                            exposure_duration: params.exposure_duration,
                            met_activity_name:
                              met_correspondence[parseInt(metValue)].action,
                            met_activity_value:
                              met_correspondence[parseInt(metValue)].met,
                            relative_humidity: params.relative_humidity,
                            air_speed: params.air_speed,
                            air_temperature: params.air_temperature,
                            radiant_temperature: params.radiant_temperature,
                            clo_ensemble_name:
                              clo_correspondence[parseInt(cloValue)].name,
                          })
                          .then((res) => {
                            setData(res.data);
                            setGraph(
                              graphBuilderOptions({
                                title: "Comfort and Sensation vs. Time",
                                data: res.data,
                                showRange: showRange,
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
                    isDisabled={
                      Object.values(params).some((x) => x == -1) ||
                      metValue == "-1" ||
                      cloValue == "-1"
                    }
                  >
                    Simulate
                  </Button>
                </div>
              </>
            ) : (
              <VStack alignSelf="center">
                <Text fontWeight="black">
                  After {graphData.length} minutes...
                </Text>
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
                <Text>
                  Starting comfort: {graphData[0].comfort.toPrecision(3)} |
                  Final comfort:{" "}
                  {graphData[graphData.length - 1].comfort.toPrecision(3)}
                </Text>
                <Text>
                  ∆ comfort:{" "}
                  {(
                    graphData[graphData.length - 1].comfort -
                    graphData[0].comfort
                  ).toPrecision(3)}
                </Text>
                <Text>
                  Starting sensation: {graphData[0].sensation.toPrecision(3)} |
                  Final sensation:{" "}
                  {graphData[graphData.length - 1].sensation.toPrecision(3)}
                </Text>
                <Text>
                  ∆ sensation:{" "}
                  {(
                    graphData[graphData.length - 1].sensation -
                    graphData[0].sensation
                  ).toPrecision(3)}
                </Text>
                <Button
                  colorScheme="blue"
                  textColor="yellow.300"
                  mt="10px"
                  onClick={() => {
                    setGraph();
                    setData([]);
                    setParams({
                      exposure_duration: -1,
                      air_temperature: -1,
                      radiant_temperature: -1,
                      air_speed: -1,
                      relative_humidity: -1,
                    });
                    setMetValue("-1");
                    setCloValue("-1");
                  }}
                >
                  Simulate again
                </Button>
              </VStack>
            )}
          </VStack>
          <VStack w="60%">
            {graphOptions ? (
              <Box width="100%" height="40vh">
                <ReactECharts notMerge={true} option={graphOptions} />
              </Box>
            ) : (
              <Text>
                No data inputted yet. Please input and hit 'Simulate.'
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
