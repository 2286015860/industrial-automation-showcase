import { DetailPage } from '../components/DetailPage'
import { getCapability } from '../data/capabilities'

const capability = getCapability('motion')

export default function MotionPage() {
  return <DetailPage capability={capability} />
}

