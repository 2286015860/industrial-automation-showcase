import { DetailPage } from '../components/DetailPage'
import { getCapability } from '../data/capabilities'

const capability = getCapability('plc')

export default function PlcPage() {
  return <DetailPage capability={capability} />
}

