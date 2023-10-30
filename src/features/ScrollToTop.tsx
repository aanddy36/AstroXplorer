import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { resetErrors } from './Auth/authSlice';
import { resetPages } from './FilterAndSorting/filterSortingSlice';

export function ScrollToTop() {
  const { pathname } = useLocation();
  
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetErrors())
    dispatch(resetPages())
  }, [pathname]);

  return null;
}