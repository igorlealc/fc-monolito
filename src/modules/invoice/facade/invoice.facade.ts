import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import { FindInvoiceOutputDto } from "../usecase/find-invoice/find-invoice.usecase.dto";
import { GenerateInvoiceOutputDto } from "../usecase/generate-invoice/generate-invoice.usecase.dto";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.interface";


export interface UseCaseProps {
  findUsecase: UseCaseInterface;
  generateUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _findUsecase: UseCaseInterface;
  private _generateUsecase: UseCaseInterface;

  constructor(usecaseProps: UseCaseProps) {
    this._findUsecase = usecaseProps.findUsecase;
    this._generateUsecase = usecaseProps.generateUsecase;
  }

  async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
    const result: GenerateInvoiceOutputDto = await this._generateUsecase.execute(input);
    return {
      id: result.id,
      name: result.name,
      document: result.document,
      address: result.address,
      items: result.items.map((item => ({
        id: item.id,
        name: item.name,
        price: item.price,
      }))),
    }
  }
  async find(
    input: FindInvoiceFacadeInputDto
  ): Promise<FindInvoiceFacadeOutputDto> {
    const result: FindInvoiceOutputDto = await this._findUsecase.execute(input);
    return {
      id: result.id,
      name: result.name,
      document: result.document,
      address: result.address,
      items: result.items.map((item => ({
        id: item.id,
        name: item.name,
        price: item.price,
      }))),
    }
  }



}
