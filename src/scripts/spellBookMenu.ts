export class SpellSlotMenu extends Application {
  
  static get defaultOptions() : Application.Options {
    return foundry.utils.mergeObject(Application.defaultOptions, {
      id: "spell-slot-menu",
      title: "Книга заклинаний",
      template: "modules/ji-magica/templates/spell-book.hbs",
      width: 400,
      height: "auto",
      resizable: false,
      classes: ["spell-slot-app"]
    });
  }

  async getData(): Promise<any> {
    const spellSlots: string[] = game?.user?.getFlag("ji-magica", "spellSlots") ?? [];
    
    const item = await fromUuid(spellSlots[0] as `Item.${string}`);
    console.log(item?.name)

    return {
      slots: spellSlots.slice(0, 3),
    };
  }

  activateListeners(html: JQuery): void {
    super.activateListeners(html);

    html.find(".slot").on("drop", this._onDrop.bind(this));
    html.find(".slot").on("dragover", (ev) => ev.preventDefault());
  }

  async _onDrop(event: DragEvent): Promise<void> {
    event.preventDefault();

    const raw = event instanceof DragEvent
      ? event.dataTransfer?.getData("text/plain")
      : (event as any).originalEvent?.dataTransfer?.getData("text/plain");

    if (!raw) return;

    const data = JSON.parse(raw);
    if (data.type !== "Item") return;

    const item = await fromUuid(data.uuid);
    if (!item) return;

    const spellSlots: string[] = game?.user?.getFlag("ji-magica", "spellSlots") ?? [];
    if (spellSlots.length >= 3) {
      ui.notifications?.warn("Только 3 заклинания можно сохранить.");
      return;
    }

    spellSlots.push(data.uuid);
    await game?.user?.setFlag("ji-magica", "spellSlots", spellSlots);
    this.render();
  }
}

/** 
 export class SpellSlotMenu extends Application {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "spell-slot-menu",
      title: "Spell Slot",
      template: `modules/ji-magica/templates/spell-slot.html`,
      width: 300,
      height: 150,
      dragDrop: [{ dragSelector: ".item", dropSelector: "#drop-zone" }],
    });
  }

  spell: Item;

  override async getData(options?: any) {
    const data = await super.getData();
    const contents = (this.item.getFlag("dnd5e", "contents") ?? []).slice(0, 3);
    return {
      ...data,
      limitedContents: contents,
      maxSlots: 3
    };
  }

  activateListeners(html) {
    super.activateListeners(html);

    html.find("#drop-zone").on("drop", this._onDrop.bind(this));

    html.find(".item").on("click", async () => {
      if (this.spell?.sheet) {
        this.spell.sheet.render(true);
      }
    });
  }

  async _onDrop(event: DragEvent) {
    event.preventDefault();

    const dataTransfer = event.dataTransfer ?? event?.dataTransfer;
    if (!dataTransfer) {
      console.warn("Нет dataTransfer в событии drop");
      return;
    }

    const rawData = dataTransfer.getData("text/plain");
    const data = JSON.parse(rawData);

    if (data.type !== "Item") return;

    const item = await fromUuid(data.uuid);
    if (item?.type !== "spell") return;

    this.spell = item;
    ui.notifications.info(`Добавлено заклинание: ${item.name}`);
    this.render();
  }
}

*/