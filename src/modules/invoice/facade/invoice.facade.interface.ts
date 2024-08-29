import Address from "../../@shared/domain/value-object/address"

export interface GenerateInvoiceFacadeInputDto {
  name: string
  document: string
  address: Address
  items: GenerateInvoiceItemFacadeInputDto[]
}

export interface GenerateInvoiceFacadeOutputDto {
  id: string
  name: string
  document: string
  address: Address
  items: GenerateInvoiceItemFacadeOutputDto[]
}

export interface GenerateInvoiceItemFacadeOutputDto {
  id: string
  name: string
  price: number
}

export interface GenerateInvoiceItemFacadeInputDto {
  name: string
  price: number
}

export interface FindInvoiceFacadeInputDto {
  id: string
}

export interface FindInvoiceFacadeOutputDto {
  id: string
  name: string
  document: string
  address: Address
  items: FindInvoiceItemFacadeOutputDto[]
}

export interface FindInvoiceItemFacadeOutputDto {
  id: string
  name: string
  price: number
}

export default interface InvoiceFacadeInterface {
  generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto>;
  find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
}
