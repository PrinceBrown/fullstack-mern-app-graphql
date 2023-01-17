

import React from 'react'
import { BsTrash } from 'react-icons/bs'
import { useMutation } from '@apollo/client'
import { DELETE_CLIENT } from './mutations/clientMutations'
import { GET_CLIENTS } from './queries/clientQueries'

const ClientRow = ({client}) => {

    console.log(client)


    const [deleteClient] = useMutation(DELETE_CLIENT, {
        variables: {id: client.id },
        // refetchQueries: [{query: GET_CLIENTS}]
        update(cache, {data: {deleteClient}}) {
            const { clients } = cache.readQuery({query: GET_CLIENTS})
            cache.writeQuery({
                query: GET_CLIENTS,
                data: { clients: clients.filter(client => client.id !== deleteClient.id)}
            })
        }
    })


    const handleDelete = (id) => {
        console.log(id)
        deleteClient(id)
   
    }


  return (
    <>
        
              <tr>
                  <td>{client.name}</td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>
                    <button onClick={() => handleDelete(client.id)} className="btn btn-danger btn-sm">
                          <BsTrash />
                    </button>
                  </td>
              </tr>
          </>
  )
}

export default ClientRow