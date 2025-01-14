
  
export  type CategoryType = {
    id : number,
    displayName : string
    // createdAt: string
    // updatedAt: string
  }



  export  type TranasctionType = {
    id : string,
    amount : number
    note: string
    imageUrl: string
    categoryId:number
    // createdAt: string
    // updatedAt: string
  }
  
  export type SelectItemType = {
    key: string,
    value: string
}