export class checkedInItems
{
        
          Id :number
          itemid :number
          ColorId :number
          quantity :number
          itemName :string
          itemDescription :string
          price :number
          offerPrice :number
          DeliveryCharges :number
          sizeName :string
          sizeId :number
          ColorName :string
          Email :string
          count :number
          IPaddress :string
          TtlAmount :number
          categoryId :number
          categoryName:string 
          IsDelivered :boolean
}

export class checkedInItemsArray
{
        body:checkedInItems []=[];
     
}