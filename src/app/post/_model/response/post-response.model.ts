export interface PostResponse {
  data:  PostItemResponse[];
  meta: PostMetaDataResponse;
}

export interface PostItemResponse {
  id: string;
  title: string;
  body: string;
  user: PostUserResponse;
  comments: PostCommentsResponse;
}

// small excerpt from the user response.
export interface PostUserResponse {
  id: string;
  name: string;
  username: string;
  email: string;
}

export interface PostMetaDataResponse {
  totalCount: number;
}

// small excerpt from the comment response.
export interface PostCommentsResponse {
  meta: {
    totalCount: number;
  };
}

export interface PostErrorResponse {
  errors: {
    message: string;
    extensions: string;
  }[];
}


export interface PostDeleteResponse {
  id: string;
  isDeleted: boolean;
}