import { DetailPage } from '../components/DetailPage'
import { getCapability } from '../data/capabilities'

const capability = getCapability('vision')

export default function VisionPage() {
  return <DetailPage capability={capability} />
}
