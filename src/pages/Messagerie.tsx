import MessagerieCards from '../components/messagerie/cards'
import FloatButton from '../components/FloatButton'

const Messagerie = () => {
  return (
    <div>
      <MessagerieCards />
      <FloatButton link='messagerie/create' />
    </div>
  )
}

export default Messagerie
