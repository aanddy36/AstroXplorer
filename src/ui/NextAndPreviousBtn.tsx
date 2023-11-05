import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../features/FilterAndSorting/filterSortingSlice';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export const NextAndPreviousBtn = () => {
  const dispatch = useDispatch()
  const { page, filteredTours } = useSelector(
    (store: RootState) => store.filterSorting
  );
  return (
    filteredTours?.length > 8 && (
      <div className="flex text-white items-center justify-between w-fit gap-10 mx-auto text-xl">
        <button
          className="transition-all duration-200 hover:enabled:bg-white py-3 px-3
       hover:enabled:text-black border-2 border-white/60 disabled:opacity-50"
          disabled={page === 1}
          onClick={() => {
            dispatch(changePage("previous"));
            window.scrollTo(0, 370);
          }}
        >
          <FaChevronLeft />
        </button>
        <span>{page}</span>
        <button
          className="transition-all duration-200 hover:enabled:bg-white py-3 px-3
       hover:enabled:text-black border-2 border-white/60 disabled:opacity-50"
          disabled={page === Math.ceil(filteredTours?.length / 9)}
          onClick={() => {
            dispatch(changePage("next"));
            window.scrollTo(0, 370);
          }}
        >
          <FaChevronRight />
        </button>
      </div>
    )
  )
}
