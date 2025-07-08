const API_URL = 'https://pokeapi.co/api/v2/';

/**
 * @param {number} limit - Número de resultados a obtener. || Number of results to obtain.
 * @param {number} offset - Desde qué número empezar. || What number to start from.
 * @returns {Promise<Object>} - Datos con resultados y metadata. || Data with results and metadata
 */
export const getPokemonList = async (limit = 10, offset = 0) => {
    try {
        const response = await fetch(`${API_URL}/pokemon?limit=${limit}&offset=${offset}`);
        if (!response.ok) throw new Error('Error gettiing Pokémon list');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

/**
 * Obtiene detalles de un Pokémon por nombre o ID. || Get details of a Pokémon by name or ID.
 * @param {string|number} identifier - Nombre o ID del Pokémon. || Name or ID of the Pokémon.
 * @returns {Promise<Object>} - Datos detallados del Pokémon. || Detailed data of the Pokémon.
 */
export const getPokemonDetails = async (identifier) => {
    try {
        const response = await fetch(`${API_URL}/pokemon/${identifier}`);
        if (!response.ok) throw new Error(`Pokémon not found: ${identifier}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// const [pokemonList, setPokemonList] = useState([]);
// const [selected, setSelected] = useState(null);

// useEffect(() => {
// 	getPokemonList(10).then(data => setPokemonList(data.results));
// }, []);

// const handleClick = async (name) => {
// 	const details = await getPokemonDetails(name);
// 	setSelected(details);
// };