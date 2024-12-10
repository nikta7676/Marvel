import { useHttp } from "../hooks/useHttp";


function useMarvelServise(){

    const {loading, error, request, clearError,process,setProcess} = useHttp();
    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=f02777bcf17cf0b633740f1f92f5e07b';
    const _offsetKey = 210
    
    

    const getAllComics = async(offset = 0)=>{
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformGetComics)
    }
    const getComics = async(id)=>{
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`)
        return _transformGetComics(res.data.results[0]);
    }
    const getAllCharacters= async(offset =_offsetKey)=>{
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`)
        return res.data.results.map(_transformGetCharacter)
    }

    const getCharacterName = async (name)=>{
        const res =  await request(`${_apiBase}characters?name=${name}&${_apiKey}`)
        return res.data.results.map(_transformGetCharacter)
    }

    const getCharacter = async (id)=>{
        const res =  await request(`${_apiBase}characters/${id}?${_apiKey}`)
        return _transformGetCharacter(res.data.results[0])
    }

    const _transformGetComics = (comics) =>{
        return{
            id: comics.id,
			title: comics.title,
			description: comics.description || "There is no description",
			pageCount: comics.pageCount
				? `${comics.pageCount} p.`
				: "No information about the number of pages",
			thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
			language: comics.textObjects[0]?.language || "en-us",
			price: comics.prices[0].price
				? `${comics.prices[0].price}$`
				: "not available",
        }
    }

    const _transformGetCharacter = (char) =>{
        return {
            id: char.id,
			name: char.name,
			description: char.description
				? `${char.description.slice(0, 210)}...`
				: "There is no description for this character",
			thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
			homepage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items,
        }
    }

    return {loading, error, clearError,getAllComics,getComics, getAllCharacters, getCharacterName, getCharacter,process,setProcess};
}

export default useMarvelServise;