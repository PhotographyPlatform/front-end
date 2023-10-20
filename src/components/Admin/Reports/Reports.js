import { Box, Heading, Icon, Text, useDisclosure } from '@chakra-ui/react'
import {
     Modal,
     ModalOverlay,
     ModalContent,
     ModalHeader,
     ModalFooter,
     ModalBody,
     ModalCloseButton,
     Button
   } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import './reports.scss'
import axios from 'axios'
import cookie from 'react-cookies';
import { AiOutlineClose } from 'react-icons/ai'
const url = 'http://localhost:3002'


export default function AdminReports() {
     const cookieData = cookie.load('user_session')
     const { isOpen, onOpen, onClose } = useDisclosure()
     const [reports,setReports] = useState([])


     const fetchReports = async () => {
          try {
               const res = await axios.get(`${url}/admin/report`, { headers: { Authorization: `Bearer ${cookieData}` } })
               // console.log('=========' ,res.data);
               setReports(res.data)
          } catch (err) {
               console.log(err);
          }
     }

     const deleteReport = async (id) => {
          try {
               await axios.delete(`${url}/admin/report/${id}`, { headers: { Authorization: `Bearer ${cookieData}` } })
               let filter = reports.filter(ele => ele.id !== id)
               setReports(filter)
          } catch (err) {
               console.log(err);
          }
     }

     useEffect(() => {
          fetchReports()
     }, [])

     console.log(reports);
     
  return (
    <Box className='reports-main'>
      <Box className='reports-cont'>
          <Box className='reports-header'>
               <Heading>Reports</Heading>
          </Box>
          <Box className='reports-items'>
               {
                    reports &&
                    reports.map(ele => (
                         <Box className='reports-item' >
                              <Model ele={ele} isOpen={isOpen} onClose={onClose} deleteReport = {deleteReport} />
                              <Box className='report-heading' onClick={() => ele.actionType === 'comment' ? onOpen() : ''}>
                                   <p>Type : {ele.categories}</p>
                                   <p>Action : {ele.actionType} </p>
                                   {/* <p>ID : {ele.actionId} </p> */}
                              </Box>
                              <Box className='report-description' onClick={() => ele.actionType === 'comment' ? onOpen() : ''}>
                                   <Box as='p'> <Heading display={'inline-block'} fontSize={'17px'}>Report : </Heading> {ele.details}</Box>
                              </Box>
                              <Box className='report-icon'>
                                   <Icon onClick={() => deleteReport(ele.id)} as={AiOutlineClose} fontSize={'25px'}/>
                              </Box>
                         </Box>
                    ))
               }
                 </Box>
                 
      </Box>
    </Box>
    
  )
}


function Model({ ele, isOpen, onClose, deleteReport }) {
     const [comment, setComment] = useState({})
     
     const getComment =async () => {
          try {
               const res = await axios.get(`${url}/v1/newCOmCOll/${ele.actionId}`)       
               console.log(res.data.data);
               setComment(res.data.data)
          } catch (err) {
               console.log(err);
          }
     }
     const removeComment = async () => {
          try {
                await axios.delete(`${url}/v1/newCOmCOll/${ele.actionId}`)       
          } catch (err) {
               console.log(err);
          }
     }

     useEffect(() => {
          getComment()
     }, [])

     console.log('comment' , comment);
     
     return (
          <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
          <ModalHeader>{ele.categories}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
               <Text> <Heading fontSize={'20px'}>Comment : </Heading> {comment?.contant}</Text>
          </ModalBody>

          <ModalFooter>
               <Button colorScheme='blue' mr={3} onClick={onClose}>
               Close
               </Button>
                    <Button variant='ghost' onClick={() => { removeComment();  deleteReport(ele.id); onClose()}}>Remove Comment</Button>
          </ModalFooter>
          </ModalContent>
          </Modal>
     )
}
