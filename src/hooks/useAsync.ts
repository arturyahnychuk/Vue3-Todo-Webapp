import { useLoading } from '@/store/useLoading'
import { Nullable } from '@/types/base'

export default async function useAsync <T> (asyncFunction: () => Promise<T>): Promise<T> {
  const { setLoading } = useLoading()

  try {
    setLoading(true)
    return await asyncFunction()
  } catch (e) {
    let message: string = ''
    if (typeof e === 'string') {
      message = e
    } else if (e instanceof Error) {
      message = e.message
    }
    window.alert(message)
    throw e
  } finally {
    setLoading(false)
  }
}
