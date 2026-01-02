import {useContext} from 'react'
import {StoreContext} from '../../app/store';
export default function Pagination() {
  const {state, dispatch} = useContext(StoreContext);
  function prevPage() {
    if(state.page === 1) return;
    dispatch({
      type: 'SET_PAGE',
      payload: state.page - 1
    })
  }

  function nextPage() {
    dispatch({
      type:"SET_PAGE",
      payload: state.page +1
    })
  }
  return (
    <div>
        <button onClick={prevPage} disabled={state.page === 1}>Previous</button>
        <span style={{margin: "0 10px"}}></span>
        <button onClick={nextPage}>Next</button>
    </div>
  )
}
