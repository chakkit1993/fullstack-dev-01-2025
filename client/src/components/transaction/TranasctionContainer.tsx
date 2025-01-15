import React,{useEffect, useState} from 'react'
import PaginationItems from '../common/PaginationItems'
import TrasactionTable from './TrasactionTable'
import SearchBox from '../common/SearchBox'
import axios from 'axios'
import { TranasctionType } from '../../utils/type'
import TranasctionCreate from './TranasctionCreate'
import { useNavigate } from 'react-router-dom'

const TranasctionContainer =  () => {
    
    const navigate =useNavigate();
     const [tranasctionList, setTranasction] = useState<TranasctionType[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(1);
    const [totalPage, setTotalPage] = useState(2);
    const [sizePage, setSizePage] = useState(10);

    const token = localStorage.getItem('token');
    
    useEffect(() => {

   
      const  getData = async () => {
        //console.log(token)
        if(!token) {
          return navigate('/')
        }

       setIsLoading(true)
       
       axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
       await axios.get( `http://localhost:8080/api/transactions?page=${currPage}&limit=${sizePage}` ).then(function (response) {
         //console.log(response.data);
         const resData  = response.data;
         setTranasction(resData.data)
        //  setTotalItems(resData.total) // totalItems
        //  setTotalPage(resData.totalPages)
        //  setCurrPage(resData.currentPage)
        //  setSizePage(resData.limit)
       
       })
       .catch(function (error) {
         console.log(error);
       })
       .finally(function () {
         // always executed
         setIsLoading(false);
       });
     }

     getData();
     //console.log(tranasctionList)
    },[]);



  return (
    <div>
        {/* <SearchBox></SearchBox> */}
        <TranasctionCreate/>
        {isLoading ? <div>isLoading....</div> : <TrasactionTable transactions={tranasctionList}></TrasactionTable>} 
        <PaginationItems currentPage={currPage}  totalPage={totalPage}  limitPage={sizePage}></PaginationItems>
        </div>
  )
}

export default TranasctionContainer