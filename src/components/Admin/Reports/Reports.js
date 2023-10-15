import { Box, Heading, Icon } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { IoMdCloseCircleOutline } from 'react-icons/io'
import './reports.scss'
import axios from 'axios'
import cookie from 'react-cookies';
import { AiOutlineClose } from 'react-icons/ai'


export default function AdminReports() {
     const cookieData = cookie.load('user_session')
     const url = 'http://localhost:3002'

     const [reports,setReports] = useState([])


     const fetchReports = async () => {
          try {
               const res = axios.get(`${url}/admin/report`, { headers: { Authorization: `Bearer ${cookieData}` } })
               console.log('=========' ,res.data);
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
     
  return (
    <Box className='reports-main'>
      <Box className='reports-cont'>
          <Box className='reports-header'>
               <Heading>Reports</Heading>
          </Box>
          <Box className='reports-items'>
               
               <Box className='reports-item'>
                    <Box className='report-heading'>
                         <p>Type : Spam</p>
                         <p>Action : Comment </p>
                         <p>ID : 1 </p>
                    </Box>
                    <Box className='report-description'>
                         <Box as='p'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, perferendis!</Box>
                    </Box>
                    <Box className='report-icon'>
                         <Icon onClick={deleteReport} as={AiOutlineClose} fontSize={'25px'}/>
                    </Box>
               </Box>
               
          </Box>
      </Box>
    </Box>
  )
}
