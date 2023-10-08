import { AbstractView } from '../../common/view.js'
import onChange from 'on-change'
import { Header } from '../../components/header/header.js'
import { Search } from '../../components/search/search.js'
import { Gallery } from '../../components/gallery/gallery.js'

export class MainView extends AbstractView {
	state = {
		list: [],
		numFound: 0,
		loading: false,
		searchQuery: undefined,
		offset: 0,
	}

	constructor(appState) {
		super()
		this.appState = appState
		this.appState = onChange(this.appState, this.appStateHook.bind(this))
		this.state = onChange(this.state, this.stateHook.bind(this))
		this.setTitle('Search books')
	}

	appStateHook(path) {
		if (path === 'favorites') {
			console.log(path)
		}
	}

	async stateHook(path) {
		if (path === 'searchQuery') {
			this.state.loading = true
			const data = await this.loadList(
				this.state.searchQuery,
				this.state.offset
			)
			this.state.loading = false
			this.state.list = data.docs
			this.state.numFound = data.numFound
		}
		if (path === 'list' || path === 'loading') {
			this.render()
		}
	}

	async loadList(q, offset) {
		const res = await fetch(
			`https://openlibrary.org/search.json?q=${q}&offset=${offset}`
		)
		return res.json()
	}
	render() {
		const main = document.createElement('div')
		main.append(new Search(this.state).render())
		main.append(new Gallery(this.appState, this.state).render())
		this.app.innerHTML = ''
		this.app.append(main)
		this.renderHeader()
	}

	renderHeader() {
		this.app.prepend(new Header(this.appState).render())
	}
}
