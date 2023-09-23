export interface PostResponse {
  id: string;
  title: string;
  body: string;
  user: PostUserResponse;

  meta: PostMetaDataResponse;
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
