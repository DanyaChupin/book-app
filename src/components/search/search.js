import { DivComponent } from '../../common/div-component'
import './search.css'

export class Search extends DivComponent {
	constructor(state) {
		super()
		this.state = state
	}

	render() {
		this.el.classList.add('search')
		this.el.innerHTML = `
			<div class='search__wrapper'>
				<input 
				type='text' 
				placeholder='Search book or author...'
				class='search__input'
				value='${this.state.searchQuery ? this.state.searchQuery : ''}'
				/>
			</div>
			<button aria-lable='search'> 
			<img src='/static/search.svg' alt='Search button' />
			</button>
		`
		return this.el
	}
}
