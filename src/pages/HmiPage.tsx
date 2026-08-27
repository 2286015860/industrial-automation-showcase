import { DetailPage } from '../components/DetailPage'
import { getCapability } from '../data/capabilities'

const capability = getCapability('hmi')

export default function HmiPage() {
  return <DetailPage capability={capability} />
}

