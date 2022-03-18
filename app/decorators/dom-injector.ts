export function domInjector(selector: string){
    return function(
        target: any,
        propertyKey: string
    ){
        console.log(`Modificando prototype ${target.constructor.name} e adicionando getter para a propriedade ${propertyKey}`);
        
        let elemento: HTMLElement;

        const getter = function(){
            // cache do elemento dom para nãoo ter que ficar buscando a cada requisição
            if(!elemento){
                elemento = <HTMLElement> document.querySelector(selector);
                console.log(`buscando o elemento ${selector} para injetar em ${propertyKey}`);
            }
            
            return elemento;
        }

        Object.defineProperty(
            target, //Pega o prototype que define a classe onde o decorator está sendo chamado
            propertyKey, //Aplica para essa propriedade
            { get: getter }
        );
    }
}