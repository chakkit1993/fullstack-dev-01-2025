import React, { useEffect, useState } from 'react'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import { useLocation } from 'react-router-dom'
  
const PaginationItems = ({currentPage ,  totalPage , limitPage}: { currentPage : number , limitPage  : number , totalPage  : number}) => {
    const [curr , setCurr] = useState<Number>()
    const location =  useLocation()
    const pathname = location.pathname
    //const {  pathname : string } = location;
    
    useEffect(() => {
        //setCurr(currentPage)
        //console.log("message",pathname)
    },[curr])



    const paginationItems = [];
    for (let i = 1; i <= totalPage; i++) {
      paginationItems.push(
        <PaginationItem key={i}>
          <PaginationLink href={`${pathname}?page=${i}&limit=${limitPage}`} isActive={i === currentPage}>
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

  return (
    <div className="flex justify-center mt-10 space-x-2">
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`${pathname}?page=${currentPage-1}&limit=${limitPage}`} />
          </PaginationItem>
              {paginationItems}
          <PaginationItem>
            <PaginationNext href={`${pathname}?page=${currentPage+1}&limit=${limitPage}`} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
</div>
  )
}

export default PaginationItems