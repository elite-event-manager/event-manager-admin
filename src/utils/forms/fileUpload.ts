import { message } from 'antd'

import { T_File } from 'models/shared/upload'

export const uploadImageExtraText = '(.png, .jpeg, .jpg, .webp)'
export const uploadImageAcceptFiles = '.png, .jpeg, .jpg, .webp'

export const normalizeImages = (e: any) => {
  if (Array.isArray(e.fileList) && e.file.response) {
    return [e.file.response]
  }
  return e && e.fileList
}

export const customRequestUpload = async (options: any, fetchUpload: any) => {
  const data = new FormData()
  data.append('file', options.file)
  try {
    const response: { data: T_File } = await fetchUpload(data)
    options.onSuccess({
      ...response.data,
      url: import.meta.env.VITE_SERVER_API + response.data.url.replace('\\', '/'),
    })
    message.success('File success uploaded!')
  } catch (e) {
    console.log(e)
    message.error('Upload Error: ' + e)
  }
}
