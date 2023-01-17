import {gql, useQuery} from '@apollo/client'
import ClientRow from './ClientRow'
import { GET_CLIENTS } from './queries/clientQueries'
import Spinner from './Spinner'


// gql Query





 
function Clients() {



    const {loading, error, data} = useQuery(GET_CLIENTS)


    if (loading) return <Spinner />
    if (error) return <p>Something went wrong :(</p>
     

  return (
   <>
   {!loading && !error && (
    
    <table className='table table-hover-mt-3'>
        <thead>
            <tr>
                <th scope='col'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Phone</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
              {data.clients.map(client => (
                   <ClientRow  key={client.id} client={client}/>
                  ))}
            </tbody>
    </table>
   )}
   </>
  )
}

export default Clients