import { Component } from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';

class App extends Component {
	state = {
		termino: '',
		imagenes: [],
		pagina: '',
	};

	scroll = () => {
		const elemento = document.querySelector('.jumbotron');
		elemento.scrollIntoView('smooth', 'start');
	};

	paginaAnterior = () => {
		// Leer el state de la página actual
		let pagina = this.state.pagina;
		//Validad si la página es 1, ya no ir hacia atrás
		if (pagina === 1) return null;
		// Restar uno a la página actual
		pagina -= 1;
		// Agregar el cambio al state
		this.setState({ pagina }, () => {
			this.consultarApi();
			this.scroll();
		});
	};
	paginaSiguiente = () => {
		// Leer el state de la página actual
		let pagina = this.state.pagina;
		// Sumar uno a la página actual
		pagina += 1;
		// Agregar el cambio al state
		this.setState({ pagina }, () => {
			this.consultarApi();
			this.scroll();
		});
	};

	consultarApi = () => {
		const termino = this.state.termino;
		const pagina = this.state.pagina;
		const url = `https://pixabay.com/api/?key=27752414-7b0ed1c0db40b292c7653959c&q=${termino}&per_page=25&page=${pagina}`;

		fetch(url)
			.then((respuesta) => respuesta.json())
			.then((resultado) => this.setState({ imagenes: resultado.hits }));
	};

	datosBusqueda = (termino) => {
		this.setState(
			{
				termino: termino,
				pagina: 1,
			},
			() => {
				this.consultarApi();
			}
		);
	};

	render() {
		return (
			<div className='app container'>
				<div className='jumbotron'>
					<p className='lead text-center'>Buscador de Imágenes</p>

					<Buscador datosBusqueda={this.datosBusqueda} />
				</div>
				<div className='row justify-content-center'>
					<Resultado
						imagenes={this.state.imagenes}
						paginaAnterior={this.paginaAnterior}
						paginaSiguiente={this.paginaSiguiente}
					/>
				</div>
			</div>
		);
	}
}

export default App;
