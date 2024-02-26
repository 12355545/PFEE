/* tslint:disable */
/* eslint-disable */
import { ArticleResponse } from './article-response';
export interface TransactionResponse {
  Client: string;
  CodeClient: number;
  DateFacture: string;
  articles: Array<ArticleResponse>;
  totalamount: number;
}
