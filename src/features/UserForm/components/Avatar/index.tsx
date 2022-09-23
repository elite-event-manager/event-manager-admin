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
  avatarValue: any | undefined
}

export const AvatarSection = ({ avatarValue }: I_AvatarSectionProps) => {
  const [fetchUpload] = filesAPI.useUploadFileMutation()

  return (
    <Row>
      <Col span={13}>
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
