import { EventEmitter, Injectable } from '@angular/core';
import { ComService } from './com.service';
import { Scwindow } from './scwindow';

@Injectable({
    providedIn: 'root'
})

export class ScwinService {
    items: Array<Scwindow> = [];
    ChangeDataEvent = new EventEmitter<Scwindow[]>();

    constructor(private com: ComService) {
        this.com.on('getWindows', (event: Electron.IpcMessageEvent, scWins) => {
            this.clear();
            scWins.forEach(win => {
              this.addScWin(win);
            });
            this.NotifyNewWindow();
        });
    }

    NotifyNewWindow() {
        this.ChangeDataEvent.emit(this.items);
    }

    addScWin(scWindow) {
        this.items.push(scWindow);
    }

    getItems() {
        return this.items;
    }

    clear() {
        this.items = [];
        return this.items;
    }
}
