
import algoliasearch from 'algoliasearch/lite'

const API_KEY=process.env.ID_KEY
const API_USER=process.env.ID_USER


const client=algoliasearch(API_KEY, API_USER);
const index=client.initIndex('comic-app');


export const search= async ({query})=>{


    const {hits}=await index.search(query, {
        attributesToRetrieve:['id', 'title', 'img', 'alt'],
        hitsPerPage:5
        })

        return {results:hits}

}