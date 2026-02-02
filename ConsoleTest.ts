import readline from 'readline'

// Fichier de tests console

export class Console2 {
    static rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    constructor(private menu:string[]=["no option"]) {
        // this.ask(["opt1", "opt2"], "menu :")
        Console2.menu("menu default",menu)
    }

    //     rl.question("Entrez votre nom : ", (answer: string) => {
    //   console.log("Bonjour", answer);
    //   rl.close();
    // });

    // ask(f:Function,arg:string[],txt:string){
    //     const str = `${txt}\n\t${arg.join("\n\t")}\n`
    //     const answer = this.rl.question(str,(answer:string)=>{console.log("your answer is :",answer)
    //         return answer
    //     })
    //     // return this.rl.question(txt,(answer:string)=>f(answer) )
    //     // console.log("your answer is : ",answer)
    //     // console.log("it match : ",arg.find((a,i)=>i==answer return a)))
    //     // answer != undefined ? console.log(typeof(answer)) : console.log("answer is undefined")
    //     // arg.filter((a,i)=>answer == i)[0]
    //     console.log(arg.filter((a,i)=>{i==Number(answer)!?true:false}))
    // }


    clog(txt: string) {
        console.log(txt)
        return txt
    }

    // ask2(arg:string[],txt:string){
    //     this.rl.question(txt,answer)
    // }

    static async ask(options: string[], txt: string): Promise<string> {
        const str = `${txt}\n\t${options.map((o, i) => `${i}: ${o}`).join("\n\t")}\n> `;
        // const str = `${txt}\n\t${options.join("\n\t")}\n`

        return new Promise((resolve) => {
            this.rl.question(str, (answer: string) => {
                resolve(answer);
            });
        });
    }

    static async menu(menu_head:string="head menu undefined :\t\n",options:string[]=["opt1", "opt2"]):Promise<string> {

        const answer = await this.ask(options, menu_head);

        console.log("Your answer is:", answer);

        const index = Number(answer);
        const choice = options[index];

        if (choice) {
            console.log("You chose:", choice);
    
             return choice
        } else {
            console.log("Invalid choice ❌");
            
             return ""
        }
        
        
    }
    

}

// Console2.menu("test menu",["test0","test1"])