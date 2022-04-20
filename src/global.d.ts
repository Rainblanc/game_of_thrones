import { AppState, AppDispatch } from 'store';
import { EqualityFn } from 'react-redux';

declare global {
  type Otp<T> = T | null | undefined;
}

declare module 'react-redux' {
  export const useSelector: <TState = AppState, Selected = unknown>(
    selector: (state: TState) => Selected,
    equalityFn?: EqualityFn<Selected> | undefined,
  ) => Selected;

  export declare const useDispatch: <TDispatch = AppDispatch>() => TDispatch;
}
