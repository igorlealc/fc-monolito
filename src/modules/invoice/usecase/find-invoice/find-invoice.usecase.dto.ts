import Address from "../../../@shared/domain/value-object/address"

export interface FindInvoiceInputDto {  
    id: string
  }  
  
  export interface FindInvoiceOutputDto {  
    id: String
    name: string
    document: string
    address: Address
    items: FindInvoiceItemOutputDto[]
  }

  export interface FindInvoiceItemOutputDto {  
    id: String
    name: string
    price: number
  }  