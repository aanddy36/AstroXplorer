import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { resetErrors } from './Auth/authSlice';

export function ScrollToTop() {
  const { pathname } = useLocation();
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(resetErrors())
  }, [pathname]);

  return null;
}