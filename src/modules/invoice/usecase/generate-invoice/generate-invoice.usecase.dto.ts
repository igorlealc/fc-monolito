import Address from "../../../@shared/domain/value-object/address"

export interface GenerateInvoiceInputDto {
  name: string
  document: string
  address: Address
  items: GenerateInvoiceItemInputDto[]
}

export interface GenerateInvoiceItemInputDto {
  name: string
  price: number
}

export interface GenerateInvoiceOutputDto {
  id: string
  name: string
  document: string
  address: Address
  items: GenerateInvoiceItemOutputDto[]
}

export interface GenerateInvoiceItemOutputDto {
  id: string
  name: string
  price: number
}  