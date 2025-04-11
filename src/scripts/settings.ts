import { Main } from "./module.js";
import { SpellSlotMenu} from "./spellBookMenu.js"

export class Settings {
    static registerKeybinds() {
        game.keybindings.register("ji-magica", "firts-element", {
            name: "Первый элемент",
            editable: [{ key: "1" }],
            onDown: () => { 
                const actor = canvas.tokens.controlled[0].actor;

                if (actor) {
                    console.log(`Имя актера: ${actor.name}`);
                } else {
                    console.warn("Актёр не найден у пользователя");
                    return
                }

                Main.getCaster(actor).castElement(0) 
            } 
          });
          game.keybindings.register("ji-magica", "second-element", {
              name: "Второй элемент",
              editable: [{ key: "2" }],
              onDown: () => { 
                  const actor = canvas.tokens.controlled[0].actor;
  
                  if (actor) {
                      console.log(`Имя актера: ${actor.name}`);
                  } else {
                      console.warn("Актёр не найден у пользователя");
                      return
                  }
  
                  Main.getCaster(actor).castElement(1) 
              } 
            });
            game.keybindings.register("ji-magica", "third-element", {
                name: "Третий элемент",
                editable: [{ key: "3" }],
                onDown: () => { 
                    const actor = canvas.tokens.controlled[0].actor;
    
                    if (actor) {
                        console.log(`Имя актера: ${actor.name}`);
                    } else {
                        console.warn("Актёр не найден у пользователя");
                        return
                    }
    
                    Main.getCaster(actor).castElement(2) 
                } 
              });
              game.keybindings.register("ji-magica", "menu", {
                  name: "Третий элемент",
                  editable: [{ key: "4" }],
                  onDown: () => { 
                    const menu = new SpellSlotMenu();
                    menu.render(true);
                  } 
                });
    }
}

