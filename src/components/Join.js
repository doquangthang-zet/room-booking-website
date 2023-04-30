import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from "../redux/slices/userSlice";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Box,
  VStack,
  Heading,
  Flex,
} from '@chakra-ui/react';
import { HiOutlineSearch } from 'react-icons/hi';
import { MdGroupAdd } from "react-icons/md";
import CreateGroup from "./CreateGroup";
import { useDisclosure } from "@chakra-ui/react";
import { groupAPI, groupNUserAPI } from "../dynamoDB";
import { useNavigate } from "react-router-dom";


const Join = () => {
  const count = useSelector((state) => state.group.value)
  const [grpData, setGrpData] = useState([])
  console.log(grpData)
  const { user } = useSelector(selectUser)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();
  const navigateToCreate = () => {
    navigate('creategroup')
  }

  const fetchGroupData = async () => {
    const response = await fetch(groupAPI)
    const currentResponse = await fetch(groupNUserAPI)
    try {
      const responseJson = await response.json()
      const currentJson = await currentResponse.json()
      const newCurrent = currentJson.Items.filter((item) => item.userid === user.sub).map(value => value.groupid)
      const result = responseJson.Items.filter((item) => !newCurrent.includes(item.id))
      console.log(newCurrent)
      setGrpData(result)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    fetchGroupData()
  }, [])

  const handleCreateRequest = (data) => {
    console.log("ID",data)
  }

  return (
    <Box w='93%' mt='1em' p='1em' alignItems='left' ml="auto" mr="auto">
      <Heading
        color="#A27083"
        textAlign="center"
        fontSize='2xl'
      >
        Join Group
      </Heading>
      {/* <Divider orientation='horizontal' /> */}
      <VStack w='100%'>
        <InputGroup mt="10px" mb="10px">
          <InputLeftElement
            pointerEvents='none'
            children={<HiOutlineSearch color='gray.300' />}
          />
          <Input placeholder='Search...' />
        </InputGroup>
        <Table variant='simple' size="lg">
          <Thead bg="#A27083">
            <Tr >
              <Th color='white' textAlign="center">Name</Th>
              {/* <Th color='white' textAlign="center">Members</Th> */}
              <Th color='white' textAlign="center">Date</Th>
              <Th color='white' textAlign="center">Time</Th>
              <Th color='white' textAlign="center">Location</Th>
              <Th color='white' textAlign="center">Action</Th>
            </Tr>
          </Thead>
          <Tbody background='white'>
            {grpData.map((item) => (
              <Tr>
                <Td textAlign="center">{item.groupname}</Td>
                {/* <Td textAlign="center">3</Td> */}
                <Td textAlign="center">{item.date}</Td>
                <Td textAlign="center">{item.time}</Td>
                <Td textAlign="center">{item.location}</Td>
                <Td textAlign="center"><Button variant='ghost' colorScheme="green" onClick={() => handleCreateRequest([item.id, item.host])}>Join</Button></Td>
              </Tr>
            ))}
            {/* <Tr>
              <Td textAlign="center">BI</Td>
              <Td textAlign="center">3</Td>
              <Td textAlign="center">23/4/2023</Td>
              <Td textAlign="center">3:00 PM</Td>
              <Td textAlign="center">The Coffee House Tran Hung Dao</Td>
              <Td textAlign="center"><Button variant='ghost' colorScheme="green">Join</Button></Td>
            </Tr>
            <Tr>
              <Td textAlign="center">BI</Td>
              <Td textAlign="center">3</Td>
              <Td textAlign="center">23/4/2023</Td>
              <Td textAlign="center">3:00 PM</Td>
              <Td textAlign="center">The Coffee House Tran Hung Dao</Td>
              <Td textAlign="center"><Button variant='ghost' colorScheme="green">Join</Button></Td>
            </Tr> */}
          </Tbody>
        </Table>
      </VStack>
    </Box >
  )
}

export default Join;