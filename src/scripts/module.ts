import { Caster } from "./caster.js";
import { Settings } from "./settings.js";
import { MagicElement } from "./element.js";

Hooks.once("init", () => {
  Settings.registerKeybinds();
  game.settings.register("my-module", "spell-slot", {
    scope: "client",
    config: false,
    type: String,
    default: "",
  });
  CONFIG.DND5E.itemRarity["element"] = "Элемент";
  const originalRender = Application.prototype.render;

  Application.prototype.render = function (...args) {
    const result = originalRender.apply(this, args);

    Hooks.callAll("renderAnyApplication", this, this.element, { appId: this.appId, class: this.constructor.name });

    return result;
  };
});

Hooks.on("renderAnyApplication", (app: Application, html: JQuery<HTMLElement>, data: { appId: number; class: string })=> {
  console.log(`Окно ${data.class} (${data.appId}) было отрендерено`);
  console.log(app.template)
  console.log(app.getData())
  
})

Hooks.on("createChatMessage", (message: ChatMessage, options, userId) => {
    if (message.user.isGM) return
    
    const content = message.export();
    const speaker = message.user;
    Main.logInChat(`🗨 Сообщение от ${speaker.name || "неизвестно"}: ${content}`);
  });



export class Main {
  static casters: Map<Actor, Caster> = new Map();

  static logInChat(str: string) {
    ChatMessage.create({content: str});
  }

  static getCaster(actor: Actor): Caster {
    if (this.casters.has(actor)) return this.casters.get(actor);

    const caster = new Caster(actor, new MagicElement("Огонь"), new MagicElement("Вода"), new MagicElement("Земля"));
    this.casters.set(actor, caster);

    return caster;
  }
}

Handlebars.registerHelper("fromUuid", function (uuid: string) {
  // @ts-ignore
  const result = fromUuidSync(uuid);
  return result ?? {};
});

Handlebars.registerHelper("range", function (from: number, to: number) {
  const arr = [];
  for (let i = from; i <= to; i++) {
    arr.push(i);
  }
  return arr;
});