/*
 * Dragging behavior for the carousels
 */

export const vCarousel = {
	mounted (el) {
		el.addEventListener("mousedown", mousedown)

		// true= user is holding the carousel with their mouse
		let holding = false

		// true= user has moved the carousel
		let moved = false

		let zeroX
		let zeroScroll

		el.addEventListener("click", e => {
			if (moved)
				e.preventDefault()
		}, {
			capture: true
		})

		function mousedown (e) {
			moved = false
			e.preventDefault()
			holding = true
			zeroX = e.pageX
			zeroScroll = el.scrollLeft

			document.addEventListener("mousemove", mousemove)
			document.addEventListener("mouseup", mouseup)
		}

		function mouseup () {
			holding = false

			document.removeEventListener("mousemove", mousemove)
			document.removeEventListener("mouseup", mouseup)
		}

		function mousemove (e) {
			if (!holding) return
			moved = true
			e.preventDefault()

			var zeroOffset = zeroX - el.offsetLeft
			var currentOffset = e.pageX - el.offsetLeft
			var delta = currentOffset - zeroOffset
			el.scrollLeft = zeroScroll - delta
		}
	}
}
