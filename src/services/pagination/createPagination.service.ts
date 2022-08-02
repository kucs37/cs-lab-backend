/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { LogService } from '../log/log.service';

@Injectable()
export class PaginationService {
  private logger = new LogService(PaginationService.name);

  /**
   * @param total
   * @param perPage
   * @param currentPage
   * @returns
   *
   */
  paginationCal(total: number, perPage: number, currentPage: number) {
    return {
      skips: perPage * currentPage - perPage,
      totalPages: Math.ceil(total / perPage),
      limit: perPage,
    };
  }
}
