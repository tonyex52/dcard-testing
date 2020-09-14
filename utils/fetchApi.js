import axios from 'axios'
import responseStatus from 'constants/responseStatus'

export default async (axiosOption) => {
  const response = await axios(axiosOption)

  if (response.data.status !== responseStatus.API_SUCCESS) {
    throw response.data.status
  }

  return response.data.data
}
