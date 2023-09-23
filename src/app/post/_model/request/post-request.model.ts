export interface PostRequest {
  paginate: {
    page: number;
    limit: number;
  };
  slice: {
    start: number;
    end: number;
    limit: number;
  };
  sort: {
    field: number;
    order: 'ASC' | 'DESC';
  }[];
  search: {
    q: string;
  };
}
