import { AppDispatch, AppStore as RootState } from '../store/store.ts';
import { useSelector, useDispatch } from 'react-redux';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
