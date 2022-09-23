import { message } from 'antd'

export const uploadImageExtraText = '(.png, .jpeg, .jpg, .webp)'
export const uploadImageAcceptFiles = '.png, .jpeg, .jpg, .webp'

export const normalizeImages = (e: any) => {
  if (Array.isArray(e.fileList) && e.file.response) {
    return e.fileList.map((file: any) => ({ url: file.response || file.url }))
  }
  return e && e.fileList
}

export const customRequestUpload = async (options: any, fetchUpload: any) => {
  const data = new FormData()
  data.append('file', options.file)
  try {
    const response: any = await fetchUpload(data)
    options.onSuccess(import.meta.env.VITE_SERVER_API + response.data.path)
    message.success('File success uploaded!')
  } catch (e) {
    console.log(e)
    message.error('Upload Error: ' + e)
  }
}
