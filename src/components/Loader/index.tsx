import { Spin } from 'antd'

interface LoaderProps {
  relative?: boolean
}

export const Loader = ({ relative = false }: LoaderProps) => (
  <div style={relative ? {} : { position: 'absolute', left: '50%', top: '50%' }}>
    <Spin size='large' />
  </div>
)
