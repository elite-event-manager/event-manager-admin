import { Col, Form, Row, Upload } from 'antd'

import { UploadImageButton } from 'components/Uploads'
import { t } from 'languages'
import { filesAPI } from 'services/files'
import {
  customRequestUpload,
  normalizeImages,
  uploadImageAcceptFiles,
  uploadImageExtraText,
} from 'utils/forms/fileUpload'

interface I_AvatarSectionProps {
  avatarValue: any
}

export const AvatarSection = ({ avatarValue }: I_AvatarSectionProps) => {
  const [fetchUpload] = filesAPI.useUploadFileMutation()

  console.log(avatarValue)

  return (
    <Row>
      <Col xs={24} lg={18} xl={12}>
        <Form.Item
          name='avatar'
          label={t('userForm.fields.avatar')}
          valuePropName='fileList'
          rules={[{ required: true }]}
          extra={uploadImageExtraText}
          getValueFromEvent={normalizeImages}
        >
          <Upload
            accept={uploadImageAcceptFiles}
            listType='picture-card'
            fileList={avatarValue}
            customRequest={(options) => customRequestUpload(options, fetchUpload)}
          >
            {(avatarValue?.length || 0) < 1 && <UploadImageButton />}
          </Upload>
        </Form.Item>
      </Col>
    </Row>
  )
}
