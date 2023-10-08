import { AbstractView } from '../../common/view.js'
import onChange from 'on-change'
import { Header } from '../../components/header/header.js'
import { Gallery } from '../../components/gallery/gallery.js'

export class FavoritesView extends AbstractView {
	constructor(appState) {
		super()
		this.appState = appState
		this.appState = onChange(this.appState, this.appStateHook.bind(this))
		this.setTitle('Favorites')
	}

	destroy() {
		onChange.unsubscribe(this.state)
	}

	appStateHook(path) {
		if (path === 'favorites') {
			this.render()
		}
	}

	render() {
		const favorites = document.createElement('div')
		favorites.innerHTML = `
			<h1>Favorites books</h1>
		`
		favorites.append(
			new Gallery(this.appState, { list: this.appState.favorites }).render()
		)
		this.app.innerHTML = ''
		this.app.append(favorites)
		this.renderHeader()
	}

	renderHeader() {
		this.app.prepend(new Header(this.appState).render())
	}
}
