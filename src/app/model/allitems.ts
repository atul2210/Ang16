export class allItems {

      itemid:number 
      itemName:string 
      itemDescription :string
      sizeId :number 
      sizeName :string 
      price:number 
      offerPrice:number

      categoryName:string
      categoryId:string 
      imaggeUrl:string
      rownum:string



      constructor
      (
            itemid:number ,
            itemName:string ,
            itemDescription :string,
            sizeId :number ,
            sizeName :string ,
            price:number ,
            offerPrice:number,

            categoryName:string,
            categoryId:string ,
            imaggeUrl:string,
            rownum:string
      )
      {
            this.itemid =itemid;
            this.itemName=itemName;
            this.itemDescription=itemDescription; 
            this.sizeId=sizeId;
            this.sizeName=sizeName;
            this.price=price;
            this.offerPrice=offerPrice
            this.categoryName
            this.categoryId
            this.imaggeUrl
            this.rownum

      }


}