import { CTAState } from './cta/cta.state';
import { PostState } from './post/post.state';

export interface AppState {
  posts: PostState;
  cta: CTAState;
}
