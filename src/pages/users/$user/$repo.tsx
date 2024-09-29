import { useParams } from "react-router-dom"
import Issue from "./../../../components/Issue"

export default function IssuePage() {
  const { user, repo } = useParams()
  return (
    <div>
      <Issue owner={user} repo={repo} />
    </div>
  )
}
