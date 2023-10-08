import { DivComponent } from '../../common/div-component'
import { Card } from '../card/card'
import './gallery.css'

export class Gallery extends DivComponent {
	constructor(appState, parentState) {
		super()
		this.appState = appState
		this.parentState = parentState
	}

	render() {
		if (this.parentState.loading) {
			this.el.innerHTML = '<div class="gallery__loader">Loading...</div>'
			return this.el
		}

		this.el.classList.add('gallery')
		this.el.innerHTML = `
			<h1>Found books - ${this.parentState.numFound}</h1>

		`
		for (const card of this.parentState.list) {
			this.el.append(new Card(this.appState, card).render())
		}

		return this.el
	}
}
