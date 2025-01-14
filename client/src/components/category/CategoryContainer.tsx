import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { CategoryType } from '../../utils/type';
import CategoryTable from './CategoryTable';
import SearchBox from '../common/SearchBox';
import PaginationTable from '../common/Pagination';
import { AddButton } from '../common/Buttons';
import CategoryCreate from './CategoryCreate';
import { data, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import PageSizeSelect from '../common/PageSizeSelect';

const CategoryContainer = () => {
    const [queryParams, setQueryParams] = useSearchParams();
    const searchParams = new URLSearchParams();
    const limitList = [5, 10, 15, 20, 25, 30];
    const [categoryList, setCategory] = useState<CategoryType[]>([])
    const [totalItems, setTotalItems] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [currPage, setCurrPage] = useState(1);
    const [prevPage, setPrevPage] = useState(1);
    const [totalPage, setTotalPage] = useState(100);
    const [sizePage, setSizePage] = useState(10);

    const navigate =  useNavigate() 


    //const limitList = [5, 10, 15, 20, 25, 30];
    const location =  useLocation()
    const pathname = location.pathname

     const limit = queryParams.get('limit');
     const page = queryParams.get('page');


    const token = localStorage.getItem('token');
    //console.log(token)
     const  getData = async () => {

      if(!token) {
        return navigate('/')
      }
      setIsLoading(true)
       console.log('limit',sizePage)
       console.log('page',currPage)
       // setCurrPage(Number(page))
       // setSizePage(Number(limit))
     //  axios.defaults.withCredentials = true;
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      await axios.get(`http://localhost:8080/api/category?page=${currPage}&limit=${sizePage}`).then(function (response) {
        //console.log(response.data);
        const resData  = response.data;
        setCategory(resData.data)
        setTotalItems(resData.total) // totalItems
        setTotalPage(resData.totalPages)
        //console.log("resData",resData)
      

      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
        setIsLoading(false);
      });
    }

    useEffect(() => {

      page === undefined ? setCurrPage(1) :( Number(page) <= 0) ? setCurrPage(1) :  setCurrPage(Number(page))
      limit === undefined ? setSizePage(10) :( Number(limit) <= 0) ? setSizePage(10) :  setSizePage(Number(limit))
     getData();
  
     //const params = new URLSearchParams(String(queryParams));
     //console.log('params',params)
    // console.log('queryParams',queryParams)
  
     //console.log('page',page)
    },[ sizePage ,currPage ]);
  



    function handleDataFromChild(data : string) {
      navigate(`${pathname}?page=${currPage}&limit=${data}` ,  { replace: true  }, );
      setSizePage(Number(data));
      console.log('childData',data);
    }



  return (
    <div> 
       <SearchBox></SearchBox>
       <div>Total item {totalItems}</div>
    
      <CategoryCreate/>
      {isLoading ? <div>isLoading....</div> : <CategoryTable categories={categoryList}></CategoryTable>} 
      <PaginationTable currentPage={currPage}  totalPage={totalPage}  limitPage={sizePage} ></PaginationTable>
      <PageSizeSelect limitList={limitList} defualtValue={sizePage}  sendDataToParent={handleDataFromChild}   />
      </div>


  )
}

export default CategoryContainer