import { AbstractView } from '../../common/view.js'
import onChange from 'on-change'
import { Header } from '../../components/header/header.js'
import { Search } from '../../components/search/search.js'

export class MainView extends AbstractView {
	state = {
		list: [],
		loading: false,
		searchQuery: undefined,
		offset: 0,
	}

	constructor(appState) {
		super()
		this.appState = appState
		this.appState = onChange(this.appState, this.appStateHook.bind(this))
		this.setTitle('Search books')
	}

	appStateHook(path) {
		if (path === 'favorites') {
			console.log(path)
		}
	}

	render() {
		const main = document.createElement('div')
		main.append(new Search(this.state).render())
		this.app.innerHTML = ''
		this.app.append(main)
		this.renderHeader()
	}

	renderHeader() {
		this.app.prepend(new Header(this.appState).render())
	}
}
