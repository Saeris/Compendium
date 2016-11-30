import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

export const doubleClickDelay = 500;

class DraggableEvent {
	draggable;

	constructor(draggable) {
		this.draggable = draggable;
	}
}

export class DraggableClickedEvent extends DraggableEvent {
	handled = false;
}

export class DraggableDoubleClickedEvent extends DraggableEvent { }

export class DraggableDroppedEvent extends DraggableEvent {
	droppable;

	constructor(draggable, droppable) {
		super(draggable);
		this.droppable = droppable;
	}
}

export class PlaceholderClickedEvent {
	droppable;

	constructor(droppable) {
		this.droppable = droppable;
	}
}

@inject(EventAggregator)
export class DraggableClickPublisher {
	eventAggregator;
	lastDraggableClicked;

	constructor(eventAggregator) {
		this.eventAggregator = eventAggregator;
	}

	publish(draggable) {
		let event = new DraggableClickedEvent(draggable);

		this.eventAggregator.publish(event);

		if (event.handled) {
			return;
		}

		// double click?
		if (this.lastDraggableClicked === draggable) {
			this.lastDraggableClicked = null;
			this.eventAggregator.publish(new DraggableDoubleClickedEvent(draggable));
			return;
		}
		this.lastDraggableClicked = draggable;
		setTimeout(() => this.lastDraggableClicked = null, doubleClickDelay);
	}
}
