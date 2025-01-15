import React, { useEffect ,useState } from 'react'
import { TranasctionType } from '../../utils/type'
import axios from 'axios'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableFooter,
  TableRow,
} from "@/components/ui/table"
import { Button } from '../ui/button'
import { useLocation, useNavigate } from 'react-router-dom'

// width: 250px;
// height: 200px;
// display: inline-block; /* makes it fit in like an <img> */
// background-size: cover; /* or contain */
// background-position: center center;
// background-repeat: no-repeat;

const TrasactionTable = ( {transactions} : {transactions : TranasctionType[]}) => {

  const location =  useLocation()
  const pathname = location.pathname
  const [tranasctionList, setTransactions] = useState<TranasctionType[]>([])
  
  const navigate = useNavigate()

    function handleDeleteClick(id: string) {
  
        const deleteItem= async () => {
          await axios.delete(`http://localhost:8080/api/transaction/${id}`).then(function (response) {
            //console.log(response.data);
            const resData  = response.data;
            //setCategory(resData)
            console.log("message",resData.message)
            navigate(`${pathname}` ,  { replace: true });
            window.location.reload();
          
          })
          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            // always executed
          });
        }
        deleteItem()


      }


    useEffect(() => {
      setTransactions(transactions)
      //console.log(tranasctionList)
    },[tranasctionList]);

  return (

   
    <div className='justify-center mt-20'>
    <Table className='border border-separate  border-solid border-neutral-900 p-8 rounded-xl '>
      <TableCaption>A list of your recent tranasction.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center'>ID</TableHead>
          <TableHead className='text-center'>Slip</TableHead>
          <TableHead className='text-center'>Note</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((trans ,count) => (
          <TableRow key={trans.id}>
            <TableCell className="font-medium">{trans.id}</TableCell>
            <TableCell className='flex justify-center'><img src={`http://localhost:8080/api/image/${trans.imageUrl}`} className="mt-4 object-cover w-32 h-32"alt="Thumb" ></img></TableCell>
            <TableCell >{trans.note}</TableCell>
            <TableCell className='text-right'>{trans.amount}</TableCell>
            <TableCell><Button className='bg-red-500 p-2 rounded-md text-white' onClick={() => handleDeleteClick(trans.id)} >Delete</Button></TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
      </TableFooter>
    </Table>

  </div>
  )
}

export default TrasactionTable