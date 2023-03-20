import { useEffect } from 'react'
import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { useAppDispatch } from 'redux/app/hooks'
import { setFetching } from 'redux/slice/appSlice'

export const useSetFetchedData = (
  data: any,
  action: ActionCreatorWithPayload<any>,
  isFetching: boolean
) => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (data) {
      dispatch(action(data))
    }
  }, [data])
  useEffect(() => {
    isFetching
      ? dispatch(setFetching(isFetching))
      : setTimeout(() => {
          dispatch(setFetching(isFetching))
        }, 250)
  }, [isFetching])
}
