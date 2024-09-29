import { useParams } from "react-router-dom"
import Repositories from "../../components/Repositories"
import { ErrorMessage } from "../../components/ErrorMessage"

export default function User() {
  const { name } = useParams()
  if (!name) {
    return <ErrorMessage message={'Error: User parameter is missing. Please provide a valid user name.'} />
  }
  return (
    <div>
      <Repositories login={name} />
    </div>
  )
}
